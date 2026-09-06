import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Heart, Share2, ExternalLink, MessageCircle, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { InstagramPost } from '../types';
import { InstagramIcon, WhatsAppIcon } from './Icons';

interface InstagramMediaModalProps {
  post: InstagramPost | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export const InstagramMediaModal: React.FC<InstagramMediaModalProps> = ({
  post,
  onClose,
  onShowToast,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    setIsPlaying(true);
    setProgress(0);
    setIsLiked(false);
  }, [post?.id]);

  if (!post) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(post.instagramUrl);
      onShowToast('Link do Instagram copiado com sucesso!');
    }
  };

  const phone = '5522998706841';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(post.whatsappMessage)}`;

  return (
    <AnimatePresence>
      <div
        id="instagram-media-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          id="instagram-media-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#0B0F17] border border-[#1E293B] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh] text-slate-100"
        >
          {/* Close button */}
          <button
            id="close-instagram-modal-btn"
            onClick={onClose}
            type="button"
            className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer border border-white/10"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left / Top Media Player Section */}
          <div className="relative w-full md:w-[320px] bg-black flex items-center justify-center overflow-hidden min-h-[280px] md:min-h-[460px] flex-shrink-0">
            {post.type === 'video' ? (
              <div className="relative w-full h-full flex items-center justify-center group">
                <video
                  ref={videoRef}
                  src={post.mediaUrl}
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onClick={togglePlay}
                  className="w-full h-full max-h-[380px] md:max-h-[460px] object-cover cursor-pointer"
                />

                {/* Progress bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-[#00F2FE] transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Video controls overlay on hover or tap */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {!isPlaying && (
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4 rounded-full bg-black/70 text-white border border-white/20 shadow-xl"
                    >
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </motion.div>
                  )}
                </div>

                {/* Bottom video controls */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto z-20">
                  <button
                    onClick={togglePlay}
                    type="button"
                    className="p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/60 text-cyan-300 font-bold border border-cyan-500/20">
                      Reels Oficial
                    </span>
                    <button
                      onClick={toggleMute}
                      type="button"
                      className="p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center p-2">
                <img
                  src={post.mediaUrl}
                  alt={post.title}
                  className="w-full h-full max-h-[380px] md:max-h-[460px] object-cover rounded-lg"
                  loading="lazy"
                />
                {post.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/10 text-xs font-semibold text-cyan-300">
                    {post.badge}
                  </div>
                )}
              </div>
            )}

            {/* Navigation arrows (prev/next) */}
            {hasPrev && onPrev && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer z-20"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {hasNext && onNext && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer z-20"
                aria-label="Próximo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Right / Bottom Details Section */}
          <div className="flex-1 flex flex-col justify-between p-5 overflow-y-auto">
            <div>
              {/* Header profile info */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1E293B]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-black border border-cyan-500/40 p-0.5 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src="/logo.svg" alt="Hi-Tech" className="w-full h-auto" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white">hitecheletronicos</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
                    </div>
                    <span className="text-[11px] text-slate-400">Hi-Tech Eletrônicos • Oficial</span>
                  </div>
                </div>

                <a
                  href={post.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white text-[11px] font-semibold flex items-center gap-1 hover:opacity-90 transition-opacity"
                >
                  <InstagramIcon className="w-3 h-3 fill-white" />
                  <span>Seguir</span>
                </a>
              </div>

              {/* Title & Category */}
              <div className="mt-3.5 mb-2">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 font-semibold text-[11px] border border-cyan-500/20">
                    {post.categoryLabel}
                  </span>
                  {post.price && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 font-bold text-[11px] border border-emerald-500/20">
                      {post.price}
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit'] leading-snug">
                  {post.title}
                </h3>
              </div>

              {/* Caption */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed my-2">
                {post.caption}
              </p>

              {/* Engagement counts */}
              <div className="flex items-center gap-4 py-2 text-xs text-slate-400 border-t border-b border-[#1E293B]/60 my-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center gap-1.5 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{isLiked ? 'Curtido!' : `${post.likes} curtidas`}</span>
                </button>
                {post.views && (
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{post.views} visualizações</span>
                  </span>
                )}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 hover:text-white transition-colors ml-auto cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <a
                id="modal-order-whatsapp-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] hover:brightness-110 text-[#0B0F17] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-[#0B0F17]" />
                <span>Pedir este Item no WhatsApp</span>
              </a>

              <a
                id="modal-open-instagram-btn"
                href={post.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 border border-white/10 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5 fill-white" />
                <span>Acessar Post no Instagram Oficial</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
