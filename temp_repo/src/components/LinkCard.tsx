import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { WhatsAppIcon, OfficialWhatsAppIcon, GoogleIcon, PixIcon } from './Icons';
import { Instagram, MapPin, Phone, ShieldCheck, Sparkles, UserPlus } from 'lucide-react';

export interface LinkCardProps {
  id: string;
  title: string;
  subtitle?: string;
  url?: string;
  onClick?: () => void;
  iconType: 'whatsapp' | 'instagram' | 'google' | 'pix' | 'location' | 'vcard' | 'catalog';
  highlight?: boolean;
  badge?: string;
  delayIndex?: number;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  id,
  title,
  subtitle,
  url,
  onClick,
  iconType,
  highlight = false,
  badge,
  delayIndex = 0,
}) => {
  // Render icon based on type
  const renderIcon = () => {
    switch (iconType) {
      case 'whatsapp':
        return (
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md p-1 group-hover:scale-105 transition-transform duration-300">
            <OfficialWhatsAppIcon className="w-full h-full" />
          </div>
        );
      case 'instagram':
        return (
          <div className="w-12 h-12 bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-300 text-white">
            <Instagram className="w-6 h-6 stroke-[2.2]" />
          </div>
        );
      case 'google':
        return (
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-md border border-white/10 group-hover:scale-105 transition-transform duration-300 p-2.5">
            <GoogleIcon className="w-full h-full" />
          </div>
        );
      case 'pix':
        return (
          <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
            <PixIcon className="w-6 h-6 fill-emerald-400" />
          </div>
        );
      case 'location':
        return (
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-cyan-400 flex-shrink-0 border border-white/5 group-hover:scale-105 transition-transform duration-300">
            <MapPin className="w-6 h-6" />
          </div>
        );
      case 'vcard':
        return (
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-purple-400 flex-shrink-0 border border-white/5 group-hover:scale-105 transition-transform duration-300">
            <UserPlus className="w-6 h-6" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-cyan-400 flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
        );
    }
  };

  const isWhatsAppHighlight = highlight && iconType === 'whatsapp';

  const cardContent = (
    <div className="relative z-10 flex items-center gap-4 w-full">
      {renderIcon()}

      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold truncate ${
            isWhatsAppHighlight
              ? 'uppercase tracking-wider text-white'
              : highlight 
                ? 'uppercase tracking-wider text-slate-900' 
                : 'text-white group-hover:text-cyan-300 transition-colors'
          }`}>
            {title}
          </span>
          {badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
              isWhatsAppHighlight
                ? 'bg-black/25 text-white border border-white/20'
                : highlight 
                  ? 'bg-slate-900/15 text-slate-900 border border-slate-900/20'
                  : 'bg-white/10 text-cyan-300 border border-white/10'
            }`}>
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className={`text-[10px] mt-0.5 line-clamp-1 font-medium ${
            isWhatsAppHighlight
              ? 'text-emerald-50'
              : highlight 
                ? 'text-slate-800/80' 
                : 'text-slate-400 group-hover:text-slate-300 transition-colors'
          }`}>
            {subtitle}
          </p>
        )}
      </div>

      <div className={`flex-shrink-0 ml-1 transition-colors ${
        isWhatsAppHighlight
          ? 'text-white'
          : highlight 
            ? 'text-slate-800' 
            : 'text-slate-500 group-hover:text-white'
      }`}>
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );

  const containerClasses = `
    group relative w-full flex items-center p-4 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden
    ${isWhatsAppHighlight
      ? 'bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#128C7E] shadow-[0_10px_25px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_32px_rgba(37,211,102,0.5)] border border-[#25D366]/40'
      : highlight 
        ? 'bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] shadow-[0_10px_25px_rgba(0,242,254,0.2)] hover:shadow-[0_12px_30px_rgba(0,242,254,0.35)]' 
        : 'bg-slate-900/60 backdrop-blur-md border border-white/15 hover:bg-slate-800/80 shadow-sm'
    }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 + delayIndex * 0.08, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      {url ? (
        <a
          id={id}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={containerClasses}
        >
          {cardContent}
        </a>
      ) : (
        <button
          id={id}
          type="button"
          onClick={onClick}
          className={containerClasses}
        >
          {cardContent}
        </button>
      )}
    </motion.div>
  );
};
