import { doc, getDoc, setDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { StoreSettings, InstagramPost } from '../types';
import { DEFAULT_STORE_SETTINGS } from '../utils/adminAuth';

export async function getFirebaseStoreSettings(): Promise<StoreSettings> {
  try {
    const docRef = doc(db, 'storeSettings', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...DEFAULT_STORE_SETTINGS, ...docSnap.data() } as StoreSettings;
    }
  } catch (error) {
    console.error('Error fetching store settings:', error);
  }
  return DEFAULT_STORE_SETTINGS;
}

export async function saveFirebaseStoreSettings(settings: StoreSettings): Promise<void> {
  try {
    const docRef = doc(db, 'storeSettings', 'main');
    await setDoc(docRef, { ...settings, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Error saving store settings:', error);
    throw error;
  }
}

export async function getFirebasePosts(): Promise<InstagramPost[]> {
  try {
    const snapshot = await getDocs(collection(db, 'posts'));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as InstagramPost));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function saveFirebasePost(post: InstagramPost): Promise<void> {
  try {
    const docRef = doc(db, 'posts', post.id);
    await setDoc(docRef, { ...post, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
}

export async function deleteFirebasePost(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}
