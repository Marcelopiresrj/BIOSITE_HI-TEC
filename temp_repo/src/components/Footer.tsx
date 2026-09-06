import React from 'react';
import { Shield, Lock, ShieldCheck, Settings } from 'lucide-react';

interface FooterProps {
  isAdmin?: boolean;
  onOpenAdminAuth: () => void;
  onOpenStoreSettings?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  isAdmin,
  onOpenAdminAuth,
  onOpenStoreSettings,
}) => {
  return (
    <footer id="main-footer" className="mt-8 pt-6 pb-6 text-center text-xs w-full border-t border-white/5">
      <div className="flex items-center justify-center gap-1.5 mb-2 text-slate-500">
        <Shield className="w-3.5 h-3.5 text-cyan-400/80" />
        <span className="font-medium text-[10px] tracking-wider uppercase text-slate-400">
          Loja Oficial • Smartphones & Acessórios Premium
        </span>
      </div>
      <p id="copyright-notice" className="text-[11px] font-medium text-slate-500 tracking-wide">
        © Hi-Tech Eletrônicos. Todos os direitos reservados.
      </p>

      {/* Admin Access / Status Button */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {isAdmin ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenStoreSettings}
              type="button"
              className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
            >
              <Settings className="w-3 h-3" />
              <span>Editar Loja</span>
            </button>
            <button
              onClick={onOpenAdminAuth}
              type="button"
              className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Ativo</span>
            </button>
          </div>
        ) : (
          <button
            id="footer-admin-access-btn"
            onClick={onOpenAdminAuth}
            type="button"
            className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300 px-2.5 py-1 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
            title="Acesso exclusivo para administradores"
          >
            <Lock className="w-3 h-3" />
            <span>Área Administrativa</span>
          </button>
        )}
      </div>

      {/* 3 micro-dots indicator from Professional Polish theme */}
      <div className="flex justify-center gap-3 mt-3">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-700/80"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-slate-700/80"></div>
      </div>
    </footer>
  );
};

