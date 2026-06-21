
"use client";

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Users, UserPlus, MessageCircle, Filter, Sparkles, TrendingUp } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior AI Engineer @ Nvidia",
    match: "98% Match",
    skills: ["PyTorch", "NLP", "CUDA"],
    interests: ["Generative AI", "Edge Computing"],
    avatar: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    id: 2,
    name: "Marcus Aurelius",
    role: "Full Stack Lead @ AWS",
    match: "92% Match",
    skills: ["React", "Go", "Serverless"],
    interests: ["Scalability", "DevOps"],
    avatar: "https://picsum.photos/seed/marcus/100/100"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "UX Strategy Director @ Meta",
    match: "85% Match",
    skills: ["Figma", "Design Thinking"],
    interests: ["Accessibility", "VR/AR"],
    avatar: "https://picsum.photos/seed/elena/100/100"
  }
];

export default function NetworkPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold">Networking Hub</h1>
            <p className="text-muted-foreground">Expand your professional circle with AI-driven recommendations.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
             <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search domains, roles, or people..." className="pl-9 bg-white" />
             </div>
             <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <div className="space-y-8">
            {/* AI Recommendations */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <h2 className="text-xl font-headline font-bold">People You Should Connect With</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {recommendations.map((person) => (
                  <Card key={person.id} className="group hover:shadow-xl transition-all border-none shadow-sm overflow-hidden bg-white">
                    <CardContent className="p-0">
                      <div className="h-16 ai-gradient opacity-10 group-hover:opacity-20 transition-opacity" />
                      <div className="p-5 -mt-10 text-center">
                        <Avatar className="h-20 w-20 border-4 border-white mx-auto shadow-lg mb-3">
                          <AvatarImage src={person.avatar} />
                          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h4 className="font-bold text-lg group-hover:text-secondary transition-colors">{person.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{person.role}</p>
                        <Badge className="bg-accent/10 text-accent border-none mb-4">{person.match}</Badge>
                        
                        <div className="flex flex-wrap justify-center gap-1 mb-6 h-12 overflow-hidden">
                          {person.skills.map(s => <span key={s} className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{s}</span>)}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button size="sm" className="gap-2 bg-secondary hover:bg-secondary/90">
                            <UserPlus className="h-4 w-4" /> Connect
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2">
                            <MessageCircle className="h-4 w-4" /> Chat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity Feed Snippet or other content */}
            <div className="bg-muted/30 p-8 rounded-2xl text-center border-2 border-dashed border-muted">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-bold text-lg">Build Your Global Network</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
                Connect with professionals from around the world. Every connection earns you 10 credits and boosts your career readiness score.
              </p>
              <Button variant="secondary">Invite Colleagues</Button>
            </div>
          </div>

          <aside className="space-y-6">
            <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Network Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Connections</span>
                  <span className="font-bold">142</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Pending Requests</span>
                  <span className="font-bold text-accent">8</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Profile Views</span>
                  <span className="font-bold text-green-600">+12%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="bg-accent/5">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" /> Trending Domains
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {['Quantum Computing', 'Web3 Architect', 'Biotech AI', 'Green Fintech'].map(domain => (
                  <div key={domain} className="flex items-center justify-between text-xs p-2 hover:bg-muted/30 rounded cursor-pointer transition-colors">
                    <span className="font-medium">{domain}</span>
                    <span className="text-[10px] text-muted-foreground">4.2k active</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
