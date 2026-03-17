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

    // Verifica se o usuário já existe
    let user = await prisma.user.findUnique({
      where: { username: username.trim() },
    });

    // Se não existe, cria um novo
    if (!user) {
      user = await prisma.user.create({
        data: {
          username: username.trim(),
        },
      });
    }

    // Salva no cookie (sessão) - USAR MESMO NOME EM TODOS OS LUGARES
    const cookieStore = await cookies();
    
    // Salvar o ID do usuário (não o username)
    cookieStore.set('@codeleap:userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    // Opcional: salvar username também se precisar
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