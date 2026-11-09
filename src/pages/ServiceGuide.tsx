import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEO from '../components/SEO';
import PageGraphic from '../components/brand/PageGraphic';
import { ArticleSkeleton } from '../components/ui/LoadingSkeleton';
import { serviceCategories } from '../data/yamlLoader';
import {
  loadMarkdownContent,
  type MarkdownContent,
} from '../lib/markdownLoader';

function GuideArticle({
  markdown,
  serviceSearch,
}: {
  markdown: MarkdownContent;
  serviceSearch: string;
}) {
  const { hash, search } = useLocation();
  const body = markdown.content.replace(/^#[ \t]+[^\n]+\n*/, '');
  const sections = Array.from(
    body.matchAll(/^##[ \t]+(.+?)[ \t]*$/gm),
    (match, index) => ({
      title: match[1],
      offset: match.index,
      id: `guide-${match[1]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}-${index + 1}`,
    })
  );

  // The guide loads asynchronously, so an anchor may not exist on first navigation.
  useEffect(() => {
    if (!hash.startsWith('#guide-')) return;
    const target = document.getElementById(hash.slice(1));
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: 'start' });
  }, [hash]);

  const components: Components = {
    h2: ({ node, children }) => {
      const section = sections.find(
        item => item.offset === node?.position?.start.offset
      );
      return (
        <h2 id={section?.id} tabIndex={section ? -1 : undefined}>
          {children}
        </h2>
      );
    },
    a: ({ href, children }) => {
      if (href?.startsWith('/services/')) {
        return (
          <Link to={href} state={{ serviceSearch }}>
            {children}
          </Link>
        );
      }

      const external =
        href?.startsWith('https://') || href?.startsWith('http://');
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {children}
          {external && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      );
    },
    table: ({ children }) => (
      <div className="my-5">
        <p className="mt-0 mb-2 text-sm text-gray-700 sm:hidden">
          Scroll sideways to see all columns.
        </p>
        <div
          role="region"
          aria-label="Service information table"
          tabIndex={0}
          className="overflow-x-auto rounded-md border border-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700"
        >
          <table className="m-0 min-w-[27rem] [&_td]:px-3 [&_td]:py-2.5 [&_th]:bg-gray-50 [&_th]:px-3 [&_th]:py-2.5">
            {children}
          </table>
        </div>
      </div>
    ),
    th: ({ children, style }) => (
      <th scope="col" style={style}>
        {children}
      </th>
    ),
  };

  return (
    <div className="grid items-start gap-7 motion-safe:animate-fade-in lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-10">
      {sections.length > 0 && (
        <nav
          aria-label="On this page"
          className="card h-fit p-4 lg:sticky lg:top-32 lg:col-start-2 lg:row-start-1"
        >
          <h2 className="font-display text-base font-extrabold tracking-tight text-gray-900">
            On this page
          </h2>
          <ul className="mt-2 grid grid-cols-2 gap-x-3 lg:grid-cols-1">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <Link
                  to={{ search, hash: `#${id}` }}
                  state={{ serviceSearch }}
                  className="portal-link inline-flex min-h-10 items-center rounded-md px-1.5 text-sm"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <article
        aria-label="Service guide"
        className="prose card max-w-none min-w-0 break-words p-5 sm:p-8 lg:col-start-1 lg:row-start-1 lg:prose-h2:scroll-mt-32 [&_li.task-list-item]:block [&_li.task-list-item]:pl-0 [&_li.task-list-item]:cursor-auto [&_li.task-list-item]:border-0 [&_ul.contains-task-list]:list-none [&_ul.contains-task-list]:pl-0 [&_input[type=checkbox]]:mr-2 [&_input[type=checkbox]]:accent-primary-700 [&>p:first-child]:mt-0 [&>p:first-child]:text-lg"
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {body}
        </ReactMarkdown>
      </article>
    </div>
  );
}

function ServiceGuidePage({
  category,
  slug,
  categoryName,
}: {
  category: string;
  slug: string;
  categoryName: string;
}) {
  const { state } = useLocation();
  const [result, setResult] = useState<MarkdownContent | null>();
  const serviceSearch =
    typeof state?.serviceSearch === 'string'
      ? state.serviceSearch
      : new URLSearchParams({ category }).toString();
  const directory = { pathname: '/services', search: serviceSearch };
  const returnState = { focusGuide: `${category}/${slug}` };

  useEffect(() => {
    let current = true;
    void loadMarkdownContent(slug, category, 'service').then(
      content => {
        if (current) setResult(content);
      },
      () => {
        if (current) setResult(null);
      }
    );
    return () => {
      current = false;
    };
  }, [category, slug]);

  const title = result?.title || 'Service guide';

  return (
    <div lang="en" className="portal-container py-7 md:py-10">
      <SEO
        title={result === null ? 'Service guide unavailable' : title}
        description={result?.description}
      />
      <Link
        to={directory}
        state={returnState}
        className="portal-link inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold"
      >
        <ArrowLeft size={17} aria-hidden="true" /> Back to service guides
      </Link>
      {result ? (
        <>
          <header className="mb-7 flex items-start justify-between gap-3 border-b border-gray-200 pb-5 motion-safe:animate-fade-in sm:items-center sm:gap-8">
            <div className="min-w-0">
              <Link
                to={{
                  pathname: '/services',
                  search: new URLSearchParams({ category }).toString(),
                }}
                className="portal-link inline-flex min-h-10 items-center rounded-md text-sm font-semibold"
              >
                {categoryName}
              </Link>
              <h1 className="mt-1 font-display max-w-4xl text-3xl leading-tight font-extrabold tracking-tight text-gray-900 md:text-4xl">
                {title}
              </h1>
            </div>
            <PageGraphic key={slug} kind="guide" />
          </header>
          <GuideArticle markdown={result} serviceSearch={serviceSearch} />
          <Link
            to={directory}
            state={returnState}
            className="portal-link mt-6 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold"
          >
            <ArrowLeft size={17} aria-hidden="true" /> Back to service guides
          </Link>
        </>
      ) : result === null ? (
        <>
          <h1 className="mt-4 text-3xl font-bold">Service guide unavailable</h1>
          <p className="mt-3 text-gray-700">
            This guide may have moved. Search the directory for the service you
            need.
          </p>
        </>
      ) : (
        <ArticleSkeleton label="Loading service guide…" withContents />
      )}
    </div>
  );
}

export default function ServiceGuide() {
  const { category, documentSlug } = useParams();
  const serviceCategory = serviceCategories.categories.find(
    item => item.slug === category
  );

  if (!serviceCategory || !documentSlug) {
    return (
      <div className="portal-container py-8">
        <h1 className="text-3xl font-bold">Service guide unavailable</h1>
        <Link
          to="/services"
          className="portal-link mt-3 inline-flex min-h-11 items-center"
        >
          Browse service guides
        </Link>
      </div>
    );
  }

  return (
    <ServiceGuidePage
      key={`${serviceCategory.slug}/${documentSlug}`}
      category={serviceCategory.slug}
      slug={documentSlug}
      categoryName={serviceCategory.category}
    />
  );
}
