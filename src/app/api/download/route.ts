import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { url, platform } = await req.json();

    if (!url || !platform) {
      return NextResponse.json({ error: 'URL and platform are required' }, { status: 400 });
    }

    const rapidApiKey = process.env.RAPIDAPI_KEY;

    if (!rapidApiKey) {
      return NextResponse.json({ 
        error: 'RAPIDAPI_KEY is missing. Please add your RapidAPI key to the .env.local file to enable real video downloading.' 
      }, { status: 400 });
    }

    // Integration using a popular RapidAPI downloader (e.g. "Social Download All in One")
    // Replace the URL and Host below if you subscribe to a different RapidAPI endpoint.
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com'
      }
    };

    const response = await fetch(`https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink?url=${encodeURIComponent(url)}`, options);
    
    if (!response.ok) {
      throw new Error(`RapidAPI returned ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();

    // Map the typical response format to our frontend interface.
    // Adjust these fields if your specific RapidAPI returns data differently.
    const videoUrl = data.medias?.[0]?.url || data.video?.[0] || data.video_url || data.url;
    const thumbnail = data.thumbnail || data.cover || data.picture;
    const title = data.title || `${platform.charAt(0).toUpperCase() + platform.slice(1)} Video`;

    if (!videoUrl) {
      throw new Error("Could not extract video URL from API response. Please check the API documentation for the correct response format.");
    }

    return NextResponse.json({
      title,
      thumbnail,
      videoUrl,
      audioUrl: data.audio || null,
    });

  } catch (error) {
    console.error('Download API Error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to process video url' }, { status: 500 });
  }
}
