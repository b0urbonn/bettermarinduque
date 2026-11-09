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
              className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value || null)}
              placeholder="Search services, departments, guides..."
              className="field pl-11"
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
                  <div className="card card-hover p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`chip ${
                          hit.type === 'service'
                            ? 'border-primary-200 bg-primary-50 text-primary-700'
                            : 'border-accent-200 bg-accent-50 text-accent-800'
                        }`}
                      >
                        {hit.category}
                      </span>
                    </div>
                    <h2 className="font-display font-extrabold tracking-tight text-gray-900 group-hover:text-primary-800">
                      {hit.title}
                    </h2>
                    {hit.description && (
                      <p className="mt-1 text-sm leading-relaxed text-gray-600 line-clamp-2">
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
