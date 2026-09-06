import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Plus, Settings, LogOut, Sparkles } from 'lucide-react';
import { AdminSession } from '../types';

interface AdminBarProps {
  session: AdminSession;
  onOpenAddMedia: () => void;
  onOpenStoreSettings: () => void;
  onLogout: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  session,
  onOpenAddMedia,
  onOpenStoreSettings,
  onLogout,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      id="admin-active-bar"
      className="w-full bg-slate-900/95 backdrop-blur-md border-b border-cyan-500/30 text-white px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 shadow-xl sticky top-0 z-40"
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 flex-shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 hidden xs:inline">Administrador:</span>
          <span className="font-bold text-white max-w-[140px] truncate">{session.user.name}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 uppercase">
            {session.user.role === 'master' ? 'Master' : 'Admin'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={onOpenAddMedia}
          type="button"
          className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-[#0B0F17] font-bold text-xs flex items-center gap-1 hover:brightness-110 transition-all cursor-pointer shadow-sm shadow-cyan-500/20"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Subir Mídia</span>
        </button>

        <button
          onClick={onOpenStoreSettings}
          type="button"
          title="Editar Dados e Links da Loja"
          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 font-medium text-xs flex items-center gap-1 border border-white/10 transition-colors cursor-pointer"
        >
          <Settings className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Editar Loja</span>
        </button>

        <button
          onClick={onLogout}
          type="button"
          title="Sair do Modo Administrador"
          className="p-1 sm:px-2 sm:py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-medium text-xs flex items-center gap-1 border border-rose-500/20 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sair</span>
        </button>
      </div>
    </motion.div>
  );
};
