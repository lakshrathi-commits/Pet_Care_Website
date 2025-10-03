"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Activity,
  Calendar,
  Plus,
  Syringe,
  Pill,
  Stethoscope,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react"

const pets = [
  { id: 1, name: "Max", type: "Dog", breed: "Golden Retriever", age: "2 years", image: "/golden-retriever-max.jpg" },
  { id: 2, name: "Luna", type: "Cat", breed: "Persian", age: "1 year", image: "/persian-cat-luna.jpg" },
]

const vaccinations = [
  {
    id: 1,
    petId: 1,
    name: "Rabies",
    date: "2024-03-15",
    nextDue: "2025-03-15",
    status: "current",
  },
  {
    id: 2,
    petId: 1,
    name: "DHPP",
    date: "2024-02-10",
    nextDue: "2025-02-10",
    status: "current",
  },
  {
    id: 3,
    petId: 1,
    name: "Bordetella",
    date: "2023-12-05",
    nextDue: "2024-12-05",
    status: "overdue",
  },
  {
    id: 4,
    petId: 2,
    name: "FVRCP",
    date: "2024-01-20",
    nextDue: "2025-01-20",
    status: "current",
  },
]

const medications = [
  {
    id: 1,
    petId: 1,
    name: "Heartgard Plus",
    dosage: "1 tablet",
    frequency: "Monthly",
    nextDose: "2025-02-01",
    status: "active",
  },
  {
    id: 2,
    petId: 1,
    name: "NexGard",
    dosage: "1 chewable",
    frequency: "Monthly",
    nextDose: "2025-02-01",
    status: "active",
  },
  {
    id: 3,
    petId: 2,
    name: "Revolution Plus",
    dosage: "1 application",
    frequency: "Monthly",
    nextDose: "2025-02-05",
    status: "active",
  },
]

const appointments = [
  {
    id: 1,
    petId: 1,
    type: "Annual Checkup",
    date: "2025-02-15",
    time: "10:00 AM",
    vet: "Dr. Sarah Johnson",
    location: "Happy Paws Veterinary Clinic",
    status: "upcoming",
  },
  {
    id: 2,
    petId: 2,
    type: "Dental Cleaning",
    date: "2025-02-20",
    time: "2:00 PM",
    vet: "Dr. Mike Chen",
    location: "Pet Care Center",
    status: "upcoming",
  },
]

export default function HealthPage() {
  const [selectedPet, setSelectedPet] = useState(pets[0].id)

  const petVaccinations = vaccinations.filter((v) => v.petId === selectedPet)
  const petMedications = medications.filter((m) => m.petId === selectedPet)
  const petAppointments = appointments.filter((a) => a.petId === selectedPet)

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
              Pet <span className="text-primary">Health</span> Tracker
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto text-pretty">
              Keep track of vaccinations, medications, and vet appointments all in one place
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Pet Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Select Pet</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {pets.map((pet) => (
              <Card
                key={pet.id}
                className={`cursor-pointer transition-all shrink-0 ${
                  selectedPet === pet.id
                    ? "border-primary shadow-lg ring-2 ring-primary"
                    : "border-border hover:border-primary"
                }`}
                onClick={() => setSelectedPet(pet.id)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <img
                    src={pet.image || "/placeholder.svg"}
                    alt={pet.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{pet.name}</h3>
                    <p className="text-sm text-foreground-muted">
                      {pet.breed} • {pet.age}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" className="shrink-0 rounded-full bg-transparent h-auto px-6">
              <Plus className="w-4 h-4 mr-2" />
              Add Pet
            </Button>
          </div>
        </div>

        {/* Health Tabs */}
        <Tabs defaultValue="vaccinations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="records">Records</TabsTrigger>
          </TabsList>

          {/* Vaccinations Tab */}
          <TabsContent value="vaccinations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Vaccination Records</h2>
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Vaccination
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {petVaccinations.map((vaccination) => (
                <Card key={vaccination.id} className="border-border">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Syringe className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{vaccination.name}</h3>
                          <p className="text-sm text-foreground-muted">Last administered: {vaccination.date}</p>
                        </div>
                      </div>
                      <Badge
                        className={
                          vaccination.status === "current"
                            ? "bg-success/20 text-success border-0"
                            : "bg-destructive/20 text-destructive border-0"
                        }
                      >
                        {vaccination.status === "current" ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <AlertCircle className="w-3 h-3 mr-1" />
                        )}
                        {vaccination.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Next due: {vaccination.nextDue}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Current Medications</h2>
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-surface">
                <Plus className="w-4 h-4 mr-2" />
                Add Medication
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {petMedications.map((medication) => (
                <Card key={medication.id} className="border-border">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Pill className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{medication.name}</h3>
                          <p className="text-sm text-foreground-muted">
                            {medication.dosage} • {medication.frequency}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-success/20 text-success border-0">
                        <Activity className="w-3 h-3 mr-1" />
                        {medication.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground-muted">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>Next dose: {medication.nextDose}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Upcoming Appointments</h2>
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-surface">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Appointment
              </Button>
            </div>

            <div className="space-y-4">
              {petAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Stethoscope className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{appointment.type}</h3>
                            <p className="text-sm text-foreground-muted">{appointment.vet}</p>
                          </div>
                          <Badge className="bg-info/20 text-info border-0">{appointment.status}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-foreground-muted">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>
                              {appointment.date} at {appointment.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-foreground-muted">
                            <FileText className="w-4 h-4 text-primary" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Medical Records</h2>
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-surface">
                <Plus className="w-4 h-4 mr-2" />
                Upload Record
              </Button>
            </div>

            <Card className="border-border">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <FileText className="w-8 h-8 text-foreground-muted" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No Records Yet</h3>
                <p className="text-foreground-muted mb-6">Upload medical records, test results, and documents</p>
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-surface">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload First Record
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
