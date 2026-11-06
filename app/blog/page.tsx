import type { Metadata } from 'next';
import { PostCard } from '@/components/blog/PostCard';
import { Footer } from '@/components/sections/Footer';
import { PillNav } from '@/components/sections/PillNav';
import { SectionTag } from '@/components/ui/SectionTag';
import { getPosts, REVALIDATE } from '@/lib/blog';

export const revalidate = REVALIDATE;

export const metadata: Metadata = {
  title: 'Blog | Topin',
  description: 'Insights on AI-powered skill assessments and recruitment from the Topin team.',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const posts = await getPosts();
  const [first, ...rest] = posts;
  return (
    <>
      <PillNav />
      <main id="main" className="bg-white">
        <section aria-labelledby="blog-title" className="wrap pb-20 pt-32 md:pb-28 md:pt-40">
          <SectionTag>Blog</SectionTag>
          <h1 id="blog-title" className="text-h2-m md:text-h2">Topin Blog</h1>
          <p className="mt-4 max-w-[560px] text-[18px] leading-[28px] text-navy-2">Insights on AI-powered skill assessments and recruitment.</p>

          {posts.length === 0 ? (
            <p className="mt-14 text-[17px] text-navy-2">Articles could not be loaded right now. Please try again shortly.</p>
          ) : (
            <>
              <div className="mt-12 md:mt-14">
                <PostCard post={first} big />
              </div>
              <ul className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <li key={p.slug} className="flex">
                    <PostCard post={p} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
