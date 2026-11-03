import fs from 'node:fs';
import path from 'node:path';

// Photo slots render a gradient placeholder until the file is dropped into /public/images.
const imagesDir = path.join(process.cwd(), 'public/images');
const available = fs.existsSync(imagesDir)
  ? fs.readdirSync(imagesDir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
  : [];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  env: { NEXT_PUBLIC_AVAILABLE_IMAGES: available.join(',') },
};
export default nextConfig;
