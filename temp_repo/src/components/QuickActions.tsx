import React from 'react';
import { motion } from 'motion/react';
import { Share2, UserPlus, QrCode, Clock, MapPin } from 'lucide-react';
import { PixIcon } from './Icons';

interface QuickActionsProps {
  onShare: () => void;
  onSaveContact: () => void;
  onOpenPixModal: () => void;
  onOpenHoursModal: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onShare,
  onSaveContact,
  onOpenPixModal,
  onOpenHoursModal,
}) => {
  const actions = [
    {
      id: 'quick-save-contact-btn',
      label: 'Salvar Contato',
      sublabel: 'Baixar vCard',
      icon: UserPlus,
      onClick: onSaveContact,
      color: 'hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-cyan-950/20',
      iconColor: 'text-cyan-400',
    },
    {
      id: 'quick-share-btn',
      label: 'Compartilhar',
      sublabel: 'Enviar BioSite',
      icon: Share2,
      onClick: onShare,
      color: 'hover:text-purple-300 hover:border-purple-500/50 hover:bg-purple-950/20',
      iconColor: 'text-purple-400',
    },
    {
      id: 'quick-pix-btn',
      label: 'Chave Pix',
      sublabel: 'Pagamento fácil',
      icon: PixIcon,
      onClick: onOpenPixModal,
      color: 'hover:text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-950/20',
      iconColor: 'text-emerald-400',
    },
    {
      id: 'quick-hours-btn',
      label: 'Horários',
      sublabel: 'Ver funcionamento',
      icon: Clock,
      onClick: onOpenHoursModal,
      color: 'hover:text-amber-300 hover:border-amber-500/50 hover:bg-amber-950/20',
      iconColor: 'text-amber-400',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.4 }}
      className="w-full my-4 flex flex-col gap-2.5"
    >
      {/* Primary Save Contact Action Button inspired directly by Design HTML */}
      <button
        id="quick-save-contact-main-btn"
        type="button"
        onClick={onSaveContact}
        className="w-full py-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white hover:bg-slate-700/90 hover:border-slate-600 transition-all cursor-pointer shadow-sm active:scale-[0.99]"
      >
        <UserPlus className="w-4 h-4 text-cyan-400" />
        <span>Salvar Contato na Agenda</span>
      </button>

      {/* Secondary Quick Action Pills Grid */}
      <div className="grid grid-cols-3 gap-2 w-full">
        <button
          id="quick-share-btn"
          type="button"
          onClick={onShare}
          className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer text-center group"
        >
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <span className="text-[11px] font-semibold text-slate-200 group-hover:text-white transition-colors">
            Compartilhar
          </span>
        </button>

        <button
          id="quick-pix-btn"
          type="button"
          onClick={onOpenPixModal}
          className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer text-center group"
        >
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <PixIcon className="w-3.5 h-3.5 fill-emerald-400" />
          </div>
          <span className="text-[11px] font-semibold text-slate-200 group-hover:text-white transition-colors">
            Chave Pix
          </span>
        </button>

        <button
          id="quick-hours-btn"
          type="button"
          onClick={onOpenHoursModal}
          className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer text-center group"
        >
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <span className="text-[11px] font-semibold text-slate-200 group-hover:text-white transition-colors">
            Horários
          </span>
        </button>
      </div>
    </motion.div>
  );
};
