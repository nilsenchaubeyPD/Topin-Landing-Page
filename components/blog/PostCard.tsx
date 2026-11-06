import Image from 'next/image';
import Link from 'next/link';
import { formatDate, type Post } from '@/lib/blog';

/** One post in the blog grid: cover image, date and read time, title, short excerpt. */
export function PostCard({ post, big = false }: { post: Post; big?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col overflow-hidden rounded-[24px] bg-[#f6f7fa] transition-colors duration-300 hover:bg-[#eef1f6] ${big ? 'lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]' : ''}`}
    >
      <div className={`relative aspect-[16/9] w-full overflow-hidden ${big ? 'lg:aspect-auto lg:min-h-[380px]' : ''}`}>
        {post.image ? (
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes={big ? '(min-width: 1024px) 640px, 100vw' : '(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw'}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            priority={big}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-stone" />
        )}
      </div>
      <div className={`flex flex-1 flex-col gap-3 p-6 md:p-7 ${big ? 'lg:justify-center lg:p-12' : ''}`}>
        <p className="text-[13.5px] font-semibold text-navy-2">
          {formatDate(post.date)} <span aria-hidden="true">·</span> {post.minutes} min read
        </p>
        <h3 className={`font-display font-medium tracking-[-0.02em] text-navy ${big ? 'text-[28px] leading-[35px] md:text-[36px] md:leading-[44px]' : 'text-[21px] leading-[28px]'}`}>
          {post.title}
        </h3>
        <p className={`text-navy-2 ${big ? 'text-[17px] leading-[27px]' : 'line-clamp-3 text-[15.5px] leading-[24px]'}`}>{post.excerpt}</p>
        <span className="mt-auto pt-2 text-[15px] font-semibold text-blue">
          Read article <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
