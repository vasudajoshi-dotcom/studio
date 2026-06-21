
"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Send, X, MessageSquare, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am your SkillSphere AI Mentor. How can I help you accelerate your career today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    // Simulated AI response for now - integrate with Genkit flow later
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I've analyzed your request about "${userMsg}". Based on your current skill score of 85, I recommend focusing on "Advanced System Design" to bridge the gap for Staff Engineer roles.` 
      }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl ai-gradient border-none z-50 hover:scale-110 transition-transform"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[500px] shadow-2xl z-50 border-none flex flex-col glass-card overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <CardHeader className="ai-gradient text-white p-4">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <CardTitle className="text-sm font-headline font-bold">SkillSphere AI Assistant</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0 flex flex-col bg-background/50 backdrop-blur-sm">
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={cn("flex items-start gap-2 max-w-[85%]", m.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center shrink-0", m.role === 'user' ? "bg-secondary" : "ai-gradient")}>
                      {m.role === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                    </div>
                    <div className={cn("p-3 rounded-2xl text-sm shadow-sm", m.role === 'user' ? "bg-secondary text-white rounded-tr-none" : "bg-white border rounded-tl-none")}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-xs">Architecting response...</span>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="p-4 border-t bg-white">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <Input 
                  placeholder="Ask about courses, career paths..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-muted/50 border-none focus-visible:ring-1"
                />
                <Button type="submit" size="icon" className="ai-gradient border-none shrink-0" disabled={loading}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
