
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut, reload } from 'firebase/auth';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';

interface UserProfile extends DocumentData {
  fullName: string;
  email: string;
  creditPoints: number;
  skillScore: number;
  isInstructor: boolean;
  emailVerified: boolean;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const refreshUser = async () => {
    if (auth.currentUser) {
      console.log("AuthProvider: Reloading current user...");
      await reload(auth.currentUser);
      setUser({ ...auth.currentUser });
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      // Basic state update
      setUser(currentUser);
      
      if (currentUser) {
        // 1. Mandatory Reload to check real emailVerified status
        try {
          await reload(currentUser);
          setUser({ ...auth.currentUser! });
        } catch (e) {
          console.error("Auth reload failed:", e);
        }

        const isVerified = auth.currentUser?.emailVerified;
        const publicPaths = ['/login', '/signup', '/reset-password', '/'];
        const isPublicPath = publicPaths.includes(pathname);

        // 2. Mandatory Verification Check
        if (!isVerified && !isPublicPath && pathname !== '/verify-email') {
          console.log("Enforcement: User not verified, redirecting to verify-email");
          router.push('/verify-email');
          setLoading(false);
          return;
        }

        // 3. Prevent verified users from seeing verification page
        if (isVerified && pathname === '/verify-email') {
          router.push('/dashboard');
        }

        // 4. Firestore Profile Fetch
        const profileRef = doc(db, 'users', currentUser.uid);
        const unsubscribeProfile = onSnapshot(profileRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            setProfile({
              fullName: currentUser.displayName || 'Professional',
              email: currentUser.email || '',
              creditPoints: 0,
              skillScore: 0,
              isInstructor: false,
              emailVerified: !!isVerified,
              photoURL: currentUser.photoURL || undefined
            });
          }
          setLoading(false);
        }, (error) => {
          console.error("Firestore Profile Error:", error);
          setLoading(false);
        });

        // Redirect logged-in verified users away from auth pages (except root)
        if (isPublicPath && pathname !== '/' && isVerified) {
           router.push('/dashboard');
        }

        return () => unsubscribeProfile();
      } else {
        setProfile(null);
        setLoading(false);
        
        const publicPaths = ['/login', '/signup', '/reset-password', '/'];
        if (!publicPaths.includes(pathname)) {
          router.push('/login');
        }
      }
    });

    return () => unsubscribeAuth();
  }, [pathname, router]);

  const logout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
