"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Menu,
  X,
  Heart,
  ShoppingCart,
  Calendar,
  Activity,
  BookOpen,
  SearchIcon,
  MessageCircle,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { Badge } from "@/components/ui/badge"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { totalItems } = useCart()

  const navItems = [
    { name: "Home", href: "/", icon: Heart },
    { name: "Pet Adoption", href: "/adoption", icon: Heart },
    { name: "Pet Shop", href: "/shop", icon: ShoppingCart },
    { name: "Grooming", href: "/grooming", icon: Calendar },
    { name: "Health Tracker", href: "/health", icon: Activity },
    { name: "Training Tips", href: "/training", icon: BookOpen },
    { name: "Lost & Found", href: "/lost-found", icon: SearchIcon },
    { name: "Community", href: "/community", icon: MessageCircle },
    { name: "Emergency", href: "/emergency", icon: Phone },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 text-surface fill-current" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-surface" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Paw<span className="text-primary">Care</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-foreground-muted hover:text-primary hover:bg-muted transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/shop/cart">
              <Button variant="outline" size="icon" className="rounded-full bg-transparent relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-primary text-surface border-0">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              Sign In
            </Button>
            <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-surface">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-foreground-muted hover:text-primary hover:bg-muted"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-surface">
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground-muted hover:text-primary hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
            <div className="pt-4 space-y-2">
              <Link href="/shop/cart">
                <Button variant="outline" className="w-full rounded-full bg-transparent">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart {totalItems > 0 && `(${totalItems})`}
                </Button>
              </Link>
              <Button variant="outline" className="w-full rounded-full bg-transparent">
                Sign In
              </Button>
              <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-surface">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
