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

    const booksRef = db.ref('books');
    const newBookRef = booksRef.push();
    await newBookRef.set({
      title,
      imageUrl,
      content,
      createdAt: createdAt || new Date().toISOString(),
    });

    return NextResponse.json(
      { id: newBookRef.key, message: 'Book uploaded successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading book:', error);
    return NextResponse.json(
      { error: 'Failed to upload book' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const booksRef = db.ref('books');
    const snapshot = await booksRef.orderByChild('createdAt').once('value');
    
    if (!snapshot.exists()) {
      return NextResponse.json([]);
    }

    const booksData = snapshot.val();
    const books = Object.keys(booksData).map(key => ({
      id: key,
      ...booksData[key]
    })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}
