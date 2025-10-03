import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, ThumbsUp, Eye, Plus, TrendingUp } from "lucide-react"

const posts = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "/user-avatar-1.jpg",
    title: "Best dog parks in the city?",
    content: "Looking for recommendations for dog-friendly parks where my golden retriever can run off-leash...",
    category: "Discussion",
    likes: 24,
    comments: 12,
    views: 156,
    time: "2 hours ago",
  },
  {
    id: 2,
    author: "Mike Chen",
    avatar: "/user-avatar-2.jpg",
    title: "My cat won't eat new food",
    content: "I recently switched my cat's food brand and she refuses to eat it. Any tips on transitioning?",
    category: "Advice",
    likes: 18,
    comments: 8,
    views: 89,
    time: "5 hours ago",
  },
  {
    id: 3,
    author: "Emily Rodriguez",
    avatar: "/user-avatar-3.jpg",
    title: "Puppy training success story!",
    content: "After 3 months of consistent training, my puppy finally mastered all basic commands...",
    category: "Success Story",
    likes: 45,
    comments: 15,
    views: 234,
    time: "1 day ago",
  },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Pet Owner <span className="text-primary">Community</span>
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-pretty">
              Connect with other pet owners, share experiences, and get advice from the community
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Recent Discussions</h2>
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            <div className="space-y-4">
              {posts.map((post) => (
                <Card key={post.id} className="border-border hover:border-primary hover:shadow-lg transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={post.avatar || "/placeholder.svg"}
                        alt={post.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{post.author}</h3>
                            <p className="text-sm text-foreground-muted">{post.time}</p>
                          </div>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">{post.title}</h4>
                        <p className="text-foreground-muted leading-relaxed">{post.content}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t border-border">
                      <button className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                      <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <Eye className="w-4 h-4" />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Trending Topics
                </h3>
                <div className="space-y-2">
                  {["Puppy Training", "Cat Behavior", "Pet Nutrition", "Grooming Tips", "Health Care"].map(
                    (topic, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground-muted hover:text-primary hover:bg-muted transition-colors"
                      >
                        {topic}
                      </button>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Community Guidelines</h3>
                <ul className="space-y-2 text-sm text-foreground-muted">
                  <li>• Be respectful and kind</li>
                  <li>• No spam or self-promotion</li>
                  <li>• Share helpful information</li>
                  <li>• Report inappropriate content</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
