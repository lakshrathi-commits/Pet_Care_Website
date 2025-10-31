"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { db } from "@/lib/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore"
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
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react"

interface Pet {
  id: string
  name: string
  type: string
  breed: string
  age: number
  ageUnit: 'months' | 'years'
  dateOfBirth: string
  image: string
  userId: string
}

interface Vaccination {
  id: string
  petId: string
  name: string
  date: string
  nextDue: string
  doseNumber?: number
  totalDoses?: number
  status: 'current' | 'overdue' | 'upcoming'
}

interface Medication {
  id: string
  petId: string
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
  nextDose: string
  notes?: string
  status: 'active' | 'completed'
}

interface Appointment {
  id: string
  petId: string
  type: string
  date: string
  time: string
  vet: string
  location: string
  status: 'upcoming' | 'completed' | 'cancelled'
}

export default function HealthPage() {
  const { user } = useAuth()
  const [pets, setPets] = useState<Pet[]>([])
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([])
  const [medications, setMedications] = useState<Medication[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedPet, setSelectedPet] = useState<string>("")
  const [showAddPetForm, setShowAddPetForm] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Form states for new pet
  const [newPet, setNewPet] = useState({
    name: "",
    type: "",
    breed: "",
    age: 0,
    ageUnit: "months" as 'months' | 'years',
    dateOfBirth: "",
    image: ""
  })

  // Form states for vaccination
  const [showAddVaccinationForm, setShowAddVaccinationForm] = useState(false)
  const [newVaccination, setNewVaccination] = useState({
    name: "",
    date: "",
    doseNumber: 1,
    totalDoses: 1
  })

  // Form states for medication
  const [showAddMedicationForm, setShowAddMedicationForm] = useState(false)
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    notes: ""
  })

  // Load user's pets and health data
  useEffect(() => {
    if (!user) return

    const petsQuery = query(collection(db, 'pets'), where('userId', '==', user.uid))
    const unsubscribePets = onSnapshot(petsQuery, (snapshot) => {
      const petsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Pet))
      setPets(petsData)
      if (petsData.length > 0 && !selectedPet) {
        setSelectedPet(petsData[0].id)
      }
    })

    const vaccinationsQuery = query(collection(db, 'vaccinations'), where('userId', '==', user.uid))
    const unsubscribeVaccinations = onSnapshot(vaccinationsQuery, (snapshot) => {
      const vaccinationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vaccination))
      setVaccinations(vaccinationsData)
    })

    const medicationsQuery = query(collection(db, 'medications'), where('userId', '==', user.uid))
    const unsubscribeMedications = onSnapshot(medicationsQuery, (snapshot) => {
      const medicationsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Medication))
      setMedications(medicationsData)
    })

    const appointmentsQuery = query(collection(db, 'appointments'), where('userId', '==', user.uid))
    const unsubscribeAppointments = onSnapshot(appointmentsQuery, (snapshot) => {
      const appointmentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment))
      setAppointments(appointmentsData)
    })

    return () => {
      unsubscribePets()
      unsubscribeVaccinations()
      unsubscribeMedications()
      unsubscribeAppointments()
    }
  }, [user, selectedPet])

  // Calculate next vaccination date based on pet age and dose
  const calculateNextVaccinationDate = (currentDate: string, doseNumber: number, ageInMonths: number) => {
    const date = new Date(currentDate)
    
    // For first year kittens/puppies: 4 doses separated by 21 days
    if (ageInMonths < 12) {
      if (doseNumber < 4) {
        date.setDate(date.getDate() + 21) // Next dose in 21 days
      } else {
        date.setFullYear(date.getFullYear() + 1) // Annual after 4th dose
      }
    } else {
      // Annual vaccination after first year
      date.setFullYear(date.getFullYear() + 1)
    }
    
    return date.toISOString().split('T')[0]
  }

  // Initialize vaccination schedule for new pets
  const initializeVaccinationSchedule = async (petId: string, age: number, ageUnit: string, dateOfBirth: string) => {
    const ageInMonths = ageUnit === 'years' ? age * 12 : age
    const today = new Date().toISOString().split('T')[0]
    
    const vaccinations = [
      { name: 'Rabies', required: true },
      { name: 'DHPP (Distemper, Hepatitis, Parainfluenza, Parvovirus)', required: true },
      { name: 'Bordetella', required: false },
      { name: 'Leptospirosis', required: false }
    ]
    
    for (const vac of vaccinations) {
      if (ageInMonths < 12) {
        // For young pets, schedule 4 doses
        const nextDue = calculateNextVaccinationDate(today, 1, ageInMonths)
        await addDoc(collection(db, 'vaccinations'), {
          petId,
          userId: user!.uid,
          name: vac.name,
          date: today,
          doseNumber: 1,
          totalDoses: 4,
          nextDue,
          status: 'upcoming'
        })
      }
    }
  }

  const addPet = async () => {
    if (!user || !newPet.name || !newPet.type || newPet.age <= 0) return
    
    setLoading(true)
    try {
      const petDoc = await addDoc(collection(db, 'pets'), {
        ...newPet,
        userId: user.uid,
        createdAt: new Date().toISOString()
      })
      
      // If it's a kitten/puppy, automatically add vaccination schedule
      if (newPet.type.toLowerCase().includes('cat') || newPet.type.toLowerCase().includes('dog')) {
        await initializeVaccinationSchedule(petDoc.id, newPet.age, newPet.ageUnit, newPet.dateOfBirth)
      }
      
      setNewPet({ name: "", type: "", breed: "", age: 0, ageUnit: "months", dateOfBirth: "", image: "" })
      setShowAddPetForm(false)
    } catch (error) {
      console.error('Error adding pet:', error)
    } finally {
      setLoading(false)
    }
  }

  const addVaccination = async () => {
    if (!user || !selectedPet || !newVaccination.name || !newVaccination.date) return
    
    setLoading(true)
    try {
      const pet = pets.find(p => p.id === selectedPet)
      const ageInMonths = pet ? (pet.ageUnit === 'years' ? pet.age * 12 : pet.age) : 12
      
      const nextDue = calculateNextVaccinationDate(
        newVaccination.date, 
        newVaccination.doseNumber, 
        ageInMonths
      )
      
      await addDoc(collection(db, 'vaccinations'), {
        ...newVaccination,
        petId: selectedPet,
        userId: user.uid,
        nextDue,
        status: 'current',
        createdAt: new Date().toISOString()
      })
      
      setNewVaccination({ name: "", date: "", doseNumber: 1, totalDoses: 1 })
      setShowAddVaccinationForm(false)
    } catch (error) {
      console.error('Error adding vaccination:', error)
    } finally {
      setLoading(false)
    }
  }

  const addMedication = async () => {
    if (!user || !selectedPet || !newMedication.name || !newMedication.dosage) return
    
    setLoading(true)
    try {
      const nextDose = new Date()
      nextDose.setHours(nextDose.getHours() + 8) // Default next dose in 8 hours
      
      await addDoc(collection(db, 'medications'), {
        ...newMedication,
        petId: selectedPet,
        userId: user.uid,
        nextDose: nextDose.toISOString(),
        status: 'active',
        createdAt: new Date().toISOString()
      })
      
      setNewMedication({ name: "", dosage: "", frequency: "", startDate: "", endDate: "", notes: "" })
      setShowAddMedicationForm(false)
    } catch (error) {
      console.error('Error adding medication:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter data for selected pet
  const currentPet = pets.find(p => p.id === selectedPet)
  const petVaccinations = vaccinations.filter(v => v.petId === selectedPet)
  const petMedications = medications.filter(m => m.petId === selectedPet)
  const petAppointments = appointments.filter(a => a.petId === selectedPet)

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-bold text-foreground mb-4">Sign In Required</h2>
            <p className="text-foreground-muted">Please sign in to access your pet health tracker.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

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
                      {pet.breed} • {pet.age} {pet.ageUnit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button 
              variant="outline" 
              className="shrink-0 rounded-full bg-transparent h-auto px-6"
              onClick={() => setShowAddPetForm(true)}
            >
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
              <Button 
                className="rounded-full bg-primary hover:bg-primary/90 text-white"
                onClick={() => setShowAddVaccinationForm(true)}
                disabled={!selectedPet}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Vaccination
              </Button>
            </div>

            {petVaccinations.length === 0 ? (
              <Card className="border-border">
                <CardContent className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Syringe className="w-8 h-8 text-foreground-muted" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Vaccinations Yet</h3>
                  <p className="text-foreground-muted mb-6">Start tracking your pet's vaccination records</p>
                  <Button 
                    className="rounded-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setShowAddVaccinationForm(true)}
                    disabled={!selectedPet}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Vaccination
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {petVaccinations.map((vaccination) => (
                  <Card key={vaccination.id} className="border-border">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Syringe className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{vaccination.name}</h3>
                            <p className="text-sm text-foreground-muted">Last administered: {vaccination.date}</p>
                            {vaccination.doseNumber && vaccination.totalDoses && (
                              <p className="text-xs text-foreground-muted mt-1">
                                Dose {vaccination.doseNumber} of {vaccination.totalDoses}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge
                          className={
                            vaccination.status === "current"
                              ? "bg-success/20 text-success border-0"
                              : vaccination.status === "upcoming"
                              ? "bg-primary/20 text-primary border-0"
                              : "bg-destructive/20 text-destructive border-0"
                          }
                        >
                          {vaccination.status === "current" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : vaccination.status === "upcoming" ? (
                            <Clock className="w-3 h-3 mr-1" />
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
            )}
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Current Medications</h2>
              <Button 
                className="rounded-full bg-primary hover:bg-primary/90 text-white"
                onClick={() => setShowAddMedicationForm(true)}
                disabled={!selectedPet}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Medication
              </Button>
            </div>

            {petMedications.length === 0 ? (
              <Card className="border-border">
                <CardContent className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Pill className="w-8 h-8 text-foreground-muted" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No Medications Yet</h3>
                  <p className="text-foreground-muted mb-6">Start tracking your pet's medications</p>
                  <Button 
                    className="rounded-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setShowAddMedicationForm(true)}
                    disabled={!selectedPet}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Medication
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {petMedications.map((medication) => (
                  <Card key={medication.id} className="border-border">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Pill className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{medication.name}</h3>
                            <p className="text-sm text-foreground-muted">
                              {medication.dosage} • {medication.frequency}
                            </p>
                            {medication.notes && (
                              <p className="text-xs text-foreground-muted mt-1">{medication.notes}</p>
                            )}
                          </div>
                        </div>
                        <Badge className={medication.status === 'active' ? "bg-success/20 text-success border-0" : "bg-muted text-foreground-muted border-0"}>
                          <Activity className="w-3 h-3 mr-1" />
                          {medication.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-foreground-muted">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>Next dose: {new Date(medication.nextDose).toLocaleString()}</span>
                        </div>
                        {medication.endDate && (
                          <div className="flex items-center gap-2 text-sm text-foreground-muted">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>End date: {medication.endDate}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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

        {/* Add Pet Modal */}
        {showAddPetForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Add New Pet</h2>
                  <button
                    onClick={() => setShowAddPetForm(false)}
                    className="text-foreground-muted hover:text-foreground"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Pet Name</label>
                    <Input
                      value={newPet.name}
                      onChange={(e) => setNewPet({...newPet, name: e.target.value})}
                      placeholder="Enter pet name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Pet Type</label>
                    <Input
                      value={newPet.type}
                      onChange={(e) => setNewPet({...newPet, type: e.target.value})}
                      placeholder="Dog, Cat, Bird, etc."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Breed</label>
                    <Input
                      value={newPet.breed}
                      onChange={(e) => setNewPet({...newPet, breed: e.target.value})}
                      placeholder="Enter breed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date of Birth</label>
                    <Input
                      type="date"
                      value={newPet.dateOfBirth}
                      onChange={(e) => setNewPet({...newPet, dateOfBirth: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Age</label>
                      <Input
                        type="number"
                        min="0"
                        value={newPet.age || ''}
                        onChange={(e) => setNewPet({...newPet, age: parseInt(e.target.value) || 0})}
                        placeholder="Enter age"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Unit</label>
                      <select
                        value={newPet.ageUnit}
                        onChange={(e) => setNewPet({...newPet, ageUnit: e.target.value as 'months' | 'years'})}
                        className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground"
                      >
                        <option value="months">Months</option>
                        <option value="years">Years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Image URL (optional)</label>
                    <Input
                      value={newPet.image}
                      onChange={(e) => setNewPet({...newPet, image: e.target.value})}
                      placeholder="Enter image URL"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      onClick={addPet}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      disabled={loading || !newPet.name || !newPet.type}
                    >
                      {loading ? 'Adding...' : 'Add Pet'}
                    </Button>
                    <Button 
                      onClick={() => setShowAddPetForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Vaccination Modal */}
        {showAddVaccinationForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Add Vaccination</h2>
                  <button
                    onClick={() => setShowAddVaccinationForm(false)}
                    className="text-foreground-muted hover:text-foreground"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Vaccination Name</label>
                    <select
                      value={newVaccination.name}
                      onChange={(e) => setNewVaccination({...newVaccination, name: e.target.value})}
                      className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground"
                      required
                    >
                      <option value="">Select vaccination</option>
                      <option value="Rabies">Rabies</option>
                      <option value="DHPP (Distemper, Hepatitis, Parainfluenza, Parvovirus)">DHPP (Distemper, Hepatitis, Parainfluenza, Parvovirus)</option>
                      <option value="Bordetella">Bordetella (Kennel Cough)</option>
                      <option value="Leptospirosis">Leptospirosis</option>
                      <option value="Lyme Disease">Lyme Disease</option>
                      <option value="Canine Influenza">Canine Influenza</option>
                      <option value="FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)">FVRCP (Cat)</option>
                      <option value="FeLV (Feline Leukemia)">FeLV (Cat)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date Administered</label>
                    <Input
                      type="date"
                      value={newVaccination.date}
                      onChange={(e) => setNewVaccination({...newVaccination, date: e.target.value})}
                      max={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Dose Number</label>
                      <Input
                        type="number"
                        min="1"
                        value={newVaccination.doseNumber || ''}
                        onChange={(e) => setNewVaccination({...newVaccination, doseNumber: parseInt(e.target.value) || 1})}
                        placeholder="1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Total Doses</label>
                      <Input
                        type="number"
                        min="1"
                        value={newVaccination.totalDoses || ''}
                        onChange={(e) => setNewVaccination({...newVaccination, totalDoses: parseInt(e.target.value) || 1})}
                        placeholder="1"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg text-sm text-foreground-muted">
                    <p className="font-medium text-foreground mb-1">💉 Vaccination Schedule Info:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• For kittens/puppies: 4 doses in first year (21 days apart)</li>
                      <li>• After first year: Annual booster shots</li>
                      <li>• Next due date calculated automatically</li>
                    </ul>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      onClick={addVaccination}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      disabled={loading || !newVaccination.name || !newVaccination.date}
                    >
                      {loading ? 'Adding...' : 'Add Vaccination'}
                    </Button>
                    <Button 
                      onClick={() => setShowAddVaccinationForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Medication Modal */}
        {showAddMedicationForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Add Medication</h2>
                  <button
                    onClick={() => setShowAddMedicationForm(false)}
                    className="text-foreground-muted hover:text-foreground"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Medication Name</label>
                    <select
                      value={newMedication.name}
                      onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                      className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground"
                      required
                    >
                      <option value="">Select medication</option>
                      <option value="Amoxicillin">Amoxicillin (Antibiotic)</option>
                      <option value="Cephalexin">Cephalexin (Antibiotic)</option>
                      <option value="Doxycycline">Doxycycline (Antibiotic)</option>
                      <option value="Prednisone">Prednisone (Anti-inflammatory)</option>
                      <option value="Carprofen">Carprofen (Pain Relief)</option>
                      <option value="Gabapentin">Gabapentin (Pain/Anxiety)</option>
                      <option value="Heartgard">Heartgard (Heartworm Prevention)</option>
                      <option value="Bravecto">Bravecto (Flea/Tick Prevention)</option>
                      <option value="Cerenia">Cerenia (Anti-nausea)</option>
                      <option value="Metronidazole">Metronidazole (Antibiotic)</option>
                      <option value="Other">Other (Custom)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Dosage</label>
                    <Input
                      value={newMedication.dosage}
                      onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                      placeholder="e.g., 10mg, 2 tablets"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Frequency</label>
                    <select
                      value={newMedication.frequency}
                      onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                      className="w-full h-10 px-3 rounded-md border border-border bg-background text-foreground"
                      required
                    >
                      <option value="">Select frequency</option>
                      <option value="Once daily">Once daily</option>
                      <option value="Twice daily">Twice daily</option>
                      <option value="Three times daily">Three times daily</option>
                      <option value="Every 8 hours">Every 8 hours</option>
                      <option value="Every 12 hours">Every 12 hours</option>
                      <option value="Once weekly">Once weekly</option>
                      <option value="Once monthly">Once monthly</option>
                      <option value="As needed">As needed</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                      <Input
                        type="date"
                        value={newMedication.startDate}
                        onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">End Date (Optional)</label>
                      <Input
                        type="date"
                        value={newMedication.endDate}
                        onChange={(e) => setNewMedication({...newMedication, endDate: e.target.value})}
                        min={newMedication.startDate}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Notes (Optional)</label>
                    <textarea
                      value={newMedication.notes}
                      onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})}
                      placeholder="Special instructions, side effects to watch for, etc."
                      className="w-full h-20 px-3 py-2 rounded-md border border-border bg-background text-foreground resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      onClick={addMedication}
                      className="flex-1 bg-primary hover:bg-primary/90 text-white"
                      disabled={loading || !newMedication.name || !newMedication.dosage || !newMedication.frequency || !newMedication.startDate}
                    >
                      {loading ? 'Adding...' : 'Add Medication'}
                    </Button>
                    <Button 
                      onClick={() => setShowAddMedicationForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
