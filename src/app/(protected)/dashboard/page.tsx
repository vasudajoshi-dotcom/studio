"use client";

import AppLayout from '@/components/layout/app-layout';
import { useAuth } from '@/context/auth-context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Award, BookOpen, Clock, Zap, Loader2, ArrowRight, AlertCircle, Mail } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const { profile, user, loading } = useAuth();

  // If auth is loading, show the full page loader
  if (loading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-sm text-muted-foreground animate-pulse">Synchronizing your professional profile...</p>
        </div>
      </AppLayout>
    );
  }

  // Handle case where user isn't found (should be handled by AuthProvider redirect, but safety first)
  if (!user) return null;

  const firstName = profile?.fullName?.split(' ')[0] || user.displayName?.split(' ')[0] || 'Professional';
  const isVerified = user.emailVerified;

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        {!isVerified && (
          <Alert variant="default" className="bg-amber-50 border-amber-200 text-amber-800">
            <Mail className="h-4 w-4 text-amber-600" />
            <AlertTitle className="font-bold">Email verification is optional</AlertTitle>
            <AlertDescription className="text-sm">
              You can explore the platform now. Verification can be completed later to unlock verified badges. 
              <Link href="/verify-email" className="ml-2 font-bold underline hover:text-amber-900">
                Verify now
              </Link>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold">Good morning, {firstName}</h1>
            <p className="text-muted-foreground">Your career journey is looking promising today.</p>
          </div>
          <Link href="/roadmap">
            <Button className="bg-secondary hover:bg-secondary/90 shadow-lg font-bold">
              <Plus className="mr-2 h-4 w-4" /> New Roadmap
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Skill Score', value: profile?.skillScore || '0', icon: Award, trend: 'Global Rank', color: 'text-purple-600' },
            { label: 'Credits', value: profile?.creditPoints || '0', icon: Zap, trend: 'Lifetime', color: 'text-yellow-600' },
            { label: 'Courses', value: '0', icon: BookOpen, trend: 'Active', color: 'text-teal-600' },
            { label: 'Study Time', value: '0 hrs', icon: Clock, trend: 'Weekly', color: 'text-blue-600' },
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

          <Card className="shadow-md bg-primary text-white overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Zap className="h-32 w-32" />
             </div>
            <CardHeader>
              <CardTitle className="text-lg font-headline">AI Insight</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <p className="text-primary-foreground/80 leading-relaxed">
                Based on your profile, we've identified key growth areas. Check your <strong>Skill Gap Analysis</strong> to see which modules will boost your score the fastest.
              </p>
              <Link href="/courses">
                <Button className="w-full bg-accent hover:bg-accent/90 border-none font-bold">
                  Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}