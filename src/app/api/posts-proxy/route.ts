import { NextResponse } from 'next/server';

const API_URL = 'https://dev.codeleap.co.uk/careers';

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}