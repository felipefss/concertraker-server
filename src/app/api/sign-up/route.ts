import { adminAuthClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const validatedData = requestSchema.safeParse(payload);

  if (!validatedData.success) {
    return new NextResponse(validatedData.error.message, { status: 400 });
  }

  const { email, name, password } = validatedData.data;

  const { error } = await adminAuthClient.createUser({
    email,
    password,
    user_metadata: { name },
  });

  if (error) {
    console.error(error.message);
    return NextResponse.json({ error: { message: 'Invalid user/password' } }, { status: 400 });
  }

  return NextResponse.json({}, { status: 201 });
}
