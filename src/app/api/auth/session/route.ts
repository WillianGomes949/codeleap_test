import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const username = cookieStore.get('@codeleap:username')?.value;
  
  if (username) {
    return NextResponse.json({ user: { username } });
  }
  
  return NextResponse.json({ user: null });
}