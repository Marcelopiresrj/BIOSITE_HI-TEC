export interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url?: string;
  icon: string;
  badge?: string;
  highlight?: boolean;
  type?: 'link' | 'action';
  actionType?: 'share' | 'vcard' | 'location' | 'pix';
  glowColor?: 'emerald' | 'cyan' | 'purple' | 'amber';
}

export interface StoreInfo {
  name: string;
  handle: string;
  phone: string;
  displayPhone: string;
  bio: string;
  status: string;
  hours: string;
  address: string;
}

export interface InstagramPost {
  id: string;
  type: 'video' | 'photo';
  title: string;
  category: 'reels' | 'smartphones' | 'acessorios' | 'assistencia';
  categoryLabel: string;
  mediaUrl: string;
  thumbnailUrl: string;
  likes: string;
  views?: string;
  duration?: string;
  caption: string;
  badge?: string;
  price?: string;
  instagramUrl: string;
  whatsappMessage: string;
  createdAt?: string;
}

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  securityKeyHash: string;
  role: 'master' | 'admin';
  createdAt: string;
}

export interface AdminSession {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'master' | 'admin';
  };
  loginTime: string;
}

export interface StoreSettings {
  storeName: string;
  storeHandle: string;
  specialtyTitle?: string;
  servicesDescription?: string;
  whatsappNumber: string; // e.g. "5522998706841"
  whatsappDisplay: string; // e.g. "(22) 99870-6841"
  whatsappDefaultMsg: string;
  instagramUrl: string;
  googleReviewUrl: string;
  address: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday?: string;
  holidayNote?: string;
  pixKey: string;
  pixReceiver: string;
}

