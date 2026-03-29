import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { Heart, Play, Video, X } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getYoutubeId } from "@/lib/youtube";

function getDeviceId(): string {
  let id = localStorage.getItem("levillepet_user_id");
  if (!id) { id = crypto.randomUUID(); localStorage.setItem("levillepet_user_id", id); }
  return id;
}

const Videos = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [playerVideo, setPlayerVideo] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data } = await supabase.from("videos").select("*").eq("is_active", true).order("published_at", { ascending: false });
    setVideos(data || []);
    setLoading(false);

    const deviceId = getDeviceId();
    const { data: likes } = await supabase.from("video_likes").select("video_id").eq("device_id", deviceId);
    if (likes) setLikedVideos(new Set(likes.map(l => l.video_id)));
  };

  const toggleLike = async (videoId: string) => {
    const deviceId = getDeviceId();
    const isLiked = likedVideos.has(videoId);
    const newLiked = new Set(likedVideos);

    if (isLiked) {
      newLiked.delete(videoId);
      await supabase.from("video_likes").delete().eq("video_id", videoId).eq("device_id", deviceId);
      await supabase.from("videos").update({ likes_count: Math.max(0, (videos.find(v => v.id === videoId)?.likes_count || 1) - 1) }).eq("id", videoId);
    } else {
      newLiked.add(videoId);
      await supabase.from("video_likes").insert({ video_id: videoId, device_id: deviceId });
      await supabase.from("videos").update({ likes_count: (videos.find(v => v.id === videoId)?.likes_count || 0) + 1 }).eq("id", videoId);
    }
    setLikedVideos(newLiked);
    loadData();
  };

  const getThumbnail = (video: any) => {
    if (video.thumbnail_url) return video.thumbnail_url;
    const ytId = getYoutubeId(video.video_url);
    return ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : '';
  };

  const getEmbedUrl = (url: string) => {
    const ytId = getYoutubeId(url);
    return ytId ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0` : url;
  };

  return (
    <PublicLayout>
      <PageHero badge="🎥 Vídeos" title="Nossos Vídeos" subtitle="Assista e curta nossos melhores momentos" />
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-video skeleton-light rounded-2xl" />)}
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, i) => (
                <AnimateOnScroll key={video.id} delay={i * 0.1}>
                  <div className="group rounded-[20px] overflow-hidden bg-card border border-border/50 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(245,192,0,0.12)] transition-all duration-300">
                    <div className="relative aspect-video cursor-pointer" onClick={() => setPlayerVideo(video)}>
                      <img src={getThumbnail(video)} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-foreground text-base mb-1">{video.title}</h3>
                      <p className="text-text-muted text-xs font-body mb-3">{new Date(video.published_at).toLocaleDateString('pt-BR')}</p>
                      <button onClick={() => toggleLike(video.id)} className="flex items-center gap-2">
                        <Heart className={`w-5 h-5 transition-all ${likedVideos.has(video.id) ? "text-primary fill-primary animate-heart-beat" : "text-text-muted hover:text-primary"}`} />
                        <span className="text-sm font-body text-text-muted">{video.likes_count || 0}</span>
                      </button>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Video className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-text-muted font-body text-lg">Nenhum vídeo ainda.</p>
            </div>
          )}
        </div>
      </section>

      {/* Player Modal */}
      {playerVideo && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={() => setPlayerVideo(null)}>
          <div className="w-full max-w-4xl mx-4" onClick={e => e.stopPropagation()} style={{ animation: 'lightboxOpen 0.3s ease both' }}>
            <button onClick={() => setPlayerVideo(null)} className="absolute top-4 right-4 text-white/70 hover:text-white">
              <X className="w-8 h-8" />
            </button>
            <div className="aspect-video rounded-2xl overflow-hidden">
              <iframe src={getEmbedUrl(playerVideo.video_url)} className="w-full h-full" allowFullScreen allow="autoplay" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <h3 className="text-white font-heading font-semibold text-lg">{playerVideo.title}</h3>
              <button onClick={() => toggleLike(playerVideo.id)} className="flex items-center gap-2">
                <Heart className={`w-5 h-5 ${likedVideos.has(playerVideo.id) ? "text-primary fill-primary" : "text-white/60 hover:text-primary"}`} />
                <span className="text-sm text-white/60">{playerVideo.likes_count || 0}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
};

export default Videos;
