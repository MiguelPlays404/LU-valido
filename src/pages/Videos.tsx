import { PublicLayout } from "@/components/PublicLayout";
import { PageHero } from "@/components/PageHero";
import { AnimateOnScroll } from "@/components/AnimateOnScroll";
import { Heart, Play, Video } from "lucide-react";
import { useState, useEffect } from "react";

// Generate or retrieve device UUID
function getDeviceId(): string {
  let id = localStorage.getItem("levillepet_user_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("levillepet_user_id", id);
  }
  return id;
}

const placeholderVideos = [
  { id: "1", title: "Dia de banho no Le Ville Pet", thumbnail: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=480&h=270&fit=crop", date: "25/03/2026", likes: 47 },
  { id: "2", title: "Brincadeiras no hotelzinho", thumbnail: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=480&h=270&fit=crop", date: "20/03/2026", likes: 32 },
  { id: "3", title: "Gatinhos relaxando", thumbnail: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=480&h=270&fit=crop", date: "15/03/2026", likes: 28 },
];

const Videos = () => {
  const [likedVideos, setLikedVideos] = useState<Set<string>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const stored = localStorage.getItem("levillepet_liked_videos");
    if (stored) setLikedVideos(new Set(JSON.parse(stored)));
    const counts: Record<string, number> = {};
    placeholderVideos.forEach((v) => (counts[v.id] = v.likes));
    setLikeCounts(counts);
  }, []);

  const toggleLike = (videoId: string) => {
    const newLiked = new Set(likedVideos);
    const newCounts = { ...likeCounts };
    if (newLiked.has(videoId)) {
      newLiked.delete(videoId);
      newCounts[videoId] = (newCounts[videoId] || 1) - 1;
    } else {
      newLiked.add(videoId);
      newCounts[videoId] = (newCounts[videoId] || 0) + 1;
    }
    setLikedVideos(newLiked);
    setLikeCounts(newCounts);
    localStorage.setItem("levillepet_liked_videos", JSON.stringify([...newLiked]));
  };

  return (
    <PublicLayout>
      <PageHero
        badge="🎥 Vídeos"
        title="Nossos Vídeos"
        subtitle="Assista e curta nossos vídeos"
      />

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {placeholderVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {placeholderVideos.map((video, i) => (
                <AnimateOnScroll key={video.id} delay={i * 0.1}>
                  <div className="group rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                    <div className="relative aspect-video cursor-pointer">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-primary/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-foreground text-base mb-1">{video.title}</h3>
                      <p className="text-text-muted text-xs font-body mb-3">{video.date}</p>
                      <button
                        onClick={() => toggleLike(video.id)}
                        className="flex items-center gap-2 group/like"
                      >
                        <Heart
                          className={`w-5 h-5 transition-all ${
                            likedVideos.has(video.id)
                              ? "text-primary fill-primary animate-heart-beat"
                              : "text-text-muted hover:text-primary"
                          }`}
                        />
                        <span className="text-sm font-body text-text-muted">
                          {likeCounts[video.id] || 0}
                        </span>
                      </button>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Video className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-text-muted font-body text-lg">
                Nenhum vídeo ainda. Os primeiros vídeos aparecem aqui em breve!
              </p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
};

export default Videos;
