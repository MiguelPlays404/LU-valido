import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { MediaUploader } from "@/components/MediaUploader";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getYoutubeThumbnail } from "@/lib/youtube";
import { Link2, Trash2, Eye, EyeOff, Heart, Upload } from "lucide-react";

export default function AdminVideos() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [deleteVideo, setDeleteVideo] = useState<any>(null);
  const [zerVideo, setZerVideo] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => { fetchVideos(); }, []);

  const fetchVideos = async () => {
    const { data } = await supabase.from("videos").select("*").order("published_at", { ascending: false });
    setVideos(data || []);
    setLoading(false);
  };

  const handleAddLink = async () => {
    if (!linkUrl.trim()) return;
    const thumbnail = getYoutubeThumbnail(linkUrl);
    const isYoutube = linkUrl.includes("youtube") || linkUrl.includes("youtu.be");
    await supabase.from("videos").insert({
      title: linkTitle || "Novo vídeo",
      video_url: linkUrl,
      video_type: isYoutube ? "youtube" : "link",
      thumbnail_url: thumbnail,
      likes_count: 0, is_active: true, published_at: new Date().toISOString(),
    });
    toast({ title: "✅ Vídeo adicionado!" });
    setLinkUrl(""); setLinkTitle("");
    fetchVideos();
  };

  const handleDelete = async () => {
    if (!deleteVideo) return;
    await supabase.from("video_likes").delete().eq("video_id", deleteVideo.id);
    await supabase.from("videos").delete().eq("id", deleteVideo.id);
    toast({ title: "Vídeo removido" });
    setDeleteVideo(null);
    fetchVideos();
  };

  const handleZerarCurtidas = async () => {
    if (!zerVideo) return;
    await supabase.from("video_likes").delete().eq("video_id", zerVideo.id);
    await supabase.from("videos").update({ likes_count: 0 }).eq("id", zerVideo.id);
    toast({ title: "Curtidas zeradas" });
    setZerVideo(null);
    fetchVideos();
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    await supabase.from("videos").update({ is_active: !current }).eq("id", id);
    fetchVideos();
  };

  return (
    <AdminLayout title="Gerenciar Vídeos">
      <div className="bg-[#18181B] rounded-2xl p-6 border border-white/[0.07] mb-8">
        <h3 className="font-heading font-semibold text-sm mb-4 flex items-center gap-2"><Link2 className="w-4 h-4 text-primary" /> Adicionar via Link</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <input value={linkTitle} onChange={e => setLinkTitle(e.target.value)} placeholder="Título do vídeo" className="bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm text-white" />
          <input value={linkUrl} onChange={e => setLinkUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." className="bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm text-white" />
          <button onClick={handleAddLink} className="btn-primary text-sm">Adicionar</button>
        </div>
        {linkUrl && getYoutubeThumbnail(linkUrl) && (
          <div className="mt-3 flex items-center gap-3">
            <img src={getYoutubeThumbnail(linkUrl)} alt="Preview" className="w-24 h-14 rounded object-cover" />
            <span className="text-xs text-[#71717A]">Preview do vídeo</span>
          </div>
        )}
      </div>

      <div className="bg-[#18181B] rounded-2xl border border-white/[0.07] overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-[#27272A]">
            <th className="text-left p-4 text-[#71717A]">Vídeo</th>
            <th className="text-left p-4 text-[#71717A]">Tipo</th>
            <th className="text-center p-4 text-[#71717A]">Curtidas</th>
            <th className="text-left p-4 text-[#71717A]">Data</th>
            <th className="text-right p-4 text-[#71717A]">Ações</th>
          </tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-[#71717A]">Carregando...</td></tr>
            ) : videos.map(v => (
              <tr key={v.id} className="border-b border-[#27272A] last:border-0">
                <td className="p-4 flex items-center gap-3">
                  {v.thumbnail_url && <img src={v.thumbnail_url} alt="" className="w-16 h-10 rounded object-cover" />}
                  <span className="text-[#ccc]">{v.title}</span>
                </td>
                <td className="p-4 text-[#71717A]">{v.video_type}</td>
                <td className="p-4 text-center text-primary font-bold">{v.likes_count}</td>
                <td className="p-4 text-[#71717A]">{new Date(v.published_at).toLocaleDateString('pt-BR')}</td>
                <td className="p-4 text-right">
                  <div className="flex gap-1 justify-end">
                    <button onClick={() => handleToggleActive(v.id, v.is_active)} className="p-2 rounded hover:bg-white/5">{v.is_active ? <Eye className="w-4 h-4 text-green-400" /> : <EyeOff className="w-4 h-4 text-red-400" />}</button>
                    <button onClick={() => setZerVideo(v)} className="p-2 rounded hover:bg-white/5"><Heart className="w-4 h-4 text-[#71717A]" /></button>
                    <button onClick={() => setDeleteVideo(v)} className="p-2 rounded hover:bg-white/5"><Trash2 className="w-4 h-4 text-red-400" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setDeleteVideo(null)}>
          <div className="bg-[#18181B] rounded-2xl p-6 max-w-sm w-full mx-4 border border-[#3F3F46] text-center" onClick={e => e.stopPropagation()}>
            <p className="text-white mb-4">Excluir "{deleteVideo.title}"?</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeleteVideo(null)} className="px-4 py-2 text-sm text-[#A1A1AA]">Cancelar</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg">Excluir</button>
            </div>
          </div>
        </div>
      )}
      {zerVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setZerVideo(null)}>
          <div className="bg-[#18181B] rounded-2xl p-6 max-w-sm w-full mx-4 border border-[#3F3F46] text-center" onClick={e => e.stopPropagation()}>
            <p className="text-white mb-4">Zerar curtidas de "{zerVideo.title}"?</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setZerVideo(null)} className="px-4 py-2 text-sm text-[#A1A1AA]">Cancelar</button>
              <button onClick={handleZerarCurtidas} className="px-4 py-2 text-sm bg-primary text-black rounded-lg font-bold">Zerar</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
