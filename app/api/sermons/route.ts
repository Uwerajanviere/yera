import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/firebaseAdmin';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    console.log('GET /api/sermons - Fetching sermons');
    
    const sermonsRef = db.ref('sermons');
    let query = sermonsRef;
    
    // If category is specified, filter by category
    if (category) {
      query = sermonsRef.orderByChild('category').equalTo(category);
    }
    
    const snapshot = await query.once('value');
    
    if (!snapshot.exists()) {
              console.log('GET /api/sermons - No ibiganiro found');
      return NextResponse.json([]);
    }

    const sermonsData = snapshot.val();
    const sermons = Object.keys(sermonsData).map(key => ({
      id: key,
      ...sermonsData[key]
    })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            console.log(`GET /api/sermons - Found ${sermons.length} ibiganiro`);
    return NextResponse.json(sermons);
  } catch (error) {
    console.error('GET /api/sermons - Error:', error);
    return NextResponse.json(
              { error: 'Ntibyashoboye kubona ibiganiro' },
      { status: 500 }
    );
  }
}
