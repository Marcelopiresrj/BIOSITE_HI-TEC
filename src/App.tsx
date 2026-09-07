import React, { useState } from 'react';
import { motion } from 'motion/react';
import { InstagramFilterBar } from "./components/InstagramFilterBar";
import { HeaderProfile } from './components/HeaderProfile';
import { LinkCard } from './components/LinkCard';
import { InstagramFeedSection } from './components/InstagramFeedSection';
import { DesktopInstagramPanel } from './components/DesktopInstagramPanel';
import { InstagramMediaModal } from './components/InstagramMediaModal';
import { AddMediaModal } from './components/AddMediaModal';
import { ShareDialog } from './components/ShareDialog';
import { HoursModal } from './components/HoursModal';
import { AppToast } from './components/AppToast';
import { Footer } from './components/Footer';
import { AdminBar } from './components/AdminBar';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminStoreSettingsModal } from './components/AdminStoreSettingsModal';
import { Star, Layers, Download, Sparkles } from 'lucide-react';
import { WhatsAppIcon, OfficialWhatsAppIcon, GoogleIcon, InstagramIcon } from './components/Icons';
import { INSTAGRAM_POSTS, INSTAGRAM_URL } from './data/instagramData';
import { InstagramPost, AdminSession, StoreSettings } from './types';
import { subscribeToAuthChanges, logoutAdmin, DEFAULT_STORE_SETTINGS } from './utils/adminAuthentication';
import { getFirebaseStoreSettings, getFirebasePosts, saveFirebasePost, deleteFirebasePost } from './lib/firebaseStore';
import mobileTechBackground from './assets/images/hitech_consoles_bg_1788576459897.jpg';
import desktopTechBackground from './assets/images/hitech_consoles_wide_1788576474194.jpg';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedHandle, setCopiedHandle] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isHoursModalOpen, setIsHoursModalOpen] = useState(false);
  const [isAddMediaOpen, setIsAddMediaOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isStoreSettingsOpen, setIsStoreSettingsOpen] = useState(false);
  const [selectedInstagramPost, setSelectedInstagramPost] = useState<InstagramPost | null>(null);

  // Background Glass Transparency Control
  const [glassOpacity, setGlassOpacity] = useState<'ultra' | 'glass'>('ultra');

  // Admin Session and Dynamic Store Settings
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const isAdmin = Boolean(adminSession);

  const [posts, setPosts] = useState<InstagramPost[]>(INSTAGRAM_POSTS);
  const [activeFilter, setActiveFilter] = useState("todos");

  const filteredPosts = posts.filter(post => {
    if (activeFilter === "todos") return true;
    if (activeFilter === "videos") return post.type === "video" || post.category === "reels";
    if (activeFilter === "smartphones") return post.category === "smartphones";
    if (activeFilter === "acessorios") return post.category === "acessorios";
    return true;
  });

  // Load from Firebase
  React.useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((session) => {
      setAdminSession(session);
    });

    // Load store settings
    getFirebaseStoreSettings().then(setStoreSettings);

    // Load posts
    getFirebasePosts().then(fetchedPosts => {
      if (fetchedPosts.length > 0) {
        // Sort posts by createdAt descending
        setPosts(fetchedPosts.sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleCopyHandle = () => {
    navigator.clipboard.writeText(storeSettings.storeHandle);
    setCopiedHandle(true);
    showToast(`Instagram ${storeSettings.storeHandle} copiado!`);
    setTimeout(() => setCopiedHandle(false), 2500);
  };

  const handleLogout = () => {
    logoutAdmin();
    setAdminSession(null);
    showToast('Sessão de administrador encerrada.');
  };

  const handleOpenAddMedia = () => {
    if (!isAdmin) {
      setIsAuthModalOpen(true);
      showToast('Cadastre-se ou entre como administrador para subir vídeos e fotos.');
      return;
    }
    setIsAddMediaOpen(true);
  };

  const handleAddPost = async (newPost: InstagramPost) => {
    if (!isAdmin) {
      showToast('Apenas administradores podem publicar mídias.');
      return;
    }
    // ensure createdAt exists for sorting
    const postToSave = { ...newPost, createdAt: new Date().toISOString() };
    const updated = [postToSave, ...posts];
    setPosts(updated);
    try {
      await saveFirebasePost(postToSave);
    } catch (err) {
      console.error('Error saving posts to Firebase', err);
      showToast('Erro ao salvar no servidor.');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!isAdmin) {
      showToast('Apenas administradores podem remover publicações.');
      return;
    }
    const updated = posts.filter((p) => p.id !== postId);
    setPosts(updated);
    try {
      await deleteFirebasePost(postId);
      showToast('Publicação removida com sucesso!');
    } catch (err) {
      console.error('Error deleting post from Firebase', err);
      showToast('Erro ao remover do servidor.');
    }
    if (selectedInstagramPost?.id === postId) {
      setSelectedInstagramPost(null);
    }
  };

  const currentPostIndex = selectedInstagramPost
    ? posts.findIndex((p) => p.id === selectedInstagramPost.id)
    : -1;

  const handleNextPost = () => {
    if (currentPostIndex >= 0 && currentPostIndex < posts.length - 1) {
      setSelectedInstagramPost(posts[currentPostIndex + 1]);
    }
  };

  const handlePrevPost = () => {
    if (currentPostIndex > 0) {
      setSelectedInstagramPost(posts[currentPostIndex - 1]);
    }
  };

  const whatsappUrl = `https://wa.me/${storeSettings.whatsappNumber}?text=${encodeURIComponent(storeSettings.whatsappDefaultMsg)}`;
  const instagramUrl = storeSettings.instagramUrl;
  const googleReviewUrl = storeSettings.googleReviewUrl;

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Admin Active Status Bar (when authenticated) */}
      {adminSession && (
        <AdminBar
          session={adminSession}
          onOpenAddMedia={handleOpenAddMedia}
          onOpenStoreSettings={() => setIsStoreSettingsOpen(true)}
          onLogout={handleLogout}
        />
      )}

      <div className="flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center p-0 sm:p-6 md:p-8 lg:gap-8 relative z-10">
        {/* High-Tech Background Showcase: PS5, Xbox Series X/S, Smartphones, Boards & Tools */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
          {/* Deep dark cyber base */}
          <div className="absolute inset-0 bg-[#070B12]" />

          {/* Vertical Glowing Neon Pillars (Green & Cyan) */}
          <div className="absolute top-0 bottom-0 left-[18%] w-[2px] bg-gradient-to-b from-transparent via-emerald-400/60 to-transparent blur-[1px] pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-[18%] w-16 bg-emerald-500/15 blur-xl pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-[22%] w-[2px] bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent blur-[1px] pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-[22%] w-20 bg-cyan-500/20 blur-xl pointer-events-none" />

          {/* Ambient subtle glowing accents */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-2/3 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Mobile Viewport: 9:16 background with Xbox Series X, Series S, PS5, Smartphones, Tools & Neon */}
          <img
            src={mobileTechBackground}
            alt="Hi-Tech Consoles e Smartphones Fundo Mobile"
            className="w-full h-full object-cover object-center block sm:hidden opacity-95 filter contrast-115 brightness-100"
          />

          {/* Desktop & Tablet Panoramic Viewport: 16:9 wide background */}
          <img
            src={desktopTechBackground}
            alt="Hi-Tech Consoles e Smartphones Fundo Desktop"
            className="w-full h-full object-cover object-center hidden sm:block opacity-95 filter contrast-115 brightness-100"
          />

          {/* Atmospheric soft cyber gradient that ensures maximum visibility for the devices */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B12]/40 via-transparent to-[#070B12]/70 pointer-events-none" />
        </div>

        {/* Smartphone Shell Mockup Container with Translucent Glassmorphic effect */}
        <div 
          id="smartphone-shell"
          className={`w-full max-w-[430px] min-h-[100dvh] sm:min-h-0 sm:my-auto ${
            glassOpacity === 'ultra'
              ? 'bg-[#0B0F17]/35 sm:bg-[#0B0F17]/40 backdrop-blur-md'
              : 'bg-[#0B0F17]/60 sm:bg-[#0B0F17]/65 backdrop-blur-xl'
          } border-0 sm:border sm:border-white/20 sm:rounded-[44px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(0,242,254,0.15)] relative overflow-hidden flex flex-col transition-all duration-300 z-10`}
        >
          {/* Glow border ring for mobile frame on desktop */}
          <div className="absolute inset-0 rounded-[44px] pointer-events-none border border-cyan-500/20 hidden sm:block"></div>

          {/* Top Status Bar (Cyber aesthetics) */}
          <div className="w-full px-7 pt-3 pb-1 flex justify-between items-center text-[11px] font-semibold text-slate-400 select-none z-10">
            <span>Hi-Tech 5G</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] text-emerald-400 font-mono tracking-wider">ONLINE</span>
            </div>
          </div>

          {/* Quick Glass Transparency Control Switcher */}
          <div className="w-full px-6 pt-1 flex items-center justify-between z-10 text-[10px]">
            <button
              id="toggle-glass-opacity-btn"
              onClick={() => {
                const next = glassOpacity === 'ultra' ? 'glass' : 'ultra';
                setGlassOpacity(next);
                showToast(next === 'ultra' ? 'Modo Transparência Alta Ativado!' : 'Modo Vidro Fosco Ativado!');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 hover:bg-black/75 border border-cyan-500/40 text-cyan-300 font-medium transition-all backdrop-blur-md cursor-pointer"
              title="Ajustar transparência para ver os consoles e celulares no fundo"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>{glassOpacity === 'ultra' ? 'Fundo Nítido: Transparência Alta' : 'Fundo Suave: Vidro Fosco'}</span>
            </button>

            <a
              id="download-bg-img-btn"
              href={mobileTechBackground}
              download="hitech-consoles-fundo.jpg"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/15 transition-colors cursor-pointer"
              title="Baixar imagem dos consoles e ferramentas"
            >
              <Download className="w-3 h-3" />
              <span>Baixar</span>
            </a>
          </div>

          {/* Top Speaker / Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-3.5 sm:h-4 bg-[#1E293B] rounded-b-xl z-20"></div>

          {/* Scrollable Main Content Interior */}
          <div className="w-full px-4 sm:px-5 pt-8 pb-4 flex flex-col items-center">
            {/* Profile / Header Section */}
            <HeaderProfile
              onCopyHandle={handleCopyHandle}
              copiedHandle={copiedHandle}
              onOpenHoursModal={() => setIsHoursModalOpen(true)}
              storeSettings={storeSettings}
            />

            {/* Instagram Filters */}
            <InstagramFilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* Interactive Instagram Feed Section with Horizontal Right-Scroll & Add/Delete Options */}
            <InstagramFeedSection
              posts={filteredPosts}
              onSelectPost={setSelectedInstagramPost}
              onOpenAddMedia={isAdmin ? handleOpenAddMedia : undefined}
              onDeletePost={isAdmin ? handleDeletePost : undefined}
              instagramUrl={instagramUrl}
            />

            {/* Links & CTA Cards Section */}
            <section id="links-container" className="w-full flex flex-col gap-3 mt-4 mb-1">
              {/* 1. Instagram Oficial */}
              <LinkCard
                id="link-instagram-official"
                title="Siga no Instagram"
                subtitle="Novidades diárias, lançamentos e promoções"
                url={instagramUrl}
                iconType="instagram"
                badge="Oficial"
                delayIndex={0}
              />

              {/* 2. Avalie no Google (Social Proof) */}
              <LinkCard
                id="link-google-reviews"
                title="Avalie Nossa Loja no Google"
                subtitle="Sua opinião é muito importante para nós ⭐⭐⭐⭐⭐"
                url={googleReviewUrl}
                iconType="google"
                badge="5.0 ★"
                delayIndex={1}
              />

              {/* 3. Localização e Informações de Retirada */}
              <LinkCard
                id="link-location-info"
                title="Localização & Horários de Funcionamento"
                subtitle="Jardim Marileia, Rio das Ostras - Ver horários e rota"
                onClick={() => setIsHoursModalOpen(true)}
                iconType="location"
                delayIndex={2}
              />
            </section>

            {/* Social Proof Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full mt-2 p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 bg-black rounded-md flex items-center justify-center p-0.5 shadow-sm flex-shrink-0">
                  <GoogleIcon className="w-full h-full" />
                </div>
                <div className="flex text-[#fbbc05]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#fbbc05] text-[#fbbc05]" />
                  ))}
                </div>
                <span className="font-bold text-slate-200">5.0 no Google</span>
              </div>
              <a
                id="google-review-badge-link"
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00F2FE] hover:text-cyan-300 font-semibold underline underline-offset-2"
              >
                Ver avaliações
              </a>
            </motion.div>

            {/* Footer with Admin Trigger */}
            <Footer
              isAdmin={isAdmin}
              onOpenAdminAuth={() => setIsAuthModalOpen(true)}
              onOpenStoreSettings={() => setIsStoreSettingsOpen(true)}
            />
          </div>
        </div>

        {/* Desktop Expansive Instagram Live Showcase Panel (side-by-side on desktop) */}
        <DesktopInstagramPanel
          posts={filteredPosts}
          onSelectPost={setSelectedInstagramPost}
          onOpenAddMedia={isAdmin ? handleOpenAddMedia : undefined}
          onDeletePost={isAdmin ? handleDeletePost : undefined}
          instagramUrl={instagramUrl}
          isAdmin={isAdmin}
          onOpenAdminAuth={() => setIsAuthModalOpen(true)}
          onOpenStoreSettings={() => setIsStoreSettingsOpen(true)}
        />

        {/* Floating WhatsApp Quick Button */}
        <motion.a
          id="floating-whatsapp-cta"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          title="Fale Conosco no WhatsApp"
          className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_25px_rgba(37,211,102,0.5)] border-2 border-white/30 hover:shadow-[0_6px_35px_rgba(37,211,102,0.7)] hover:bg-[#20ba5a] transition-all cursor-pointer overflow-hidden p-1.5"
        >
          <OfficialWhatsAppIcon className="w-full h-full" />
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-[#0B0F17]"></span>
          </span>
        </motion.a>

        {/* Admin Registration and Authentication Modal */}
        <AdminAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={(session) => {
            setAdminSession(session);
          }}
          onShowToast={showToast}
        />

        {/* Admin Store Settings Modal */}
        <AdminStoreSettingsModal
          isOpen={isStoreSettingsOpen}
          onClose={() => setIsStoreSettingsOpen(false)}
          onSave={(newSettings) => {
            setStoreSettings(newSettings);
          }}
          onShowToast={showToast}
        />

        {/* Upload Media Modal (Exclusive to Admin) */}
        <AddMediaModal
          isOpen={isAddMediaOpen}
          onClose={() => setIsAddMediaOpen(false)}
          onAddPost={handleAddPost}
          onShowToast={showToast}
        />

        {/* Interactive Instagram Reel / Video & Photo Viewer Modal */}
        <InstagramMediaModal
          post={selectedInstagramPost}
          onClose={() => setSelectedInstagramPost(null)}
          onShowToast={showToast}
          onNext={handleNextPost}
          onPrev={handlePrevPost}
          hasNext={currentPostIndex < posts.length - 1}
          hasPrev={currentPostIndex > 0}
        />

        {/* Standard BioSite Modals & Toast */}
        <ShareDialog
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          onShowToast={showToast}
        />

        <HoursModal
          isOpen={isHoursModalOpen}
          onClose={() => setIsHoursModalOpen(false)}
          whatsappUrl={whatsappUrl}
          storeSettings={storeSettings}
        />

        <AppToast message={toastMessage} />
      </div>
    </div>
  );
}
