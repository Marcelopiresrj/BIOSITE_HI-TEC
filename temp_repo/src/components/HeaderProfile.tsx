import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Copy, Check, Wrench, Phone, Smartphone, Gamepad2 } from 'lucide-react';
import { StoreSettings } from '../types';
import logoImg from '../assets/images/hitech_logo_circle_1788577271122.jpg';
import { getStoreStatus } from '../utils/storeStatus';

interface HeaderProfileProps {
  onCopyHandle: () => void;
  copiedHandle: boolean;
  onOpenHoursModal: () => void;
  storeSettings?: StoreSettings;
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({
  onCopyHandle,
  copiedHandle,
  onOpenHoursModal,
  storeSettings,
}) => {
  const specialtyTitle = storeSettings?.specialtyTitle || 'Montagem e Manutenção de Celulares e Tablets • Venda de Games e Acessórios';
  const phoneDisplay = storeSettings?.whatsappDisplay || '(22) 99870-6841';
  const phoneRaw = storeSettings?.whatsappNumber || '22998706841';

  const [status, setStatus] = useState(getStoreStatus());

  useEffect(() => {
    // Check status every minute
    const interval = setInterval(() => {
      setStatus(getStoreStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header
      id="profile-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center text-center pt-2 pb-5 px-3 w-full"
    >
      {/* Avatar Container with Professional Polish Gradient Ring and prominent Hi-Tech Logo */}
      <div className="relative mb-4 group">
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#00F2FE] via-[#7928CA] to-[#FF0080] shadow-[0_0_30px_rgba(0,242,254,0.4)] transition-transform duration-300 group-hover:scale-105">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-black flex items-center justify-center p-2.5 overflow-hidden border-[3px] border-[#1E293B] shadow-inner relative group-hover:border-cyan-500/40 transition-colors">
            {/* Subtle background tech texture */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00F2FE_1px,transparent_1px)] [background-size:10px_10px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none" />

            {/* Official Hi-Tech Logo prominently displayed inside the circle */}
            <div className="relative z-10 w-full h-full flex items-center justify-center rounded-full overflow-hidden bg-black/50">
              {/* Para usar a imagem exata do usuário, faça o upload para o painel de arquivos (src/assets/images/) com o nome "image.png" ou altere o caminho aqui */}
              <img 
                src="/logo.png" 
                alt="Hi-Tech Logo" 
                onError={(e) => {
                  // Fallback for when the user hasn't uploaded their image yet
                  e.currentTarget.src = logoImg;
                }}
                className="w-full h-full object-contain scale-[1.2] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]" 
              />
            </div>
          </div>
        </div>

        {/* Online Status Floating Pill on Avatar */}
        <div className="absolute bottom-0.5 right-0.5 bg-[#0F172A] border-2 border-[#1E293B] rounded-full p-1 shadow-md">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
          </span>
        </div>
      </div>

      {/* Brand Name & Verified Badge */}
      <div className="flex items-center justify-center gap-1.5 mt-1">
        <h1 
          id="store-title"
          className="text-2xl font-bold tracking-tight text-white font-['Outfit']"
        >
          {storeSettings?.storeName || 'Hi-Tech Eletrônicos'}
        </h1>
        <div 
          title="Loja Oficial Verificada"
          className="text-[#00F2FE] inline-flex"
        >
          <CheckCircle2 className="w-5 h-5 fill-cyan-500/20 text-[#00F2FE]" />
        </div>
      </div>

      {/* Handle / Username with Copy Button */}
      <button
        id="copy-handle-btn"
        onClick={onCopyHandle}
        type="button"
        className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide uppercase text-[#4FACFE] hover:text-cyan-300 mt-0.5 mb-2 transition-colors cursor-pointer group"
        title="Clique para copiar o @ do Instagram"
      >
        <span>{storeSettings?.storeHandle || '@hitecheletronicos'}</span>
        {copiedHandle ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-300 transition-colors" />
        )}
      </button>

      {/* Status Badge: Loja Aberta / Atendimento Online */}
      <div className="mt-0.5 mb-3">
        <button
          id="status-badge-button"
          onClick={onOpenHoursModal}
          type="button"
          className={`px-4 py-1.5 bg-[#1E293B]/60 rounded-full inline-flex items-center gap-2 border border-white/10 ${status.borderColor} hover:bg-[#1E293B] transition-all cursor-pointer group`}
        >
          <span className={`w-2 h-2 rounded-full ${status.dotColor}`}></span>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${status.textColor}`}>
            {status.text}
          </span>
          <span className={`text-[9px] text-slate-400 group-hover:${status.textColor} pl-1 border-l border-slate-700 transition-colors`}>
            Horários
          </span>
        </button>
      </div>

      {/* Specialty Title Banner */}
      <div 
        id="store-specialty-banner"
        className="w-full max-w-[420px] px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/15 border border-cyan-500/30 text-center shadow-[0_0_20px_rgba(0,242,254,0.08)] mb-2.5 backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 text-cyan-300">
          <div className="flex items-center gap-1 flex-shrink-0 text-cyan-400">
            <Wrench className="w-4 h-4" />
            <Gamepad2 className="w-4 h-4" />
          </div>
          <h2 className="text-xs sm:text-[13px] font-bold tracking-tight text-white leading-tight uppercase font-['Outfit']">
            {specialtyTitle}
          </h2>
        </div>
      </div>

      {/* Services List / Badges: Troca de Telas, Touch, Conectores, Microfone, Baterias, Câmeras e Alto-falantes */}
      <div 
        id="store-services-list"
        className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-medium max-w-[380px]"
      >
        <span className="px-2.5 py-1 rounded-lg bg-[#0F172A]/80 border border-cyan-500/30 text-cyan-300 shadow-sm flex items-center gap-1">
          <span>📱</span>
          <span>Troca de Telas</span>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#0F172A]/80 border border-blue-500/30 text-blue-300 shadow-sm flex items-center gap-1">
          <span>👆</span>
          <span>Touch</span>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#0F172A]/80 border border-purple-500/30 text-purple-300 shadow-sm flex items-center gap-1">
          <span>🔌</span>
          <span>Conectores</span>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#0F172A]/80 border border-amber-500/30 text-amber-300 shadow-sm flex items-center gap-1">
          <span>🎙️</span>
          <span>Microfone</span>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#0F172A]/80 border border-emerald-500/30 text-emerald-300 shadow-sm flex items-center gap-1">
          <span>🔋</span>
          <span>Baterias</span>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#0F172A]/80 border border-pink-500/30 text-pink-300 shadow-sm flex items-center gap-1">
          <span>📷</span>
          <span>Câmeras</span>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-[#0F172A]/80 border border-indigo-500/30 text-indigo-300 shadow-sm flex items-center gap-1">
          <span>🔊</span>
          <span>Alto-falantes</span>
        </span>
      </div>
    </motion.header>
  );
};
