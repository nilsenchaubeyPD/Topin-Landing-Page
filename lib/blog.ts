/**
 * Blog posts come straight from Topin's WordPress (blog.topin.tech) through its public REST API,
 * so anything published there shows up here within the hour. The post HTML is cleaned of the
 * WordPress layout (inline styles, column wrappers, the built-in contents box) and restyled with .blog-prose.
 */
const API = 'https://blog.topin.tech/wp-json/wp/v2/posts?per_page=100&_embed=1';
export const REVALIDATE = 3600;

export type Heading = { id: string; text: string };
export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string | null;
  imageAlt: string;
  html: string;
  headings: Heading[];
  minutes: number;
};

type WpPost = {
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: { 'wp:featuredmedia'?: { source_url?: string; alt_text?: string }[] };
};

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“' };
export function decode(s: string) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}
const text = (html: string) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function clean(raw: string) {
  // the article body starts at the first real paragraph or heading; everything before it is the WordPress contents box
  const start = raw.search(/<(p|h2|h3) class="wp-block-(paragraph|heading)/);
  let h = start > 0 ? raw.slice(start) : raw;
  h = h
    .replace(/<(script|style|svg|iframe)[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/?div[^>]*>/gi, '')
    .replace(/\s(style|class|data-[\w-]+|on\w+)="[^"]*"/gi, '')
    .replace(/<p>\s*(&nbsp;)?\s*<\/p>/gi, '')
    .replace(/href="https?:\/\/(www\.)?topin\.tech\/blog\//gi, 'href="/blog/')
    .replace(/<a /gi, '<a rel="noopener" ');
  // give every h2 an id so the contents list can link to it
  const headings: Heading[] = [];
  const used = new Set<string>();
  h = h.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_m, attrs: string, inner: string) => {
    const t = text(inner);
    let id = (attrs.match(/id="([^"]+)"/) || [])[1] || slugify(t);
    while (used.has(id)) id += '-2';
    used.add(id);
    headings.push({ id, text: t });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: h, headings, words: text(h).split(' ').length };
}

// WordPress's own excerpt is often the contents list, so use the first real paragraph instead
function excerptOf(html: string) {
  const paras = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => text(m[1])).filter((t) => t.length > 60);
  const t = paras[0] || '';
  return t.length > 220 ? `${t.slice(0, 217).replace(/\s+\S*$/, '')}…` : t;
}

function toPost(p: WpPost): Post {
  const media = p._embedded?.['wp:featuredmedia']?.[0];
  const { html, headings, words } = clean(p.content.rendered);
  return {
    slug: p.slug,
    title: text(p.title.rendered),
    date: p.date,
    excerpt: excerptOf(html) || text(p.excerpt.rendered),
    image: media?.source_url ?? null,
    imageAlt: media?.alt_text || text(p.title.rendered),
    html,
    headings,
    minutes: Math.max(1, Math.round(words / 220)),
  };
}

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(API, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return [];
    const data = (await res.json()) as WpPost[];
    return data.map(toPost);
  } catch {
    return [];
  }
}

export async function getPost(slug: string) {
  const posts = await getPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  const more = posts.filter((_, k) => k !== i).slice(0, 3);
  return { post: posts[i], more };
}

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
