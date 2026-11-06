import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostCard } from '@/components/blog/PostCard';
import { TryCard } from '@/components/blog/TryCard';
import { Footer } from '@/components/sections/Footer';
import { PillNav } from '@/components/sections/PillNav';
import { formatDate, getPost, getPosts, REVALIDATE } from '@/lib/blog';

export const revalidate = REVALIDATE;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const found = await getPost(params.slug);
  if (!found) return {};
  const { post } = found;
  return {
    title: `${post.title} | Topin Blog`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.excerpt, images: post.image ? [post.image] : undefined },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const found = await getPost(params.slug);
  if (!found) notFound();
  const { post, more } = found;
  return (
    <>
      <PillNav />
      <main id="main" className="bg-white">
        <article className="pb-20 pt-32 md:pb-24 md:pt-40">
          <header className="wrap max-w-[1120px]">
            <Link href="/blog" className="inline-flex items-center gap-2 text-[14.5px] font-semibold text-blue hover:underline">
              <span aria-hidden="true">←</span> All articles
            </Link>
            <p className="mt-6 text-[14px] font-semibold text-navy-2">
              {formatDate(post.date)} <span aria-hidden="true">·</span> {post.minutes} min read
            </p>
            <h1 className="mt-3 text-balance font-display max-w-[900px] text-[36px] font-semibold leading-[42px] tracking-[-0.035em] text-navy md:text-[54px] md:leading-[60px]">{post.title}</h1>
          </header>

          {post.image && (
            <div className="wrap mt-10 max-w-[1120px] md:mt-12">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-[#f6f7fa]">
                <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 1120px) 1120px, 100vw" className="object-cover" />
              </div>
            </div>
          )}

          <div className="wrap mt-12 grid max-w-[1120px] gap-12 md:mt-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
            {post.headings.length > 1 && (
              <nav aria-label="On this page" className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="text-[13px] font-semibold text-blue">On this page</p>
                  <ul className="mt-4 flex flex-col gap-3 border-l border-navy/10">
                    {post.headings.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="-ml-px block border-l border-transparent pl-4 text-[14px] leading-[20px] text-navy-2 transition-colors hover:border-blue hover:text-navy">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            )}
            <div className={post.headings.length > 1 ? '' : 'lg:col-span-2 lg:mx-auto lg:max-w-[720px]'}>
              <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
              <TryCard />
            </div>
          </div>
        </article>

        {more.length > 0 && (
          <section aria-labelledby="more-title" className="section-y border-t border-navy/[.08]">
            <div className="wrap">
              <h2 id="more-title" className="text-h2-m md:text-h2">Keep reading</h2>
              <ul className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
                {more.map((p) => (
                  <li key={p.slug} className="flex">
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
