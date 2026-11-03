import Image from 'next/image';

const available = (process.env.NEXT_PUBLIC_AVAILABLE_IMAGES || '').split(',').filter(Boolean);

// Neutral stone → cyan-soft blur while the real photo loads.
const BLUR =
  'data:image/svg+xml;base64,' +
  'PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA4IDgnPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0nZycgeDE9JzAnIHkxPScwJyB4Mj0nMScgeTI9JzEnPjxzdG9wIHN0b3AtY29sb3I9JyNFRkVDRTQnLz48c3RvcCBvZmZzZXQ9JzEnIHN0b3AtY29sb3I9JyNDRUVFRjMnLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0nOCcgaGVpZ2h0PSc4JyBmaWxsPSd1cmwoI2cpJy8+PC9zdmc+';

type Props = {
  /** File name inside /public/images, e.g. "hero.jpg". A .webp with the same base name is preferred if present. */
  file: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Hide the "STOCK PHOTO" label (e.g. when overlays cover the slot). */
  quietPlaceholder?: boolean;
};

function resolve(file: string) {
  const base = file.replace(/\.[a-z]+$/i, '');
  const prefer = [`${base}.webp`, `${base}.avif`, file, `${base}.jpeg`, `${base}.png`];
  return prefer.find((f) => available.includes(f));
}

/**
 * Photo slot. Until the file exists in /public/images, renders a gradient slot so the layout never breaks.
 * The parent must be positioned and sized (next/image `fill`).
 */
export function Photo({ file, alt, sizes, priority, className = '', imgClassName = '', quietPlaceholder }: Props) {
  const src = resolve(file);
  if (!src) {
    return (
      <div className={`photo-slot absolute inset-0 flex items-center justify-center ${className}`} role="img" aria-label={alt}>
        {!quietPlaceholder && (
          <span className="text-[11px] font-extrabold tracking-[0.12em] text-navy/50">STOCK PHOTO</span>
        )}
      </div>
    );
  }
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Image
        src={`/images/${src}`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={BLUR}
        className={`object-cover outline outline-1 -outline-offset-1 outline-black/10 ${imgClassName}`}
      />
    </div>
  );
}
