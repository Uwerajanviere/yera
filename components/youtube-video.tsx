import { YouTubeLink } from '@/lib/types';

interface YouTubeVideoProps {
  video: YouTubeLink;
}

export function YouTubeVideo({ video }: YouTubeVideoProps) {
  // Extract video ID from YouTube URL
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(video.url);
  if (!videoId) return null;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      <div className="p-2 md:p-3">
        <h3 className="text-xs md:text-sm font-semibold text-foreground line-clamp-2 leading-tight">{video.title}</h3>
        {video.category && (
          <p className="text-xs text-muted-foreground mt-1">{video.category}</p>
        )}
      </div>
    </div>
  );
} 