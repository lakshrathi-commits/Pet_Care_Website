"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Video, Clock, Star, TrendingUp, Award } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "Basic Obedience Training for Puppies",
    category: "Dogs",
    difficulty: "Beginner",
    duration: "5 min read",
    image: "/puppy-training-article.jpg",
    excerpt: "Learn the fundamentals of teaching your puppy basic commands like sit, stay, and come.",
    author: "Sarah Johnson",
    date: "Jan 15, 2025",
  },
  {
    id: 2,
    title: "Litter Box Training for Kittens",
    category: "Cats",
    difficulty: "Beginner",
    duration: "4 min read",
    image: "/kitten-litter-training.jpg",
    excerpt: "Step-by-step guide to successfully litter train your new kitten.",
    author: "Mike Chen",
    date: "Jan 12, 2025",
  },
  {
    id: 3,
    title: "Advanced Agility Training",
    category: "Dogs",
    difficulty: "Advanced",
    duration: "8 min read",
    image: "/agility-training.jpg",
    excerpt: "Take your dog's training to the next level with agility courses and advanced techniques.",
    author: "Emily Rodriguez",
    date: "Jan 10, 2025",
  },
  {
    id: 4,
    title: "Stopping Destructive Scratching",
    category: "Cats",
    difficulty: "Intermediate",
    duration: "6 min read",
    image: "/cat-scratching-behavior.jpg",
    excerpt: "Effective strategies to redirect your cat's scratching behavior to appropriate surfaces.",
    author: "David Lee",
    date: "Jan 8, 2025",
  },
  {
    id: 5,
    title: "Leash Training Made Easy",
    category: "Dogs",
    difficulty: "Beginner",
    duration: "5 min read",
    image: "/leash-training.jpg",
    excerpt: "Master the art of walking your dog without pulling or tugging on the leash.",
    author: "Sarah Johnson",
    date: "Jan 5, 2025",
  },
  {
    id: 6,
    title: "Socializing Your Pet",
    category: "Both",
    difficulty: "Intermediate",
    duration: "7 min read",
    image: "/pet-socialization.jpg",
    excerpt: "Tips for helping your pet become comfortable around other animals and people.",
    author: "Mike Chen",
    date: "Jan 3, 2025",
  },
]

const videos = [
  {
    id: 1,
    title: "Teaching Your Dog to Sit",
    category: "Dogs",
    duration: "3:45",
    views: "125K",
    thumbnail: "/sit-command-video.jpg",
  },
  {
    id: 2,
    title: "Cat Clicker Training Basics",
    category: "Cats",
    duration: "5:20",
    views: "89K",
    thumbnail: "/cat-clicker-training.jpg",
  },
  {
    id: 3,
    title: "Stop Jumping on Guests",
    category: "Dogs",
    duration: "4:15",
    views: "156K",
    thumbnail: "/stop-jumping-video.jpg",
  },
  {
    id: 4,
    title: "Recall Training for Dogs",
    category: "Dogs",
    duration: "6:30",
    views: "203K",
    thumbnail: "/recall-training-video.jpg",
  },
]

export default function TrainingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || article.category.toLowerCase() === selectedCategory || article.category === "Both"
    return matchesSearch && matchesCategory
  })

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || video.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Pet <span className="text-primary">Training</span> Tips
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-pretty">
              Expert advice, tutorials, and videos to help you train your pet effectively
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="sticky top-16 z-40 bg-surface/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
              <Input
                placeholder="Search training tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full border-border bg-background"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                className={`rounded-full ${selectedCategory === "all" ? "bg-primary text-surface" : "bg-transparent"}`}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "dogs" ? "default" : "outline"}
                className={`rounded-full ${selectedCategory === "dogs" ? "bg-primary text-surface" : "bg-transparent"}`}
                onClick={() => setSelectedCategory("dogs")}
              >
                Dogs
              </Button>
              <Button
                variant={selectedCategory === "cats" ? "default" : "outline"}
                className={`rounded-full ${selectedCategory === "cats" ? "bg-primary text-surface" : "bg-transparent"}`}
                onClick={() => setSelectedCategory("cats")}
              >
                Cats
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="articles" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-muted">
            <TabsTrigger value="articles">
              <BookOpen className="w-4 h-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card
                  key={article.id}
                  className="group border-border hover:border-primary hover:shadow-xl transition-all"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm text-foreground border-0">
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          article.difficulty === "Beginner"
                            ? "border-success text-success"
                            : article.difficulty === "Intermediate"
                              ? "border-warning text-warning"
                              : "border-destructive text-destructive"
                        }
                      >
                        {article.difficulty}
                      </Badge>
                      <span className="text-sm text-foreground-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-foreground-muted line-clamp-2 leading-relaxed">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="text-xs text-foreground-muted">
                        <p className="font-medium text-foreground">{article.author}</p>
                        <p>{article.date}</p>
                      </div>
                      <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  className="group border-border hover:border-primary hover:shadow-xl transition-all"
                >
                  <div className="aspect-video relative overflow-hidden cursor-pointer">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                        <Video className="w-8 h-8 text-surface" />
                      </div>
                    </div>
                    <Badge className="absolute bottom-3 right-3 bg-black/80 text-surface border-0">
                      {video.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-foreground-muted">
                      <span>{video.views} views</span>
                      <Badge variant="outline" className="text-xs">
                        {video.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Popular Topics */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Popular Training Topics</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Award, title: "Basic Commands", count: "24 guides" },
              { icon: TrendingUp, title: "Behavior Issues", count: "18 guides" },
              { icon: Star, title: "Advanced Skills", count: "12 guides" },
              { icon: BookOpen, title: "Puppy Training", count: "15 guides" },
            ].map((topic, index) => {
              const Icon = topic.icon
              return (
                <Card
                  key={index}
                  className="border-border hover:border-primary hover:shadow-lg transition-all cursor-pointer"
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{topic.title}</h3>
                    <p className="text-sm text-foreground-muted">{topic.count}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
