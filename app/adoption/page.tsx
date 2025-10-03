"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MapPin, Search, Filter } from "lucide-react"
import Link from "next/link"

const pets = [
  {
    id: 1,
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 years",
    gender: "Male",
    size: "Large",
    location: "New York, NY",
    image: "/golden-retriever-max.jpg",
    description: "Friendly and energetic, loves to play fetch and go on long walks.",
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    breed: "Persian",
    age: "1 year",
    gender: "Female",
    size: "Small",
    location: "Los Angeles, CA",
    image: "/persian-cat-luna.jpg",
    description: "Calm and affectionate, enjoys quiet environments and gentle cuddles.",
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: false,
  },
  {
    id: 3,
    name: "Charlie",
    type: "Dog",
    breed: "Beagle",
    age: "3 years",
    gender: "Male",
    size: "Medium",
    location: "Chicago, IL",
    image: "/beagle-charlie.jpg",
    description: "Playful and curious, great with families and other dogs.",
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: 4,
    name: "Bella",
    type: "Cat",
    breed: "Siamese",
    age: "4 years",
    gender: "Female",
    size: "Small",
    location: "Houston, TX",
    image: "/siamese-cat-bella.jpg",
    description: "Vocal and social, loves attention and interactive play.",
    vaccinated: true,
    neutered: true,
    goodWithKids: false,
    goodWithPets: true,
  },
  {
    id: 5,
    name: "Rocky",
    type: "Dog",
    breed: "German Shepherd",
    age: "5 years",
    gender: "Male",
    size: "Large",
    location: "Phoenix, AZ",
    image: "/german-shepherd-rocky.jpg",
    description: "Loyal and protective, needs an experienced owner.",
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: false,
  },
  {
    id: 6,
    name: "Milo",
    type: "Cat",
    breed: "Maine Coon",
    age: "2 years",
    gender: "Male",
    size: "Large",
    location: "Philadelphia, PA",
    image: "/maine-coon-milo.jpg",
    description: "Gentle giant, very friendly and loves to be around people.",
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: 7,
    name: "Daisy",
    type: "Dog",
    breed: "Labrador",
    age: "1 year",
    gender: "Female",
    size: "Large",
    location: "San Antonio, TX",
    image: "/labrador-daisy.jpg",
    description: "Sweet and gentle, perfect for first-time dog owners.",
    vaccinated: true,
    neutered: false,
    goodWithKids: true,
    goodWithPets: true,
  },
  {
    id: 8,
    name: "Oliver",
    type: "Cat",
    breed: "British Shorthair",
    age: "3 years",
    gender: "Male",
    size: "Medium",
    location: "San Diego, CA",
    image: "/british-shorthair-oliver.jpg",
    description: "Independent but affectionate, enjoys lounging and window watching.",
    vaccinated: true,
    neutered: true,
    goodWithKids: true,
    goodWithPets: true,
  },
]

export default function AdoptionPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedAge, setSelectedAge] = useState("all")
  const [selectedSize, setSelectedSize] = useState("all")

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || pet.type.toLowerCase() === selectedType
    const matchesAge = selectedAge === "all" || pet.age.includes(selectedAge)
    const matchesSize = selectedSize === "all" || pet.size.toLowerCase() === selectedSize

    return matchesSearch && matchesType && matchesAge && matchesSize
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Find Your Perfect <span className="text-primary">Companion</span>
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-pretty">
              Browse our verified shelters and rescue centers to find a loving pet waiting for their forever home
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-16 z-40 bg-surface/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
              <Input
                placeholder="Search by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full border-border bg-background"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[140px] rounded-full border-border bg-background">
                  <SelectValue placeholder="Pet Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="dog">Dogs</SelectItem>
                  <SelectItem value="cat">Cats</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger className="w-[140px] rounded-full border-border bg-background">
                  <SelectValue placeholder="Age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="1">1 year</SelectItem>
                  <SelectItem value="2">2 years</SelectItem>
                  <SelectItem value="3">3 years</SelectItem>
                  <SelectItem value="4">4 years</SelectItem>
                  <SelectItem value="5">5+ years</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-[140px] rounded-full border-border bg-background">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-transparent"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedType("all")
                  setSelectedAge("all")
                  setSelectedSize("all")
                }}
              >
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-foreground-muted">
              Showing <span className="font-semibold text-foreground">{filteredPets.length}</span> pets available for
              adoption
            </p>
          </div>

          {filteredPets.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                <Search className="w-10 h-10 text-foreground-muted" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No pets found</h3>
              <p className="text-foreground-muted">Try adjusting your filters to see more results</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPets.map((pet) => (
                <Card
                  key={pet.id}
                  className="group border-border hover:border-primary hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={pet.image || "/placeholder.svg"}
                      alt={pet.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-surface/90 backdrop-blur-sm hover:bg-primary hover:text-surface"
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <Badge className="bg-surface/90 backdrop-blur-sm text-foreground border-0">{pet.type}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {pet.name}
                      </h3>
                      <p className="text-sm text-foreground-muted">{pet.breed}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {pet.age}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {pet.gender}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {pet.size}
                      </Badge>
                    </div>

                    <p className="text-sm text-foreground-muted line-clamp-2 leading-relaxed">{pet.description}</p>

                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{pet.location}</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button asChild className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-surface">
                        <Link href={`/adoption/${pet.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground text-balance">Can't Find the Right Pet?</h2>
          <p className="text-lg text-foreground-muted text-pretty">
            Register your preferences and we'll notify you when a matching pet becomes available
          </p>
          <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-surface">
            Set Up Alerts
          </Button>
        </div>
      </section>
    </div>
  )
}
