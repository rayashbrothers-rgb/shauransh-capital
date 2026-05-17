import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function getSettings(key: string) {
  const defaultRates = { homeLoan: 8.5, personalLoan: 10.5, vehicleLoan: 9.5 };

  try {
    const docRef = doc(db, 'settings', key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    // Return defaults if not found
    if (key === 'emi_rates') {
      return defaultRates;
    }
    return null;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Don't log expected offline errors to console to improve DX
    if (!errorMessage.includes('offline') && !errorMessage.includes('Could not reach')) {
      console.error(`Error getting settings for ${key}:`, error);
    }
    
    // Return defaults on error to keep app running
    if (key === 'emi_rates') {
      return defaultRates;
    }
    return null;
  }
}

export async function saveSettings(key: string, data: any) {
  try {
    const docRef = doc(db, 'settings', key);
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error(`Error saving settings for ${key}:`, error);
    return false;
  }
}
