import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Share2, MessageCircle, Send, Twitter } from 'lucide-react';
import { WhatsAppIcon } from './Icons';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://hitecheletronicos.com.br';
  const shareText = 'Confira o BioSite oficial da Hi-Tech Eletrônicos! Smartphones, acessórios e o melhor atendimento:';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    onShowToast('Link copiado para a área de transferência!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hi-Tech Eletrônicos',
          text: shareText,
          url: currentUrl,
        });
      } catch {
        // User canceled share
      }
    } else {
      handleCopy();
    }
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="share-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          id="share-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700/80 p-5 shadow-2xl shadow-cyan-950/40 text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-base font-['Outfit']">Compartilhar BioSite</h3>
            </div>
            <button
              id="close-share-modal-btn"
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Social share icons */}
          <div className="grid grid-cols-3 gap-2.5 my-4">
            <a
              id="share-whatsapp-link"
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 hover:border-emerald-500/60 transition-all text-center group"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-1 group-hover:scale-110 transition-transform">
                <WhatsAppIcon className="w-5 h-5 fill-emerald-400" />
              </div>
              <span className="text-xs font-semibold text-emerald-300">WhatsApp</span>
            </a>

            <a
              id="share-telegram-link"
              href={telegramShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-sky-950/40 border border-sky-500/30 hover:bg-sky-900/50 hover:border-sky-500/60 transition-all text-center group"
            >
              <div className="w-9 h-9 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 mb-1 group-hover:scale-110 transition-transform">
                <Send className="w-4 h-4 text-sky-400" />
              </div>
              <span className="text-xs font-semibold text-sky-300">Telegram</span>
            </a>

            <a
              id="share-twitter-link"
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 hover:bg-blue-900/50 hover:border-blue-500/60 transition-all text-center group"
            >
              <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mb-1 group-hover:scale-110 transition-transform">
                <Twitter className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-xs font-semibold text-blue-300">Twitter / X</span>
            </a>
          </div>

          {/* Copy link bar */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">
              Ou copie o link direto:
            </label>
            <div className="flex items-center gap-2 p-1.5 pl-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
              <span className="truncate text-slate-300 flex-1 select-all font-mono">
                {currentUrl}
              </span>
              <button
                id="copy-modal-url-btn"
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors flex-shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Device native share */}
          <button
            id="device-native-share-btn"
            type="button"
            onClick={handleNativeShare}
            className="w-full mt-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-cyan-400" />
            <span>Compartilhar pelo seu aparelho</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
