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
      await reload(auth.currentUser);
      setUser({ ...auth.currentUser });
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Real-time listener for user profile data
        const profileRef = doc(db, 'users', currentUser.uid);
        const unsubscribeProfile = onSnapshot(profileRef, (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            setProfile(null);
          }
          setLoading(false);
        });

        const publicPaths = ['/login', '/signup', '/reset-password', '/'];
        const isPublicPath = publicPaths.includes(pathname);
        const isVerifyPath = pathname === '/verify-email';

        // Enforce email verification for protected routes
        if (!currentUser.emailVerified && !isPublicPath && !isVerifyPath) {
          router.push('/verify-email');
        } else if (currentUser.emailVerified && isVerifyPath) {
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
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
