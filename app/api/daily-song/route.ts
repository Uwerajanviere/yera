import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/firebaseAdmin';

export async function POST(request: NextRequest) {
  console.log('POST /api/daily-song - Request received');
  
  try {
    const body = await request.json();
    console.log('POST /api/daily-song - Request body:', body);
    const { title, titleColor, youtubeUrl, createdAt } = body;

    if (!title || !youtubeUrl) {
      console.log('POST /api/daily-song - Missing title or youtubeUrl');
      return NextResponse.json(
        { error: 'Title and YouTube URL are required' },
        { status: 400 }
      );
    }

    console.log('POST /api/daily-song - Adding to Realtime Database');
    const dailySongsRef = db.ref('daily-songs');
    const newDailySongRef = dailySongsRef.push();
    await newDailySongRef.set({
      title,
      titleColor: titleColor || '#000000',
      youtubeUrl,
      createdAt: createdAt || new Date().toISOString(),
    });

    console.log('POST /api/daily-song - Success, doc ID:', newDailySongRef.key);
    return NextResponse.json(
      { id: newDailySongRef.key, message: 'Daily song uploaded successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/daily-song - Error:', error);
    return NextResponse.json(
      { error: 'Failed to upload daily song', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log('GET /api/daily-song - Request received');
  
  try {
    console.log('GET /api/daily-song - Querying Realtime Database');
    const dailySongsRef = db.ref('daily-songs');
    const snapshot = await dailySongsRef.orderByChild('createdAt').limitToLast(1).once('value');
    
    console.log('GET /api/daily-song - Query result empty:', !snapshot.exists());
    
    if (!snapshot.exists()) {
      console.log('GET /api/daily-song - No daily songs found');
      return NextResponse.json(null);
    }

    const dailySongs = snapshot.val();
    const latestKey = Object.keys(dailySongs)[0];
    const dailySong = {
      id: latestKey,
      ...dailySongs[latestKey]
    };

    console.log('GET /api/daily-song - Returning daily song:', dailySong.id);
    return NextResponse.json(dailySong);
  } catch (error) {
    console.error('GET /api/daily-song - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily song' },
      { status: 500 }
    );
  }
}
