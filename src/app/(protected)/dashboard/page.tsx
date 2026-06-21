"use client";

import AppLayout from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  ArrowUpRight, 
  Clock, 
  Award, 
  BookOpen, 
  Users,
  Briefcase
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const skillData = [
  { name: 'Mon', score: 65 },
  { name: 'Tue', score: 68 },
  { name: 'Wed', score: 75 },
  { name: 'Thu', score: 72 },
  { name: 'Fri', score: 80 },
  { name: 'Sat', score: 85 },
  { name: 'Sun', score: 88 },
];

const marketDemand = [
  { role: 'Product', demand: 90 },
  { role: 'UX/UI', demand: 75 },
  { role: 'Backend', demand: 85 },
  { role: 'Frontend', demand: 80 },
  { role: 'Cloud', demand: 95 },
];

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-headline font-bold">Good morning, Alex</h1>
            <p className="text-muted-foreground">Your career journey is looking promising today.</p>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 shadow-lg">
            <Plus className="mr-2 h-4 w-4" /> New Achievement
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Weekly Study Time', value: '12.5 hrs', icon: Clock, trend: '+12%', color: 'text-blue-600' },
            { label: 'Skills Mastered', value: '24', icon: Award, trend: '+3', color: 'text-purple-600' },
            { label: 'Courses Active', value: '4', icon: BookOpen, trend: '2 ending', color: 'text-teal-600' },
            { label: 'Mentor Contacts', value: '8', icon: Users, trend: '+1 new', color: 'text-indigo-600' },
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
              <CardTitle className="text-lg font-headline">Skill Proficiency Score</CardTitle>
              <CardDescription>Average mastery across all active learning paths</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={skillData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#573CED" 
                      strokeWidth={3} 
                      dot={{r: 4, fill: '#573CED', strokeWidth: 2, stroke: '#fff'}}
                      activeDot={{r: 6}}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg font-headline">Market Demand Analysis</CardTitle>
              <CardDescription>Current hiring trends for your target roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={marketDemand}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="role" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#888'}} />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                    />
                    <Bar dataKey="demand" fill="#0056D2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Job Recommendations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-headline font-bold">Recommended for You</h2>
            <Button variant="link" className="text-secondary">See all</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { company: 'Google', role: 'Staff Product Manager', location: 'Remote', salary: '$180k - $240k', match: '98%' },
              { company: 'Meta', role: 'Senior UX Strategist', location: 'Menlo Park, CA', salary: '$165k - $210k', match: '92%' },
            ].map((job, i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow border-none shadow-sm cursor-pointer group">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center shrink-0">
                    <Briefcase className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold truncate pr-2 group-hover:text-secondary transition-colors">{job.role}</h4>
                      <span className="text-xs font-bold text-accent px-2 py-0.5 bg-accent/10 rounded">{job.match} Match</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{job.company} • {job.location}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">{job.salary}</span>
                      <Button size="sm" variant="ghost" className="h-8 px-2 text-xs">
                        Details <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}