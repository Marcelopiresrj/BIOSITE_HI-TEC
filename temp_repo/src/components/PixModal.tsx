import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, CreditCard, ShieldCheck, Zap } from 'lucide-react';
import { PixIcon } from './Icons';

interface PixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const PixModal: React.FC<PixModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const pixKey = '22998706841'; // Phone Pix Key for Hi-Tech Eletrônicos

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    onShowToast('Chave Pix (Celular) copiada com sucesso!');
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="pix-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          id="pix-modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700/80 p-5 shadow-2xl text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
                <PixIcon className="w-4 h-4 fill-teal-400" />
              </div>
              <h3 className="font-bold text-base font-['Outfit']">Chave Pix Oficial</h3>
            </div>
            <button
              id="close-pix-modal-btn"
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="my-4 text-center">
            <p className="text-xs text-slate-400 mb-2">
              Chave Pix tipo Telefone para transferências e pagamentos de pedidos:
            </p>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-teal-500/30 flex items-center justify-between gap-2">
              <div className="text-left">
                <span className="text-[10px] text-teal-400 font-semibold block uppercase">
                  Chave Telefone
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wider">
                  (22) 99870-6841
                </span>
              </div>

              <button
                id="copy-pix-key-btn"
                type="button"
                onClick={handleCopyPix}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors flex-shrink-0 cursor-pointer shadow-md shadow-teal-600/30"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Copiada!</span>
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

          {/* Payment Badges */}
          <div className="space-y-2 mb-4 text-xs text-slate-300">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40 border border-slate-800">
              <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Aprovação instantânea e envio prioritário</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40 border border-slate-800">
              <CreditCard className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Também aceitamos cartões em até 12x</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Após realizar o pagamento, envie o comprovante pelo WhatsApp para liberação imediata.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
