
"use client";

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Rocket, Sparkles, Zap, Target, Award, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user && user.emailVerified) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 ai-gradient opacity-10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span>Next-Gen AI Career Mentorship</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight text-primary leading-tight">
              Architect Your Career with <span className="text-accent">SkillSphere AI</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The all-in-one professional growth platform. AI roadmaps, expert courses, skill assessments, and a global networking hub.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="h-14 px-8 text-lg font-bold ai-gradient border-none shadow-xl hover:scale-105 transition-transform">
                  Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-2">
                  Sign In
                </Button>
              </Link>
            </div>
            <div className="pt-12 flex items-center justify-center gap-8 grayscale opacity-50">
               <div className="font-headline font-bold text-2xl">TRUSTED BY INNOVATORS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">Unleash Your Potential</h2>
            <p className="text-muted-foreground">Everything you need to go from learner to industry leader.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'AI Career Architect', desc: 'Personalized step-by-step roadmaps based on your aspirations.', icon: Target, color: 'text-blue-500' },
              { title: 'Skill Gap Analysis', desc: 'Identify exactly what you need to learn to land your dream job.', icon: Zap, color: 'text-yellow-500' },
              { title: 'Verified Profiles', desc: 'Showcase your achievements with an AI-verified talent score.', icon: ShieldCheck, color: 'text-green-500' },
              { title: 'Marketplace', desc: 'World-class courses from certified industry instructors.', icon: Award, color: 'text-purple-500' },
              { title: 'Global Network', desc: 'Connect with mentors and peers using AI matching.', icon: Users, color: 'text-accent' },
              { title: 'AI Assistant', desc: '24/7 career mentor ready to answer any professional question.', icon: Sparkles, color: 'text-pink-500' },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-headline mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="bg-primary rounded-3xl p-12 md:p-20 text-white text-center space-y-8 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 ai-gradient opacity-30" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-headline font-bold">Ready to join the future of work?</h2>
              <p className="text-lg text-primary-foreground/80 leading-relaxed">
                Join thousands of professionals already accelerating their careers with SkillSphere AI.
              </p>
              <Link href="/signup">
                <Button size="lg" className="h-14 px-12 text-lg font-bold bg-white text-primary hover:bg-white/90">
                  Create Your Free Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 ai-gradient rounded-lg flex items-center justify-center">
              <Rocket className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-headline font-bold">SkillSphere AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 SkillSphere AI. All rights reserved.</p>
          <div className="flex gap-6">
             <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
             <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
