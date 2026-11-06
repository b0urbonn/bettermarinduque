import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useQueryState } from 'nuqs';
import { Search as SearchIcon } from 'lucide-react';
import { ResultsSkeleton } from '../components/ui/LoadingSkeleton';
import PageHeader from '../components/ui/PageHeader';
import PageGraphic from '../components/brand/PageGraphic';
import SEO from '../components/SEO';
import { searchClient, SEARCH_INDEX } from '../lib/meilisearch';
import type { SearchHit } from '../lib/meilisearch';

interface SearchResponse {
  query: string;
  results: SearchHit[];
  error?: string;
}

export default function Search() {
  const [query, setQuery] = useQueryState('q', { defaultValue: '' });
  const [response, setResponse] = useState<SearchResponse>();
  const searchTerm = query.trim();
  const currentResponse = response?.query === searchTerm ? response : undefined;
  const results = currentResponse?.results;
  const error = currentResponse?.error;
  const isLoading = Boolean(searchTerm && !currentResponse);

  useEffect(() => {
    if (!searchTerm) return;

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const index = searchClient!.index(SEARCH_INDEX);
        const { hits } = await index.search<SearchHit>(
          searchTerm,
          { limit: 20 },
          { signal: controller.signal }
        );
        if (!controller.signal.aborted) {
          setResponse({ query: searchTerm, results: hits });
        }
      } catch {
        if (!controller.signal.aborted) {
          setResponse({
            query: searchTerm,
            results: [],
            error: 'Search is unavailable. Please try again later.',
          });
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchTerm]);

  return (
    <div lang="en">
      <SEO
        title="Search"
        description="Search across Marinduque services and government information."
      />
      <PageHeader
        title="Search"
        description="Search across Marinduque services and government information."
        illustration={<PageGraphic kind="search" />}
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Search' }]}
      />
      <div className="portal-container py-8 md:py-10">
        <div className="max-w-3xl">
          <div className="relative mb-8">
            <SearchIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value || null)}
              placeholder="Search services, departments, guides..."
              className="w-full min-h-11 pl-10 pr-4 py-3 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              autoFocus
            />
          </div>

          {error && (
            <div
              role="status"
              className="text-center py-12 text-red-600 text-sm"
            >
              {error}
            </div>
          )}

          {isLoading && <ResultsSkeleton label="Searching…" />}

          {!error && results?.length === 0 && (
            <div role="status" className="text-center py-12 text-gray-600">
              No results for{' '}
              <span className="font-medium">&ldquo;{searchTerm}&rdquo;</span>
            </div>
          )}

          {results && results.length > 0 && (
            <div className="space-y-3 motion-safe:animate-fade-in">
              <p role="status" className="text-sm text-gray-600 mb-4">
                {results.length} result{results.length !== 1 ? 's' : ''} for{' '}
                &ldquo;{searchTerm}&rdquo;
              </p>
              {results.map(hit => (
                <Link key={hit.id} to={hit.url} className="block group">
                  <div className="rounded-xl border border-gray-300 bg-white p-4 hover:border-primary-500 hover:bg-primary-50 motion-safe:transition motion-safe:duration-150">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          hit.type === 'service'
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-accent-100 text-accent-800'
                        }`}
                      >
                        {hit.category}
                      </span>
                    </div>
                    <h2 className="font-bold text-gray-900 group-hover:text-primary-700">
                      {hit.title}
                    </h2>
                    {hit.description && (
                      <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                        {hit.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!searchTerm && (
            <div className="text-center py-12 text-gray-500 text-sm">
              Start typing to search across services and government information
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
