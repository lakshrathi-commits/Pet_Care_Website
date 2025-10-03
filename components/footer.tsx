import Link from "next/link"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-surface fill-current" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-surface" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Paw<span className="text-primary">Care</span>
              </span>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Your one-stop platform for all your pet's needs. From adoption to grooming, we're here to help.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-surface flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-surface flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-surface flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-muted hover:bg-primary hover:text-surface flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/adoption" className="text-sm text-foreground-muted hover:text-primary">
                  Pet Adoption
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-foreground-muted hover:text-primary">
                  Pet Shop
                </Link>
              </li>
              <li>
                <Link href="/grooming" className="text-sm text-foreground-muted hover:text-primary">
                  Grooming Services
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-sm text-foreground-muted hover:text-primary">
                  Training Tips
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-sm text-foreground-muted hover:text-primary">
                  Emergency Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/health" className="text-sm text-foreground-muted hover:text-primary">
                  Health Tracker
                </Link>
              </li>
              <li>
                <Link href="/lost-found" className="text-sm text-foreground-muted hover:text-primary">
                  Lost & Found
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-foreground-muted hover:text-primary">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-foreground-muted hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground-muted hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-foreground-muted">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <span>support@pawcare.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground-muted">
                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground-muted">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span>123 Pet Street, Animal City, PC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-foreground-muted">
              © 2025 PawCare. All rights reserved. Made with{" "}
              <Heart className="w-4 h-4 inline text-primary fill-current" /> for pets.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-foreground-muted hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-foreground-muted hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-foreground-muted hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
