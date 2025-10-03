import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Calendar, Check, Share2, Mail, Phone, Home, Users, Stethoscope } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from a database
const petDetails = {
  id: 1,
  name: "Max",
  type: "Dog",
  breed: "Golden Retriever",
  age: "2 years",
  gender: "Male",
  size: "Large",
  weight: "70 lbs",
  color: "Golden",
  location: "New York, NY",
  images: ["/golden-retriever-max.jpg", "/golden-retriever-playing.jpg", "/golden-retriever-portrait.jpg"],
  description:
    "Meet Max, a wonderful 2-year-old Golden Retriever who's looking for his forever home! Max is an energetic and friendly dog who loves to play fetch, go on long walks, and cuddle on the couch. He's great with kids and other dogs, making him the perfect addition to any family. Max is fully vaccinated, neutered, and house-trained. He knows basic commands and is eager to learn more. This sweet boy has been in our care for 2 months and is ready to bring joy to his new family.",
  vaccinated: true,
  neutered: true,
  microchipped: true,
  houseTrained: true,
  goodWithKids: true,
  goodWithDogs: true,
  goodWithCats: false,
  energyLevel: "High",
  adoptionFee: "$250",
  shelterName: "Happy Paws Rescue",
  shelterContact: "contact@happypaws.org",
  shelterPhone: "(555) 123-4567",
  dateAvailable: "Available Now",
}

export default function PetDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/adoption" className="text-sm text-primary hover:underline">
            ← Back to Adoption
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="border-border overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={petDetails.images[0] || "/placeholder.svg"}
                  alt={petDetails.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2 p-4">
                {petDetails.images.slice(1).map((image, index) => (
                  <div key={index} className="aspect-video relative overflow-hidden rounded-lg cursor-pointer">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${petDetails.name} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* About Section */}
            <Card className="border-border">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">About {petDetails.name}</h2>
                  <p className="text-foreground-muted leading-relaxed">{petDetails.description}</p>
                </div>

                {/* Health & Behavior */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-primary" />
                    Health & Behavior
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {petDetails.vaccinated && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-foreground-muted">Vaccinated</span>
                      </div>
                    )}
                    {petDetails.neutered && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-foreground-muted">Neutered</span>
                      </div>
                    )}
                    {petDetails.microchipped && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-foreground-muted">Microchipped</span>
                      </div>
                    )}
                    {petDetails.houseTrained && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-success" />
                        </div>
                        <span className="text-foreground-muted">House Trained</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Compatibility */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Good With
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {petDetails.goodWithKids && <Badge className="bg-success/20 text-success border-0">Children</Badge>}
                    {petDetails.goodWithDogs && <Badge className="bg-success/20 text-success border-0">Dogs</Badge>}
                    {petDetails.goodWithCats && <Badge className="bg-success/20 text-success border-0">Cats</Badge>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <Card className="border-border sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{petDetails.name}</h1>
                  <p className="text-lg text-foreground-muted">{petDetails.breed}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Age</span>
                    <span className="font-medium text-foreground">{petDetails.age}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Gender</span>
                    <span className="font-medium text-foreground">{petDetails.gender}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Size</span>
                    <span className="font-medium text-foreground">{petDetails.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Weight</span>
                    <span className="font-medium text-foreground">{petDetails.weight}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Color</span>
                    <span className="font-medium text-foreground">{petDetails.color}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Energy Level</span>
                    <span className="font-medium text-foreground">{petDetails.energyLevel}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-foreground-muted mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">{petDetails.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground-muted">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">{petDetails.dateAvailable}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-foreground-muted">Adoption Fee</span>
                    <span className="text-2xl font-bold text-primary">{petDetails.adoptionFee}</span>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-surface">
                      <Heart className="w-4 h-4 mr-2" />
                      Adopt {petDetails.name}
                    </Button>
                    <Button variant="outline" className="w-full rounded-full bg-transparent">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Shelter
                    </Button>
                    <Button variant="outline" className="w-full rounded-full bg-transparent">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shelter Info Card */}
            <Card className="border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Home className="w-6 h-6 text-surface" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{petDetails.shelterName}</h3>
                    <p className="text-sm text-foreground-muted">Verified Shelter</p>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{petDetails.shelterContact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{petDetails.shelterPhone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
