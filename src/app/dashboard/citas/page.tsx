"use client"

import React, { useEffect, useState } from "react"
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAllPatients,
  getFacilityUnits,
  getHealthcareFacilities,
  getAllPhysicians
} from "@/backend-api/apiService"
import {
  AppointmentWithDetails,
  CreateAppointmentReq,
  PatientRes,
  PhysicianRes,
  FacilityUnitRes,
  appointmentStatusMap,
  AppointmentStatus,
  HealthcareFacilityRes,
  PatientWithUser,
  PhysicianWithAdminUser
} from "@/backend-api/dtos"
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

// Status
const statusLabels: Record<AppointmentStatus, string> = appointmentStatusMap
const statusColors = {
  scheduled: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  completed: "bg-green-500/10 text-green-500 border-green-500/20",
  canceled: "bg-red-500/10 text-red-500 border-red-500/20",
  no_show: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  requested: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
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
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([])
  const [patients, setPatients] = useState<PatientWithUser[]>([])
  const [physicians, setPhysicians] = useState<PhysicianWithAdminUser[]>([]);
  const [facilityUnits, setFacilityUnits] = useState<FacilityUnitRes[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFacility, setSelectedFacility] = useState<string>("all")
  const [selectedUnit, setSelectedUnit] = useState<string>("all")
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentWithDetails | null>(null)
  const [appointmentToDelete, setAppointmentToDelete] = useState<AppointmentWithDetails | null>(null)
  const [editingAppointment, setEditingAppointment] = useState<AppointmentWithDetails | null>(null)
  const [healthcareFacilities, setHealthcareFacilities] = useState<HealthcareFacilityRes[]>([])
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const [appointmentForm, setAppointmentForm] = useState<{
    patientId: number
    physicianId?: number
    motive: string
    specialty: string
    status: AppointmentStatus
    start: string
    end: string
    facilityUnitId?: number
  }>({
    patientId: 0,
    physicianId: undefined,
    motive: "",
    specialty: specialties[2],
    status: "scheduled",
    start: "",
    end: "",
    facilityUnitId: undefined,
  })

  useEffect(() => {
    async function loadData() {
      try {
        const [appointmentsData, patientsData, facilitiesData] = await Promise.all([
          getAllAppointments(),
          getAllPatients(),
          getHealthcareFacilities(),
        ])
        setAppointments(appointmentsData)
        setPatients(patientsData)
        setHealthcareFacilities(facilitiesData)
        if (selectedFacility === "all") {
          const allUnits = await Promise.all(
            healthcareFacilities.map((f) => getFacilityUnits(f.id))
          )
          setFacilityUnits(allUnits.flat())
          return
        }

        // Carga inicial: selecciona el primer centro si existe
        if (facilitiesData.length > 0) {
          const firstFacility = facilitiesData[0]
          setSelectedFacility(firstFacility.name)

          // Cargar las unidades del primer centro
          const units = await getFacilityUnits(firstFacility.id)
          setFacilityUnits(units)
        }
      } catch (err) {
        console.error("Error al cargar datos:", err)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    async function updateUnits() {
      try {
        // Si se selecciona "Todos los centros", obtenemos todas las unidades de todos los centros
        if (selectedFacility === "all") {
          const allUnitsArrays = await Promise.all(
            healthcareFacilities.map((facility) => getFacilityUnits(facility.id))
          )
          setFacilityUnits(allUnitsArrays.flat())
          return
        }

        // Si se selecciona un centro específico
        const facility = healthcareFacilities.find((f) => f.name === selectedFacility)
        if (!facility) {
          setFacilityUnits([])
          return
        }

        // Cargar las unidades del centro seleccionado
        const units = await getFacilityUnits(facility.id)

        // Agregamos manualmente una opción "Todas las unidades" al principio (opcional visual)
        setFacilityUnits(units)
      } catch (err) {
        console.error("Error al actualizar unidades:", err)
      }
    }

    updateUnits()
  }, [selectedFacility, healthcareFacilities])

  useEffect(() => {
    if (appointmentDialogOpen) {
      getAllPhysicians()
        .then((res) => setPhysicians(res))
        .catch((err) => {
          console.error("Error obteniendo médicos:", err);
          setPhysicians([]); // fallback vacío
        });
    }
  }, [appointmentDialogOpen]);

  const formatDateTime = (date?: Date | string) => {
    if (!date) return ""
    const d = typeof date === "string" ? new Date(date) : date
    return d.toLocaleString("es-NI", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Filtrado
  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.physicianName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.motive.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    const unit = facilityUnits.find((u) => u.name === a.facilityUnitName)
    const matchesFacility = selectedFacility === "all" || unit?.facilityName === selectedFacility
    const matchesUnit = selectedUnit === "all" || a.facilityUnitName === selectedUnit

    return matchesSearch && matchesFacility && matchesUnit
  })

  const availableFacilities = Array.from(new Set(facilityUnits.map((u) => u.facilityName ?? "")))
  const availableUnits =
    selectedFacility === "all"
      ? facilityUnits
      : facilityUnits.filter((u) => u.facilityName === selectedFacility)
  
  function getFullName(physician: PhysicianWithAdminUser) {
    return `${physician.firstName} ${physician.firstLastName}`.trim();
  }

  // Dialogs
  const openAppointmentDialog = (appointment?: AppointmentWithDetails) => {
    if (appointment) {
      setEditingAppointment(appointment);
      const physician = physicians.find(
        (p) => getFullName(p) === appointment.physicianName
      );
      setAppointmentForm({
        patientId: appointment.patientId,
        physicianId: physician?.id,
        motive: appointment.motive,
        specialty: appointment.specialty,
        status: appointment.status,
        start: appointment.start ? appointment.start.toISOString().slice(0, 16) : "",
        end: appointment.end ? appointment.end.toISOString().slice(0, 16) : "",
        facilityUnitId: facilityUnits.find((u) => u.name === appointment.facilityUnitName)?.id,
      });
    } else {
      // ...
    }
    setAppointmentDialogOpen(true);
  };

  const openDetailsDialog = (appointment: AppointmentWithDetails) => {
    setSelectedAppointment(appointment)
    setDetailsDialogOpen(true)
  }

  const openDeleteDialog = (appointment: AppointmentWithDetails) => {
    setAppointmentToDelete(appointment)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteAppointment = async () => {
    if (appointmentToDelete) {
      await deleteAppointment(appointmentToDelete.id)
      setAppointments(appointments.filter((a) => a.id !== appointmentToDelete.id))
      setDeleteDialogOpen(false)
      setAppointmentToDelete(null)
    }
  }

  const saveAppointment = async () => {
    const dto: CreateAppointmentReq = {
      patientId: appointmentForm.patientId,
      physicianId: appointmentForm.physicianId,
      motive: appointmentForm.motive,
      specialty: appointmentForm.specialty,
      status: appointmentForm.status,
      start: appointmentForm.start ? new Date(appointmentForm.start) : undefined,
      end: appointmentForm.end ? new Date(appointmentForm.end) : undefined,
      facilityUnitId: appointmentForm.facilityUnitId,
    }
    if (editingAppointment) {
      await updateAppointment(editingAppointment.id, dto)
      const updatedAppointments = await getAllAppointments()
      setAppointments(updatedAppointments)
    } else {
      await createAppointment(dto)
      const updatedAppointments = await getAllAppointments()
      setAppointments(updatedAppointments)
    }
    setAppointmentDialogOpen(false)
  }

  const openEditFromDetails = () => {
    if (selectedAppointment) {
      setDetailsDialogOpen(false)
      openAppointmentDialog(selectedAppointment)
    }
  }

  const total = appointments.length
  const scheduled = appointments.filter((a) => a.status === "scheduled").length
  const completed = appointments.filter((a) => a.status === "completed").length
  const canceled = appointments.filter((a) => a.status === "canceled" || a.status === "no_show").length

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
          <Button className="gap-2 bg-primary hover:bg-primary/90" onClick={() => setCreateDialogOpen(true)}>
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
              <div className="text-2xl font-bold text-primary">{total}</div>
              <p className="text-xs text-muted-foreground">Citas registradas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Programadas</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{scheduled}</div>
              <p className="text-xs text-muted-foreground">Pendientes de atención</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completed}</div>
              <p className="text-xs text-muted-foreground">Atendidas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Canceladas</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{canceled}</div>
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
                  <SelectValue placeholder="Seleccione centro de salud" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los centros</SelectItem>
                  {healthcareFacilities.map((facility) => (
                    <SelectItem key={facility.id} value={facility.name}>
                      {facility.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </div>
              <div className="space-y-2">
                <Label>Unidades Medicas</Label>
                <Select
                  value={appointmentForm.facilityUnitId?.toString() ?? "all"}
                  onValueChange={(value) =>
                    setAppointmentForm((form) => ({
                      ...form,
                      facilityUnitId: value === "all" ? undefined : parseInt(value),
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione unidad médica" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">Todas las unidades</SelectItem>
                    {facilityUnits.map((unit) => (
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
                    <TableCell className="font-medium">{appointment.patientName}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{appointment.physicianName || "-"}</p>
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
                      {appointment.facilityUnitName || "-"}
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

        {/* Detalles */}
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
                      <Input
                        value={selectedAppointment.patientName || "Paciente desconocido"}
                        disabled
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="details-physician">Médico Asignado</Label>
                      <Input
                        value={selectedAppointment?.physicianName || "Médico no asignado"}
                        disabled
                      />
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
                            <SelectItem value="canceled">Cancelada</SelectItem>
                            <SelectItem value="no_show">No asistió</SelectItem>
                            <SelectItem value="requested">Solicitada</SelectItem>
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
                          value={
                            selectedAppointment.start
                              ? new Date(selectedAppointment.start).toISOString().slice(0, 16)
                              : ""
                          }
                          disabled
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="details-end">Fecha y Hora de Fin</Label>
                        <Input
                          id="details-end"
                          type="datetime-local"
                          value={
                            selectedAppointment.end
                              ? new Date(selectedAppointment.end).toISOString().slice(0, 16)
                              : ""
                          }
                          disabled
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="details-unit">Unidad del Centro de Salud</Label>
                      <Select value={facilityUnits.find((u) => u.name === selectedAppointment.facilityUnitName)?.id?.toString() || ""} disabled>
                        <SelectTrigger id="details-unit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {facilityUnits.map((unit) => (
                            <SelectItem key={unit.id} value={unit.id.toString()}>
                              {unit.name} - {unit.facilityName}
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
                    <span>Creada el {formatDateTime(selectedAppointment.createdAt)}</span>
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

        {/* Eliminar cita */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro de eliminar esta cita?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. La cita de{" "}
                <span className="font-semibold">
                  {appointmentToDelete && appointmentToDelete.patientName}
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

        {/* Editar cita */}
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
                      <Input
                        value={selectedAppointment?.patientName || "Paciente desconocido"}
                        disabled
                      />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment-physician">Médico Asignado *</Label>
                      <Select
                        value={appointmentForm.physicianId?.toString() || ""}
                        onValueChange={(value) =>
                          setAppointmentForm({ ...appointmentForm, physicianId: Number.parseInt(value) })
                        }
                      >
                        <SelectTrigger id="appointment-physician">
                          <SelectValue placeholder="Selecciona un médico" />
                        </SelectTrigger>
                        <SelectContent>
                        {physicians.map((physician) => (
                          <SelectItem key={physician.id} value={physician.id.toString()}>
                            {`${physician.firstName} ${physician.secondName ?? ""} ${physician.firstLastName} ${physician.secondLastName ?? ""}`.trim()} - {physician.specialty}
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
                          setAppointmentForm({ ...appointmentForm, status: value as AppointmentStatus })
                        }
                      >
                        <SelectTrigger id="appointment-status">
                          <SelectValue placeholder="Selecciona estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="scheduled">Programada</SelectItem>
                          <SelectItem value="completed">Completada</SelectItem>
                          <SelectItem value="canceled">Cancelada</SelectItem>
                          <SelectItem value="no_show">No asistió</SelectItem>
                          <SelectItem value="requested">Solicitada</SelectItem>
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
                      value={appointmentForm.facilityUnitId?.toString() || ""}
                      onValueChange={(value) =>
                        setAppointmentForm({ ...appointmentForm, facilityUnitId: Number.parseInt(value) })
                      }
                    >
                      <SelectTrigger id="appointment-unit">
                        <SelectValue placeholder="Selecciona una unidad" />
                      </SelectTrigger>
                      <SelectContent>
                        {facilityUnits.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id.toString()}>
                            {unit.name} - {unit.facilityName}
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