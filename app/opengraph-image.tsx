import { ImageResponse } from 'next/og';
import fs from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Topin: Decide Faster. Hire Better.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  const logo = fs.readFileSync(path.join(process.cwd(), 'public/logo-white.svg')).toString('base64');
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0C1638',
          padding: '80px 96px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/svg+xml;base64,${logo}`} width={278} height={53} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em' }}>
          <span style={{ color: '#FFFFFF' }}>Decide Faster.</span>
          <span style={{ color: '#33B5D9' }}>Hire Better.</span>
        </div>
        <div style={{ display: 'flex', color: '#CEEEF3', fontSize: 30 }}>Decision-ready hiring with secure, AI-proctored assessments</div>
      </div>
    ),
    size,
  );
}
