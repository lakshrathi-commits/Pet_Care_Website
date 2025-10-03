"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Calendar, Phone, Mail, AlertCircle, CheckCircle, Plus } from "lucide-react"

const lostPets = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Labrador Retriever",
    color: "Yellow",
    age: "3 years",
    lastSeen: "Downtown Park, Main Street",
    date: "2025-01-28",
    image: "/lost-labrador.jpg",
    description: "Friendly yellow lab, wearing a blue collar with tags. Responds to 'Buddy'.",
    contact: "John Smith",
    phone: "(555) 123-4567",
    status: "lost",
  },
  {
    id: 2,
    name: "Whiskers",
    type: "Cat",
    breed: "Tabby",
    color: "Orange and White",
    age: "2 years",
    lastSeen: "Oak Avenue, near the library",
    date: "2025-01-27",
    image: "/lost-tabby-cat.jpg",
    description: "Orange tabby with white paws, very shy. Missing since Tuesday evening.",
    contact: "Mary Johnson",
    phone: "(555) 234-5678",
    status: "lost",
  },
  {
    id: 3,
    name: "Max",
    type: "Dog",
    breed: "German Shepherd",
    color: "Black and Tan",
    age: "5 years",
    lastSeen: "Riverside Trail",
    date: "2025-01-26",
    image: "/lost-german-shepherd.jpg",
    description: "Large German Shepherd, microchipped. Last seen on hiking trail.",
    contact: "Robert Davis",
    phone: "(555) 345-6789",
    status: "lost",
  },
]

const foundPets = [
  {
    id: 1,
    type: "Dog",
    breed: "Mixed Breed",
    color: "Brown",
    foundLocation: "Central Park",
    date: "2025-01-29",
    image: "/found-mixed-dog.jpg",
    description: "Small brown dog found wandering, no collar or tags. Very friendly.",
    contact: "Sarah Wilson",
    phone: "(555) 456-7890",
    status: "found",
  },
  {
    id: 2,
    type: "Cat",
    breed: "Siamese",
    color: "Cream and Brown",
    foundLocation: "Elm Street",
    date: "2025-01-28",
    image: "/found-siamese-cat.jpg",
    description: "Siamese cat found in backyard, appears well-cared for.",
    contact: "Mike Brown",
    phone: "(555) 567-8901",
    status: "found",
  },
]

export default function LostFoundPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredLost = lostPets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.lastSeen.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || pet.type.toLowerCase() === selectedType
    return matchesSearch && matchesType
  })

  const filteredFound = foundPets.filter((pet) => {
    const matchesSearch =
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.foundLocation.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || pet.type.toLowerCase() === selectedType
    return matchesSearch && matchesType
  })

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
                  <Button className="rounded-full bg-destructive hover:bg-destructive/90 text-surface">
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
                  <Button className="rounded-full bg-success hover:bg-success/90 text-surface">
                    <Plus className="w-4 h-4 mr-2" />
                    Report Found Pet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="lost" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-muted">
            <TabsTrigger value="lost">
              <AlertCircle className="w-4 h-4 mr-2" />
              Lost Pets ({filteredLost.length})
            </TabsTrigger>
            <TabsTrigger value="found">
              <CheckCircle className="w-4 h-4 mr-2" />
              Found Pets ({filteredFound.length})
            </TabsTrigger>
          </TabsList>

          {/* Lost Pets Tab */}
          <TabsContent value="lost" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLost.map((pet) => (
                <Card key={pet.id} className="border-border hover:border-destructive hover:shadow-xl transition-all">
                  <div className="relative">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={pet.image || "/placeholder.svg"}
                        alt={pet.name}
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
                      <h3 className="text-xl font-bold text-foreground">{pet.name}</h3>
                      <p className="text-sm text-foreground-muted">
                        {pet.breed} • {pet.color}
                      </p>
                    </div>

                    <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2">{pet.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <MapPin className="w-4 h-4 text-destructive" />
                        <span className="line-clamp-1">{pet.lastSeen}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <Calendar className="w-4 h-4 text-destructive" />
                        <span>Last seen: {pet.date}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border space-y-2">
                      <p className="text-sm font-medium text-foreground">Contact: {pet.contact}</p>
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

            {filteredLost.length === 0 && (
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
              {filteredFound.map((pet) => (
                <Card key={pet.id} className="border-border hover:border-success hover:shadow-xl transition-all">
                  <div className="relative">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={pet.image || "/placeholder.svg"}
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
                      <h3 className="text-xl font-bold text-foreground">{pet.type}</h3>
                      <p className="text-sm text-foreground-muted">
                        {pet.breed} • {pet.color}
                      </p>
                    </div>

                    <p className="text-sm text-foreground-muted leading-relaxed line-clamp-2">{pet.description}</p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <MapPin className="w-4 h-4 text-success" />
                        <span className="line-clamp-1">{pet.foundLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <Calendar className="w-4 h-4 text-success" />
                        <span>Found on: {pet.date}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border space-y-2">
                      <p className="text-sm font-medium text-foreground">Contact: {pet.contact}</p>
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

            {filteredFound.length === 0 && (
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
      </div>
    </div>
  )
}
