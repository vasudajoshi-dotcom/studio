"use client";

import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Star, Clock, Users, Search, Filter, PlayCircle } from 'lucide-react';
import Image from 'next/image';

const courses = [
  {
    id: 1,
    title: "AI Product Management Masterclass",
    instructor: "Dr. Sarah Chen",
    rating: 4.9,
    reviews: 1250,
    duration: "24h 15m",
    students: "15k+",
    price: "$89.99",
    category: "AI & Tech",
    image: "https://picsum.photos/seed/course1/600/400"
  },
  {
    id: 2,
    title: "Advanced Cloud Architecture on AWS",
    instructor: "Marcus Aurelius",
    rating: 4.8,
    reviews: 840,
    duration: "42h 00m",
    students: "8k+",
    price: "$129.99",
    category: "Cloud",
    image: "https://picsum.photos/seed/course2/600/400"
  },
  {
    id: 3,
    title: "Strategic Business Leadership",
    instructor: "Elena Rodriguez",
    rating: 4.7,
    reviews: 2100,
    duration: "18h 30m",
    students: "32k+",
    price: "Free",
    category: "Business",
    image: "https://picsum.photos/seed/course3/600/400"
  },
  {
    id: 4,
    title: "Machine Learning Operations (MLOps)",
    instructor: "Kevin Zhang",
    rating: 4.9,
    reviews: 560,
    duration: "35h 20m",
    students: "4k+",
    price: "$149.99",
    category: "AI & Tech",
    image: "https://picsum.photos/seed/course4/600/400"
  }
];

export default function CoursesPage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="bg-primary text-white rounded-2xl p-8 md:p-12 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full ai-gradient opacity-20 blur-3xl transform translate-x-1/2" />
          <div className="relative z-10 max-w-2xl">
            <Badge className="mb-4 bg-accent text-white border-none px-3 py-1">New Curriculum</Badge>
            <h1 className="text-4xl font-headline font-bold mb-4">Master high-demand skills with SkillSphere AI.</h1>
            <p className="text-primary-foreground/80 text-lg mb-8">Access world-class education curated by industry veterans and powered by artificial intelligence.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="What do you want to learn?" className="bg-white text-black h-12 pl-10 border-none rounded-xl" />
              </div>
              <Button className="h-12 px-8 bg-secondary hover:bg-secondary/90 font-bold rounded-xl border-none">Search Catalog</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2">
            {['All', 'AI & Tech', 'Cloud', 'Business', 'Design'].map(cat => (
              <Button key={cat} variant={cat === 'All' ? 'secondary' : 'outline'} size="sm" className="rounded-full px-5">
                {cat}
              </Button>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filter & Sort
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row h-full">
              <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0">
                <Image 
                  src={course.image} 
                  alt={course.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint="educational course"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest">{course.category}</Badge>
                    <span className="font-bold text-lg text-secondary">{course.price}</span>
                  </div>
                  <h3 className="text-lg font-bold font-headline mb-1 group-hover:text-secondary transition-colors leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">By {course.instructor}</p>
                </div>
                
                <div className="space-y-4">
                   <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-foreground">{course.rating}</span>
                      <span>({course.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-muted hover:bg-secondary hover:text-white text-foreground font-bold border-none transition-all">
                    Enroll Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}