import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface AdminUser {
  displayName: string;
  email: string;
  photoURL: string | null;
}

interface NavigationContextType {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  adminSubView: AdminSubView;
  setAdminSubView: (subView: AdminSubView) => void;
  user: AdminUser | null;
  isAdmin: boolean;
  authLoading: boolean;
  loginWithCredentials: (u: string, p: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveViewInternal] = useState<ActiveView>(() => {
    const saved = localStorage.getItem('shauransh_active_view');
    return (saved as ActiveView) || 'home';
  });

  const [adminSubView, setAdminSubViewInternal] = useState<AdminSubView>(() => {
    const saved = localStorage.getItem('shauransh_admin_subview');
    return (saved as AdminSubView) || 'dashboard';
  });

  const [user, setUser] = useState<AdminUser | null>(() => {
    const savedUser = localStorage.getItem('shauransh_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

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

  const isAdmin = user !== null && user.email === 'rayashbrothers@gmail.com';

  useEffect(() => {
    // Elegant system clearance delay
    const timer = setTimeout(() => {
      setAuthLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const loginWithCredentials = async (u: string, p: string): Promise<boolean> => {
    setAuthLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600)); // Deluxe mock delay for security feel

    if (u === 'yash' && p === 'yash') {
      const loggedInAdmin: AdminUser = {
        displayName: 'Yash Malhotra',
        email: 'rayashbrothers@gmail.com',
        photoURL: null,
      };
      setUser(loggedInAdmin);
      localStorage.setItem('shauransh_admin_user', JSON.stringify(loggedInAdmin));
      setAuthLoading(false);
      return true;
    } else {
      setAuthLoading(false);
      throw new Error('Invalid Secure Access Credentials.');
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setUser(null);
    localStorage.removeItem('shauransh_admin_user');
    setActiveView('home');
    setAuthLoading(false);
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
        loginWithCredentials,
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
