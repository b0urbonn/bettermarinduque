import type { ReactNode } from 'react';

function LoadingSkeleton({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <>
      {label && (
        <span role="status" className="sr-only">
          {label}
        </span>
      )}
      <div aria-hidden="true" className="motion-safe:animate-skeleton-pulse">
        {children}
      </div>
    </>
  );
}

export function ArticleSkeleton({
  label,
  withContents = false,
}: {
  label: string;
  withContents?: boolean;
}) {
  return (
    <LoadingSkeleton label={label}>
      <div className="mb-7 space-y-3 border-b border-gray-300 pb-5">
        <div className="h-4 w-28 rounded bg-gray-200" />
        <div className="h-9 w-3/4 max-w-lg rounded bg-primary-100 md:h-10" />
      </div>
      <div className="flex flex-col-reverse gap-7 lg:flex-row lg:items-start lg:gap-10">
        <div className="w-full max-w-[72ch] flex-1 space-y-6">
          <div className="space-y-2.5">
            <div className="h-4 rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
            <div className="h-4 w-2/3 rounded bg-gray-200" />
          </div>
          <div className="space-y-2.5 border-t border-gray-300 pt-5">
            <div className="mb-4 h-6 w-2/5 rounded bg-primary-100" />
            <div className="h-4 w-11/12 rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
        {withContents && (
          <div className="space-y-3 rounded-md border border-gray-300 bg-gray-50 p-4 lg:w-60">
            <div className="h-4 w-24 rounded bg-primary-100" />
            <div className="h-3 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
          </div>
        )}
      </div>
    </LoadingSkeleton>
  );
}

export function ResultsSkeleton({ label }: { label?: string }) {
  return (
    <LoadingSkeleton label={label}>
      <div className="space-y-3">
        {[0, 1, 2].map(row => (
          <div
            key={row}
            className="space-y-2.5 rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className="h-4 w-20 rounded-full bg-primary-100" />
            <div className="h-5 w-3/5 max-w-xs rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </LoadingSkeleton>
  );
}
