import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Heart,
  ShoppingCart,
  Calendar,
  Activity,
  BookOpen,
  Search,
  MessageCircle,
  Phone,
  ArrowRight,
  Star,
  Users,
  Award,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Heart,
      title: "Pet Adoption",
      description: "Find your perfect companion from our verified shelters and rescue centers.",
      href: "/adoption",
      color: "from-primary to-accent",
    },
    {
      icon: ShoppingCart,
      title: "Pet Shop",
      description: "Quality products for your pets with fast delivery and great prices.",
      href: "/shop",
      color: "from-secondary to-info",
    },
    {
      icon: Calendar,
      title: "Grooming Services",
      description: "Book professional grooming appointments at your convenience.",
      href: "/grooming",
      color: "from-accent to-warning",
    },
    {
      icon: Activity,
      title: "Health Tracker",
      description: "Keep track of vaccinations, medications, and vet appointments.",
      href: "/health",
      color: "from-success to-secondary",
    },
    {
      icon: BookOpen,
      title: "Training Tips",
      description: "Expert advice and tutorials to train your pet effectively.",
      href: "/training",
      color: "from-info to-primary",
    },
    {
      icon: Search,
      title: "Lost & Found",
      description: "Help reunite lost pets with their families quickly.",
      href: "/lost-found",
      color: "from-warning to-destructive",
    },
    {
      icon: MessageCircle,
      title: "Community Forum",
      description: "Connect with other pet owners and share experiences.",
      href: "/community",
      color: "from-primary to-secondary",
    },
    {
      icon: Phone,
      title: "Emergency Help",
      description: "24/7 access to emergency vet contacts and first aid guides.",
      href: "/emergency",
      color: "from-destructive to-primary",
    },
  ]

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Pet Owners" },
    { icon: Heart, value: "15K+", label: "Pets Adopted" },
    { icon: Award, value: "200+", label: "Verified Partners" },
    { icon: Star, value: "4.9", label: "Average Rating" },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Dog Owner",
      image: "/woman-and-loyal-companion.png",
      content:
        "PawCare made adopting my golden retriever so easy! The health tracker is a lifesaver for keeping up with vet appointments.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Cat Parent",
      image: "/man-and-cat.png",
      content:
        "The grooming booking system is fantastic. My cat looks amazing after every visit, and scheduling is so convenient.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Bird Enthusiast",
      image: "/woman-with-bird.jpg",
      content:
        "I love the community forum! I've learned so much about bird care and made friends with other bird owners.",
      rating: 5,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/20 via-background to-accent/20">
        <div className="absolute inset-0 bg-[url('/paw-print-pattern.png')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Heart className="w-4 h-4 text-primary fill-current" />
                <span className="text-sm font-medium text-primary">Trusted by 50,000+ Pet Owners</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                One Place for All Your Pet's <span className="text-primary">Needs</span>
              </h1>

              <p className="text-lg text-foreground-muted leading-relaxed text-pretty">
                From adoption to grooming, health tracking to emergency care - everything your furry, feathered, or
                scaly friend needs, all in one loving platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Search for pets, products, services..."
                    className="rounded-full border-border bg-surface"
                  />
                  <Button size="icon" className="rounded-full bg-primary hover:bg-primary/90 text-white shrink-0">
                    <Search className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white" asChild>
                  <Link href="/adoption" className="text-white">
                    Adopt a Pet
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full bg-transparent" asChild>
                  <Link href="/shop">Shop Now</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src="/happy-dog-and-cat-together-with-owner.jpg" alt="Happy pets with owner" className="w-full h-auto" />
              </div>
              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 bg-surface rounded-2xl shadow-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Heart className="w-6 h-6 text-surface fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">15,000+</p>
                    <p className="text-xs text-foreground-muted">Pets Adopted</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-surface rounded-2xl shadow-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-info flex items-center justify-center">
                    <Star className="w-6 h-6 text-surface fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">4.9/5</p>
                    <p className="text-xs text-foreground-muted">User Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent mb-2">
                    <Icon className="w-6 h-6 text-surface" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-foreground-muted">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Everything Your Pet Needs</h2>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-pretty">
              Comprehensive care solutions designed with love for your beloved companions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Link key={index} href={feature.href}>
                  <Card className="h-full border-border hover:border-primary hover:shadow-lg transition-all group cursor-pointer">
                    <CardContent className="p-6 space-y-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-7 h-7 text-surface" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-foreground-muted leading-relaxed">{feature.description}</p>
                      <div className="flex items-center text-primary text-sm font-medium">
                        Learn more
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-muted to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">Loved by Pet Owners</h2>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-pretty">
              See what our community has to say about their experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border bg-surface">
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-accent fill-current" />
                    ))}
                  </div>
                  <p className="text-foreground-muted leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-foreground-muted">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-border bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
            <CardContent className="p-8 sm:p-12 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent">
                <Heart className="w-8 h-8 text-surface fill-current" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
                Ready to Give Your Pet the Best Care?
              </h2>
              <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-pretty">
                Join thousands of happy pet owners who trust PawCare for all their pet needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white" asChild>
                  <Link href="/adoption" className="text-white">
                    Start Adopting
                    <Heart className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full bg-transparent" asChild>
                  <Link href="/shop">Browse Products</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
