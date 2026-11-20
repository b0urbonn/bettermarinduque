import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Clapperboard, Play, X } from 'lucide-react';
import SEO from '../components/SEO';
import PageHeader from '../components/ui/PageHeader';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { storiesVideos, videoEmbed, type StoryVideo } from '../data/stories';
import { formatPartialDate } from '../lib/transparencyFormat';
import { contactMailto } from '../data/navigation';

const SUGGEST_URL = `${contactMailto}?subject=Suggest%20a%20story`;

function VideoModal({
  video,
  onClose,
}: {
  video: StoryVideo;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const embed = videoEmbed(video.url);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-primary-950/80 p-4 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
    >
      <div
        className="card w-full max-w-3xl overflow-hidden p-0 motion-safe:animate-in motion-safe:zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full bg-primary-950">
          {embed?.embedUrl ? (
            <iframe
              src={embed.embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 size-full"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-primary-900 p-6 text-center text-white">
              <Play className="size-14" aria-hidden="true" />
              <div>
                <p className="font-display text-lg font-extrabold">
                  {embed?.platformLabel ?? 'External video'}
                </p>
                <p className="mt-1 text-sm text-white/80">
                  This video plays on{' '}
                  {embed?.platformLabel ?? 'the source site'} — tap below to
                  watch it.
                </p>
              </div>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-white text-primary-800 hover:bg-primary-50"
              >
                Watch now
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="font-display text-xl font-extrabold tracking-tight text-gray-900">
                {video.title}
              </h2>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                {video.date && <span>{formatPartialDate(video.date)}</span>}
                {video.date && video.source && (
                  <span aria-hidden="true">·</span>
                )}
                {video.source && <span>{video.source}</span>}
                {embed && (
                  <>
                    {(video.date || video.source) && (
                      <span aria-hidden="true">·</span>
                    )}
                    <span className="font-semibold text-primary-700">
                      {embed.platformLabel}
                    </span>
                  </>
                )}
              </div>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-600 hover:bg-gray-100"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          {video.description && (
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              {video.description}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Watch on {embed?.platformLabel ?? 'the source site'}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Stories() {
  const [active, setActive] = useState<StoryVideo | null>(null);

  return (
    <>
      <SEO
        title="Stories"
        description="Stories and videos about Marinduque — announcements, events, and moments from the province and its communities."
        keywords="Marinduque stories, Marinduque videos, province updates"
      />
      <PageHeader
        eyebrow="Videos"
        title="Stories"
        description="Watch stories and videos about Marinduque — announcements, events, and moments from the province and its communities. Tap a card to watch."
        breadcrumbItems={[{ label: 'Home', href: '/' }, { label: 'Stories' }]}
      />
      <Section>
        {storiesVideos.length === 0 ? (
          <div className="card mx-auto max-w-xl p-8 text-center">
            <span className="icon-tile mx-auto mb-3">
              <Clapperboard className="size-6" aria-hidden="true" />
            </span>
            <Heading level={2}>No stories yet</Heading>
            <p className="mt-2 text-sm text-gray-600">
              Videos will appear here once they are added. If you have a public
              video about Marinduque, suggest it and we will take a look.
            </p>
            <a href={SUGGEST_URL} className="btn btn-secondary mt-5">
              Suggest a story
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {storiesVideos.map(video => {
              const embed = videoEmbed(video.url);
              const cover = video.cover ?? embed?.thumbnailUrl;
              return (
                <li key={video.url}>
                  <button
                    type="button"
                    onClick={() => setActive(video)}
                    className="card card-hover group flex w-full flex-col overflow-hidden p-0 text-left"
                    aria-label={`Watch: ${video.title}`}
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-primary-950">
                      {cover ? (
                        <img
                          src={cover}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-primary-900 to-primary-700" />
                      )}
                      <div className="absolute inset-0 bg-primary-950/20 transition-colors duration-200 group-hover:bg-primary-950/10" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex size-14 items-center justify-center rounded-full bg-white/95 text-primary-800 shadow-lg transition-transform duration-200 group-hover:scale-110">
                          <Play
                            className="ml-0.5 size-6 fill-current"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h2 className="font-display text-lg leading-snug font-extrabold tracking-tight text-gray-900 group-hover:text-primary-800">
                        {video.title}
                      </h2>
                      {video.description && (
                        <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                          {video.description}
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                        {video.date && (
                          <span>{formatPartialDate(video.date)}</span>
                        )}
                        {video.date && video.source && (
                          <span aria-hidden="true">·</span>
                        )}
                        {video.source && <span>{video.source}</span>}
                        {embed && (
                          <>
                            {(video.date || video.source) && (
                              <span aria-hidden="true">·</span>
                            )}
                            <span className="font-semibold text-primary-700">
                              {embed.platformLabel}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Section>
      <Section className="border-t border-gray-200 bg-sand-50">
        <Heading level={2}>Suggest a story</Heading>
        <p className="max-w-3xl text-gray-700">
          Know a public video about Marinduque — an announcement, event recap,
          or community story? Send us the link and we will consider adding it.
          Only public YouTube, Facebook, and Google Drive videos can be embedded
          on this page.
        </p>
        <div className="mt-4">
          <a href={SUGGEST_URL} className="btn btn-secondary">
            Suggest a story by email
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </Section>
      {active && <VideoModal video={active} onClose={() => setActive(null)} />}
    </>
  );
}
