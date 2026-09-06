import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Video, Image as ImageIcon, Sparkles, AlertCircle, Play } from 'lucide-react';
import { InstagramPost } from '../types';
import { INSTAGRAM_URL } from '../data/instagramPosts';

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (post: InstagramPost) => void;
  onShowToast: (msg: string) => void;
}

export const AddMediaModal: React.FC<AddMediaModalProps> = ({
  isOpen,
  onClose,
  onAddPost,
  onShowToast,
}) => {
  const [mediaType, setMediaType] = useState<'video' | 'photo'>('video');
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [fileUrl, setFileUrl] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<'reels' | 'smartphones' | 'acessorios' | 'assistencia'>('reels');
  const [price, setPrice] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [badge, setBadge] = useState<string>('🔥 Novo');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    setError(null);
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isVideo && !isImage) {
      setError('Por favor selecione um arquivo de vídeo (MP4, WebM) ou imagem (JPG, PNG).');
      return;
    }

    const detectedType = isVideo ? 'video' : 'photo';
    setMediaType(detectedType);
    if (isVideo) {
      setCategory('reels');
    }

    const objectUrl = URL.createObjectURL(file);
    setFileUrl(objectUrl);

    // If image, set both media and thumbnail
    if (isImage) {
      setThumbnailUrl(objectUrl);
    } else {
      // For video thumbnail fallback
      setThumbnailUrl('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Por favor, informe o título da postagem.');
      return;
    }
    if (!fileUrl.trim()) {
      setError('Por favor, envie um arquivo de vídeo/foto ou informe uma URL válida.');
      return;
    }

    const categoryLabels = {
      reels: 'Reels / Vídeo',
      smartphones: 'Smartphones 📱',
      acessorios: 'Acessórios 🎧',
      assistencia: 'Assistência 🛠️',
    };

    const newPost: InstagramPost = {
      id: `post-${Date.now()}`,
      type: mediaType,
      title: title.trim(),
      category,
      categoryLabel: categoryLabels[category],
      mediaUrl: fileUrl.trim(),
      thumbnailUrl: thumbnailUrl.trim() || fileUrl.trim(),
      likes: '1',
      views: mediaType === 'video' ? '1 visualização' : undefined,
      duration: mediaType === 'video' ? '0:15' : undefined,
      caption: caption.trim() || `Confira essa novidade na Hi-Tech Eletrônicos!`,
      badge: badge.trim() || undefined,
      price: price.trim() || undefined,
      instagramUrl: INSTAGRAM_URL,
      whatsappMessage: `Olá Hi-Tech! Vi a publicação "${title.trim()}" no BioSite e gostaria de mais informações!`,
    };

    onAddPost(newPost);
    onShowToast(`${mediaType === 'video' ? 'Vídeo' : 'Foto'} adicionado com sucesso!`);
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        id="add-media-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="add-media-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-[#0F172A] border border-[#1E293B] rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 text-slate-100 max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-white font-['Outfit']">
                  Adicionar Vídeo ou Foto
                </h3>
                <p className="text-xs text-slate-400">
                  Faça upload do seu arquivo para exibir no carrossel
                </p>
              </div>
            </div>

            <button
              id="close-add-media-btn"
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mt-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            {/* Media Type Toggle */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMediaType('video')}
                className={`flex-1 py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                  mediaType === 'video'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 border-white/5'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Vídeo / Reels</span>
              </button>
              <button
                type="button"
                onClick={() => setMediaType('photo')}
                className={`flex-1 py-2 px-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                  mediaType === 'photo'
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-600/20 text-purple-300 border-purple-500/40 shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-slate-400 border-white/5'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Foto do Produto</span>
              </button>
            </div>

            {/* Upload Mode: File vs URL */}
            <div className="flex items-center justify-between text-xs px-1">
              <span className="text-slate-400">Origem da mídia:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setUploadMode('file')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                    uploadMode === 'file'
                      ? 'bg-white/15 text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Upload do Arquivo
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                    uploadMode === 'url'
                      ? 'bg-white/15 text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  Link / URL
                </button>
              </div>
            </div>

            {/* Drop Zone or URL Input */}
            {uploadMode === 'file' ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*,image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-cyan-400 bg-cyan-500/10'
                      : fileUrl
                      ? 'border-emerald-500/40 bg-emerald-500/5'
                      : 'border-white/10 hover:border-white/20 bg-white/5'
                  }`}
                >
                  {fileUrl ? (
                    <div className="space-y-2">
                      <div className="w-full max-h-40 rounded-xl overflow-hidden bg-black/40 flex items-center justify-center">
                        {mediaType === 'video' ? (
                          <video
                            src={fileUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="max-h-36 object-contain"
                          />
                        ) : (
                          <img
                            src={fileUrl}
                            alt="Preview"
                            className="max-h-36 object-contain"
                          />
                        )}
                      </div>
                      <p className="text-xs text-emerald-400 font-semibold">
                        ✓ Arquivo carregado! Clique para trocar
                      </p>
                    </div>
                  ) : (
                    <div className="py-4 space-y-2">
                      <div className="w-10 h-10 mx-auto rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-semibold text-white">
                        Arraste e solte seu vídeo ou foto aqui
                      </p>
                      <p className="text-[11px] text-slate-400">
                        ou clique para selecionar do seu aparelho
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-xs text-slate-300 font-semibold block">
                  URL da Mídia (Vídeo MP4 ou Imagem JPG/PNG)
                </label>
                <input
                  type="url"
                  placeholder="https://exemplo.com/meu-video.mp4"
                  value={fileUrl}
                  onChange={(e) => {
                    setFileUrl(e.target.value);
                    if (mediaType === 'photo') setThumbnailUrl(e.target.value);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}

            {/* Post Title */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold block">
                Título do Produto ou Post *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: iPhone 16 Pro Max Titânio ou Capinhas Novas"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Category & Badge */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold block">
                  Categoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0B0F17] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="reels">Vídeos / Reels</option>
                  <option value="smartphones">Smartphones</option>
                  <option value="acessorios">Acessórios</option>
                  <option value="assistencia">Assistência</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-300 font-semibold block">
                  Etiqueta / Badge
                </label>
                <input
                  type="text"
                  placeholder="Ex: 🔥 Lançamento ou 12x"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Price / Offer */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold block">
                Preço ou Condição Especial (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ex: R$ 4.990 ou Em até 12x no Cartão"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Caption */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold block">
                Legenda / Descrição
              </label>
              <textarea
                rows={2}
                placeholder="Descreva o produto, benefícios, garantia e pronta entrega..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#1E293B]">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                id="submit-new-media-btn"
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F17] font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-[#0B0F17]" />
                <span>Salvar Post</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
