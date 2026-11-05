import { notFound } from 'next/navigation';
import { HeroLab } from '@/components/heroes/HeroLab';
import { HeroPill } from '@/components/heroes/HeroPill';
import { Nav } from '@/components/sections/Nav';

export const metadata = { title: 'Hero options', robots: { index: false, follow: false } };

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
}

export default function Page({ params }: { params: { id: string } }) {
  const n = Number(params.id);
  if (![1, 2, 3, 4].includes(n)) notFound();
  if (n === 4) return <HeroPill />;
  return (
    <>
      <Nav />
      <main id="main">
        <HeroLab id={n} />
      </main>
    </>
  );
}
