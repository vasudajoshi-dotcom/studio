
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
  Plus,
  Mail,
  Loader2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, profile, loading } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </AppLayout>
    );
  }

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your professional details have been synchronized.",
    });
  };

  const displayName = profile?.fullName || user?.displayName || 'SkillSphere Professional';
  const email = profile?.email || user?.email;

  return (
    <AppLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Profile Header */}
        <Card className="border-none shadow-xl overflow-hidden relative">
          <div className="h-32 ai-gradient w-full" />
          <CardContent className="relative px-6 pb-6 -mt-12">
            <div className="flex flex-col md:flex-row items-end gap-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white shadow-2xl bg-white">
                  <AvatarImage src={profile?.photoURL || user?.photoURL || ""} />
                  <AvatarFallback className="text-4xl">{displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                {user?.emailVerified && (
                  <div className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1.5 border-4 border-white">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-headline font-bold">{displayName}</h1>
                  {user?.emailVerified && <Badge className="bg-secondary/10 text-secondary border-secondary/20">verified</Badge>}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground font-medium mt-1">
                  <Mail className="h-4 w-4" />
                  <span>{email}</span>
                </div>
                <div className="flex gap-4 mt-3">
                  <span className="text-xs font-bold text-accent px-2 py-1 bg-accent/10 rounded">{profile?.creditPoints || 0} Credits</span>
                  <span className="text-xs font-bold text-secondary px-2 py-1 bg-secondary/10 rounded">Skill Score: {profile?.skillScore || 0}</span>
                </div>
              </div>
              <div className="pb-2">
                <Button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)} 
                  variant={isEditing ? "default" : "outline"}
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
                    <CardDescription>Share your unique professional story.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {profile?.bio || "No bio added yet. Click edit to tell the community about your professional journey and aspirations."}
                    </p>
                    <div className="space-y-3">
                      <Label className="font-bold">Core Skills</Label>
                      <div className="flex flex-wrap gap-2">
                        {profile?.skills?.length ? (
                          profile.skills.map((skill: string) => (
                            <Badge key={skill} variant="secondary" className="px-3 py-1">{skill}</Badge>
                          ))
                        ) : (
                          <span className="text-xs text-muted-foreground italic">No skills listed yet.</span>
                        )}
                        {isEditing && <Button size="sm" variant="ghost" className="h-6 gap-1 px-2 border-dashed border"><Plus className="h-3 w-3" /> Add</Button>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Professional Links</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                      <Github className="h-5 w-5 text-foreground" />
                      <div className="text-xs">
                        <p className="font-bold">GitHub</p>
                        <p className="text-muted-foreground truncate max-w-[120px]">{profile?.githubProfile || "Not connected"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                      <Linkedin className="h-5 w-5 text-blue-600" />
                      <div className="text-xs">
                        <p className="font-bold">LinkedIn</p>
                        <p className="text-muted-foreground truncate max-w-[120px]">{profile?.linkedinProfile || "Not connected"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/20">
                      <LinkIcon className="h-5 w-5 text-secondary" />
                      <div className="text-xs">
                        <p className="font-bold">Portfolio</p>
                        <p className="text-muted-foreground truncate max-w-[120px]">{profile?.portfolioLink || "Not connected"}</p>
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
                  <span className="text-2xl font-bold">45%</span>
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Growing</Badge>
                </div>
                <Progress value={45} className="h-2 mb-4" />
                <p className="text-[11px] text-muted-foreground">Complete your skills and bio to reach 100% and get noticed by recruiters.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-primary text-white">
              <CardHeader>
                <CardTitle className="text-lg font-headline">AI Career Readiness</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span>Market Compatibility</span>
                  <span className="font-bold text-accent">--%</span>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[0%]" />
                </div>
                <Button variant="secondary" className="w-full text-xs font-bold" onClick={() => toast({ title: "Analysis Coming Soon" })}>
                  Analyze Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
