"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Scissors, Clock, DollarSign, Star, Check, CalendarIcon, Mail } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"

const services = [
  {
    id: 1,
    name: "Basic Bath & Brush",
    duration: "1 hour",
    price: 3599,
    description: "Bath, blow dry, brush out, nail trim, and ear cleaning",
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500",
  },
  {
    id: 2,
    name: "Full Grooming Package",
    duration: "2 hours",
    price: 6799,
    description: "Complete grooming with haircut, styling, bath, and nail care",
    image: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=500",
  },
  {
    id: 3,
    name: "Cat Grooming Special",
    duration: "1.5 hours",
    price: 5199,
    description: "Gentle grooming for cats including bath, brush, and nail trim",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500",
  },
  {
    id: 4,
    name: "Nail Trim & Paw Care",
    duration: "30 minutes",
    price: 1999,
    description: "Nail trimming and paw pad care",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500",
  },
  {
    id: 5,
    name: "Teeth Cleaning",
    duration: "45 minutes",
    price: 4399,
    description: "Professional dental cleaning and breath freshening",
    image: "https://images.unsplash.com/photo-1601758260447-45c2be8b44b3?w=500",
  },
  {
    id: 6,
    name: "De-shedding Treatment",
    duration: "1 hour",
    price: 4799,
    description: "Special treatment to reduce shedding and promote healthy coat",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=500",
  },
]

const groomers = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 4.9,
    reviews: 234,
    specialty: "Dogs & Cats",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332b2e2?w=500",
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4.8,
    reviews: 189,
    specialty: "Large Breeds",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5.0,
    reviews: 156,
    specialty: "Cats",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500",
  },
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

export default function GroomingPage() {
  const { user } = useAuth()
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedGroomer, setSelectedGroomer] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [bookingId, setBookingId] = useState('')

  const selectedServiceData = services.find((s) => s.id === selectedService)
  const selectedGroomerData = groomers.find((g) => g.id === selectedGroomer)

  const handleBooking = async () => {
    if (!user || !selectedServiceData || !selectedGroomerData || !selectedDate || !selectedTime) {
      alert("Please complete all booking details and sign in to continue.")
      return
    }

    setLoading(true)
    try {
      // Save booking to Firestore
      const bookingDoc = await addDoc(collection(db, 'groomingBookings'), {
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || 'Guest',
        service: {
          id: selectedServiceData.id,
          name: selectedServiceData.name,
          price: selectedServiceData.price,
          duration: selectedServiceData.duration
        },
        groomer: {
          id: selectedGroomerData.id,
          name: selectedGroomerData.name,
          specialty: selectedGroomerData.specialty
        },
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      })

      setBookingId(bookingDoc.id)
      
      // Send confirmation email (simulated - in production, use a cloud function or email service)
      await sendConfirmationEmail({
        email: user.email!,
        name: user.displayName || 'Guest',
        bookingId: bookingDoc.id,
        service: selectedServiceData.name,
        groomer: selectedGroomerData.name,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        price: selectedServiceData.price
      })

      // Show confirmation
      setShowConfirmation(true)
      
      // Reset form after a delay
      setTimeout(() => {
        setSelectedService(null)
        setSelectedGroomer(null)
        setSelectedDate(new Date())
        setSelectedTime(null)
        setStep(1)
        setShowConfirmation(false)
      }, 5000)
    } catch (error) {
      console.error('Error creating booking:', error)
      alert('Failed to create booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const sendConfirmationEmail = async (data: {
    email: string
    name: string
    bookingId: string
    service: string
    groomer: string
    date: string
    time: string
    price: number
  }) => {
    // In production, use a service like SendGrid, AWS SES, or Firebase Cloud Functions
    // For now, we'll log to console and show a success message
    console.log('📧 Confirmation email sent to:', data.email)
    console.log('Booking details:', {
      ...data,
      price: `₹${(data.price / 100).toFixed(2)}`
    })
    
    // Simulated email content
    const emailContent = `
      Dear ${data.name},
      
      Your grooming appointment has been confirmed!
      
      Booking ID: ${data.bookingId}
      Service: ${data.service}
      Groomer: ${data.groomer}
      Date: ${new Date(data.date).toLocaleDateString()}
      Time: ${data.time}
      Total: ₹${(data.price / 100).toFixed(2)}
      
      We look forward to seeing you!
      
      Best regards,
      PawCare Team
    `
    
    return Promise.resolve(emailContent)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Professional <span className="text-primary">Grooming</span> Services
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-pretty">
              Book expert grooming services for your pets with our certified professionals
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    step >= s ? "bg-primary text-surface" : "bg-muted text-foreground-muted"
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 4 && <div className={`w-12 h-1 mx-2 transition-colors ${step > s ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 mt-4">
            <span className={`text-sm ${step >= 1 ? "text-foreground font-medium" : "text-foreground-muted"}`}>
              Service
            </span>
            <span className={`text-sm ${step >= 2 ? "text-foreground font-medium" : "text-foreground-muted"}`}>
              Groomer
            </span>
            <span className={`text-sm ${step >= 3 ? "text-foreground font-medium" : "text-foreground-muted"}`}>
              Date & Time
            </span>
            <span className={`text-sm ${step >= 4 ? "text-foreground font-medium" : "text-foreground-muted"}`}>
              Confirm
            </span>
          </div>
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Select a Service</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all ${
                    selectedService === service.id
                      ? "border-primary shadow-lg ring-2 ring-primary"
                      : "border-border hover:border-primary hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
                    <p className="text-sm text-foreground-muted leading-relaxed">{service.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-sm text-foreground-muted">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-lg font-bold text-primary">
                        <span>₹{service.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 text-surface"
                disabled={!selectedService}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Select Groomer */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Select a Groomer</h2>
              <Button variant="outline" className="rounded-full bg-transparent" onClick={() => setStep(1)}>
                Back
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groomers.map((groomer) => (
                <Card
                  key={groomer.id}
                  className={`cursor-pointer transition-all ${
                    selectedGroomer === groomer.id
                      ? "border-primary shadow-lg ring-2 ring-primary"
                      : "border-border hover:border-primary hover:shadow-lg"
                  }`}
                  onClick={() => setSelectedGroomer(groomer.id)}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={groomer.image || "/placeholder.svg"}
                        alt={groomer.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{groomer.name}</h3>
                        <p className="text-sm text-foreground-muted">{groomer.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-accent fill-current" />
                        <span className="font-medium text-foreground">{groomer.rating}</span>
                      </div>
                      <span className="text-sm text-foreground-muted">({groomer.reviews} reviews)</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-end">
              <Button
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 text-surface"
                disabled={!selectedGroomer}
                onClick={() => setStep(3)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Select Date & Time */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Select Date & Time</h2>
              <Button variant="outline" className="rounded-full bg-transparent" onClick={() => setStep(2)}>
                Back
              </Button>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Choose a Date</h3>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-lg border border-border"
                  />
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Available Time Slots</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`rounded-full ${
                          selectedTime === time ? "bg-primary text-surface" : "bg-transparent"
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-end">
              <Button
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 text-surface"
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(4)}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirm Booking */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Confirm Your Booking</h2>
              <Button variant="outline" className="rounded-full bg-transparent" onClick={() => setStep(3)}>
                Back
              </Button>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-border">
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Booking Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Scissors className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{selectedServiceData?.name}</p>
                            <p className="text-sm text-foreground-muted">{selectedServiceData?.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-foreground-muted flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {selectedServiceData?.duration}
                              </span>
                              <span className="text-sm font-semibold text-primary">₹{selectedServiceData?.price.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <img
                            src={selectedGroomerData?.image || "/placeholder.svg"}
                            alt={selectedGroomerData?.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-foreground">{selectedGroomerData?.name}</p>
                            <p className="text-sm text-foreground-muted">{selectedGroomerData?.specialty}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="w-4 h-4 text-accent fill-current" />
                              <span className="text-sm font-medium text-foreground">{selectedGroomerData?.rating}</span>
                              <span className="text-sm text-foreground-muted">
                                ({selectedGroomerData?.reviews} reviews)
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <CalendarIcon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">
                              {selectedDate?.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                            <p className="text-sm text-foreground-muted">{selectedTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border">
                <CardContent className="p-6 space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Payment Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Service Fee</span>
                      <span className="font-medium text-foreground">₹{selectedServiceData?.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Tax</span>
                      <span className="font-medium text-foreground">
                        ₹{((selectedServiceData?.price || 0) * 0.18).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          ₹{((selectedServiceData?.price || 0) * 1.18).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-primary hover:bg-primary/90 text-white"
                    onClick={handleBooking}
                    disabled={loading || !user}
                  >
                    {loading ? 'Processing...' : !user ? 'Sign In to Book' : 'Confirm Booking'}
                  </Button>
                  {!user && (
                    <p className="text-center text-sm text-foreground-muted mt-2">
                      Please sign in to complete your booking
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Booking Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
              <p className="text-foreground-muted mb-4">
                Your grooming appointment has been successfully booked.
              </p>
              
              <div className="bg-muted rounded-lg p-4 mb-6 text-left space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-foreground-muted">Booking ID:</span>
                  <span className="font-mono text-foreground">{bookingId.slice(0, 8)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  <span className="text-foreground-muted">Date:</span>
                  <span className="text-foreground">{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-foreground-muted">Time:</span>
                  <span className="text-foreground">{selectedTime}</span>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">Confirmation Email Sent</p>
                    <p className="text-xs text-foreground-muted mt-1">
                      Check your inbox at <span className="font-medium">{user?.email}</span> for booking details.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-white"
                onClick={() => setShowConfirmation(false)}
              >
                Done
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
