import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, MapPin, Phone, ShieldCheck, CheckCircle2, Navigation, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { StoreSettings } from '../types';
import { getStoreStatus } from '../utils/storeAvailability';

interface HoursModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
  storeSettings?: StoreSettings;
}

export const HoursModal: React.FC<HoursModalProps> = ({
  isOpen,
  onClose,
  whatsappUrl,
  storeSettings,
}) => {
  const [showAllDays, setShowAllDays] = useState(true);
  const [status, setStatus] = useState(getStoreStatus());

  useEffect(() => {
    if (isOpen) {
      setStatus(getStoreStatus());
      const interval = setInterval(() => setStatus(getStoreStatus()), 60000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const address = storeSettings?.address || 'Av. Jane Maria Martins Figueira, 12 - Jardim Marileia, Rio das Ostras - RJ, 28896-052';
  const phoneDisplay = storeSettings?.whatsappDisplay || '(22) 99870-6841';
  const phoneRaw = storeSettings?.whatsappNumber || '22998706841';

  // Determine current day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDayIndex = new Date().getDay();

  const dailySchedule = [
    { day: 'Segunda-feira', hours: '09:00 – 18:30', dayIndex: 1, open: true },
    { day: 'Terça-feira', hours: '09:00 – 18:30', dayIndex: 2, open: true },
    { day: 'Quarta-feira', hours: '09:00 – 18:30', dayIndex: 3, open: true },
    { day: 'Quinta-feira', hours: '09:00 – 18:30', dayIndex: 4, open: true },
    { day: 'Sexta-feira', hours: '09:00 – 18:30', dayIndex: 5, open: true },
    { day: 'Sábado', hours: '09:00 – 14:30', dayIndex: 6, open: true },
    { day: 'Domingo', hours: 'Fechado', dayIndex: 0, open: false },
  ];

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <AnimatePresence>
      <div 
        id="hours-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          id="hours-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700/80 p-5 shadow-2xl text-slate-100 max-h-[92vh] overflow-y-auto scrollbar-thin"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base font-['Outfit']">Horários de Atendimento</h3>
            </div>
            <button
              id="close-hours-modal-btn"
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Status banner */}
          <div className={`my-3.5 p-3 rounded-xl border flex items-center justify-between gap-3 ${status.isOpen ? 'bg-emerald-950/40 border-emerald-500/30' : 'bg-rose-950/40 border-rose-500/30'}`}>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3 flex-shrink-0">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status.isOpen ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${status.isOpen ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
              </span>
              <div>
                <p className={`text-xs font-bold ${status.isOpen ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {status.isOpen ? 'Atendimento Ativo' : 'Loja Fechada'}
                </p>
                <p className={`text-[11px] ${status.isOpen ? 'text-emerald-400/80' : 'text-rose-400/80'}`}>
                  {status.isOpen ? 'WhatsApp e Balcão em Rio das Ostras' : 'Retornaremos no próximo dia útil'}
                </p>
              </div>
            </div>
            <a
              href={status.isOpen ? `tel:${phoneRaw}` : whatsappUrl}
              target={!status.isOpen ? "_blank" : undefined}
              rel={!status.isOpen ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg transition-colors whitespace-nowrap border ${status.isOpen ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30'}`}
            >
              {status.isOpen ? <Phone className="w-3 h-3" /> : <WhatsAppIcon className="w-3 h-3 fill-current" />}
              <span>{status.isOpen ? 'Ligar' : 'Mensagem'}</span>
            </a>
          </div>

          {/* Schedule list */}
          <div className="space-y-1.5 mb-3">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 pb-1">
              <span>Dia da Semana</span>
              <span>Funcionamento</span>
            </div>

            {dailySchedule.map((item, idx) => {
              const isToday = item.dayIndex === currentDayIndex;
              return (
                <div 
                  key={idx}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl text-xs transition-colors ${
                    isToday
                      ? 'bg-cyan-950/50 border border-cyan-500/40 shadow-sm'
                      : 'bg-slate-800/40 border border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isToday && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500 text-slate-950 uppercase">
                        Hoje
                      </span>
                    )}
                    <span className={`font-medium ${isToday ? 'text-cyan-200 font-semibold' : 'text-slate-300'}`}>
                      {item.day}
                    </span>
                  </div>
                  <span className={`font-semibold ${
                    !item.open 
                      ? 'text-rose-400' 
                      : isToday 
                        ? 'text-emerald-300 font-bold' 
                        : 'text-slate-100'
                  }`}>
                    {item.hours}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Holiday Note */}
          <div className="mb-3.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-[11px] text-amber-300/90">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>Em feriados (como Independência do Brasil) e datas especiais, os horários podem sofrer alterações.</span>
          </div>

          {/* Address & Google Maps button */}
          <div className="mb-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/70 space-y-2">
            <div className="flex items-start gap-2 text-[11px] text-slate-200">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Endereço da Loja:</p>
                <p className="text-slate-300 leading-snug">{address}</p>
              </div>
            </div>

            <a
              id="modal-open-maps-btn"
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 hover:text-cyan-100 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Traçar Rota no Google Maps</span>
            </a>
          </div>

          {/* Quality Info points */}
          <div className="space-y-1.5 mb-4 text-[11px] text-slate-400 bg-slate-800/30 p-2.5 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>Garantia oficial e peças de alta qualidade</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Orçamento gratuito pelo WhatsApp ou na bancada</span>
            </div>
          </div>

          {/* WhatsApp Action Button */}
          <a
            id="modal-whatsapp-cta"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>Falar Agora no WhatsApp ({phoneDisplay})</span>
          </a>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

