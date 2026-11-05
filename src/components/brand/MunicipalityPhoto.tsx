import { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';
import type { MunicipalitySlug } from '../../data/municipalities';
import {
  municipalityGalleries,
  municipalityPhotos,
} from '../../data/municipalityMedia';

interface PhotoProps {
  slug: MunicipalitySlug;
  priority?: boolean;
  slideshow?: boolean;
}

export default function MunicipalityPhoto({
  slug,
  priority = false,
  slideshow = false,
}: PhotoProps) {
  const photos = slideshow
    ? municipalityGalleries[slug]
    : [municipalityPhotos[slug]];
  const [failed, setFailed] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const live = photos.filter(photo => !failed.includes(photo.src));

  useEffect(() => {
    if (photos.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex(index => (index + 1) % photos.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [photos.length]);

  if (live.length === 0) {
    return (
      <div
        role="img"
        aria-label={`Photo unavailable: ${photos[0].title}`}
        className="flex size-full flex-col items-center justify-center gap-2 bg-primary-50 p-4 text-center text-primary-800"
      >
        <ImageOff size={28} aria-hidden="true" />
        <span className="text-sm font-semibold">{photos[0].title}</span>
        <span className="text-xs">Photo unavailable</span>
      </div>
    );
  }

  if (!slideshow) {
    const photo = live[0];
    return (
      <img
        src={photo.src}
        alt={photo.alt}
        width={1280}
        height={720}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        referrerPolicy="no-referrer"
        style={{ objectPosition: photo.objectPosition ?? 'center' }}
        onError={() => setFailed(current => [...current, photo.src])}
        className={`size-full ${photo.contain ? 'bg-primary-900 object-contain' : 'object-cover'}`}
      />
    );
  }

  return (
    <div className="relative size-full overflow-hidden bg-primary-900">
      {live.map((photo, index) => {
        const position =
          index === activeIndex % live.length
            ? 'translate-x-0 opacity-40'
            : index ===
                ((activeIndex % live.length) - 1 + live.length) % live.length
              ? '-translate-x-full opacity-0'
              : 'translate-x-full opacity-0';
        return (
          <img
            key={photo.src}
            src={photo.src}
            alt={index === activeIndex % live.length ? photo.alt : ''}
            loading={priority && index === 0 ? 'eager' : 'lazy'}
            fetchPriority={priority && index === 0 ? 'high' : 'auto'}
            decoding="async"
            referrerPolicy="no-referrer"
            style={{ objectPosition: photo.objectPosition ?? 'center' }}
            onError={() =>
              setFailed(current =>
                current.includes(photo.src) ? current : [...current, photo.src]
              )
            }
            className={`absolute inset-0 size-full object-cover transition-all duration-[1600ms] ease-in-out motion-reduce:transition-none ${position}`}
          />
        );
      })}
      <div className="absolute inset-0 bg-primary-900/45" />
      {live.length > 1 && (
        <div
          aria-hidden="true"
          className="absolute bottom-2.5 left-1/2 flex -translate-x-1/2 gap-1.5"
        >
          {live.map((photo, index) => (
            <span
              key={photo.src}
              className={`size-1.5 rounded-full transition-colors duration-500 ${
                index === activeIndex % live.length ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function MunicipalityPhotoCredit({
  slug,
  slideshow = false,
}: {
  slug: MunicipalitySlug;
  slideshow?: boolean;
}) {
  const photos = slideshow
    ? municipalityGalleries[slug]
    : [municipalityPhotos[slug]];
  return (
    <span lang="en">
      {photos.map((photo, index) => (
        <span key={photo.src}>
          {index > 0 && '; '}
          <a href={photo.sourceUrl} className="portal-link">
            {photo.title}
          </a>{' '}
          · {photo.author}
          {photo.license && photo.licenseUrl && (
            <>
              {' · '}
              <a href={photo.licenseUrl} className="portal-link">
                {photo.license}
              </a>
            </>
          )}
          {photo.year && <> · Photo: {photo.year}</>}
        </span>
      ))}
      . Resized and cropped for display.
    </span>
  );
}
