import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { MediaUploader } from "@/components/MediaUploader";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Star, Eye, EyeOff, Pencil, X, Search } from "lucide-react";

const categories = [
  { value: "galeria", label: "Galeria Geral" },
  { value: "hotelzinho", label: "Hotelzinho" },
  { value: "conhecer", label: "Venha Nos Conhecer" },
  { value: "home", label: "Home" },
];

export default function AdminPhotos() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadCategory, setUploadCategory] = useState("galeria");
  const [filterCat, setFilterCat] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editPhoto, setEditPhoto] = useState<any>(null);
  const [deletePhoto, setDeletePhoto] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => { fetchPhotos(); }, []);

  const fetchPhotos = async () => {
    const { data } = await supabase.from("photos").select("*").order("display_order");
    setPhotos(data || []);
    setLoading(false);
  };

  const handleUploaded = async (url: string) => {
    if (!url) return;
    const fileName = url.split("/").pop()?.split(".")[0] || "Foto";
    await supabase.from("photos").insert({ title: fileName, image_url: url, category: uploadCategory });
    toast({ title: "✅ Foto adicionada à galeria!" });
    fetchPhotos();
  };

  const handleDelete = async () => {
    if (!deletePhoto) return;
    const path = deletePhoto.image_url.split("/levillepet-media/")[1];
    if (path) await supabase.storage.from("levillepet-media").remove([path]);
    await supabase.from("photos").delete().eq("id", deletePhoto.id);
    toast({ title: "Foto removida" });
    setDeletePhoto(null);
    fetchPhotos();
  };

  const handleToggleFeatured = async (id: string, current: boolean) => {
    await supabase.from("photos").update({ is_featured: !current }).eq("id", id);
    fetchPhotos();
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    await supabase.from("photos").update({ is_active: !current }).eq("id", id);
    fetchPhotos();
  };

  const handleSaveEdit = async () => {
    if (!editPhoto) return;
    await supabase.from("photos").update({ title: editPhoto.title, category: editPhoto.category, is_featured: editPhoto.is_featured, display_order: editPhoto.display_order }).eq("id", editPhoto.id);
    toast({ title: "✅ Foto atualizada!" });
    setEditPhoto(null);
    fetchPhotos();
  };

  const filtered = photos.filter(p => {
    if (filterCat !== "all" && p.category !== filterCat) return false;
    if (searchTerm && !p.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <AdminLayout title="Gerenciar Fotos">
      {/* Upload com barra de progresso */}
      <div className="bg-[#18181B] rounded-2xl p-6 mb-8 border border-white/[0.07]">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="font-heading font-semibold text-sm">Adicionar foto</h3>
          <select value={uploadCategory} onChange={e => setUploadCategory(e.target.value)} className="bg-[#27272A] border border-[#3F3F46] rounded-lg px-2 py-1 text-xs text-white ml-auto">
            {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <MediaUploader accept="image" pathPrefix={`fotos/${uploadCategory}`} onUploaded={handleUploaded} label="" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm text-white">
          <option value="all">Todas as categorias</option>
          {categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <div className="flex items-center gap-2 bg-[#27272A] border border-[#3F3F46] rounded-lg px-3">
          <Search className="w-4 h-4 text-[#71717A]" />
          <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Buscar..." className="bg-transparent text-sm text-white py-2 outline-none w-40" />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{Array.from({length:8}).map((_,i) => <div key={i} className="aspect-square skeleton rounded-xl" />)}</div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(photo => (
            <div key={photo.id} className="relative group rounded-xl overflow-hidden border border-[#27272A]">
              <img src={photo.image_url} alt={photo.title} className="w-full aspect-square object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => setEditPhoto({...photo})} className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center"><Pencil className="w-4 h-4 text-black" /></button>
                <button onClick={() => handleToggleFeatured(photo.id, photo.is_featured)} className="w-9 h-9 bg-[#27272A] rounded-lg flex items-center justify-center"><Star className={`w-4 h-4 ${photo.is_featured ? "text-primary fill-primary" : "text-white"}`} /></button>
                <button onClick={() => handleToggleActive(photo.id, photo.is_active)} className="w-9 h-9 bg-[#27272A] rounded-lg flex items-center justify-center">{photo.is_active ? <Eye className="w-4 h-4 text-green-400" /> : <EyeOff className="w-4 h-4 text-red-400" />}</button>
                <button onClick={() => setDeletePhoto(photo)} className="w-9 h-9 bg-red-500/20 rounded-lg flex items-center justify-center"><Trash2 className="w-4 h-4 text-red-400" /></button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-2">
                <p className="text-xs text-white truncate">{photo.title}</p>
                <span className="text-[10px] text-primary">{categories.find(c => c.value === photo.category)?.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setEditPhoto(null)}>
          <div className="bg-[#18181B] rounded-2xl p-6 max-w-md w-full mx-4 border border-[#3F3F46]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-4"><h3 className="font-heading font-bold">Editar Foto</h3><button onClick={() => setEditPhoto(null)}><X className="w-5 h-5 text-[#71717A]" /></button></div>
            <div className="space-y-4">
              <div><label className="text-xs text-[#A1A1AA] mb-1 block">Título</label><input value={editPhoto.title} onChange={e => setEditPhoto({...editPhoto, title: e.target.value})} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm text-white" /></div>
              <div><label className="text-xs text-[#A1A1AA] mb-1 block">Categoria</label><select value={editPhoto.category} onChange={e => setEditPhoto({...editPhoto, category: e.target.value})} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm text-white">{categories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
              <div><label className="text-xs text-[#A1A1AA] mb-1 block">Ordem</label><input type="number" value={editPhoto.display_order} onChange={e => setEditPhoto({...editPhoto, display_order: parseInt(e.target.value) || 0})} className="w-full bg-[#27272A] border border-[#3F3F46] rounded-lg px-3 py-2 text-sm text-white" /></div>
              <button onClick={handleSaveEdit} className="btn-primary w-full text-sm">Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deletePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setDeletePhoto(null)}>
          <div className="bg-[#18181B] rounded-2xl p-6 max-w-sm w-full mx-4 border border-[#3F3F46] text-center" onClick={e => e.stopPropagation()}>
            <p className="text-white mb-4">Excluir "{deletePhoto.title}"?</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setDeletePhoto(null)} className="px-4 py-2 text-sm text-[#A1A1AA] hover:text-white">Cancelar</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600">Excluir</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
