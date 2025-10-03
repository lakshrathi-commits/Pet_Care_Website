"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Scissors, Clock, DollarSign, Star, Check, CalendarIcon } from "lucide-react"

const services = [
  {
    id: 1,
    name: "Basic Bath & Brush",
    duration: "1 hour",
    price: 45,
    description: "Bath, blow dry, brush out, nail trim, and ear cleaning",
    image: "/dog-bath-service.jpg",
  },
  {
    id: 2,
    name: "Full Grooming Package",
    duration: "2 hours",
    price: 85,
    description: "Complete grooming with haircut, styling, bath, and nail care",
    image: "/full-grooming-service.jpg",
  },
  {
    id: 3,
    name: "Cat Grooming Special",
    duration: "1.5 hours",
    price: 65,
    description: "Gentle grooming for cats including bath, brush, and nail trim",
    image: "/cat-grooming-service.jpg",
  },
  {
    id: 4,
    name: "Nail Trim & Paw Care",
    duration: "30 minutes",
    price: 25,
    description: "Nail trimming and paw pad care",
    image: "/nail-trim-service.jpg",
  },
  {
    id: 5,
    name: "Teeth Cleaning",
    duration: "45 minutes",
    price: 55,
    description: "Professional dental cleaning and breath freshening",
    image: "/teeth-cleaning-service.jpg",
  },
  {
    id: 6,
    name: "De-shedding Treatment",
    duration: "1 hour",
    price: 60,
    description: "Special treatment to reduce shedding and promote healthy coat",
    image: "/deshedding-service.jpg",
  },
]

const groomers = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 4.9,
    reviews: 234,
    specialty: "Dogs & Cats",
    image: "/groomer-sarah.jpg",
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4.8,
    reviews: 189,
    specialty: "Large Breeds",
    image: "/groomer-mike.jpg",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5.0,
    reviews: 156,
    specialty: "Cats",
    image: "/groomer-emily.jpg",
  },
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

export default function GroomingPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [selectedGroomer, setSelectedGroomer] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  const selectedServiceData = services.find((s) => s.id === selectedService)
  const selectedGroomerData = groomers.find((g) => g.id === selectedGroomer)

  const handleBooking = () => {
    // In a real app, this would submit to an API
    alert("Booking confirmed! You'll receive a confirmation email shortly.")
    // Reset form
    setSelectedService(null)
    setSelectedGroomer(null)
    setSelectedDate(new Date())
    setSelectedTime(null)
    setStep(1)
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
                        <DollarSign className="w-5 h-5" />
                        <span>{service.price}</span>
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
                              <span className="text-sm font-semibold text-primary">${selectedServiceData?.price}</span>
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
                      <span className="font-medium text-foreground">${selectedServiceData?.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-muted">Tax</span>
                      <span className="font-medium text-foreground">
                        ${((selectedServiceData?.price || 0) * 0.08).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-2xl font-bold text-primary">
                          ${((selectedServiceData?.price || 0) * 1.08).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-primary hover:bg-primary/90 text-surface"
                    onClick={handleBooking}
                  >
                    Confirm Booking
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
