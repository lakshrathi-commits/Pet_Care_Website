import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Clock, AlertTriangle, Heart, Pill, Thermometer, Droplet } from "lucide-react"

const emergencyContacts = [
  {
    name: "24/7 Emergency Vet Clinic",
    phone: "(555) 911-PETS",
    address: "123 Emergency Ave, City",
    hours: "Open 24/7",
    distance: "2.3 miles",
  },
  {
    name: "Animal Poison Control",
    phone: "(888) 426-4435",
    address: "National Hotline",
    hours: "Open 24/7",
    distance: "Nationwide",
  },
  {
    name: "Pet Emergency Hospital",
    phone: "(555) 123-4567",
    address: "456 Care Street, City",
    hours: "Open 24/7",
    distance: "3.8 miles",
  },
]

const firstAidTips = [
  {
    icon: Heart,
    title: "CPR for Pets",
    description: "Check for breathing and pulse. Perform chest compressions if needed.",
    severity: "critical",
  },
  {
    icon: Droplet,
    title: "Bleeding Control",
    description: "Apply direct pressure with clean cloth. Elevate the wound if possible.",
    severity: "urgent",
  },
  {
    icon: Pill,
    title: "Poisoning",
    description: "Call poison control immediately. Do not induce vomiting unless instructed.",
    severity: "critical",
  },
  {
    icon: Thermometer,
    title: "Heatstroke",
    description: "Move to cool area, apply cool water, and seek immediate vet care.",
    severity: "urgent",
  },
]

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-destructive/10 to-warning/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/20 mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Pet <span className="text-destructive">Emergency</span> Help
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-pretty">
              Quick access to emergency contacts and first aid information for your pet
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Emergency Contacts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Emergency Contacts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="border-destructive/50 hover:shadow-xl transition-all">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">{contact.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Phone className="w-4 h-4 text-destructive" />
                      <span className="font-medium text-foreground">{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <MapPin className="w-4 h-4 text-destructive" />
                      <span>{contact.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Clock className="w-4 h-4 text-destructive" />
                      <span>{contact.hours}</span>
                    </div>
                  </div>
                  <Button className="w-full rounded-full bg-destructive hover:bg-destructive/90 text-surface">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* First Aid Tips */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">First Aid Guide</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {firstAidTips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <Card key={index} className="border-border">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                          tip.severity === "critical" ? "bg-destructive/20" : "bg-warning/20"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${tip.severity === "critical" ? "text-destructive" : "text-warning"}`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{tip.title}</h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              tip.severity === "critical"
                                ? "bg-destructive/20 text-destructive"
                                : "bg-warning/20 text-warning"
                            }`}
                          >
                            {tip.severity}
                          </span>
                        </div>
                        <p className="text-sm text-foreground-muted leading-relaxed">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Warning Banner */}
        <Card className="mt-12 border-warning/50 bg-warning/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-warning shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Important Notice</h3>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  This information is for emergency reference only and should not replace professional veterinary care.
                  Always contact a veterinarian immediately in case of a pet emergency.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
