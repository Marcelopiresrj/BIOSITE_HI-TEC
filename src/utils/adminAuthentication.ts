import { AdminAccount, AdminSession, StoreSettings } from '../types';
import { auth, db } from '../lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  storeName: 'Hi-Tech Eletrônicos',
  storeHandle: '@hitecheletronicos',
  specialtyTitle: 'Montagem e Manutenção de Celulares e Tablets • Venda de Games e Acessórios',
  servicesDescription: 'Troca de Telas, Touch, Conectores, Microfone, Baterias, Câmeras e Alto-falantes',
  whatsappNumber: '5522998706841',
  whatsappDisplay: '(22) 99870-6841',
  whatsappDefaultMsg: 'Olá! Gostaria de um orçamento para montagem/manutenção de celular/tablet.',
  instagramUrl: 'https://www.instagram.com/hitecheletronicos/',
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJpQHbaLq0lwARw4-9Eg-uzbY',
  address: 'Av. Jane Maria Martins Figueira, 12 - Jardim Marileia, Rio das Ostras - RJ, 28896-052',
  hoursWeekday: 'Segunda a Sexta: 09:00 às 18:30',
  hoursSaturday: 'Sábado: 09:00 às 14:30',
  hoursSunday: 'Domingo: Fechado',
  holidayNote: 'Em feriados os horários podem sofrer alterações',
  pixKey: '22998706841',
  pixReceiver: 'Hi-Tech Eletrônicos',
};

// O PIN de segurança mestre para criar novas contas de administrador. 
// Você pode alterar este valor se desejar.
export const MASTER_SECURITY_PIN = "123456";

// Instead of checking length of accounts, check if a master exists by some mechanism.
// For the sake of simplification and security, we'll assume first registration or specific email gets master.
export async function registerAdmin(params: {
  name: string;
  email: string;
  password: string;
  pin: string;
}): Promise<{ success: boolean; error?: string; session?: AdminSession }> {
  try {
    if (params.pin !== MASTER_SECURITY_PIN) {
      return { success: false, error: 'O PIN de segurança está incorreto.' };
    }

    const userCredential = await createUserWithEmailAndPassword(auth, params.email, params.password);
    const user = userCredential.user;
    
    // Check if we want this to be master. For now, let's just make the user 'master' if they are the first or specific email
    const role = 'master'; // Everyone registering through the UI initially is master for this demo, or we can enforce security rules.
    
    // Update 2026: Force push fix for Vercel deployment and permission errors
    try {
      await setDoc(doc(db, 'users', user.uid), {
        name: params.name,
        email: params.email,
        role: role,
        createdAt: new Date().toISOString(),
      });
    } catch (dbError: any) {
      console.error("Database permission error after auth creation:", dbError);
      // Clean up the auth user if DB write fails so they aren't stuck in "email already in use" limbo
      try {
        await user.delete();
      } catch (e) {
        console.error("Failed to cleanup user auth record after DB failure", e);
      }
      throw new Error("Erro de permissão no banco de dados. Conta não foi criada.");
    }

    return { 
      success: true, 
      session: {
        user: { id: user.uid, name: params.name, email: params.email, role },
        loginTime: new Date().toISOString()
      } 
    };
  } catch (error: any) {
    console.error("Registration error:", error);
    let errorMessage = error.message || error;
    if (typeof errorMessage === 'string' && errorMessage.includes('email-already-in-use')) {
      errorMessage = 'Este e-mail já está cadastrado! Vá na aba "Entrar" e tente fazer o login, ou exclua a conta no Console do Firebase.';
    } else if (typeof errorMessage === 'string' && (errorMessage.includes('Missing or insufficient permissions') || errorMessage.includes('Erro de permissão'))) {
      errorMessage = 'Erro de permissão no banco de dados (o Firebase ainda está atualizando as regras). Aguarde 1 minuto e tente novamente.';
    }
    return { success: false, error: errorMessage };
  }
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; session?: AdminSession }> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    
    const role = userDoc.exists() ? userDoc.data().role : 'admin';
    const name = userDoc.exists() ? userDoc.data().name : 'Admin';

    return { 
      success: true, 
      session: {
        user: { id: userCredential.user.uid, name, email, role },
        loginTime: new Date().toISOString()
      } 
    };
  } catch (error: any) {
    return { success: false, error: 'Credenciais inválidas.' };
  }
}

export async function logoutAdmin(): Promise<void> {
  await signOut(auth);
}

export async function recoverPassword(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export function subscribeToAuthChanges(callback: (session: AdminSession | null) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.exists() ? userDoc.data().role : 'admin';
        const name = userDoc.exists() ? userDoc.data().name : 'Admin';
        
        callback({
          user: { id: user.uid, name, email: user.email || '', role },
          loginTime: new Date().toISOString()
        });
      } catch (e) {
        callback(null);
      }
    } else {
      callback(null);
    }
  });
}

