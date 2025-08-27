// This file is for frontend (client SDK) usage only. Do not import in API routes or backend code.
import { YouTubeLink, YouTubeLinkCategory } from './types';

export async function getYouTubeLinksByCategory(category: YouTubeLinkCategory): Promise<YouTubeLink[]> {
  try {
    const response = await fetch(`/api/sermons?category=${encodeURIComponent(category)}`);
    if (!response.ok) {
      throw new Error('Ntibyashoboye kubona ibiganiro');
    }
    
    const sermons = await response.json();
    return sermons.map((sermon: any) => ({
      id: sermon.id,
      url: sermon.url,
      title: sermon.title,
      category: sermon.category,
      addedBy: sermon.addedBy,
      createdAt: new Date(sermon.createdAt),
    } as YouTubeLink));
  } catch (error) {
    console.error('Error fetching YouTube links:', error);
    return [];
  }
}

export async function addYouTubeLink(link: Omit<YouTubeLink, 'id' | 'createdAt'> & { createdAt?: Date }) {
  try {
    const response = await fetch('/api/add-sermon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: link.url,
        title: link.title,
        category: link.category,
        addedBy: link.addedBy || 'anonymous',
      }),
    });
    
    if (!response.ok) {
      throw new Error('Ntibyashoboye kongeramo ibiganiro');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding YouTube link:', error);
    throw error; // Re-throw the error to be caught by the calling code
  }
} 