"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { db } from "@/lib/firebase"
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc, increment } from "firebase/firestore"
import { MessageCircle, ThumbsUp, Eye, Plus, TrendingUp, X } from "lucide-react"

interface CommunityPost {
  id: string
  author: string
  authorId: string
  avatar?: string
  title: string
  content: string
  category: string
  likes: number
  comments: number
  views: number
  createdAt: string
  likedBy?: string[]
}

export default function CommunityPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Form state for new post
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "Discussion"
  })

  // Load posts from Firebase
  useEffect(() => {
    const postsQuery = query(collection(db, 'communityPosts'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommunityPost))
      setPosts(postsData)
    })

    return unsubscribe
  }, [])

  const addPost = async () => {
    if (!user || !newPost.title || !newPost.content) return
    
    setLoading(true)
    try {
      await addDoc(collection(db, 'communityPosts'), {
        ...newPost,
        author: user.displayName || 'Anonymous',
        authorId: user.uid,
        avatar: user.photoURL || '',
        likes: 0,
        comments: 0,
        views: 0,
        createdAt: new Date().toISOString(),
        likedBy: []
      })
      
      setNewPost({
        title: "",
        content: "",
        category: "Discussion"
      })
      setShowNewPostForm(false)
    } catch (error) {
      console.error('Error adding post:', error)
    } finally {
      setLoading(false)
    }
  }

  const likePost = async (postId: string) => {
    if (!user) return
    
    try {
      const postRef = doc(db, 'communityPosts', postId)
      await updateDoc(postRef, {
        likes: increment(1)
      })
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

  const incrementView = async (postId: string) => {
    try {
      const postRef = doc(db, 'communityPosts', postId)
      await updateDoc(postRef, {
        views: increment(1)
      })
    } catch (error) {
      console.error('Error incrementing view:', error)
    }
  }

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'just now'
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`
    return `${Math.floor(diffInMinutes / 1440)} days ago`
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-bold text-foreground mb-4">Sign In Required</h2>
            <p className="text-foreground-muted">Please sign in to access the community forum.</p>
          </CardContent>
        </Card>
      </div>
    )
  }
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
              <Button 
                className="rounded-full bg-primary hover:bg-primary/90 text-white"
                onClick={() => setShowNewPostForm(true)}
              >
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
                            <p className="text-sm text-foreground-muted">{getTimeAgo(post.createdAt)}</p>
                          </div>
                          <Badge variant="outline">{post.category}</Badge>
                        </div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">{post.title}</h4>
                        <p className="text-foreground-muted leading-relaxed">{post.content}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t border-border">
                      <button 
                        className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors"
                        onClick={() => likePost(post.id)}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-foreground-muted hover:text-primary transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                      <div 
                        className="flex items-center gap-2 text-sm text-foreground-muted cursor-pointer"
                        onClick={() => incrementView(post.id)}
                      >
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

        {/* New Post Modal */}
        {showNewPostForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Create New Post</h2>
                  <button
                    onClick={() => setShowNewPostForm(false)}
                    className="text-foreground-muted hover:text-foreground"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Post Title *</label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      placeholder="Enter a descriptive title..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="w-full p-3 rounded-lg border border-border bg-background"
                    >
                      <option value="Discussion">Discussion</option>
                      <option value="Advice">Advice</option>
                      <option value="Success Story">Success Story</option>
                      <option value="Question">Question</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Content *</label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      placeholder="Share your thoughts, ask questions, or tell your story..."
                      className="w-full p-3 rounded-lg border border-border bg-background resize-none"
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      onClick={addPost}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      disabled={loading || !newPost.title || !newPost.content}
                    >
                      {loading ? 'Posting...' : 'Create Post'}
                    </Button>
                    <Button 
                      onClick={() => setShowNewPostForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
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
