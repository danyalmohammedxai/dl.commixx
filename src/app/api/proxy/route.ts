import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from proxy: ${response.statusText}`);
    }

    const headers = new Headers(response.headers);
    // Remove headers that might cause issues or expose sensitive information
    headers.delete('content-encoding'); 
    
    return new NextResponse(response.body, {
      status: response.status,
      headers
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to proxy request', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
