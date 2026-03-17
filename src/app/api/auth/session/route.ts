import { prisma } from '@/src/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('@codeleap:userId')?.value;
  
  if (!userId) {
    return NextResponse.json({ user: null });
  }

  // Busca no banco. Se o usuário existir no Postgres, o PC e o Celular verão o mesmo dado.
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true }
  });
  
  return NextResponse.json({ user });
}