import { prisma } from '@/src/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    if (!username || username.trim() === '') {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const trimmedUsername = username.trim();

    // Procura usuário
    let user = await prisma.user.findUnique({
      where: { username: trimmedUsername },
    });

    // Se NÃO existe → cria agora
    if (!user) {
      user = await prisma.user.create({
        data: { username: trimmedUsername },
      });
    }

    // Se EXISTE (ou acabou de criar) → entra na mesma conta
    const cookieStore = await cookies();
    cookieStore.set('@codeleap:userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set('@codeleap:username', user.username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ 
      user: { 
        id: user.id,
        username: user.username 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}