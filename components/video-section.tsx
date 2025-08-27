"use client";

import { useState, useEffect } from "react";
import { YouTubeVideo } from "./youtube-video";

interface VideoSectionProps {
  limit?: number;
}

export function VideoSection({ limit }: VideoSectionProps) {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    async function fetchVideos() {
      try {
        const response = await fetch('/api/sermons');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        
        const fetchedVideos = await response.json();
        // Apply limit in the component if needed
        const limitedVideos = limit ? fetchedVideos.slice(0, limit) : fetchedVideos;
        setVideos(limitedVideos);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError("Failed to load videos");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, [limit, isMounted]);

  // Always render the same structure to prevent hydration mismatch
  return (
    <div className="space-y-4">
      {!isMounted || isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-muted/50 rounded-lg h-40 md:h-48"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-destructive/20 rounded-xl p-4 text-destructive-foreground text-center">
          {error}
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {videos.map((video) => (
            <YouTubeVideo key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="bg-muted/50 rounded-xl p-4 text-muted-foreground text-center">
          No videos available
        </div>
      )}
    </div>
  );
} 