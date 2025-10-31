"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Video, Clock, Star, TrendingUp, Award, X } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "Basic Obedience Training for Puppies",
    category: "Dogs",
    difficulty: "Beginner",
    duration: "5 min read",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500",
    excerpt: "Learn the fundamentals of teaching your puppy basic commands like sit, stay, and come.",
    fullContent: `
# Basic Obedience Training for Puppies

## Getting Started
Training your puppy is one of the most important things you can do as a new pet owner. Starting early helps establish good behaviors and strengthens the bond between you and your furry friend.

## Essential Commands

### 1. Sit Command
- Hold a treat close to your puppy's nose
- Slowly move your hand up, allowing their head to follow the treat
- As their head moves up, their bottom should naturally touch the ground
- Say "Sit" and give the treat immediately
- Practice 5-10 times daily

### 2. Stay Command
- Start with your puppy in the sit position
- Hold your hand up in a "stop" gesture
- Take one step back and say "Stay"
- Wait 2-3 seconds, then return and reward
- Gradually increase distance and duration

### 3. Come Command
- Start in a secure, enclosed area
- Get down to your puppy's level
- Say "Come" in an excited, happy voice
- When they come to you, reward generously
- Never call your puppy to come for something negative

## Tips for Success
- Keep training sessions short (5-10 minutes)
- Use high-value treats your puppy loves
- Be consistent with commands and rewards
- End on a positive note
- Practice daily for best results

Remember, patience and consistency are key to successful puppy training!
    `,
    author: "Sarah Johnson",
    date: "Jan 15, 2025",
  },
  {
    id: 2,
    title: "Litter Box Training for Kittens",
    category: "Cats",
    difficulty: "Beginner",
    duration: "4 min read",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500",
    excerpt: "Step-by-step guide to successfully litter train your new kitten.",
    fullContent: `
# Litter Box Training for Kittens

## Setting Up for Success
Most kittens naturally know how to use a litter box, but proper setup and maintenance are crucial for success.

## Choosing the Right Setup

### Litter Box Selection
- Use a low-sided box for easy access
- Ensure it's large enough for your kitten to turn around
- Consider one box per cat plus one extra
- Place boxes in quiet, accessible locations

### Litter Type
- Start with unscented, clumping litter
- Avoid crystals or strong fragrances initially
- Keep litter depth at 2-3 inches
- Gradually introduce new types if needed

## Training Steps

### 1. Introduction
- Show your kitten the litter box location
- Place them in the box after meals and naps
- Let them explore and sniff around
- Don't force them to dig or scratch

### 2. Positive Reinforcement
- Praise when they use the box correctly
- Never punish accidents
- Clean accidents thoroughly with enzyme cleaner
- Maintain a consistent schedule

### 3. Troubleshooting
- If avoiding the box, check cleanliness
- Ensure easy access and privacy
- Rule out medical issues with your vet
- Try different litter types if needed

## Maintenance Tips
- Scoop daily, change completely weekly
- Wash box with mild soap monthly
- Keep multiple boxes clean and accessible
- Monitor for any changes in behavior

With patience and consistency, most kittens master litter box use within a few weeks!
    `,
    author: "Mike Chen",
    date: "Jan 12, 2025",
  },
  {
    id: 3,
    title: "Advanced Agility Training",
    category: "Dogs",
    difficulty: "Advanced",
    duration: "8 min read",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500",
    excerpt: "Take your dog's training to the next level with agility courses and advanced techniques.",
    fullContent: `
# Advanced Agility Training

## Prerequisites
Before starting agility training, your dog should master basic obedience commands and be physically mature (usually 12-18 months old).

## Equipment and Setup

### Essential Equipment
- Jumps (adjustable height)
- Weave poles
- Tunnel
- A-frame or ramp
- Tire jump
- Contact obstacles

### Safety First
- Always warm up before training
- Check equipment for stability
- Start with low heights and slow speeds
- Watch for signs of fatigue or stress

## Training Progression

### 1. Introduction Phase
- Let your dog explore equipment without pressure
- Use treats and praise to create positive associations
- Start with the easiest obstacles
- Keep sessions short and fun

### 2. Basic Navigation
- Guide your dog through tunnels with treats
- Teach jumping with low heights
- Practice weave pole entries slowly
- Build confidence before adding speed

### 3. Sequence Building
- Chain 2-3 obstacles together
- Use consistent directional cues
- Practice left and right turns
- Increase complexity gradually

### 4. Competition Preparation
- Work on speed and accuracy
- Practice full course runs
- Train in different environments
- Focus on handler-dog communication

## Advanced Techniques
- Distance handling
- Blind crosses
- Front crosses
- Collection and extension

## Benefits
- Improved physical fitness
- Enhanced mental stimulation
- Stronger human-dog bond
- Competitive opportunities
- Increased confidence

Remember to always prioritize your dog's safety and enjoyment over speed or competition results!
    `,
    author: "Emily Rodriguez",
    date: "Jan 10, 2025",
  },
  {
    id: 4,
    title: "Stopping Destructive Scratching",
    category: "Cats",
    difficulty: "Intermediate",
    duration: "6 min read",
    image: "https://images.unsplash.com/photo-1545188401-d83ba9e90d15?w=500",
    excerpt: "Effective strategies to redirect your cat's scratching behavior to appropriate surfaces.",
    fullContent: `
# Stopping Destructive Scratching

## Understanding Why Cats Scratch
Scratching is a natural and necessary behavior for cats. They scratch to mark territory, stretch muscles, and maintain healthy claws.

## Providing Alternatives

### Scratching Post Selection
- Choose posts taller than your cat when stretched
- Offer different textures (sisal, carpet, cardboard)
- Place posts near sleeping areas and entrances
- Ensure posts are stable and won't tip over

### Strategic Placement
- Position posts near favorite scratching spots
- Use multiple posts throughout the house
- Place horizontal and vertical options
- Consider wall-mounted scratchers

## Redirection Techniques

### 1. Positive Reinforcement
- Reward your cat for using appropriate scratchers
- Use treats, praise, or play as rewards
- Make scratching posts more appealing with catnip
- Ignore inappropriate scratching (don't give attention)

### 2. Deterrent Methods
- Cover furniture with double-sided tape
- Use aluminum foil or plastic covers temporarily
- Apply citrus scents to unwanted areas
- Provide nail caps as a last resort

### 3. Environmental Management
- Trim nails regularly (every 2-3 weeks)
- Provide multiple scratching options
- Ensure cats have adequate play time
- Address stress factors that may increase scratching

## Training Steps

### Week 1-2: Introduction
- Place new scratchers near problem areas
- Make them appealing with catnip or treats
- Gently guide paws to appropriate surfaces
- Protect furniture with temporary covers

### Week 3-4: Reinforcement
- Consistently reward appropriate scratching
- Gradually remove furniture protection
- Add more scratching options if needed
- Monitor and adjust placement as needed

## Common Mistakes to Avoid
- Punishing scratching behavior
- Removing all scratching options
- Inconsistent training approach
- Not addressing underlying stress

With patience and the right approach, you can successfully redirect your cat's scratching to appropriate surfaces!
    `,
    author: "David Lee",
    date: "Jan 8, 2025",
  },
  {
    id: 5,
    title: "Leash Training Made Easy",
    category: "Dogs",
    difficulty: "Beginner",
    duration: "5 min read",
    image: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=500",
    excerpt: "Master the art of walking your dog without pulling or tugging on the leash.",
    fullContent: `
# Leash Training Made Easy

## Equipment You'll Need
- Proper fitting collar or harness
- 6-foot leash (avoid retractable for training)
- High-value treats
- Patience and consistency

## Getting Started Indoors

### 1. Collar/Harness Introduction
- Let your dog wear the collar/harness for short periods
- Associate it with positive experiences (meals, play)
- Gradually increase wearing time
- Ensure proper fit (two fingers should fit under collar)

### 2. Leash Familiarization
- Attach leash and let dog drag it around (supervised)
- Pick up leash and follow your dog around
- Practice holding leash without tension
- Reward calm behavior

## Outdoor Training Steps

### Phase 1: Basic Walking
- Start in a quiet area with minimal distractions
- Keep treats easily accessible
- Begin walking at your dog's pace
- Reward when they walk beside you

### Phase 2: Position Training
- Use treats to lure your dog to your preferred side
- Say "heel" or "with me" when they're in position
- Reward immediately for correct positioning
- Stop moving if they pull ahead

### Phase 3: Loose Leash Walking
- Change direction when your dog pulls
- Stop and wait for them to return to you
- Only move forward when leash is loose
- Reward frequently for good behavior

## Common Issues and Solutions

### Pulling
- Never pull back on the leash
- Stop and wait for your dog to return
- Change direction to regain attention
- Use higher value rewards for attention

### Lunging at Distractions
- Maintain distance from triggers initially
- Use treats to redirect attention
- Practice "look at me" command
- Gradually decrease distance as training progresses

### Refusing to Walk
- Check for fear or anxiety
- Start with very short distances
- Use encouragement, not force
- Consider if equipment is comfortable

## Training Tips
- Keep sessions short (10-15 minutes)
- End on a positive note
- Practice daily for consistency
- Be patient - every dog learns at their own pace

## Advanced Techniques
- Loose leash walking in busy areas
- Heel position training
- Multi-dog walking
- Emergency stop command

Remember, good leash manners make walks enjoyable for both you and your dog!
    `,
    author: "Sarah Johnson",
    date: "Jan 5, 2025",
  },
  {
    id: 6,
    title: "Socializing Your Pet",
    category: "Both",
    difficulty: "Intermediate",
    duration: "7 min read",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500",
    excerpt: "Tips for helping your pet become comfortable around other animals and people.",
    fullContent: `
# Socializing Your Pet

## Why Socialization Matters
Proper socialization helps pets develop confidence, reduces fear and aggression, and makes them better companions.

## Critical Socialization Periods

### Puppies (3-14 weeks)
- Most important period for social development
- Expose to various people, animals, sounds, and environments
- Keep experiences positive and controlled
- Continue throughout their first year

### Kittens (3-9 weeks)
- Prime socialization window
- Gentle handling by different people
- Exposure to household sounds and activities
- Positive interactions with other pets

### Adult Pets
- Socialization still possible but requires more patience
- Go slower and use positive associations
- Work with a professional if there are behavioral issues
- Focus on gradual exposure and confidence building

## Socialization Strategies

### People Socialization
- Introduce pets to people of different ages
- Include people wearing hats, glasses, uniforms
- Practice gentle handling exercises
- Reward calm, friendly behavior

### Animal Socialization
- Arrange controlled meetings with well-behaved animals
- Start with calm, friendly pets
- Supervise all interactions closely
- End on a positive note

### Environmental Exposure
- Visit different locations gradually
- Expose to various surfaces, sounds, and smells
- Practice car rides and vet visits
- Include urban and rural environments

## Safety Guidelines

### Signs of Stress
- Excessive panting or drooling
- Hiding or trying to escape
- Aggressive behavior (growling, hissing)
- Loss of bladder control

### When to Slow Down
- If pet shows fear or anxiety
- After any negative experience
- During illness or stress
- If overwhelmed by too much at once

## Age-Specific Tips

### Young Animals
- Focus on positive first impressions
- Keep sessions short and sweet
- Use treats and praise liberally
- Protect from overwhelming experiences

### Adult Rescues
- Allow time to decompress in new home
- Identify specific fears or triggers
- Work on one challenge at a time
- Consider professional help if needed

### Senior Pets
- Respect physical limitations
- Maintain familiar routines
- Introduce changes very gradually
- Focus on comfort and security

## Creating Positive Associations
- Pair new experiences with favorite treats
- Use play and attention as rewards
- Never force interactions
- End sessions before stress occurs

## Professional Help
Consider working with a trainer or behaviorist if:
- Pet shows extreme fear or aggression
- Previous traumatic experiences
- Limited early socialization
- Specific behavioral challenges

Remember, well-socialized pets are happier, more confident, and easier to live with!
    `,
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
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [showArticleModal, setShowArticleModal] = useState(false)

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
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-primary hover:text-primary hover:bg-primary/10"
                        onClick={() => {
                          setSelectedArticle(article)
                          setShowArticleModal(true)
                        }}
                      >
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

        {/* Article Modal */}
        {showArticleModal && selectedArticle && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <CardContent className="p-0">
                <div className="flex justify-between items-center p-6 border-b border-border">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{selectedArticle.title}</h2>
                    <div className="flex items-center gap-4 mt-2 text-sm text-foreground-muted">
                      <span>By {selectedArticle.author}</span>
                      <span>{selectedArticle.date}</span>
                      <Badge variant="outline">{selectedArticle.difficulty}</Badge>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowArticleModal(false)}
                    className="text-foreground-muted hover:text-foreground"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  
                  <div className="prose prose-lg max-w-none">
                    <div 
                      className="text-foreground leading-relaxed whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: selectedArticle.fullContent.replace(/\n/g, '<br/>') }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
