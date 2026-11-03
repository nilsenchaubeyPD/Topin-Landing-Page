import { NextResponse } from 'next/server';
import { startSchema } from '@/components/start/schema';

// Stub until the backend is provided: validates, logs and returns 200.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = startSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  console.log('[api/start]', { ...parsed.data, attribution: body?.attribution, variant: body?.variant });
  return NextResponse.json({ ok: true });
}
