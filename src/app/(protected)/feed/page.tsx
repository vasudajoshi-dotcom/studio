"use client";

import AppLayout from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, Image as ImageIcon, Video, Calendar, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const posts = [
  {
    id: 1,
    author: "Elena Rodriguez",
    role: "Senior UX Director @ Google",
    content: "Thrilled to share that we just launched our new AI-first design system! It focuses on adaptive accessibility and truly conversational interfaces. Can't wait for everyone to try it out. #AI #UXDesign #GoogleDesign",
    likes: 428,
    comments: 56,
    time: "2h ago",
    avatar: "https://picsum.photos/seed/user1/100/100"
  },
  {
    id: 2,
    author: "Marcus Aurelius",
    role: "Cloud Architect @ AWS",
    content: "Just completed the SkillSphere AI Career Roadmap. The transition from Backend to Solutions Architect feels so much more achievable now. Highly recommend the AI Architect tool! 🚀",
    likes: 156,
    comments: 12,
    time: "5h ago",
    avatar: "https://picsum.photos/seed/user2/100/100"
  }
];

export default function FeedPage() {
  return (
    <AppLayout>
      <div className="space-y-6 max-w-2xl mx-auto">
        {/* Create Post */}
        <Card className="shadow-sm border-none bg-white">
          <CardContent className="p-4 pt-6">
            <div className="flex gap-4 mb-4">
              <Avatar className="h-12 w-12 shrink-0">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <Textarea 
                placeholder="Share an achievement, insight, or ask for help..."
                className="bg-muted/30 border-none resize-none min-h-[60px] focus-visible:ring-1"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between pt-2 border-t">
              <div className="flex gap-1 sm:gap-4">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary h-9">
                  <ImageIcon className="mr-2 h-4 w-4 text-blue-500" /> <span className="hidden sm:inline">Media</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary h-9">
                  <Video className="mr-2 h-4 w-4 text-green-500" /> <span className="hidden sm:inline">Video</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary h-9">
                  <Calendar className="mr-2 h-4 w-4 text-orange-500" /> <span className="hidden sm:inline">Event</span>
                </Button>
              </div>
              <Button size="sm" className="bg-secondary px-6">Post</Button>
            </div>
          </CardContent>
        </Card>

        {/* Posts */}
        {posts.map((post) => (
          <Card key={post.id} className="shadow-sm border-none bg-white">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-sm hover:text-secondary hover:underline cursor-pointer">{post.author}</h4>
                  <p className="text-[11px] text-muted-foreground">{post.role}</p>
                  <p className="text-[10px] text-muted-foreground">{post.time}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="py-4">
              <p className="text-sm leading-relaxed whitespace-pre-line">{post.content}</p>
            </CardContent>
            <CardFooter className="flex flex-col border-t pt-2 gap-2">
              <div className="flex items-center justify-between w-full text-[11px] text-muted-foreground px-2">
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-white">
                      <ThumbsUp className="h-2 w-2 text-white fill-white" />
                    </div>
                  </div>
                  <span>{post.likes}</span>
                </div>
                <span>{post.comments} comments</span>
              </div>
              <div className="flex items-center justify-between w-full border-t pt-2">
                <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-secondary h-9">
                  <ThumbsUp className="h-4 w-4" /> Like
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-secondary h-9">
                  <MessageSquare className="h-4 w-4" /> Comment
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-secondary h-9">
                  <Share2 className="h-4 w-4" /> Repost
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 gap-2 text-muted-foreground hover:text-secondary h-9">
                  <Send className="h-4 w-4" /> Send
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}