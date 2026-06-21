"use client";

import { useState } from 'react';
import AppLayout from '@/components/layout/app-layout';
import { useAuth } from '@/context/auth-context';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Book, 
  Briefcase, 
  Award, 
  Link as LinkIcon, 
  Github, 
  Linkedin, 
  CheckCircle2, 
  Edit3, 
  Save,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your professional details have been synchronized.",
    });
  };

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Profile Header */}
        <Card className="border-none shadow-xl overflow-hidden relative">
          <div className="h-32 ai-gradient w-full" />
          <CardContent className="relative px-6 pb-6 -mt-12">
            <div className="flex flex-col md:flex-row items-end gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-2xl">
                  <AvatarImage src={user?.photoURL || ""} />
                  <AvatarFallback className="text-4xl">{user?.displayName?.charAt(0) || user?.email?.charAt(0)}</AvatarFallback>
                </Avatar>
                {user?.emailVerified && (
                  <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1.5 border-4 border-white">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-headline font-bold">{user?.displayName || 'SkillSphere Professional'}</h1>
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20">verified</Badge>
                </div>
                <p className="text-muted-foreground font-medium">{user?.email}</p>
                <div className="flex gap-4 mt-3">
                  <span className="text-xs font-bold text-accent px-2 py-1 bg-accent/10 rounded">850 Credits</span>
                  <span className="text-xs font-bold text-secondary px-2 py-1 bg-secondary/10 rounded">Skill Score: 92</span>
                </div>
              </div>
              <div className="pb-2">
                <Button 
                  onClick={() => setIsEditing(!isEditing)} 
                  variant={isEditing ? "outline" : "default"}
                  className="gap-2"
                >
                  {isEditing ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                  {isEditing ? "Save Profile" : "Edit Profile"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-8">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="bg-muted/50 p-1 rounded-xl w-full justify-start overflow-x-auto h-auto">
                <TabsTrigger value="about" className="rounded-lg gap-2 px-6"><User className="h-4 w-4" /> About</TabsTrigger>
                <TabsTrigger value="experience" className="rounded-lg gap-2 px-6"><Briefcase className="h-4 w-4" /> Experience</TabsTrigger>
                <TabsTrigger value="education" className="rounded-lg gap-2 px-6"><Book className="h-4 w-4" /> Education</TabsTrigger>
                <TabsTrigger value="achievements" className="rounded-lg gap-2 px-6"><Award className="h-4 w-4" /> Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6 space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Bio & Skills</CardTitle>
                    <CardDescription>Tell the community about your professional journey.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Passionate professional focused on cloud-native solutions and AI integration. Building scalable web applications and mastering modern tech stacks.
                    </p>
                    <div className="space-y-3">
                      <Label className="font-bold">Core Skills</Label>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Node.js', 'AWS', 'Python', 'Machine Learning'].map(skill => (
                          <Badge key={skill} variant="secondary" className="px-3 py-1">{skill}</Badge>
                        ))}
                        {isEditing && <Button size="sm" variant="ghost" className="h-6 gap-1 px-2 border-dashed border"><Plus className="h-3 w-3" /> Add</Button>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Social Connections</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                      <Github className="h-5 w-5 text-foreground" />
                      <div className="text-xs">
                        <p className="font-bold">GitHub</p>
                        <p className="text-muted-foreground">Profile Link</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                      <Linkedin className="h-5 w-5 text-blue-600" />
                      <div className="text-xs">
                        <p className="font-bold">LinkedIn</p>
                        <p className="text-muted-foreground">Professional Link</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                      <LinkIcon className="h-5 w-5 text-secondary" />
                      <div className="text-xs">
                        <p className="font-bold">Portfolio</p>
                        <p className="text-muted-foreground">Personal Site</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Profile Strength</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">85%</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Strong</Badge>
                </div>
                <Progress value={85} className="h-2 mb-4" />
                <p className="text-[11px] text-muted-foreground">Add your portfolio link to reach 100% and get noticed by recruiters.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-primary text-white">
              <CardHeader>
                <CardTitle className="text-lg font-headline">Career Readiness</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span>Market Compatibility</span>
                  <span className="font-bold text-accent">92%</span>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[92%]" />
                </div>
                <Button className="w-full bg-white text-primary hover:bg-white/90 text-xs font-bold">Get Full Analysis</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
