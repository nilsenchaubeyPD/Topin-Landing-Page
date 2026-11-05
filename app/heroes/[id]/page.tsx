import { notFound } from 'next/navigation';
import { HeroLab } from '@/components/heroes/HeroLab';
import { HeroNew } from '@/components/heroes/HeroNew';
import { HeroPill } from '@/components/best/HeroPill';
import { PillNav } from '@/components/sections/PillNav';
import { Nav } from '@/components/sections/Nav';

export const metadata = { title: 'Hero options', robots: { index: false, follow: false } };

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }];
}

export default function Page({ params }: { params: { id: string } }) {
  const n = Number(params.id);
  if (![1, 2, 3, 4, 5, 6, 7].includes(n)) notFound();
  if (n >= 5)
    return (
      <>
        <PillNav />
        <HeroNew id={n as 5 | 6 | 7} />
      </>
    );
  if (n === 4)
    return (
      <>
        <PillNav />
        <HeroPill />
      </>
    );
  return (
    <>
      <Nav />
      <main id="main">
        <HeroLab id={n} />
      </main>
    </>
  );
}
