"use client";

import AppLayout from '@/components/layout/app-layout';
import { useAuth } from '@/context/auth-context';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Award, BookOpen, Clock, Zap, Loader2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

const skillData = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 68 },
  { name: 'Wed', score: 75 },
  { name: 'Thu', score: 72 },
  { name: 'Fri', score: 80 },
  { name: 'Sat', score: 85 },
  { name: 'Sun', score: 88 },
];

export default function DashboardPage() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </AppLayout>
    );
  }

  const name = profile?.fullName?.split(' ')[0] || 'Professional';

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold">Good morning, {name}</h1>
            <p className="text-muted-foreground">Your career journey is looking promising today.</p>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 shadow-lg">
            <Plus className="mr-2 h-4 w-4" /> New Achievement
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Skill Score', value: profile?.skillScore || '0', icon: Award, trend: 'Top 10%', color: 'text-purple-600' },
            { label: 'Credits', value: profile?.creditPoints || '0', icon: Zap, trend: '+10', color: 'text-yellow-600' },
            { label: 'Courses', value: '0', icon: BookOpen, trend: '0 active', color: 'text-teal-600' },
            { label: 'Study Time', value: '0 hrs', icon: Clock, trend: 'New', color: 'text-blue-600' },
          ].map((stat, i) => (
            <Card key={i} className="shadow-sm border-none bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-muted/50 ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{stat.trend}</span>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Skill Proficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={skillData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#573CED" strokeWidth={3} dot={{r: 4}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md bg-primary text-white">
            <CardHeader>
              <CardTitle className="text-lg font-headline">AI Insight</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-primary-foreground/80 leading-relaxed">
                Based on your profile, users with similar skills are currently trending towards <strong>Full Stack Architecture</strong>. Consider starting the "Advanced React Patterns" module.
              </p>
              <Button className="w-full bg-accent hover:bg-accent/90 border-none font-bold">Start Learning</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}