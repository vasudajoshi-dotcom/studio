
"use client";

import { useState, useEffect } from 'react';
import { sendEmailVerification, reload } from 'firebase/auth';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, RefreshCw, LogOut, CheckCircle2, Loader2 } from 'lucide-react';
import { auth } from '@/lib/firebase';

export default function VerifyEmailPage() {
  const { user, logout, loading: authLoading, refreshUser } = useAuth();
  const [resending, setResending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // If user is already verified and the app hasn't redirected yet, do it now
    if (!authLoading && user?.emailVerified) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleResend = async () => {
    if (!auth.currentUser) return;
    setResending(true);
    try {
      await sendEmailVerification(auth.currentUser);
      toast({
        title: "Verification Sent",
        description: "A new link has been sent to your email address.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Resend Failed",
        description: error.message || "Failed to resend email.",
      });
    } finally {
      setResending(false);
    }
  };

  const handleRefresh = async () => {
    if (!auth.currentUser) return;
    setRefreshing(true);
    try {
      // 1. Reload the user from Firebase Auth servers
      await reload(auth.currentUser);
      
      // 2. Trigger AuthContext update
      await refreshUser();
      
      if (auth.currentUser.emailVerified) {
        toast({
          title: "Email Verified!",
          description: "Welcome to SkillSphere AI. Access granted.",
        });
        router.push('/dashboard');
      } else {
        toast({
          title: "Not Yet Verified",
          description: "We haven't received confirmation yet. Please check your inbox and click the link.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Refresh Failed",
        description: "Could not refresh account status. Please try again.",
      });
    } finally {
      setRefreshing(false);
    }
  };

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-accent" />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-accent">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
             <div className="w-12 h-12 ai-gradient rounded-xl flex items-center justify-center">
                <Mail className="text-white h-7 w-7" />
             </div>
          </div>
          <CardTitle className="text-2xl font-headline font-bold">Action Required</CardTitle>
          <CardDescription>
            You must verify your email <span className="font-semibold text-primary">{user?.email || auth.currentUser?.email}</span> to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4 text-center">
          <div className="bg-muted/50 p-6 rounded-2xl flex flex-col items-center gap-4">
            <CheckCircle2 className="h-10 w-10 text-slate-300" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Check your inbox (and spam/promotions) for a verification link. Click the link to unlock your dashboard.
            </p>
          </div>
          
          <div className="space-y-2">
            <Button 
              variant="default" 
              className="w-full gap-2 font-semibold h-11 bg-accent hover:bg-accent/90" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              I've verified my email
            </Button>
            <Button 
              variant="outline" 
              className="w-full gap-2 text-muted-foreground h-11" 
              onClick={handleResend}
              disabled={resending}
            >
              {resending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Resend verification email
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <Button variant="link" className="text-destructive gap-2 h-auto p-0" onClick={logout}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
