/**
 * Data watchdog: checks official sources for content changes.
 *
 * Fetches every URL in scripts/watchdog-sources.json, hashes the response
 * body, and compares it against the hashes stored in
 * scripts/watchdog-state.json. When a source's content changes (or a source
 * that previously responded stops responding), it writes a markdown report to
 * WATCHDOG-REPORT.md and signals `changed=true` on $GITHUB_OUTPUT so the
 * workflow can open or update a GitHub issue.
 *
 * The workflow commits the updated state file, so each run only reports
 * changes since the last run. Fetch errors are treated as changes only if the
 * source responded on a previous run — a permanently dead URL will keep
 * appearing in the open issue until it is removed from the sources list.
 *
 * Usage:
 *   node scripts/watchdog.mjs
 */

import { createHash } from 'crypto';
import { execFileSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCES_PATH = join(__dirname, 'watchdog-sources.json');
const STATE_PATH = join(__dirname, 'watchdog-state.json');
const REPORT_PATH = join(ROOT, 'WATCHDOG-REPORT.md');
const TIMEOUT_MS = 30_000;
// Some government sites (Cloudflare etc.) reject non-browser agents; send
// browser-like headers first, then fall back to the r.jina.ai reader proxy.
const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
const JINA_PREFIX = 'https://r.jina.ai/';

const { sources } = JSON.parse(readFileSync(SOURCES_PATH, 'utf8'));
const state = existsSync(STATE_PATH)
  ? JSON.parse(readFileSync(STATE_PATH, 'utf8'))
  : { sources: {} };
const firstRun = Object.keys(state.sources).length === 0;

function hashBody(body) {
  return createHash('sha256').update(body).digest('hex');
}

async function fetchOnce(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'user-agent': BROWSER_UA,
        accept:
          'text/html,application/xhtml+xml,application/json;q=0.9,text/plain;q=0.8,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.9',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
      },
    });
    const body = await res.text();
    return { ok: res.ok, status: res.status, body };
  } finally {
    clearTimeout(timer);
  }
}

// curl fallback: some sites fingerprint-block Node's fetch but answer curl.
function fetchWithCurl(url) {
  try {
    const out = execFileSync(
      'curl',
      [
        '-sL',
        '--max-time',
        '30',
        '-A',
        BROWSER_UA,
        '-H',
        'accept: text/html,application/xhtml+xml,application/json;q=0.9,text/plain;q=0.8,*/*;q=0.8',
        '-w',
        '\n%{http_code}',
        url,
      ],
      { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 }
    );
    const idx = out.lastIndexOf('\n');
    const status = Number(out.slice(idx + 1).trim());
    const body = out.slice(0, idx);
    return { ok: status >= 200 && status < 300, status, body };
  } catch {
    return { ok: false, status: null, body: null };
  }
}

async function checkSource(source) {
  let result;
  try {
    result = await fetchOnce(source.url);
  } catch (err) {
    result = { ok: false, status: null, body: null, error: String(err.message ?? err) };
  }
  if (!result.ok) {
    const curled = fetchWithCurl(source.url);
    if (curled.ok || curled.status != null) result = curled;
  }
  // Retry through the reader proxy when the site blocks us directly.
  if (!result.ok) {
    try {
      const proxied = await fetchOnce(JINA_PREFIX + source.url);
      if (proxied.ok) result = proxied;
      else if (!result.ok) result = { ...result, status: proxied.status };
    } catch {
      // keep the direct result
    }
  }
  if (result.ok) {
    return {
      ok: true,
      httpStatus: result.status,
      hash: hashBody(result.body.replace(/\s+/g, ' ').trim()),
      error: null,
    };
  }
  return {
    ok: false,
    httpStatus: result.status,
    hash: null,
    error:
      result.status != null
        ? `HTTP ${result.status}`
        : (result.error ?? 'fetch failed'),
  };
}

const changes = [];
const warnings = [];
const now = new Date().toISOString();

for (const source of sources) {
  const previous = state.sources[source.url];
  const result = await checkSource(source);

  state.sources[source.url] = {
    name: source.name,
    hash: result.hash ?? previous?.hash ?? null,
    httpStatus: result.httpStatus,
    checkedAt: now,
    lastError: result.error,
  };

  if (firstRun) continue;

  const wasFailing = Boolean(previous?.lastError);

  if (result.ok && wasFailing) {
    changes.push({
      name: source.name,
      url: source.url,
      note: source.note ?? '',
      kind: 'reachable again after failures',
    });
  } else if (result.ok && result.hash !== previous?.hash) {
    changes.push({
      name: source.name,
      url: source.url,
      note: source.note ?? '',
      kind: 'content changed',
    });
  } else if (!result.ok && !wasFailing && previous?.hash) {
    // First failure only — repeat outages are listed as warnings below.
    changes.push({
      name: source.name,
      url: source.url,
      note: source.note ?? '',
      kind: `unreachable (${result.error})`,
    });
  } else if (!result.ok && previous?.hash) {
    warnings.push({ name: source.name, url: source.url, error: result.error });
  }
}

writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n');

let report = '';
if (firstRun) {
  report = `# Data watchdog — baseline run\n\nRecorded hashes for ${sources.length} sources. Future changes will be reported here.\n`;
} else if (changes.length === 0) {
  report = `# Data watchdog — ${now}\n\nNo changes detected across ${sources.length} sources.\n`;
} else {
  report = `# Data watchdog — changes detected (${now})\n\n`;
  for (const c of changes) {
    report += `- **${c.name}** — ${c.kind}\n  ${c.url}\n`;
    if (c.note) report += `  _${c.note}_\n`;
  }
  if (warnings.length > 0) {
    report += `\n## Still unreachable (no new alert)\n\n`;
    for (const w of warnings) {
      report += `- ${w.name} — ${w.url} (${w.error})\n`;
    }
  }
  report += `\n---\n_Automated check by .github/workflows/data-watchdog.yml. Content hashes only — verify what actually changed before editing content/transparency/._\n`;
}
writeFileSync(REPORT_PATH, report);

const changed = !firstRun && changes.length > 0;
if (process.env.GITHUB_OUTPUT) {
  writeFileSync(
    process.env.GITHUB_OUTPUT,
    `changed=${changed}\nreport=${REPORT_PATH}\n`,
    { flag: 'a' }
  );
}
console.log(
  firstRun
    ? `Baseline recorded for ${sources.length} sources.`
    : changed
      ? `${changes.length} source(s) changed.`
      : `No changes across ${sources.length} sources.`
);
for (const c of changes) console.log(`  - ${c.name}: ${c.kind}`);
