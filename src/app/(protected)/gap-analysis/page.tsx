"use client";

import { useState } from 'react';
import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { analyzeSkillGaps, AnalyzeSkillGapsOutput } from '@/ai/flows/analyze-skill-gaps';
import { Loader2, Zap, ArrowRight, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

export default function GapAnalysisPage() {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeSkillGapsOutput | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!role) {
      toast({
        variant: "destructive",
        title: "Role required",
        description: "Please specify the job role you're aiming for.",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await analyzeSkillGaps({ desiredJobRole: role });
      setResult(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "AI was unable to complete the gap analysis. Try another role.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
            <Zap className="h-7 w-7 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-headline font-bold">Skill Gap Analysis</h1>
            <p className="text-muted-foreground">Market-driven intelligence to identify your next growth areas.</p>
          </div>
        </div>

        <Card className="border-none shadow-md overflow-hidden">
          <div className="bg-primary/5 p-6 md:p-10 text-center space-y-4">
            <h2 className="text-xl font-bold font-headline">What's your dream role?</h2>
            <div className="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto">
              <Input 
                placeholder="E.g. Senior Solutions Architect, Data Scientist..."
                className="h-12 bg-white"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <Button 
                onClick={handleAnalyze} 
                className="h-12 px-8 ai-gradient border-none font-bold"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Analyze Gaps"}
              </Button>
            </div>
          </div>
        </Card>

        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-headline">Analysis for {result.jobRole}</CardTitle>
                  <CardDescription>Based on real-time market trends and demand.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/30 p-4 rounded-lg flex gap-4">
                    <AlertCircle className="h-6 w-6 text-accent shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Gap Summary</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{result.skillGapsSummary}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" /> Essential Market Skills
                      </h4>
                      <div className="space-y-4">
                        {result.requiredSkills.map((skill, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                              <span>{skill}</span>
                              <span className="text-muted-foreground">Market Priority: High</span>
                            </div>
                            <Progress value={Math.random() * 40 + 60} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-secondary" /> Recommended Modules
                      </h4>
                      <div className="space-y-4">
                        {result.suggestedLearningModules.map((module, i) => (
                          <div key={i} className="p-4 rounded-lg border bg-white hover:border-secondary transition-colors cursor-pointer group">
                             <h5 className="font-bold text-sm group-hover:text-secondary transition-colors mb-1">{module.name}</h5>
                             <p className="text-xs text-muted-foreground leading-snug">{module.description}</p>
                             <div className="mt-3 flex items-center text-[10px] font-bold text-secondary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                               Enroll Now <ArrowRight className="ml-1 h-3 w-3" />
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
             </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}