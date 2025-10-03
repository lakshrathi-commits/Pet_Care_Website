"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const products = [
  {
    id: 1,
    name: "Premium Dog Food",
    category: "Food",
    price: 49.99,
    rating: 4.8,
    reviews: 234,
    image: "/premium-dog-food.jpg",
    description: "High-quality nutrition for adult dogs",
    inStock: true,
  },
  {
    id: 2,
    name: "Cat Scratching Post",
    category: "Toys",
    price: 34.99,
    rating: 4.6,
    reviews: 156,
    image: "/cat-scratching-post.jpg",
    description: "Durable sisal rope scratching post",
    inStock: true,
  },
  {
    id: 3,
    name: "Pet Carrier Bag",
    category: "Accessories",
    price: 59.99,
    rating: 4.9,
    reviews: 89,
    image: "/pet-carrier-bag.jpg",
    description: "Comfortable travel carrier for small pets",
    inStock: true,
  },
  {
    id: 4,
    name: "Automatic Water Fountain",
    category: "Accessories",
    price: 44.99,
    rating: 4.7,
    reviews: 312,
    image: "/water-fountain.jpg",
    description: "Fresh flowing water for your pets",
    inStock: true,
  },
  {
    id: 5,
    name: "Orthopedic Pet Bed",
    category: "Bedding",
    price: 79.99,
    rating: 4.9,
    reviews: 445,
    image: "/orthopedic-pet-bed.jpg",
    description: "Memory foam bed for ultimate comfort",
    inStock: true,
  },
  {
    id: 6,
    name: "Interactive Puzzle Toy",
    category: "Toys",
    price: 24.99,
    rating: 4.5,
    reviews: 178,
    image: "/puzzle-toy.jpg",
    description: "Mental stimulation for smart pets",
    inStock: true,
  },
  {
    id: 7,
    name: "Grooming Brush Set",
    category: "Grooming",
    price: 29.99,
    rating: 4.6,
    reviews: 267,
    image: "/grooming-brush-set.jpg",
    description: "Professional grooming tools",
    inStock: true,
  },
  {
    id: 8,
    name: "LED Safety Collar",
    category: "Accessories",
    price: 19.99,
    rating: 4.4,
    reviews: 523,
    image: "/led-collar.jpg",
    description: "Rechargeable LED collar for night walks",
    inStock: true,
  },
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const { addItem } = useCart()

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Pet <span className="text-primary">Shop</span>
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-pretty">
              Quality products for your beloved pets with fast delivery and great prices
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
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full border-border bg-background"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[160px] rounded-full border-border bg-background">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Toys">Toys</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                  <SelectItem value="Bedding">Bedding</SelectItem>
                  <SelectItem value="Grooming">Grooming</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] rounded-full border-border bg-background">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-foreground-muted">
              Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group border-border hover:border-primary hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.inStock && (
                    <Badge className="absolute top-3 left-3 bg-success/90 text-surface border-0">In Stock</Badge>
                  )}
                </div>

                <CardContent className="p-5 space-y-3">
                  <div>
                    <Badge variant="outline" className="text-xs mb-2">
                      {product.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-foreground-muted line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-accent fill-current" />
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                    </div>
                    <span className="text-sm text-foreground-muted">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <Button
                      size="sm"
                      className="rounded-full bg-primary hover:bg-primary/90 text-surface"
                      onClick={() =>
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          category: product.category,
                        })
                      }
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
