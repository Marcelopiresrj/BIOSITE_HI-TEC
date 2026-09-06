import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Image as ImageIcon, Heart, Eye, ExternalLink, Sparkles, Film, ShieldCheck, Plus, Trash2, Lock, Settings } from 'lucide-react';
import { InstagramPost } from '../types';
import { InstagramIcon, WhatsAppIcon } from './Icons';

interface DesktopInstagramPanelProps {
  posts: InstagramPost[];
  onSelectPost: (post: InstagramPost) => void;
  onOpenAddMedia?: () => void;
  onDeletePost?: (id: string) => void;
  instagramUrl: string;
  isAdmin?: boolean;
  onOpenAdminAuth?: () => void;
  onOpenStoreSettings?: () => void;
}

export const DesktopInstagramPanel: React.FC<DesktopInstagramPanelProps> = ({
  posts,
  onSelectPost,
  onOpenAddMedia,
  onDeletePost,
  instagramUrl,
  isAdmin,
  onOpenAdminAuth,
  onOpenStoreSettings,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'reels', label: 'Vídeos / Reels 🎥' },
    { id: 'smartphones', label: 'Smartphones 📱' },
    { id: 'acessorios', label: 'Acessórios 🎧' },
    { id: 'assistencia', label: 'Assistência 🛠️' },
  ];

  const filteredPosts = posts.filter((post) => {
    if (activeCategory === 'todos') return true;
    if (activeCategory === 'reels') return post.type === 'video';
    return post.category === activeCategory;
  });

  const phone = '5522998706841';

  return (
    <aside
      id="desktop-instagram-panel"
      className="hidden lg:flex flex-col w-full max-w-[580px] bg-[#0B0F17]/40 backdrop-blur-xl rounded-[36px] border border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.8)] p-6 overflow-hidden relative self-stretch transition-colors duration-300"
    >
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Profile */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1E293B] relative z-10 gap-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-black p-1 border-2 border-cyan-500/40 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
            <img src="/logo.svg" alt="Hi-Tech" className="w-full h-auto" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-white font-['Outfit']">hitecheletronicos</span>
              <span className="w-2 h-2 rounded-full bg-[#00F2FE]" />
            </div>
            <p className="text-xs text-slate-400">
              Vídeos, Reels e Novidades oficiais da loja
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAddMedia && (
            <button
              id="desktop-add-media-btn"
              onClick={onOpenAddMedia}
              type="button"
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] hover:brightness-110 text-[#0B0F17] font-bold text-xs flex items-center gap-1 shadow-md shadow-cyan-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Subir Mídia</span>
            </button>
          )}

          {isAdmin && onOpenStoreSettings && (
            <button
              onClick={onOpenStoreSettings}
              type="button"
              title="Editar Dados da Loja"
              className="px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-cyan-300 font-semibold text-xs flex items-center gap-1 border border-cyan-500/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Editar Loja</span>
            </button>
          )}

          <a
            id="desktop-visit-instagram-btn"
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7928CA] to-[#FF0080] hover:brightness-110 text-white font-semibold text-xs flex items-center gap-1 shadow-md shadow-purple-500/25 transition-all whitespace-nowrap"
          >
            <InstagramIcon className="w-3 h-3 fill-white" />
            <span>Perfil</span>
          </a>

          {!isAdmin && onOpenAdminAuth && (
            <button
              onClick={onOpenAdminAuth}
              type="button"
              title="Área do Administrador"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 py-3 overflow-x-auto scrollbar-none relative z-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            type="button"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Interactive Posts with Vertical Scrolling */}
      <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-2 gap-3.5 pt-1 relative z-10 max-h-[760px] scrollbar-thin">
        {filteredPosts.map((post, idx) => {
          const itemWhatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(post.whatsappMessage)}`;

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="bg-[#0B0F17] rounded-2xl border border-white/10 hover:border-cyan-500/40 overflow-hidden shadow-lg transition-all group flex flex-col justify-between"
            >
              {/* Media Thumbnail */}
              <div
                onClick={() => onSelectPost(post)}
                className="relative h-[210px] w-full bg-slate-950 overflow-hidden cursor-pointer"
              >
                <img
                  src={post.thumbnailUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-black/20 to-transparent" />

                {/* Badge */}
                {post.badge && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-[10px] font-bold text-cyan-300">
                    {post.badge}
                  </div>
                )}

                {/* Type Indicator */}
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-white/10 text-[10px] font-semibold text-white flex items-center gap-1">
                  {post.type === 'video' ? (
                    <>
                      <Play className="w-2.5 h-2.5 fill-cyan-400 text-cyan-400" />
                      <span>{post.duration || 'Reels'}</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-2.5 h-2.5 text-emerald-400" />
                      <span>Foto</span>
                    </>
                  )}
                </div>

                {/* Play Button for Video */}
                {post.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-black/60 group-hover:bg-cyan-500 text-white flex items-center justify-center transition-all shadow-xl group-hover:scale-110 border border-white/20">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Bottom stats */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-slate-300 pointer-events-none">
                  <span className="flex items-center gap-1 font-semibold text-white">
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                    {post.likes}
                  </span>
                  {post.views && (
                    <span className="flex items-center gap-1 font-semibold text-cyan-300">
                      <Eye className="w-3 h-3" />
                      {post.views}
                    </span>
                  )}
                </div>
              </div>

              {/* Content Details */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4
                    onClick={() => onSelectPost(post)}
                    className="font-bold text-xs text-white line-clamp-2 leading-snug hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {post.title}
                  </h4>
                  {post.price && (
                    <p className="text-[11px] font-semibold text-emerald-400 mt-1">
                      {post.price}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-2 pt-2 border-t border-white/5 space-y-1.5">
                  <button
                    onClick={() => onSelectPost(post)}
                    type="button"
                    className="w-full py-1.5 px-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 hover:text-white font-semibold text-[11px] flex items-center justify-center gap-1 border border-cyan-500/30 transition-all cursor-pointer"
                  >
                    {post.type === 'video' ? (
                      <>
                        <Play className="w-3 h-3 fill-current" />
                        <span>Assistir Vídeo</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3 h-3" />
                        <span>Ver Foto</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={itemWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Pedir no WhatsApp"
                      className="flex-1 py-1 px-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] font-semibold text-[10px] flex items-center justify-center gap-1 border border-[#25D366]/30 transition-colors"
                    >
                      <WhatsAppIcon className="w-3 h-3 fill-[#25D366]" />
                      <span>Pedir</span>
                    </a>

                    <a
                      href={post.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Abrir no Instagram"
                      className="py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-[10px] flex items-center justify-center gap-1 border border-white/10 transition-colors"
                    >
                      <InstagramIcon className="w-3 h-3 fill-slate-300" />
                      <span>Post</span>
                    </a>

                    {onDeletePost && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Deseja remover "${post.title}"?`)) {
                            onDeletePost(post.id);
                          }
                        }}
                        type="button"
                        title="Remover Post"
                        className="p-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </aside>
  );
};
