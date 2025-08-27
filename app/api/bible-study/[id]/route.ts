import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/firebaseAdmin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('GET /api/bible-study/[id] - Fetching bible study:', params.id);
    
    const bibleStudyRef = db.ref(`bible-studies/${params.id}`);
    const snapshot = await bibleStudyRef.once('value');
    
    if (!snapshot.exists()) {
      console.log('GET /api/bible-study/[id] - Bible study not found');
      return NextResponse.json(
        { error: 'Bible study not found' },
        { status: 404 }
      );
    }

    const bibleStudy = {
      id: params.id,
      ...snapshot.val()
    };

    console.log('GET /api/bible-study/[id] - Bible study found');
    return NextResponse.json(bibleStudy);
  } catch (error) {
    console.error('GET /api/bible-study/[id] - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bible study' },
      { status: 500 }
    );
  }
}
