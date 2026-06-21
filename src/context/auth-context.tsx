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
      console.log("Refreshing Auth User...");
      await reload(auth.currentUser);
      setUser({ ...auth.currentUser });
    }
  };

  useEffect(() => {
    console.time("Auth-State-Init");
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      console.timeEnd("Auth-State-Init");
      setUser(currentUser);
      
      if (currentUser) {
        console.time("Profile-Fetch");
        const profileRef = doc(db, 'users', currentUser.uid);
        
        // Ensure the loading state is resolved even if profile fetch is slow
        const profileTimeout = setTimeout(() => {
          if (loading) {
            console.warn("Profile fetch timeout, proceeding with Auth defaults.");
            setLoading(false);
          }
        }, 5000);

        const unsubscribeProfile = onSnapshot(profileRef, (docSnap) => {
          clearTimeout(profileTimeout);
          console.timeEnd("Profile-Fetch");
          
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            console.log("No Firestore profile found, fallback to Auth data.");
            setProfile({
              fullName: currentUser.displayName || 'Professional',
              email: currentUser.email || '',
              creditPoints: 0,
              skillScore: 0,
              isInstructor: false,
              emailVerified: currentUser.emailVerified,
              photoURL: currentUser.photoURL || undefined
            });
          }
          setLoading(false);
        }, (error) => {
          console.error("Firestore Profile Error:", error);
          clearTimeout(profileTimeout);
          setLoading(false);
        });

        // Basic non-blocking redirect
        const publicPaths = ['/login', '/signup', '/reset-password', '/'];
        if (publicPaths.includes(pathname) && pathname !== '/') {
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
