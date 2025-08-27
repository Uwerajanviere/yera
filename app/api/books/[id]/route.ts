import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/firebaseAdmin';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('GET /api/books/[id] - Fetching book:', params.id);
    
    const bookRef = db.ref(`books/${params.id}`);
    const snapshot = await bookRef.once('value');
    
    if (!snapshot.exists()) {
      console.log('GET /api/books/[id] - Book not found');
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    const book = {
      id: params.id,
      ...snapshot.val()
    };

    console.log('GET /api/books/[id] - Book found');
    return NextResponse.json(book);
  } catch (error) {
    console.error('GET /api/books/[id] - Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch book' },
      { status: 500 }
    );
  }
}
