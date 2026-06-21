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
        
        // Use a timeout to ensure we don't block indefinitely on profile fetch
        const profileTimeout = setTimeout(() => {
          if (loading) {
            console.warn("Profile fetch took too long, using fallback.");
            setLoading(false);
          }
        }, 3000);

        const unsubscribeProfile = onSnapshot(profileRef, (docSnap) => {
          clearTimeout(profileTimeout);
          console.timeEnd("Profile-Fetch");
          
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            console.log("No Firestore profile found, using Auth defaults.");
            // Create a temporary profile object from Auth data
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
          console.error("Firestore listener error:", error);
          clearTimeout(profileTimeout);
          setLoading(false);
        });

        // Basic redirect logic: If on landing, login or signup, go to dashboard
        const publicPaths = ['/login', '/signup', '/reset-password', '/'];
        if (publicPaths.includes(pathname) && pathname !== '/') {
           console.log("Redirecting to dashboard...");
           router.push('/dashboard');
        }

        return () => unsubscribeProfile();
      } else {
        setProfile(null);
        setLoading(false);
        
        const publicPaths = ['/login', '/signup', '/reset-password', '/'];
        if (!publicPaths.includes(pathname)) {
          console.log("Unauthenticated access to protected route, redirecting to login.");
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

  // Prevent blank screen by always rendering a fallback loader if loading takes too long
  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);