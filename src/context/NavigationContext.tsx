import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signOut, 
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export type ActiveView = 
  | 'home' 
  | 'personal-loan' 
  | 'business-loan' 
  | 'home-loan' 
  | 'vehicle-loan' 
  | 'financial-solutions' 
  | 'insurance' 
  | 'authorized';

export type AdminSubView = 'dashboard' | 'crm' | 'analytics' | 'settings';

interface NavigationContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  adminSubView: AdminSubView;
  setAdminSubView: (subView: AdminSubView) => void;
  user: FirebaseUser | null;
  isAdmin: boolean;
  authLoading: boolean;
  loginWithGoogle: () => Promise<FirebaseUser | null>;
  logout: () => Promise<void>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check localStorage for saved view state to survive refreshes gracefully
  const [activeView, setActiveViewInternal] = useState<ActiveView>(() => {
    const saved = localStorage.getItem('shauransh_active_view');
    return (saved as ActiveView) || 'home';
  });

  const [adminSubView, setAdminSubViewInternal] = useState<AdminSubView>(() => {
    const saved = localStorage.getItem('shauransh_admin_subview');
    return (saved as AdminSubView) || 'dashboard';
  });

  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Sync state to local storage and scroll to top smoothly
  const setActiveView = (view: ActiveView) => {
    setActiveViewInternal(view);
    localStorage.setItem('shauransh_active_view', view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const setAdminSubView = (subView: AdminSubView) => {
    setAdminSubViewInternal(subView);
    localStorage.setItem('shauransh_admin_subview', subView);
  };

  const allowedEmail = 'rayashbrothers@gmail.com';
  const isAdmin = user !== null && user.email === allowedEmail;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      setAuthLoading(true);
      // Force Google Account prompt to allow switching accounts if needed
      googleProvider.setCustomParameters({
        prompt: 'select_account'
      });
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      return result.user;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      setAuthLoading(true);
      await signOut(auth);
      setUser(null);
      setActiveView('home');
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        activeView,
        setActiveView,
        adminSubView,
        setAdminSubView,
        user,
        isAdmin,
        authLoading,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
