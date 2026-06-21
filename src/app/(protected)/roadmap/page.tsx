"use client";

import { useState } from 'react';
import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { generateCareerRoadmap, GenerateCareerRoadmapOutput } from '@/ai/flows/generate-career-roadmap';
import { Loader2, MapPin, CheckCircle, Sparkles, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CareerRoadmapPage() {
  const [background, setBackground] = useState('');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<GenerateCareerRoadmapOutput['roadmap'] | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!background || !interests) {
      toast({
        variant: "destructive",
        title: "Incomplete details",
        description: "Please provide both background and career interests.",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generateCareerRoadmap({ professionalBackground: background, interests });
      setRoadmap(result.roadmap);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating your roadmap. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-headline font-bold text-primary">AI Career Architect</h1>
          <p className="text-muted-foreground text-lg">Your personalized roadmap to professional excellence.</p>
        </div>

        {!roadmap ? (
          <Card className="shadow-xl border-t-4 border-t-accent overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Sparkles className="w-32 h-32 text-accent" />
            </div>
            <CardHeader>
              <CardTitle className="font-headline">Construct Your Roadmap</CardTitle>
              <CardDescription>Provide details about your current standing and where you want to go.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Professional Background</label>
                <Textarea 
                  placeholder="E.g. I have 3 years of experience as a Junior Web Developer specializing in React and Node.js..."
                  className="min-h-[120px]"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Career Interests & Aspirations</label>
                <Textarea 
                  placeholder="E.g. I want to transition into Cloud Architecture and eventually lead a DevOps team at a major tech firm..."
                  className="min-h-[120px]"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleGenerate} 
                className="w-full h-12 text-lg font-bold ai-gradient border-none shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Architecting Roadmap...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate AI Roadmap
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-12">
            <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium">Plan generated for: <span className="text-primary">{interests.substring(0, 30)}...</span></p>
              <Button variant="outline" size="sm" onClick={() => setRoadmap(null)}>Redesign Roadmap</Button>
            </div>

            <div className="relative">
              {/* Timeline Connector */}
              <div className="absolute left-6 top-4 bottom-4 w-1 bg-gradient-to-b from-accent to-secondary hidden md:block" />

              <div className="space-y-12">
                {roadmap.map((stage, i) => (
                  <div key={i} className="relative md:pl-20">
                    {/* Circle Indicator */}
                    <div className="absolute left-2 md:left-4 top-1 w-10 h-10 rounded-full bg-white border-4 border-accent flex items-center justify-center z-10 shadow-lg">
                      <span className="text-accent font-bold text-sm">{i + 1}</span>
                    </div>

                    <Card className="shadow-md hover:shadow-xl transition-shadow border-none bg-white">
                      <CardHeader>
                        <CardTitle className="text-2xl font-headline text-primary">{stage.stage}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">{stage.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                            <PlusCircle className="h-4 w-4" /> Recommended Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {stage.recommendedSkills.map((skill, j) => (
                              <span key={j} className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full border border-secondary/20">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" /> Action Items
                          </h4>
                          <ul className="space-y-3">
                            {stage.actions.map((action, k) => (
                              <li key={k} className="text-sm flex items-start gap-3">
                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center pt-8">
               <Button variant="outline" className="gap-2">
                 <MapPin className="h-4 w-4" /> Save Roadmap to Profile
               </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}