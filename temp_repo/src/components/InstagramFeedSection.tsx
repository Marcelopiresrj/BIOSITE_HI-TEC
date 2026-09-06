import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Image as ImageIcon, ChevronLeft, ChevronRight, ExternalLink, Sparkles, Heart, Eye, ArrowRight, Plus, Trash2 } from 'lucide-react';
import { InstagramPost } from '../types';
import { InstagramIcon, WhatsAppIcon } from './Icons';

interface InstagramFeedSectionProps {
  posts: InstagramPost[];
  onSelectPost: (post: InstagramPost) => void;
  onOpenAddMedia?: () => void;
  onDeletePost?: (id: string) => void;
  instagramUrl: string;
}

export const InstagramFeedSection: React.FC<InstagramFeedSectionProps> = ({
  posts,
  onSelectPost,
  onOpenAddMedia,
  onDeletePost,
  instagramUrl,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

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

  const checkScrollability = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 280;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkScrollability, 300);
  };

  const phone = '5522998706841';

  return (
    <section id="instagram-interactive-section" className="w-full my-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 px-1 gap-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-tr from-[#7928CA] to-[#FF0080] text-white shadow-md shadow-purple-500/20">
            <InstagramIcon className="w-4 h-4 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-sm sm:text-base text-white font-['Outfit']">
                Destaques do Instagram
              </h2>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                Interativo
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Vídeos, unboxings e novidades da loja
            </p>
          </div>
        </div>

        {/* Action button & Scroll Controls */}
        <div className="flex items-center gap-1.5">
          {onOpenAddMedia && (
            <button
              id="open-add-media-mobile-btn"
              onClick={onOpenAddMedia}
              type="button"
              className="px-2 sm:px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F17] font-bold text-[11px] flex items-center gap-1 shadow-sm shadow-cyan-500/20 hover:brightness-110 transition-all cursor-pointer whitespace-nowrap"
              title="Adicionar Novo Vídeo ou Foto"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span className="hidden xs:inline">Subir Mídia</span>
              <span className="xs:hidden">Postar</span>
            </button>
          )}

          <div className="flex items-center gap-1">
            <button
              id="scroll-instagram-left-btn"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              type="button"
              className={`p-1.5 rounded-lg border border-white/10 transition-colors ${
                canScrollLeft
                  ? 'bg-white/10 text-white hover:bg-white/20 cursor-pointer'
                  : 'bg-white/5 text-slate-600 cursor-not-allowed'
              }`}
              aria-label="Rolar para a esquerda"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="scroll-instagram-right-btn"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              type="button"
              className={`p-1.5 rounded-lg border border-white/10 transition-colors ${
                canScrollRight
                  ? 'bg-white/10 text-cyan-300 hover:bg-white/20 cursor-pointer shadow-sm shadow-cyan-500/20'
                  : 'bg-white/5 text-slate-600 cursor-not-allowed'
              }`}
              aria-label="Rolar para a direita"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter categories pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              if (scrollRef.current) scrollRef.current.scrollLeft = 0;
            }}
            className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-[11px] font-semibold cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Horizontal Scrollable Carousel ("rolar do lado direito") */}
      <div
        ref={scrollRef}
        onScroll={checkScrollability}
        className="flex gap-3 overflow-x-auto pt-1 pb-3 scroll-smooth snap-x snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredPosts.map((post, idx) => {
          const itemWhatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(post.whatsappMessage)}`;

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative w-[210px] sm:w-[230px] flex-shrink-0 bg-[#0B0F17] rounded-2xl border border-white/10 hover:border-cyan-500/40 overflow-hidden shadow-lg transition-all group snap-start flex flex-col justify-between"
            >
              {/* Media Thumbnail Container */}
              <div
                onClick={() => onSelectPost(post)}
                className="relative h-[220px] w-full bg-slate-950 overflow-hidden cursor-pointer"
              >
                <img
                  src={post.thumbnailUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-black/20 to-transparent" />

                {/* Badge (Top-Left) */}
                {post.badge && (
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-white/10 text-[10px] font-bold text-cyan-300 shadow">
                    {post.badge}
                  </div>
                )}

                {/* Video / Photo Indicator (Top-Right) */}
                <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-white/10 text-[10px] font-semibold text-white flex items-center gap-1">
                  {post.type === 'video' ? (
                    <>
                      <Play className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                      <span>{post.duration || 'Reels'}</span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3 h-3 text-emerald-400" />
                      <span>Foto</span>
                    </>
                  )}
                </div>

                {/* Central Play button for Videos */}
                {post.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-black/60 group-hover:bg-cyan-500/90 text-white flex items-center justify-center transition-all shadow-xl group-hover:scale-110 border border-white/20">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Bottom stats pill on thumbnail */}
                <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-slate-300 pointer-events-none">
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

              {/* Card Body */}
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => onSelectPost(post)}
                    className="font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {post.title}
                  </h3>

                  {post.price && (
                    <p className="text-[11px] font-semibold text-emerald-400 mt-1">
                      {post.price}
                    </p>
                  )}
                </div>

                {/* Interactive Action Buttons */}
                <div className="mt-2.5 pt-2 border-t border-white/5 space-y-1.5">
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
                      className="flex-1 py-1.5 px-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] font-semibold text-[10px] flex items-center justify-center gap-1 border border-[#25D366]/30 transition-colors"
                    >
                      <WhatsAppIcon className="w-3 h-3 fill-[#25D366]" />
                      <span>Pedir</span>
                    </a>

                    <a
                      href={post.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Abrir no Instagram"
                      className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-[10px] flex items-center justify-center gap-1 border border-white/10 transition-colors"
                    >
                      <InstagramIcon className="w-3 h-3 fill-slate-300" />
                      <span>Insta</span>
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
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors cursor-pointer"
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

      {/* Helper text showing scroll hint */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
        <span className="flex items-center gap-1">
          <ArrowRight className="w-3 h-3 text-cyan-400" />
          Role para a direita para ver mais vídeos e fotos
        </span>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
        >
          <span>@hitecheletronicos</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </section>
  );
};
