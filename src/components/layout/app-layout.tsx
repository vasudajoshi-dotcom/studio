
"use client";

import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Home, 
  LayoutDashboard, 
  Map, 
  BookOpen, 
  Search, 
  Bell, 
  Menu, 
  LogOut, 
  Target,
  Zap,
  TrendingUp,
  Rocket,
  Trophy,
  User as UserIcon
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Career Roadmap', icon: Map, href: '/roadmap' },
    { name: 'Skill Gap Analysis', icon: Zap, href: '/gap-analysis' },
    { name: 'Courses', icon: BookOpen, href: '/courses' },
    { name: 'Leaderboard', icon: Trophy, href: '/leaderboard' },
    { name: 'Credits', icon: Zap, href: '/credits' },
    { name: 'Feed', icon: Home, href: '/feed' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 md:gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 ai-gradient rounded-lg flex items-center justify-center">
                <Rocket className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-headline font-bold hidden sm:inline-block">SkillSphere AI</span>
            </Link>
            <div className="hidden md:flex relative w-64 lg:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search resources, paths..."
                className="w-full bg-muted/50 rounded-md py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring border-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative h-10 w-10">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
            </Button>
            <div className="flex items-center gap-3">
              <Link href="/profile">
                <Avatar className="h-9 w-9 border cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                  <AvatarImage src={user?.photoURL || ""} />
                  <AvatarFallback>{user?.displayName?.charAt(0) || <UserIcon className="h-4 w-4" />}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="hidden lg:block text-sm">
                <p className="font-bold leading-none">{user?.displayName || 'SkillSphere Pro'}</p>
                <p className="text-muted-foreground text-[10px] mt-1 font-medium tracking-wider uppercase">Active Member</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-[1400px] mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr_300px] gap-8">
        
        {/* Sticky Sidebar */}
        <aside className={cn(
          "md:block fixed inset-0 z-40 bg-white md:relative md:bg-transparent transition-transform duration-300 md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="h-full md:h-auto flex flex-col gap-6 pt-20 md:pt-0 px-4 md:px-0">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button 
                    variant={pathname === item.href ? "secondary" : "ghost"} 
                    className="w-full justify-start gap-3 h-11"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-secondary" : "text-muted-foreground")} />
                    <span className="font-medium">{item.name}</span>
                  </Button>
                </Link>
              ))}
            </div>

            <Separator />

            <div>
              <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4 px-3">Trending Domains</h3>
              <div className="space-y-3">
                {['AI Ethics', 'Cloud Architecture', 'Web3 Strategy'].map(skill => (
                  <div key={skill} className="flex items-center gap-2 px-3 text-muted-foreground hover:text-primary transition-colors cursor-pointer group">
                    <TrendingUp className="h-4 w-4 text-secondary/50 group-hover:text-secondary" />
                    <span className="text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto md:mt-8 pb-12 md:pb-0">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 h-11"
                onClick={() => {
                   setIsMobileMenuOpen(false);
                   logout();
                }}
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </Button>
            </div>
          </div>
        </aside>

        {/* Central Feed/Content */}
        <main className="min-w-0">
          {children}
        </main>

        {/* Right Career Progress Sidebar */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-headline font-bold text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                My Target
              </h3>
              <Link href="/profile">
                 <Button variant="ghost" size="sm" className="text-xs text-secondary h-7">Update</Button>
              </Link>
            </div>
            <p className="text-sm font-bold mb-1">Senior Solutions Engineer</p>
            <p className="text-[10px] text-muted-foreground mb-4 uppercase tracking-wider">Goal Quarter: Q4 2025</p>
            <Progress value={45} className="h-2 mb-2" />
            <p className="text-[10px] text-right text-muted-foreground font-bold">45% Path Complete</p>
          </div>

          <div className="bg-white rounded-xl border p-6 shadow-sm">
            <h3 className="font-headline font-bold text-lg mb-4">Top Modules</h3>
            <div className="space-y-6">
              {[
                { title: 'System Design Fundamentals', progress: 75 },
                { title: 'AI Integration Masterclass', progress: 20 },
              ].map((m) => (
                <div key={m.title}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-bold truncate pr-2">{m.title}</span>
                    <span className="text-muted-foreground shrink-0">{m.progress}%</span>
                  </div>
                  <Progress value={m.progress} className="h-1.5" />
                </div>
              ))}
            </div>
            <Link href="/courses">
              <Button variant="outline" className="w-full mt-6 text-xs h-9 font-bold">Resume Learning</Button>
            </Link>
          </div>

          <div className="bg-primary text-white rounded-xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 -translate-y-1/4 translate-x-1/4 group-hover:scale-110 transition-transform">
               <Zap className="h-32 w-32" />
            </div>
            <h3 className="font-headline font-bold text-lg mb-3 relative z-10">AI Insights</h3>
            <p className="text-xs text-primary-foreground/80 leading-relaxed mb-6 relative z-10">
              Users with your profile are transitioning to <strong>Lead Roles</strong> by completing System Design paths.
            </p>
            <Link href="/roadmap" className="relative z-10">
              <Button className="w-full bg-accent hover:bg-accent/90 border-none font-bold text-xs">Architect My Path</Button>
            </Link>
          </div>
        </aside>

      </div>
    </div>
  );
}
