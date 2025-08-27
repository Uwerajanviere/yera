import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/firebaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, imageUrl, content, createdAt } = body;

    if (!title || !imageUrl || !content) {
      return NextResponse.json(
        { error: 'Title, image URL, and content are required' },
        { status: 400 }
      );
    }

    const bibleStudiesRef = db.ref('bible-studies');
    const newBibleStudyRef = bibleStudiesRef.push();
    await newBibleStudyRef.set({
      title,
      imageUrl,
      content,
      createdAt: createdAt || new Date().toISOString(),
    });

    return NextResponse.json(
      { id: newBibleStudyRef.key, message: 'Bible study uploaded successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading bible study:', error);
    return NextResponse.json(
      { error: 'Failed to upload bible study' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bibleStudiesRef = db.ref('bible-studies');
    const snapshot = await bibleStudiesRef.orderByChild('createdAt').once('value');
    
    if (!snapshot.exists()) {
      return NextResponse.json([]);
    }

    const bibleStudiesData = snapshot.val();
    const bibleStudies = Object.keys(bibleStudiesData).map(key => ({
      id: key,
      ...bibleStudiesData[key]
    })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(bibleStudies);
  } catch (error) {
    console.error('Error fetching bible studies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bible studies' },
      { status: 500 }
    );
  }
}
