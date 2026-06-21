"use client";

import AppLayout from '@/components/layout/app-layout';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Medal, 
  TrendingUp, 
  Zap,
  Target,
  ArrowUp,
  Award
} from 'lucide-react';

export default function LeaderboardPage() {
  const { user } = useAuth();
  
  const rankings = [
    { id: 1, name: "Sarah Chen", role: "AI Engineer", score: 9820, credits: 4200, trend: 'up', avatar: "https://picsum.photos/seed/sarah/100/100", rank: 1 },
    { id: 2, name: "Marcus Aurelius", role: "Cloud Architect", score: 9450, credits: 3850, trend: 'up', avatar: "https://picsum.photos/seed/marcus/100/100", rank: 2 },
    { id: 3, name: "Elena Rodriguez", role: "UX Director", score: 9120, credits: 2900, trend: 'down', avatar: "https://picsum.photos/seed/elena/100/100", rank: 3 },
    { id: 4, name: "Kevin Zhang", role: "Data Scientist", score: 8850, credits: 3100, trend: 'up', avatar: "https://picsum.photos/seed/kevin/100/100", rank: 4 },
    { id: 5, name: user?.displayName || "SkillSphere User", role: "Professional", score: 8200, credits: 850, trend: 'up', avatar: user?.photoURL || "https://picsum.photos/seed/user/100/100", rank: 24, isUser: true },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <Badge className="bg-accent/10 text-accent border-none px-4 py-1">Season 1: AI Pioneers</Badge>
          <h1 className="text-4xl font-headline font-bold">Global Leaderboard</h1>
          <p className="text-muted-foreground">Recognizing the most dedicated learners and experts in the SkillSphere community.</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-12">
          {/* Second Place */}
          <div className="order-2 md:order-1">
            <Card className="border-none shadow-sm bg-white text-center pb-8 pt-12 relative overflow-visible">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <Avatar className="h-20 w-20 border-4 border-slate-200 shadow-xl">
                  <AvatarImage src={rankings[1].avatar} />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-white">2</div>
              </div>
              <CardContent className="pt-4 space-y-1">
                <h4 className="font-bold">{rankings[1].name}</h4>
                <p className="text-xs text-muted-foreground">{rankings[1].role}</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none">{rankings[1].score} pts</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* First Place */}
          <div className="order-1 md:order-2">
            <Card className="border-none shadow-xl bg-white text-center pb-12 pt-16 relative overflow-visible ring-4 ring-yellow-400/20 scale-105">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                <Trophy className="h-10 w-10 text-yellow-400 absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce" />
                <Avatar className="h-28 w-28 border-4 border-yellow-400 shadow-2xl">
                  <AvatarImage src={rankings[0].avatar} />
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white text-lg">1</div>
              </div>
              <CardContent className="pt-4 space-y-1">
                <h4 className="text-xl font-bold font-headline">{rankings[0].name}</h4>
                <p className="text-sm text-muted-foreground">{rankings[0].role}</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Badge className="bg-accent text-white border-none py-1 px-4">{rankings[0].score} pts</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Third Place */}
          <div className="order-3 md:order-3">
            <Card className="border-none shadow-sm bg-white text-center pb-8 pt-12 relative overflow-visible">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <Avatar className="h-20 w-20 border-4 border-amber-600/30 shadow-xl">
                  <AvatarImage src={rankings[2].avatar} />
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-white">3</div>
              </div>
              <CardContent className="pt-4 space-y-1">
                <h4 className="font-bold">{rankings[2].name}</h4>
                <p className="text-xs text-muted-foreground">{rankings[2].role}</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none">{rankings[2].score} pts</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* List Rankings */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Tabs defaultValue="skill" className="w-full sm:w-auto">
              <TabsList className="bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="skill" className="rounded-lg px-6">Skill Score</TabsTrigger>
                <TabsTrigger value="credits" className="rounded-lg px-6">Credits</TabsTrigger>
                <TabsTrigger value="quizzes" className="rounded-lg px-6">Quiz Wins</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <TrendingUp className="h-4 w-4" /> Updated every hour
            </div>
          </div>

          <Card className="border-none shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-muted/30 border-b text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Professional</th>
                    <th className="px-6 py-4">Skill Score</th>
                    <th className="px-6 py-4">Credits</th>
                    <th className="px-6 py-4">Badges</th>
                    <th className="px-6 py-4 text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {rankings.map((userItem) => (
                    <tr key={userItem.id} className={userItem.isUser ? "bg-accent/5 border-l-4 border-l-accent" : "hover:bg-muted/10 transition-colors"}>
                      <td className="px-6 py-4">
                        <span className={`font-bold ${userItem.rank <= 3 ? "text-accent" : "text-muted-foreground"}`}>
                          #{userItem.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border">
                            <AvatarImage src={userItem.avatar} />
                            <AvatarFallback>{userItem.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-bold">{userItem.name} {userItem.isUser && <span className="text-[10px] bg-accent text-white px-1.5 py-0.5 rounded ml-1">You</span>}</p>
                            <p className="text-[10px] text-muted-foreground">{userItem.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-sm">{userItem.score}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-xs font-medium">
                          <Zap className="h-3 w-3 text-secondary fill-secondary" /> {userItem.credits}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <Medal className="h-4 w-4 text-slate-400" />
                          <Award className="h-4 w-4 text-slate-400" />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className={`inline-flex items-center gap-1 text-[10px] font-bold ${userItem.trend === 'up' ? "text-green-600" : "text-red-600"}`}>
                           {userItem.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
                           {userItem.trend === 'up' ? "3 pos" : "1 pos"}
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        {/* Comparison Insight */}
        <Card className="bg-primary text-white border-none shadow-xl">
          <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-white/20 p-4 rounded-2xl">
              <Target className="h-12 w-12 text-accent" />
            </div>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-headline font-bold">You're in the top 5% of Professionals!</h3>
              <p className="text-primary-foreground/80 leading-relaxed">
                Complete the "Stakeholder Management" assessment to potentially jump 8 ranks and enter the Global Top 20.
              </p>
            </div>
            <Button className="bg-accent hover:bg-accent/90 border-none font-bold py-6 px-10">Start Assessment</Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
