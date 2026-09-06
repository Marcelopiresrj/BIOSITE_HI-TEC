import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Store,
  Phone,
  MessageSquare,
  Instagram,
  Star,
  MapPin,
  Clock,
  QrCode,
  Save,
  RotateCcw,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { StoreSettings } from '../types';
import { DEFAULT_STORE_SETTINGS } from '../utils/adminAuth';
import { saveFirebaseStoreSettings } from '../lib/firebaseStore';

interface AdminStoreSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: StoreSettings) => void;
  onShowToast: (msg: string) => void;
  initialSettings: StoreSettings;
}

export const AdminStoreSettingsModal: React.FC<AdminStoreSettingsModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onShowToast,
  initialSettings,
}) => {
  const [settings, setSettings] = useState<StoreSettings>(initialSettings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSettings(initialSettings);
    }
  }, [isOpen, initialSettings]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveFirebaseStoreSettings(settings);
      onSave(settings);
      onShowToast('Configurações e links da loja atualizados com sucesso!');
      onClose();
    } catch (err) {
      onShowToast('Erro ao salvar configurações no servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar as configurações padrão da loja?')) {
      setSettings(DEFAULT_STORE_SETTINGS);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-[#0F172A] border border-cyan-500/30 rounded-3xl p-5 sm:p-6 shadow-[0_0_50px_rgba(0,242,254,0.15)] max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00F2FE] to-[#4FACFE] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0F172A] rounded-[10px] flex items-center justify-center">
                  <Store className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                  Editar Dados & Links da Loja
                </h3>
                <p className="text-xs text-slate-400">
                  Modo Administrador • Atualização em tempo real
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form with scrollable body */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 py-4 space-y-4 scrollbar-thin">
            {/* Especialidade e Manutenção Técnica */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                <Wrench className="w-4 h-4" />
                <span>Especialidade & Serviços Técnicos</span>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Título da Especialidade
                </label>
                <input
                  type="text"
                  value={settings.specialtyTitle || ''}
                  onChange={(e) => setSettings({ ...settings, specialtyTitle: e.target.value })}
                  placeholder="Montagem e Manutenção de Celulares e Tablets • Venda de Games e Acessórios"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Serviços Realizados
                </label>
                <input
                  type="text"
                  value={settings.servicesDescription || ''}
                  onChange={(e) => setSettings({ ...settings, servicesDescription: e.target.value })}
                  placeholder="Troca de Telas, Touch, Conectores, Microfone, Baterias, Câmeras e Alto-falantes"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400 outline-none"
                />
              </div>
            </div>

            {/* WhatsApp Settings */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <Phone className="w-4 h-4" />
                <span>WhatsApp de Atendimento & Pedidos</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Número com DDI (sem traços/espaços)
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value.replace(/\D/g, '') })}
                    placeholder="5522998706841"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Número para Exibição
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.whatsappDisplay}
                    onChange={(e) => setSettings({ ...settings, whatsappDisplay: e.target.value })}
                    placeholder="(22) 99870-6841"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Mensagem Automática Padrão ao Iniciar Conversa
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text"
                    value={settings.whatsappDefaultMsg}
                    onChange={(e) => setSettings({ ...settings, whatsappDefaultMsg: e.target.value })}
                    placeholder="Olá, vim pelo BioSite..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-emerald-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Instagram & Google Reviews Links */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                <Instagram className="w-4 h-4" />
                <span>Instagram & Avaliação Google</span>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  URL do Perfil no Instagram
                </label>
                <input
                  type="url"
                  required
                  value={settings.instagramUrl}
                  onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                  placeholder="https://www.instagram.com/hitecheletronicos/"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Link Direto de Avaliação no Google (Write Review)
                </label>
                <div className="relative">
                  <Star className="absolute left-3 top-2.5 w-3.5 h-3.5 text-[#fbbc05]" />
                  <input
                    type="url"
                    required
                    value={settings.googleReviewUrl}
                    onChange={(e) => setSettings({ ...settings, googleReviewUrl: e.target.value })}
                    placeholder="https://search.google.com/local/writereview?..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
                <MapPin className="w-4 h-4" />
                <span>Endereço & Horários de Funcionamento</span>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Endereço Físico da Loja
                </label>
                <input
                  type="text"
                  required
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  placeholder="Av. Jane Maria Martins Figueira, 12 - Jardim Marileia, Rio das Ostras - RJ, 28896-052"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Horário Seg a Sex
                  </label>
                  <input
                    type="text"
                    value={settings.hoursWeekday}
                    onChange={(e) => setSettings({ ...settings, hoursWeekday: e.target.value })}
                    placeholder="Segunda a Sexta: 09:00 às 18:30"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Horário Sábado
                  </label>
                  <input
                    type="text"
                    value={settings.hoursSaturday}
                    onChange={(e) => setSettings({ ...settings, hoursSaturday: e.target.value })}
                    placeholder="Sábado: 09:00 às 14:30"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Horário Domingo
                  </label>
                  <input
                    type="text"
                    value={settings.hoursSunday || 'Domingo: Fechado'}
                    onChange={(e) => setSettings({ ...settings, hoursSunday: e.target.value })}
                    placeholder="Domingo: Fechado"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Aviso de Feriados
                </label>
                <input
                  type="text"
                  value={settings.holidayNote || ''}
                  onChange={(e) => setSettings({ ...settings, holidayNote: e.target.value })}
                  placeholder="Em feriados os horários podem sofrer alterações"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            {/* Pix Payment Info */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
                <QrCode className="w-4 h-4" />
                <span>Chave Pix da Loja</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Chave Pix (Telefone, CNPJ ou E-mail)
                  </label>
                  <input
                    type="text"
                    value={settings.pixKey}
                    onChange={(e) => setSettings({ ...settings, pixKey: e.target.value })}
                    placeholder="22998706841"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">
                    Nome do Titular
                  </label>
                  <input
                    type="text"
                    value={settings.pixReceiver}
                    onChange={(e) => setSettings({ ...settings, pixReceiver: e.target.value })}
                    placeholder="Hi-Tech Eletrônicos"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleResetDefaults}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Padrões</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] hover:brightness-110 text-[#0B0F17] font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Salvando...' : 'Salvar Alterações'}</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
