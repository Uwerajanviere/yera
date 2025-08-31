"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Music } from "lucide-react";

interface DailySong {
  id: string;
  title: string;
  youtubeUrl: string;
  createdAt: string;
}

export function DailySongSection() {
  const [dailySong, setDailySong] = useState<DailySong | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDailySong();
  }, []);

  const fetchDailySong = async () => {
    try {
      const response = await fetch('/api/daily-song');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch daily song: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setDailySong(data);
    } catch (err) {
      console.error('Error fetching daily song:', err);
      setError(err instanceof Error ? err.message : 'Failed to load daily song');
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Music className="h-4 w-4" />
            Indirimbo y'Umunsi
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !dailySong) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Music className="h-4 w-4" />
            Indirimbo y'Umunsi
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-center py-6 text-gray-500 text-sm">
            Nta ndirimbo y'umunsi ihari ubu.
          </div>
        </CardContent>
      </Card>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(dailySong.youtubeUrl);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Music className="h-4 w-4" />
          Indirimbo y'Umunsi
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <h3 
          className="text-sm font-semibold line-clamp-2"
          style={{ color: dailySong.titleColor || '#000000' }}
        >
          {dailySong.title}
        </h3>
        
        {embedUrl ? (
          <div className="relative w-full" style={{ paddingBottom: '45%' }}>
            <iframe
              src={embedUrl}
              title={dailySong.title}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg p-3 text-center text-gray-500 text-sm">
            YouTube video could not be loaded
          </div>
        )}
        
        <p className="text-xs text-gray-500 text-center">
          {new Date(dailySong.createdAt).toLocaleDateString('rw-RW', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </p>
      </CardContent>
    </Card>
  );
}
