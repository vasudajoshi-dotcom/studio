"use client";

import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Rocket, Sparkles, Zap, Target, Award, Users, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 ai-gradient rounded-lg flex items-center justify-center shadow-lg">
              <Rocket className="text-white h-5 w-5" />
            </div>
            <span className="text-xl font-headline font-bold">SkillSphere AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#network" className="hover:text-primary transition-colors">Network</Link>
            <Link href="#courses" className="hover:text-primary transition-colors">Courses</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold hover:text-primary">Login</Link>
            <Link href="/signup">
              <Button size="sm" className="ai-gradient border-none font-bold">Join Now</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full ai-gradient opacity-5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span>Next-Gen AI Career Mentorship is Here</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tight text-primary leading-[1.1]">
              Architect Your <span className="text-accent">Career Future</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The all-in-one professional growth platform. AI roadmaps, expert courses, skill assessments, and a global networking hub.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link href="/signup">
                <Button size="lg" className="h-16 px-10 text-lg font-bold ai-gradient border-none shadow-2xl hover:scale-105 transition-all">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <img src={`https://picsum.photos/seed/${i+10}/32/32`} alt="user" />
                    </div>
                  ))}
                </div>
                <span>Joined by 10,000+ professionals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-headline font-bold">Unleash Your Potential</h2>
            <p className="text-xl text-muted-foreground">Everything you need to go from a curious learner to an industry leader.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'AI Career Architect', desc: 'Personalized step-by-step roadmaps based on your aspirations and real market data.', icon: Target, color: 'text-blue-500' },
              { title: 'Skill Gap Analysis', desc: 'Identify exactly what you need to learn to land your dream job with AI precision.', icon: Zap, color: 'text-yellow-500' },
              { title: 'Verified Profiles', desc: 'Showcase your achievements with an AI-verified talent score and blockchain badges.', icon: ShieldCheck, color: 'text-green-500' },
              { title: 'Expert Marketplace', desc: 'World-class courses from certified industry instructors and tech giants.', icon: Award, color: 'text-purple-500' },
              { title: 'Global Network', desc: 'Connect with mentors and peers using advanced AI matching algorithms.', icon: Users, color: 'text-accent' },
              { title: '24/7 AI Mentor', desc: 'An AI career coach ready to answer any professional question, anytime.', icon: Sparkles, color: 'text-pink-500' },
            ].map((feature, i) => (
              <div key={i} className="group relative p-10 rounded-3xl bg-white border shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${feature.color}`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold font-headline mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{feature.desc}</p>
                <div className="absolute bottom-6 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ArrowRight className="h-6 w-6 text-accent" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Call to Action */}
      <section className="py-32 relative overflow-hidden">
        <div className="container px-4 mx-auto relative z-10">
          <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-white text-center space-y-10 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 ai-gradient opacity-40" />
            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-7xl font-headline font-bold leading-tight">Ready to join the future of work?</h2>
              <p className="text-xl md:text-2xl text-primary-foreground/80 leading-relaxed">
                Join thousands of professionals already accelerating their careers with SkillSphere AI.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/signup">
                  <Button size="lg" className="h-16 px-12 text-lg font-bold bg-white text-primary hover:bg-white/90 shadow-xl">
                    Create Free Account
                  </Button>
                </Link>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Sparkles key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <span className="text-sm font-bold text-white/60">4.9/5 Trust Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t bg-muted/20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 ai-gradient rounded-xl flex items-center justify-center shadow-lg">
                  <Rocket className="text-white h-6 w-6" />
                </div>
                <span className="text-2xl font-headline font-bold">SkillSphere AI</span>
              </div>
              <p className="text-muted-foreground max-w-sm">
                Empowering the next generation of digital professionals through AI-driven education and networking.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Career Roadmaps</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Skill Assessments</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Course Marketplace</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t">
            <p className="text-sm text-muted-foreground">© 2024 SkillSphere AI. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Users className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Target className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Award className="h-5 w-5" /></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
