// Videos shown on the /stories page. Paste the PUBLIC share URL of the video —
// the site builds the embed automatically. Only public videos will play;
// private or unlisted links will show a "watch on…" button instead.
// Supported: YouTube (watch, youtu.be, shorts), Facebook videos, Google Drive files.
// Add the newest video at the top.

export interface StoryVideo {
  title: string;
  /** Public share URL of the video. */
  url: string;
  /** Optional one-line description shown under the title. */
  description?: string;
  /** Optional cover image URL for the card. Falls back to the platform thumbnail. */
  cover?: string;
  /** Optional date, e.g. '2026-11-20'. */
  date?: string;
  /** Optional credit, e.g. 'Province of Marinduque'. */
  source?: string;
}

export const storiesVideos: StoryVideo[] = [
  {
    title: 'Sa Likod Ng Maskara [2026]',
    url: 'https://www.youtube.com/watch?v=YEGkrz1jmI0',
    description:
      'A short film following a journalist uncovering the untold stories behind Marinduque’s Moriones Festival — the faith and dedication behind the masks. Champion of the KUWENTOLOHIYA Short Video Contest, Marinduque Innovation Fest 2026.',
    cover: 'https://i.ytimg.com/vi/YEGkrz1jmI0/maxresdefault.jpg',
    source: 'Films by Ayan (YouTube)',
    date: '2026-11-20',
  },
];

export type VideoPlatform = 'youtube' | 'facebook' | 'gdrive';

export interface VideoEmbed {
  platform: VideoPlatform;
  /** iframe embed URL, or undefined when the URL can't be embedded. */
  embedUrl?: string;
  /** Poster image for the card preview, when available. */
  thumbnailUrl?: string;
  /** Human-readable platform name for the "watch on" link. */
  platformLabel: string;
}

const YOUTUBE_ID =
  /(?:youtube\.com\/(?:watch\?[^#]*v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/;
const GDRIVE_ID =
  /drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([\w-]{10,})/;
const FACEBOOK_VIDEO =
  /facebook\.com\/(?:[^/]+\/videos\/|watch\/?\?v=|[^/]+\/posts\/[^/]*\/videos\/|reel\/|share\/v\/)/;

export function videoEmbed(url: string): VideoEmbed | undefined {
  try {
    const yt = url.match(YOUTUBE_ID);
    if (yt) {
      return {
        platform: 'youtube',
        platformLabel: 'YouTube',
        embedUrl: `https://www.youtube-nocookie.com/embed/${yt[1]}`,
        thumbnailUrl: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`,
      };
    }

    const gd = url.match(GDRIVE_ID);
    if (gd) {
      return {
        platform: 'gdrive',
        platformLabel: 'Google Drive',
        embedUrl: `https://drive.google.com/file/d/${gd[1]}/preview`,
      };
    }

    if (FACEBOOK_VIDEO.test(url)) {
      // Facebook no longer serves reels/videos to iframe embeds — the plugin
      // returns a "not available" placeholder. Cards open a popup with a
      // "Watch on Facebook" button instead.
      return { platform: 'facebook', platformLabel: 'Facebook' };
    }
  } catch {
    // Fall through — unparseable URLs render as plain links.
  }
  return undefined;
}
