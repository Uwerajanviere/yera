import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/firebaseAdmin';

export async function POST(request: NextRequest) {
  console.log('POST /api/daily-word - Request received');
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? 'SET' : 'NOT SET',
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? 'SET' : 'NOT SET',
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? 'SET' : 'NOT SET',
  });
  
  try {
    const body = await request.json();
    console.log('POST /api/daily-word - Request body:', body);
    const { title, titleColor, content, createdAt } = body;

    if (!title || !content) {
      console.log('POST /api/daily-word - Missing title or content');
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    console.log('POST /api/daily-word - Adding to Realtime Database');
    const dailyWordsRef = db.ref('daily-words');
    const newDailyWordRef = dailyWordsRef.push();
    await newDailyWordRef.set({
      title,
      titleColor: titleColor || '#000000',
      content,
      createdAt: createdAt || new Date().toISOString(),
    });

    console.log('POST /api/daily-word - Success, doc ID:', newDailyWordRef.key);
    return NextResponse.json(
      { id: newDailyWordRef.key, message: 'Daily word uploaded successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST /api/daily-word - Error:', error);
    return NextResponse.json(
      { error: 'Failed to upload daily word', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log('GET /api/daily-word - Request received');
  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: process.env.VERCEL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ? 'SET' : 'NOT SET',
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ? 'SET' : 'NOT SET',
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ? 'SET' : 'NOT SET',
  });
  
  try {
    console.log('GET /api/daily-word - Querying Realtime Database');
    const dailyWordsRef = db.ref('daily-words');
    const snapshot = await dailyWordsRef.orderByChild('createdAt').limitToLast(1).once('value');
    
    console.log('GET /api/daily-word - Query result empty:', !snapshot.exists());
    
    if (!snapshot.exists()) {
      console.log('GET /api/daily-word - No daily words found');
      return NextResponse.json(null);
    }

    const dailyWords = snapshot.val();
    const latestKey = Object.keys(dailyWords)[0];
    const dailyWord = {
      id: latestKey,
      ...dailyWords[latestKey]
    };

    console.log('GET /api/daily-word - Returning daily word:', dailyWord.id);
    return NextResponse.json(dailyWord);
  } catch (error) {
    console.error('GET /api/daily-word - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily word' },
      { status: 500 }
    );
  }
}
