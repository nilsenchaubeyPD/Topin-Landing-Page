import { Reveal, RevealItem } from '@/components/ui/Reveal';

const cards = [
  {
    title: 'Face detection',
    body: 'Camera checks confirm the same person takes the whole test.',
    ui: (
      <ul className="space-y-2.5 text-[13px]">
        {[
          ['Face in frame', 'Verified'],
          ['One person only', 'Verified'],
          ['Camera stayed on', 'Verified'],
        ].map(([k, v]) => (
          <li key={k} className="flex items-center justify-between rounded-[10px] bg-white px-3 py-2.5">
            <span className="text-navy-2">{k}</span>
            <span className="font-semibold text-green">{v}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: 'Screen and tab activity',
    body: 'Screen recording and activity monitoring show what happened, not just the score.',
    ui: (
      <ul className="space-y-2.5 text-[13px]">
        {[
          ['Screen recording', 'On'],
          ['Tab switches', 'Logged'],
          ['Secure browser', 'Locked'],
        ].map(([k, v]) => (
          <li key={k} className="flex items-center justify-between rounded-[10px] bg-white px-3 py-2.5">
            <span className="text-navy-2">{k}</span>
            <span className="font-semibold text-navy">{v}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: 'Plagiarism detection',
    body: 'Answers are checked against each other and known sources before they reach your shortlist.',
    ui: (
      <div className="rounded-[10px] bg-white p-3 text-[13px]">
        <div className="flex items-center justify-between">
          <span className="text-navy-2">Match check</span>
          <span className="font-semibold text-green">Original</span>
        </div>
        <span className="mt-3 block h-1.5 rounded-pill bg-stone">
          <span className="block h-full w-[12%] rounded-pill bg-blue" />
        </span>
        <p className="mt-2 text-[12px] text-navy-2">Sample view</p>
      </div>
    ),
  },
];

/** Integrity block: each card is a small working-looking panel for one real proctoring feature (all listed in the FAQ). */
export function TrustBlock() {
  return (
    <section aria-labelledby="trust-title" className="section-y bg-snow">
      <div className="wrap">
        <h2 id="trust-title" className="max-w-[640px] text-h2-m md:text-h2">
          A score is only useful <span className="text-blue">if it&apos;s real.</span>
        </h2>
        <p className="mt-5 max-w-[520px] text-[18px] leading-[28px] text-navy-2">
          These checks run on every assessment, so you can trust who you shortlist.
        </p>
        <Reveal staggerChildren as="ul" className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <RevealItem as="li" key={c.title} className="flex flex-col rounded-[24px] bg-white p-3 shadow-[0_0_0_1px_rgba(12,22,56,.08)]">
              <div aria-hidden="true" className="flex min-h-[188px] flex-col justify-center rounded-[16px] bg-[#eef4f8] p-5">
                {c.ui}
              </div>
              <div className="px-3 pb-4 pt-5">
                <h3 className="text-[20px] leading-[28px]">{c.title}</h3>
                <p className="mt-1.5 text-[15px] leading-[24px] text-navy-2">{c.body}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
