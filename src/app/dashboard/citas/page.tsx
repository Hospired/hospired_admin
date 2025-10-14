"use client" 


import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Calendar, Edit, Trash2, Eye, Clock, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Appointment = {
  id: number
  patient_id: number
  physician_id: number | null
  motive: string
  specialty: string
  status: "scheduled" | "completed" | "cancelled" | "no_show"
  start: string
  end: string
  calendar_item_id: number | null
  facility_unit_id: number | null
  created_at: string
}

type Patient = {
  id: number
  name: string
}

type Physician = {
  id: number
  name: string
  specialty: string
}

type FacilityUnit = {
  id: number
  name: string
  facility_name: string
}

const patientsData: Patient[] = [
  { id: 1, name: "Juan Pérez" },
  { id: 2, name: "María García" },
  { id: 3, name: "Carlos López" },
]

const physiciansData: Physician[] = [
  { id: 1, name: "Dr. Roberto Martínez", specialty: "Cardiología" },
  { id: 2, name: "Dra. Ana Rodríguez", specialty: "Pediatría" },
  { id: 3, name: "Dr. Luis Hernández", specialty: "Medicina General" },
]

const facilityUnitsData: FacilityUnit[] = [
  { id: 1, name: "Cardiología", facility_name: "Hospital Manolo Morales" },
  { id: 2, name: "Emergencias", facility_name: "Hospital Manolo Morales" },
  { id: 3, name: "Medicina General", facility_name: "Centro de Salud Villa Libertad" },
  { id: 4, name: "Pediatría", facility_name: "Hospital Escuela Oscar Danilo Rosales" },
]

const healthcareFacilitiesData = [
  { id: 1, name: "Hospital Manolo Morales" },
  { id: 2, name: "Centro de Salud Villa Libertad" },
  { id: 3, name: "Hospital Escuela Oscar Danilo Rosales" },
]

const appointmentsData: Appointment[] = [
  {
    id: 1,
    patient_id: 1,
    physician_id: 1,
    motive: "Control de presión arterial",
    specialty: "Cardiología",
    status: "scheduled",
    start: "2024-02-15T09:00:00Z",
    end: "2024-02-15T09:30:00Z",
    calendar_item_id: null,
    facility_unit_id: 1,
    created_at: "2024-02-01T10:00:00Z",
  },
  {
    id: 2,
    patient_id: 2,
    physician_id: 2,
    motive: "Consulta pediátrica de rutina",
    specialty: "Pediatría",
    status: "completed",
    start: "2024-02-10T10:00:00Z",
    end: "2024-02-10T10:30:00Z",
    calendar_item_id: null,
    facility_unit_id: 4,
    created_at: "2024-02-01T11:00:00Z",
  },
  {
    id: 3,
    patient_id: 3,
    physician_id: 3,
    motive: "Dolor de cabeza persistente",
    specialty: "Medicina General",
    status: "scheduled",
    start: "2024-02-20T14:00:00Z",
    end: "2024-02-20T14:30:00Z",
    calendar_item_id: null,
    facility_unit_id: 3,
    created_at: "2024-02-05T09:00:00Z",
  },
]

const statusLabels = {
  scheduled: "Programada",
  completed: "Completada",
  cancelled: "Cancelada",
  no_show: "No asistió",
}

const statusColors = {
  scheduled: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  completed: "bg-green-500/10 text-green-500 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  no_show: "bg-orange-500/10 text-orange-500 border-orange-500/20",
}

const specialties = [
  "Cardiología",
  "Pediatría",
  "Medicina General",
  "Ginecología",
  "Traumatología",
  "Dermatología",
  "Oftalmología",
  "Neurología",
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFacility, setSelectedFacility] = useState<string>("all")
  const [selectedUnit, setSelectedUnit] = useState<string>("all")
  const [appointments, setAppointments] = useState<Appointment[]>(appointmentsData)
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  const [appointmentForm, setAppointmentForm] = useState({
    patient_id: 1,
    physician_id: 1,
    motive: "",
    specialty: "Medicina General",
    status: "scheduled" as Appointment["status"],
    start: "",
    end: "",
    facility_unit_id: 1,
  })

  const openAppointmentDialog = (appointment?: Appointment) => {
    if (appointment) {
      setEditingAppointment(appointment)
      setAppointmentForm({
        patient_id: appointment.patient_id,
        physician_id: appointment.physician_id || 1,
        motive: appointment.motive,
        specialty: appointment.specialty,
        status: appointment.status,
        start: appointment.start.slice(0, 16),
        end: appointment.end.slice(0, 16),
        facility_unit_id: appointment.facility_unit_id || 1,
      })
    } else {
      setEditingAppointment(null)
      setAppointmentForm({
        patient_id: 1,
        physician_id: 1,
        motive: "",
        specialty: "Medicina General",
        status: "scheduled",
        start: "",
        end: "",
        facility_unit_id: 1,
      })
    }
    setAppointmentDialogOpen(true)
  }

  const saveAppointment = () => {
    if (editingAppointment) {
      setAppointments(
        appointments.map((a) =>
          a.id === editingAppointment.id
            ? {
                ...a,
                ...appointmentForm,
                start: new Date(appointmentForm.start).toISOString(),
                end: new Date(appointmentForm.end).toISOString(),
              }
            : a,
        ),
      )
    } else {
      const newAppointment: Appointment = {
        id: Math.max(...appointments.map((a) => a.id)) + 1,
        ...appointmentForm,
        start: new Date(appointmentForm.start).toISOString(),
        end: new Date(appointmentForm.end).toISOString(),
        calendar_item_id: null,
        created_at: new Date().toISOString(),
      }
      setAppointments([...appointments, newAppointment])
    }
    setAppointmentDialogOpen(false)
  }

  const openDeleteDialog = (appointment: Appointment) => {
    setAppointmentToDelete(appointment)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteAppointment = () => {
    if (appointmentToDelete) {
      setAppointments(appointments.filter((a) => a.id !== appointmentToDelete.id))
      setDeleteDialogOpen(false)
      setAppointmentToDelete(null)
    }
  }

  const deleteAppointment = (id: number) => {
    // This function is no longer directly used but kept for completeness if needed elsewhere
    // The actual deletion is handled by confirmDeleteAppointment
    console.log("Delete called directly on appointment", id)
  }

  const openDetailsDialog = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setDetailsDialogOpen(true)
  }

  // Removed status change dialog, no longer needed
  // const openStatusDialog = (appointment: Appointment) => {
  //   setChangingStatusAppointment(appointment)
  //   setNewStatus(appointment.status)
  //   setStatusDialogOpen(true)
  // }

  // Removed status change function
  // const changeAppointmentStatus = () => {
  //   if (changingStatusAppointment) {
  //     setAppointments(
  //       appointments.map((a) => (a.id === changingStatusAppointment.id ? { ...a, status: newStatus } : a)),
  //     )
  //     setStatusDialogOpen(false)
  //   }
  // }

  const getPatientName = (id: number) => {
    return patientsData.find((p) => p.id === id)?.name || "Desconocido"
  }

  const getPhysicianName = (id: number | null) => {
    if (!id) return "Sin asignar"
    return physiciansData.find((p) => p.id === id)?.name || "Desconocido"
  }

  const getFacilityUnitName = (id: number | null) => {
    if (!id) return "Sin asignar"
    const unit = facilityUnitsData.find((u) => u.id === id)
    return unit ? `${unit.name} - ${unit.facility_name}` : "Desconocido"
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("es-NI", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      getPatientName(a.patient_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getPhysicianName(a.physician_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.motive.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    const unit = facilityUnitsData.find((u) => u.id === a.facility_unit_id)
    const matchesFacility = selectedFacility === "all" || unit?.facility_name === selectedFacility
    const matchesUnit = selectedUnit === "all" || a.facility_unit_id?.toString() === selectedUnit

    return matchesSearch && matchesFacility && matchesUnit
  })

  const availableFacilities = Array.from(new Set(facilityUnitsData.map((u) => u.facility_name)))

  const availableUnits =
    selectedFacility === "all"
      ? facilityUnitsData
      : facilityUnitsData.filter((u) => u.facility_name === selectedFacility)

  const openEditFromDetails = () => {
    if (selectedAppointment) {
      setDetailsDialogOpen(false)
      openAppointmentDialog(selectedAppointment)
    }
  }

  return (
    <>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-balance">Citas Médicas</h1>
            <p className="text-muted-foreground text-pretty">
              Gestiona las citas médicas y consultas del sistema de salud.
            </p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => openAppointmentDialog()}>
            <Plus className="h-4 w-4" />
            Nueva Cita
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">Citas registradas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Programadas</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {appointments.filter((a) => a.status === "scheduled").length}
              </div>
              <p className="text-xs text-muted-foreground">Pendientes de atención</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {appointments.filter((a) => a.status === "completed").length}
              </div>
              <p className="text-xs text-muted-foreground">Atendidas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Canceladas</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {appointments.filter((a) => a.status === "cancelled" || a.status === "no_show").length}
              </div>
              <p className="text-xs text-muted-foreground">No realizadas</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Buscar y Filtrar Citas</CardTitle>
            <CardDescription>Encuentra citas por paciente, médico, centro de salud o unidad médica</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por paciente, médico o motivo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Centro de Salud</Label>
                <Select value={selectedFacility} onValueChange={setSelectedFacility}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los centros" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los centros</SelectItem>
                    {availableFacilities.map((facility) => (
                      <SelectItem key={facility} value={facility}>
                        {facility}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Unidad Médica</Label>
                <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todas las unidades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las unidades</SelectItem>
                    {availableUnits.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id.toString()}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Citas ({filteredAppointments.length})</CardTitle>
            <CardDescription>Todas las citas médicas registradas en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Médico</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Especialidad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Unidad</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">{getPatientName(appointment.patient_id)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{getPhysicianName(appointment.physician_id)}</p>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate" title={appointment.motive}>
                        {appointment.motive}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{appointment.specialty}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[appointment.status]}>{statusLabels[appointment.status]}</Badge>
                    </TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">
                      {getFacilityUnitName(appointment.facility_unit_id)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <span className="sr-only">Abrir menú</span>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openDetailsDialog(appointment)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openAppointmentDialog(appointment)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(appointment)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Detalles de la Cita</DialogTitle>
              <DialogDescription>Información completa de la cita médica</DialogDescription>
            </DialogHeader>
            {selectedAppointment && (
              <div className="space-y-6 py-4">
                <div className="rounded-lg border bg-muted/50 p-4">
                  <h3 className="mb-4 font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Paciente y Médico
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="details-patient">Paciente</Label>
                      <Select value={selectedAppointment.patient_id.toString()} disabled>
                        <SelectTrigger id="details-patient">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {patientsData.map((patient) => (
                            <SelectItem key={patient.id} value={patient.id.toString()}>
                              {patient.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="details-physician">Médico Asignado</Label>
                      <Select value={selectedAppointment.physician_id?.toString() || "1"} disabled>
                        <SelectTrigger id="details-physician">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {physiciansData.map((physician) => (
                            <SelectItem key={physician.id} value={physician.id.toString()}>
                              {physician.name} - {physician.specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h3 className="mb-4 font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Detalles de la Consulta
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="details-motive">Motivo de la Cita</Label>
                      <Textarea
                        id="details-motive"
                        value={selectedAppointment.motive}
                        disabled
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="details-specialty">Especialidad</Label>
                        <Select value={selectedAppointment.specialty} disabled>
                          <SelectTrigger id="details-specialty">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {specialties.map((specialty) => (
                              <SelectItem key={specialty} value={specialty}>
                                {specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="details-status">Estado</Label>
                        <Select value={selectedAppointment.status} disabled>
                          <SelectTrigger id="details-status">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scheduled">Programada</SelectItem>
                            <SelectItem value="completed">Completada</SelectItem>
                            <SelectItem value="cancelled">Cancelada</SelectItem>
                            <SelectItem value="no_show">No asistió</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-muted/50 p-4">
                  <h3 className="mb-4 font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                    Fecha, Hora y Ubicación
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="details-start">Fecha y Hora de Inicio</Label>
                        <Input
                          id="details-start"
                          type="datetime-local"
                          value={selectedAppointment.start.slice(0, 16)}
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="details-end">Fecha y Hora de Fin</Label>
                        <Input
                          id="details-end"
                          type="datetime-local"
                          value={selectedAppointment.end.slice(0, 16)}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="details-unit">Unidad del Centro de Salud</Label>
                      <Select value={selectedAppointment.facility_unit_id?.toString() || "1"} disabled>
                        <SelectTrigger id="details-unit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {facilityUnitsData.map((unit) => (
                            <SelectItem key={unit.id} value={unit.id.toString()}>
                              {unit.name} - {unit.facility_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Creada el {formatDateTime(selectedAppointment.created_at)}</span>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                Cerrar
              </Button>
              <Button onClick={openEditFromDetails} className="gap-2">
                <Edit className="h-4 w-4" />
                Editar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro de eliminar esta cita?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. La cita de{" "}
                <span className="font-semibold">
                  {appointmentToDelete && getPatientName(appointmentToDelete.patient_id)}
                </span>{" "}
                será eliminada permanentemente del sistema.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteAppointment} className="bg-destructive hover:bg-destructive/90">
                Eliminar Cita
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={appointmentDialogOpen} onOpenChange={setAppointmentDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingAppointment ? "Editar Cita Médica" : "Nueva Cita Médica"}
              </DialogTitle>
              <DialogDescription>
                {editingAppointment
                  ? "Modifica los datos de la cita médica"
                  : "Completa el formulario para agendar una nueva cita"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-4 font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Paciente y Médico
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointment-patient">Paciente *</Label>
                    <Select
                      value={appointmentForm.patient_id.toString()}
                      onValueChange={(value) =>
                        setAppointmentForm({ ...appointmentForm, patient_id: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger id="appointment-patient">
                        <SelectValue placeholder="Selecciona un paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        {patientsData.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id.toString()}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment-physician">Médico Asignado *</Label>
                    <Select
                      value={appointmentForm.physician_id.toString()}
                      onValueChange={(value) =>
                        setAppointmentForm({ ...appointmentForm, physician_id: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger id="appointment-physician">
                        <SelectValue placeholder="Selecciona un médico" />
                      </SelectTrigger>
                      <SelectContent>
                        {physiciansData.map((physician) => (
                          <SelectItem key={physician.id} value={physician.id.toString()}>
                            {physician.name} - {physician.specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-4 font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Detalles de la Consulta
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="appointment-motive">Motivo de la Cita *</Label>
                    <Textarea
                      id="appointment-motive"
                      value={appointmentForm.motive}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, motive: e.target.value })}
                      placeholder="Describe el motivo de la consulta médica..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="appointment-specialty">Especialidad *</Label>
                      <Select
                        value={appointmentForm.specialty}
                        onValueChange={(value) => setAppointmentForm({ ...appointmentForm, specialty: value })}
                      >
                        <SelectTrigger id="appointment-specialty">
                          <SelectValue placeholder="Selecciona especialidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty} value={specialty}>
                              {specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appointment-status">Estado *</Label>
                      <Select
                        value={appointmentForm.status}
                        onValueChange={(value) =>
                          setAppointmentForm({ ...appointmentForm, status: value as Appointment["status"] })
                        }
                      >
                        <SelectTrigger id="appointment-status">
                          <SelectValue placeholder="Selecciona estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Programada</SelectItem>
                          <SelectItem value="completed">Completada</SelectItem>
                          <SelectItem value="cancelled">Cancelada</SelectItem>
                          <SelectItem value="no_show">No asistió</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-4 font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Fecha, Hora y Ubicación
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="appointment-start">Fecha y Hora de Inicio *</Label>
                      <Input
                        id="appointment-start"
                        type="datetime-local"
                        value={appointmentForm.start}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, start: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appointment-end">Fecha y Hora de Fin *</Label>
                      <Input
                        id="appointment-end"
                        type="datetime-local"
                        value={appointmentForm.end}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, end: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment-unit">Unidad del Centro de Salud *</Label>
                    <Select
                      value={appointmentForm.facility_unit_id.toString()}
                      onValueChange={(value) =>
                        setAppointmentForm({ ...appointmentForm, facility_unit_id: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger id="appointment-unit">
                        <SelectValue placeholder="Selecciona una unidad" />
                      </SelectTrigger>
                      <SelectContent>
                        {facilityUnitsData.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id.toString()}>
                            {unit.name} - {unit.facility_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setAppointmentDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={saveAppointment} className="bg-primary hover:bg-primary/90">
                {editingAppointment ? "Guardar Cambios" : "Crear Cita"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}