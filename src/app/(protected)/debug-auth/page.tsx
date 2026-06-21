"use client";

import { useAuth } from '@/context/auth-context';
import AppLayout from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, Mail, Info } from 'lucide-react';

export default function DebugAuthPage() {
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const handleManualSend = async () => {
    if (!auth.currentUser) return;
    try {
      console.log("DEBUG: Manually triggered sendEmailVerification()");
      await sendEmailVerification(auth.currentUser);
      console.log("DEBUG: sendEmailVerification() successful");
      toast({ title: "Email Sent", description: "Verification link sent to " + auth.currentUser.email });
    } catch (e: any) {
      console.error("DEBUG: sendEmailVerification() failed", e);
      toast({ variant: "destructive", title: "Failed", description: e.message });
    }
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold font-headline">Auth Debug Console</h1>
        
        <Card className="border-accent/20 bg-accent/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-accent" />
              Live Account Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="font-bold">Display Name (Auth):</div>
              <div>{user?.displayName || "Not set"}</div>
              
              <div className="font-bold">Full Name (Firestore):</div>
              <div>{profile?.fullName || "Not found"}</div>
              
              <div className="font-bold">Email:</div>
              <div>{user?.email}</div>
              
              <div className="font-bold">Email Verified:</div>
              <div className={user?.emailVerified ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                {user?.emailVerified ? "TRUE" : "FALSE"}
              </div>
              
              <div className="font-bold">User UID:</div>
              <div className="font-mono text-[10px] break-all">{user?.uid}</div>
            </div>
            
            <div className="pt-4 space-y-2">
              <Button onClick={handleManualSend} className="w-full gap-2">
                <Mail className="h-4 w-4" /> Trigger Verification Email
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-none">
          <CardContent className="p-4 flex gap-3 text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0" />
            <p>
              If emails are not arriving, check your Firebase Console Settings > Authentication > Templates to ensure the email template is enabled. Also verify your domain is authorized.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
