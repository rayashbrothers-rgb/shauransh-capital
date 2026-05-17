import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function getSettings(key: string) {
  try {
    const docRef = doc(db, 'settings', key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    // Return defaults if not found
    if (key === 'emi_rates') {
      return { homeLoan: 8.5, personalLoan: 10.5, vehicleLoan: 9.5 };
    }
    return null;
  } catch (error) {
    console.error(`Error getting settings for ${key}:`, error);
    // Return defaults on error to keep app running
    if (key === 'emi_rates') {
      return { homeLoan: 8.5, personalLoan: 10.5, vehicleLoan: 9.5 };
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
