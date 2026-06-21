"use client";

import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  Map, 
  BookOpen, 
  Bell, 
  Menu, 
  LogOut, 
  Zap,
  Rocket,
  Trophy,
  User as UserIcon,
  Home
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, logout } = useAuth();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Career Roadmap', icon: Map, href: '/roadmap' },
    { name: 'Skill Gaps', icon: Zap, href: '/gap-analysis' },
    { name: 'Courses', icon: BookOpen, href: '/courses' },
    { name: 'Leaderboard', icon: Trophy, href: '/leaderboard' },
    { name: 'Feed', icon: Home, href: '/feed' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 ai-gradient rounded-lg flex items-center justify-center">
                <Rocket className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-headline font-bold hidden sm:inline-block">SkillSphere AI</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border border-white"></span>
            </Button>
            <div className="flex items-center gap-3">
              <Link href="/profile">
                <Avatar className="h-9 w-9 border cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                  <AvatarImage src={profile?.photoURL || ""} />
                  <AvatarFallback>{profile?.fullName?.charAt(0) || <UserIcon className="h-4 w-4" />}</AvatarFallback>
                </Avatar>
              </Link>
              <div className="hidden lg:block text-sm">
                <p className="font-bold leading-none">{profile?.fullName || user?.displayName || 'SkillSphere Pro'}</p>
                <p className="text-muted-foreground text-[10px] mt-1 uppercase tracking-widest">Active Member</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-[1400px] mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className={cn(
          "md:block fixed inset-0 z-40 bg-white md:relative md:bg-transparent transition-transform duration-300 md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col gap-6 pt-20 md:pt-0 px-4 md:px-0">
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
            <div className="mt-auto">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 h-11"
                onClick={logout}
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </Button>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}