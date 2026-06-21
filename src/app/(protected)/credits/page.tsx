"use client";

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  History, 
  Gift, 
  ArrowUpRight, 
  ArrowDownLeft,
  CheckCircle2,
  Trophy,
  Star
} from 'lucide-react';

const creditHistory = [
  { id: 1, type: 'earn', amount: 50, activity: 'Completed "AI Product Management" Quiz', date: '2024-05-20' },
  { id: 2, type: 'earn', amount: 10, activity: 'Daily Platform Activity', date: '2024-05-19' },
  { id: 3, type: 'spend', amount: 200, activity: 'Enrolled in "Advanced Cloud Architecture"', date: '2024-05-18' },
  { id: 4, type: 'earn', amount: 100, activity: 'Achievement: Profile 100% Complete', date: '2024-05-15' },
];

export default function CreditsPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold">Credit Wallet</h1>
            <p className="text-muted-foreground">Manage your SkillSphere credits and unlock premium rewards.</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90 gap-2">
            <Gift className="h-4 w-4" /> Redeem Rewards
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="ai-gradient text-white border-none shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4">
            <Zap className="w-64 h-64" />
          </div>
          <CardContent className="p-8 md:p-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="text-center md:text-left">
                <p className="text-sm font-bold uppercase tracking-widest text-white/70 mb-2">Total Balance</p>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <h2 className="text-6xl font-headline font-bold">850</h2>
                  <Zap className="h-10 w-10 text-accent fill-accent animate-pulse" />
                </div>
              </div>
              <div className="h-px w-full md:h-16 md:w-px bg-white/20" />
              <div className="grid grid-cols-2 gap-8 text-center md:text-left">
                <div>
                  <p className="text-xs font-bold text-white/60 mb-1">Earned this month</p>
                  <p className="text-xl font-bold">+240</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-white/60 mb-1">Lifetime Earned</p>
                  <p className="text-xl font-bold">2,450</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          {/* History */}
          <Card className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Credit History</CardTitle>
                <CardDescription>Recent activity and transactions</CardDescription>
              </div>
              <History className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {creditHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${item.type === 'earn' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {item.type === 'earn' ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold group-hover:text-secondary transition-colors">{item.activity}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                    <div className={`font-bold ${item.type === 'earn' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.type === 'earn' ? '+' : '-'}{item.amount}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-6 text-muted-foreground text-xs uppercase tracking-widest font-bold">Load More Activity</Button>
            </CardContent>
          </Card>

          {/* How to earn */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-muted/30">
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <Star className="h-4 w-4 text-secondary" /> Ways to Earn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Complete a Quiz', reward: '50-100' },
                  { label: 'Daily Activity', reward: '10' },
                  { label: 'Refer a Colleague', reward: '200' },
                  { label: 'Teach a Course', reward: '500+' },
                ].map((way, i) => (
                  <div key={i} className="flex items-center justify-between text-sm bg-white p-3 rounded-lg border">
                    <span className="font-medium">{way.label}</span>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-none">{way.reward} pts</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm overflow-hidden bg-secondary text-white">
               <CardContent className="p-6 space-y-4">
                  <Trophy className="h-10 w-10 text-white/80" />
                  <h3 className="font-bold text-lg leading-tight">Elite Membership</h3>
                  <p className="text-xs text-white/70">Reach 5,000 lifetime credits to unlock the Elite Badge and priority AI mentor support.</p>
                  <Button className="w-full bg-white text-secondary hover:bg-white/90 font-bold text-xs uppercase tracking-widest">Upgrade Now</Button>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
