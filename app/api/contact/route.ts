import { NextResponse } from 'next/server';
import { contactSchema } from '@/components/contact/schema';

// Stub until the backend or inbox is provided: validates, logs and returns 200. Nothing is emailed yet.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  console.log('[api/contact]', parsed.data);
  return NextResponse.json({ ok: true });
}
