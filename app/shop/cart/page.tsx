"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, Truck, Shield } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart()

  const shipping = totalPrice > 50 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const total = totalPrice + shipping + tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted">
              <ShoppingCart className="w-12 h-12 text-foreground-muted" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Your Cart is Empty</h1>
            <p className="text-lg text-foreground-muted max-w-md mx-auto">
              Looks like you haven't added any products yet. Start shopping to fill your cart!
            </p>
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-surface" asChild>
              <Link href="/shop">
                Browse Products
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-foreground-muted">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="border-border">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          <Badge variant="outline" className="text-xs mt-1">
                            {item.category}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-12 text-center font-medium text-foreground">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button variant="outline" className="w-full rounded-full bg-transparent" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-border sticky top-24">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Subtotal</span>
                    <span className="font-medium text-foreground">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Shipping</span>
                    <span className="font-medium text-foreground">
                      {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground-muted">Tax</span>
                    <span className="font-medium text-foreground">${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                {totalPrice < 50 && (
                  <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <p className="text-sm text-foreground-muted">
                      Add <span className="font-semibold text-primary">${(50 - totalPrice).toFixed(2)}</span> more for
                      FREE shipping!
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-surface">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="w-full rounded-full bg-transparent" asChild>
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Truck className="w-4 h-4 text-primary" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Tag className="w-4 h-4 text-primary" />
                    <span>30-day return policy</span>
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
