"use client";

import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Rocket, Loader2, Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("--- Signup Flow Started ---");
      
      // 1. Create Account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Step 1: User created successfully. UID:", user.uid);
      
      // 2. Update Auth Profile
      await updateProfile(user, { displayName: name });
      console.log("Step 2: Auth Profile updated with name:", name);
      
      // 3. Create Firestore Profile Document
      await setDoc(doc(db, 'users', user.uid), {
        fullName: name,
        email: email,
        uid: user.uid,
        creditPoints: 0,
        skillScore: 0,
        createdAt: serverTimestamp(),
        isInstructor: false,
        emailVerified: false,
      });
      console.log("Step 3: Firestore user document created.");
      
      // 4. Send Verification Email - CRITICAL
      console.log("Step 4: Requesting verification email for:", user.email);
      try {
        await sendEmailVerification(user);
        console.log("RESULT: Verification email sent successfully to:", user.email);
        toast({
          title: "Account Created",
          description: "Verification email sent. Please check your inbox, spam, and updates folders.",
        });
      } catch (verifyError: any) {
        console.error("RESULT: Verification email FAILED to send:", verifyError.message);
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: `Account created, but we couldn't send the email: ${verifyError.message}`,
        });
      }
      
      console.log("--- Signup Flow Completed ---");
      router.push('/verify-email');
    } catch (error: any) {
      console.error("CRITICAL: Signup process aborted due to error:", error.message);
      toast({
        variant: "destructive",
        title: "Sign up Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
             <div className="w-12 h-12 ai-gradient rounded-xl flex items-center justify-center">
                <Rocket className="text-white h-7 w-7" />
             </div>
          </div>
          <CardTitle className="text-2xl font-headline font-bold">Create Account</CardTitle>
          <CardDescription>Join SkillSphere AI to accelerate your career growth</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  required 
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full font-semibold h-11" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-secondary font-medium hover:underline">Login</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
