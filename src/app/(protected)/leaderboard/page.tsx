
"use client";

import AppLayout from '@/components/layout/app-layout';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { 
  Trophy, 
  Medal, 
  TrendingUp, 
  Zap,
  Target,
  ArrowUp,
  Award,
  Loader2
} from 'lucide-react';

export default function LeaderboardPage() {
  const { user } = useAuth();
  
  // Real Firestore Query for top users
  const usersQuery = query(
    collection(db, 'users'),
    orderBy('skillScore', 'desc'),
    limit(50)
  );
  
  const [usersData, loading, error] = useCollectionData(usersQuery);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-accent" />
          <p className="text-muted-foreground font-medium">Fetching global rankings...</p>
        </div>
      </AppLayout>
    );
  }

  // Fallback or empty state
  const rankings = usersData || [];
  const top3 = rankings.slice(0, 3);
  const others = rankings.slice(3);

  return (
    <AppLayout>
      <div className="space-y-8 pb-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <Badge className="bg-accent/10 text-accent border-none px-4 py-1">Season 1: AI Pioneers</Badge>
          <h1 className="text-4xl font-headline font-bold">Global Leaderboard</h1>
          <p className="text-muted-foreground">Recognizing the most dedicated learners and experts in the community.</p>
        </div>

        {/* Top 3 Podium */}
        {top3.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-12 max-w-5xl mx-auto">
            {/* Second Place */}
            {top3[1] && (
              <div className="order-2 md:order-1">
                <Card className="border-none shadow-sm bg-white text-center pb-8 pt-12 relative overflow-visible">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <Avatar className="h-20 w-20 border-4 border-slate-200 shadow-xl">
                      <AvatarImage src={top3[1].photoURL || ""} />
                      <AvatarFallback>{top3[1].fullName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-200 text-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-white">2</div>
                  </div>
                  <CardContent className="pt-4 space-y-1">
                    <h4 className="font-bold truncate px-4">{top3[1].fullName}</h4>
                    <p className="text-xs text-muted-foreground">{top3[1].branch || "Professional"}</p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none">{top3[1].skillScore} pts</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* First Place */}
            <div className="order-1 md:order-2">
              <Card className="border-none shadow-xl bg-white text-center pb-12 pt-16 relative overflow-visible ring-4 ring-yellow-400/20 scale-105">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <Trophy className="h-10 w-10 text-yellow-400 absolute -top-8 left-1/2 -translate-x-1/2 animate-bounce" />
                  <Avatar className="h-28 w-28 border-4 border-yellow-400 shadow-2xl">
                    <AvatarImage src={top3[0].photoURL || ""} />
                    <AvatarFallback>{top3[0].fullName?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 border-white text-lg">1</div>
                </div>
                <CardContent className="pt-4 space-y-1">
                  <h4 className="text-xl font-bold font-headline truncate px-4">{top3[0].fullName}</h4>
                  <p className="text-sm text-muted-foreground">{top3[0].branch || "Professional"}</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Badge className="bg-accent text-white border-none py-1 px-4">{top3[0].skillScore} pts</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Third Place */}
            {top3[2] && (
              <div className="order-3 md:order-3">
                <Card className="border-none shadow-sm bg-white text-center pb-8 pt-12 relative overflow-visible">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                    <Avatar className="h-20 w-20 border-4 border-amber-600/30 shadow-xl">
                      <AvatarImage src={top3[2].photoURL || ""} />
                      <AvatarFallback>{top3[2].fullName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-white">3</div>
                  </div>
                  <CardContent className="pt-4 space-y-1">
                    <h4 className="font-bold truncate px-4">{top3[2].fullName}</h4>
                    <p className="text-xs text-muted-foreground">{top3[2].branch || "Professional"}</p>
                    <div className="flex items-center justify-center gap-2 mt-4">
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none">{top3[2].skillScore} pts</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* List Rankings */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Tabs defaultValue="skill" className="w-full sm:w-auto">
              <TabsList className="bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="skill" className="rounded-lg px-6">Skill Score</TabsTrigger>
                <TabsTrigger value="credits" className="rounded-lg px-6">Credits</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <TrendingUp className="h-4 w-4" /> Live Standings
            </div>
          </div>

          <Card className="border-none shadow-sm overflow-hidden bg-white">
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
                  {rankings.map((userItem, index) => (
                    <tr key={userItem.uid} className={userItem.uid === user?.uid ? "bg-accent/5 border-l-4 border-l-accent" : "hover:bg-muted/10 transition-colors"}>
                      <td className="px-6 py-4">
                        <span className={`font-bold ${index < 3 ? "text-accent" : "text-muted-foreground"}`}>
                          #{index + 1}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 border">
                            <AvatarImage src={userItem.photoURL || ""} />
                            <AvatarFallback>{userItem.fullName?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-bold">{userItem.fullName} {userItem.uid === user?.uid && <span className="text-[10px] bg-accent text-white px-1.5 py-0.5 rounded ml-1">You</span>}</p>
                            <p className="text-[10px] text-muted-foreground">{userItem.branch || "New Professional"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-sm">{userItem.skillScore || 0}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-xs font-medium">
                          <Zap className="h-3 w-3 text-secondary fill-secondary" /> {userItem.creditPoints || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          <Award className="h-4 w-4 text-slate-400" />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600">
                           <ArrowUp className="h-3 w-3" /> --
                         </div>
                      </td>
                    </tr>
                  ))}
                  {rankings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground font-medium">
                        No ranking data available yet. Start learning to climb the ranks!
                      </td>
                    </tr>
                  )}
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
              <h3 className="text-2xl font-headline font-bold">Rise to the top!</h3>
              <p className="text-primary-foreground/80 leading-relaxed max-w-xl">
                Complete more skill assessments and courses to increase your Skill Score. Higher scores unlock exclusive networking opportunities and badges.
              </p>
            </div>
            <Link href="/courses">
              <Button className="bg-accent hover:bg-accent/90 border-none font-bold py-6 px-10">Start Learning</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
