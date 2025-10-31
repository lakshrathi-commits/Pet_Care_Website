"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { db } from "@/lib/firebase"
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore"
import { Search, MapPin, Calendar, Phone, Mail, AlertCircle, CheckCircle, Plus, X } from "lucide-react"

interface LostFoundPost {
  id: string
  name?: string
  type: string
  breed: string
  color: string
  age?: string
  location: string
  date: string
  image: string
  description: string
  contact: string
  phone: string
  email?: string
  status: 'lost' | 'found'
  userId: string
  createdAt: string
}

export default function LostFoundPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<LostFoundPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [activeTab, setActiveTab] = useState("lost")
  const [loading, setLoading] = useState(false)
  
  // Form state for new post
  const [newPost, setNewPost] = useState({
    name: "",
    type: "",
    breed: "",
    color: "",
    age: "",
    location: "",
    description: "",
    contact: "",
    phone: "",
    email: "",
    image: "",
    status: 'lost' as 'lost' | 'found'
  })

  // Load posts from Firebase
  useEffect(() => {
    const postsQuery = query(collection(db, 'lostFoundPosts'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LostFoundPost))
      setPosts(postsData)
    })

    return unsubscribe
  }, [])

  const addPost = async () => {
    if (!user || !newPost.type || !newPost.breed || !newPost.location) return
    
    setLoading(true)
    try {
      await addDoc(collection(db, 'lostFoundPosts'), {
        ...newPost,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0]
      })
      
      setNewPost({
        name: "",
        type: "",
        breed: "",
        color: "",
        age: "",
        location: "",
        description: "",
        contact: "",
        phone: "",
        email: "",
        image: "",
        status: 'lost'
      })
      setShowNewPostForm(false)
    } catch (error) {
      console.error('Error adding post:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      (post.name?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
      post.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || post.type.toLowerCase() === selectedType
    const matchesStatus = post.status === activeTab
    return matchesSearch && matchesType && matchesStatus
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-bold text-foreground mb-4">Sign In Required</h2>
            <p className="text-foreground-muted">Please sign in to access the Lost & Found section.</p>
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
              Lost & <span className="text-primary">Found</span> Pets
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-pretty">
              Help reunite lost pets with their families or find the owner of a pet you've found
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
                placeholder="Search by name, breed, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full border-border bg-background"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedType === "all" ? "default" : "outline"}
                className={`rounded-full ${selectedType === "all" ? "bg-primary text-surface" : "bg-transparent"}`}
                onClick={() => setSelectedType("all")}
              >
                All
              </Button>
              <Button
                variant={selectedType === "dog" ? "default" : "outline"}
                className={`rounded-full ${selectedType === "dog" ? "bg-primary text-surface" : "bg-transparent"}`}
                onClick={() => setSelectedType("dog")}
              >
                Dogs
              </Button>
              <Button
                variant={selectedType === "cat" ? "default" : "outline"}
                className={`rounded-full ${selectedType === "cat" ? "bg-primary text-surface" : "bg-transparent"}`}
                onClick={() => setSelectedType("cat")}
              >
                Cats
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Report Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Lost Your Pet?</h3>
                  <p className="text-sm text-foreground-muted mb-4">
                    Report your missing pet to help the community assist in finding them
                  </p>
                  <Button 
                    className="rounded-full bg-destructive hover:bg-destructive/90 text-surface"
                    onClick={() => {
                      setNewPost({...newPost, status: 'lost'})
                      setShowNewPostForm(true)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Report Lost Pet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-success/50 bg-success/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Found a Pet?</h3>
                  <p className="text-sm text-foreground-muted mb-4">
                    Help reunite a found pet with their owner by posting here
                  </p>
                  <Button 
                    className="rounded-full bg-success hover:bg-success/90 text-surface"
                    onClick={() => {
                      setNewPost({...newPost, status: 'found'})
                      setShowNewPostForm(true)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Report Found Pet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs 
          defaultValue="lost" 
          className="space-y-8"
          onValueChange={(value) => setActiveTab(value as 'lost' | 'found')}
        >
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-muted">
            <TabsTrigger value="lost">
              <AlertCircle className="w-4 h-4 mr-2" />
              Lost Pets ({posts.filter(p => p.status === 'lost').length})
            </TabsTrigger>
            <TabsTrigger value="found">
              <CheckCircle className="w-4 h-4 mr-2" />
              Found Pets ({posts.filter(p => p.status === 'found').length})
            </TabsTrigger>
          </TabsList>

          {/* Lost Pets Tab */}
          <TabsContent value="lost" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="border-border hover:border-destructive hover:shadow-xl transition-all">
                  <div className="relative">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={post.image || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500"}
                        alt={post.name || 'Pet'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Badge className="absolute top-3 left-3 bg-destructive/90 text-surface border-0">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      LOST
                    </Badge>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{post.name || 'Unknown'}</h3>
                      <p className="text-sm text-foreground-muted">
                        {post.breed} • {post.color}
                      </p>
                    </div>

                    <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2">{post.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <MapPin className="w-4 h-4 text-destructive" />
                        <span className="line-clamp-1">{post.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <Calendar className="w-4 h-4 text-destructive" />
                        <span>Last seen: {post.date}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border space-y-2">
                      <p className="text-sm font-medium text-foreground">Contact: {post.contact}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-white">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 rounded-full bg-transparent">
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                  <Search className="w-10 h-10 text-foreground-muted" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No lost pets found</h3>
                <p className="text-foreground-muted">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>

          {/* Found Pets Tab */}
          <TabsContent value="found" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="border-border hover:border-success hover:shadow-xl transition-all">
                  <div className="relative">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={post.image || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500"}
                        alt="Found pet"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Badge className="absolute top-3 left-3 bg-success/90 text-surface border-0">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      FOUND
                    </Badge>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{post.type}</h3>
                      <p className="text-sm text-foreground-muted">
                        {post.breed} • {post.color}
                      </p>
                    </div>

                    <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2">{post.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <MapPin className="w-4 h-4 text-success" />
                        <span className="line-clamp-1">{post.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <Calendar className="w-4 h-4 text-success" />
                        <span>Found on: {post.date}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border space-y-2">
                      <p className="text-sm font-medium text-foreground">Contact: {post.contact}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-white">
                          <Phone className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 rounded-full bg-transparent">
                          <Mail className="w-3 h-3 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                  <Search className="w-10 h-10 text-foreground-muted" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No found pets</h3>
                <p className="text-foreground-muted">Try adjusting your search or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Tips Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Tips for Finding Lost Pets</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Act Quickly",
                description: "Start searching immediately and alert neighbors",
              },
              {
                title: "Use Social Media",
                description: "Post on local community groups and pet pages",
              },
              {
                title: "Check Shelters",
                description: "Contact local shelters and vet clinics daily",
              },
              {
                title: "Leave Familiar Items",
                description: "Place their bed or toys outside your home",
              },
            ].map((tip, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6 space-y-2">
                  <h3 className="font-semibold text-foreground">{tip.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* New Post Modal */}
        {showNewPostForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
              <CardContent className="p-0">
                <div className="flex justify-between items-center p-6 border-b border-border">
                  <h2 className="text-2xl font-bold text-foreground">
                    Report {newPost.status === 'lost' ? 'Lost' : 'Found'} Pet
                  </h2>
                  <button
                    onClick={() => setShowNewPostForm(false)}
                    className="text-foreground-muted hover:text-foreground"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-4">
                  {newPost.status === 'lost' && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Pet Name</label>
                      <Input
                        value={newPost.name}
                        onChange={(e) => setNewPost({...newPost, name: e.target.value})}
                        placeholder="Enter pet name"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Pet Type *</label>
                      <Input
                        value={newPost.type}
                        onChange={(e) => setNewPost({...newPost, type: e.target.value})}
                        placeholder="Dog, Cat, Bird, etc."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Breed *</label>
                      <Input
                        value={newPost.breed}
                        onChange={(e) => setNewPost({...newPost, breed: e.target.value})}
                        placeholder="Enter breed"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Color</label>
                      <Input
                        value={newPost.color}
                        onChange={(e) => setNewPost({...newPost, color: e.target.value})}
                        placeholder="Primary color"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Age</label>
                      <Input
                        value={newPost.age}
                        onChange={(e) => setNewPost({...newPost, age: e.target.value})}
                        placeholder="e.g., 2 years"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {newPost.status === 'lost' ? 'Last Seen Location *' : 'Found Location *'}
                    </label>
                    <Input
                      value={newPost.location}
                      onChange={(e) => setNewPost({...newPost, location: e.target.value})}
                      placeholder="Enter location details"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea
                      value={newPost.description}
                      onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                      placeholder="Describe the pet, behavior, and circumstances..."
                      className="w-full p-3 rounded-lg border border-border bg-background resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Contact Name</label>
                      <Input
                        value={newPost.contact}
                        onChange={(e) => setNewPost({...newPost, contact: e.target.value})}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                      <Input
                        value={newPost.phone}
                        onChange={(e) => setNewPost({...newPost, phone: e.target.value})}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Image URL (optional)</label>
                    <Input
                      value={newPost.image}
                      onChange={(e) => setNewPost({...newPost, image: e.target.value})}
                      placeholder="Enter image URL"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      onClick={addPost}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      disabled={loading || !newPost.type || !newPost.breed || !newPost.location}
                    >
                      {loading ? 'Posting...' : `Post ${newPost.status === 'lost' ? 'Lost' : 'Found'} Pet`}
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
