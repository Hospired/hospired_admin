"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, Clock, Plus, MoreHorizontal, Stethoscope, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// Mock data for appointments
const appointments = [
  {
    id: "C-2024-0001",
    patient: "María González Pérez",
    patientId: "P-2024-0001",
    doctor: "Dr. Ramírez",
    specialty: "Cardiología",
    date: "2024-01-20",
    time: "09:00",
    duration: "30 min",
    status: "Confirmada",
    type: "Consulta General",
    room: "Consultorio 1",
  },
  {
    id: "C-2024-0002",
    patient: "Carlos Mendoza López",
    patientId: "P-2024-0002",
    doctor: "Dra. Rodríguez",
    specialty: "Medicina General",
    date: "2024-01-20",
    time: "10:30",
    duration: "45 min",
    status: "Pendiente",
    type: "Control",
    room: "Consultorio 2",
  },
  {
    id: "C-2024-0003",
    patient: "Ana Rodríguez Silva",
    patientId: "P-2024-0003",
    doctor: "Dr. García",
    specialty: "Ginecología",
    date: "2024-01-20",
    time: "14:00",
    duration: "30 min",
    status: "Completada",
    type: "Control Prenatal",
    room: "Consultorio 3",
  },
  {
    id: "C-2024-0004",
    patient: "José Martínez García",
    patientId: "P-2024-0004",
    doctor: "Dr. López",
    specialty: "Traumatología",
    date: "2024-01-20",
    time: "15:30",
    duration: "30 min",
    status: "Cancelada",
    type: "Consulta Especializada",
    room: "Consultorio 4",
  },
]

const todayAppointments = appointments.filter((apt) => apt.date === "2024-01-20")
const upcomingAppointments = appointments.filter((apt) => new Date(apt.date) > new Date("2024-01-20"))

export default function CitasPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmada":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Confirmada</Badge>
      case "Pendiente":
        return (
          <Badge variant="outline" className="border-yellow-500/20 text-yellow-600">
            Pendiente
          </Badge>
        )
      case "Completada":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completada</Badge>
      case "Cancelada":
        return <Badge variant="destructive">Cancelada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Confirmada":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "Pendiente":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "Completada":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Cancelada":
        return <XCircle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Gestión de Citas</h1>
          <p className="text-muted-foreground text-pretty">
            Administra todas las citas médicas, horarios y programación del centro.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/citas/calendario">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Calendar className="h-4 w-4" />
              Ver Calendario
            </Button>
          </Link>
          <Link href="/dashboard/citas/programacion">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Cita
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{todayAppointments.length}</div>
            <p className="text-xs text-muted-foreground">
              {todayAppointments.filter((apt) => apt.status === "Confirmada").length} confirmadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {appointments.filter((apt) => apt.status === "Pendiente").length}
            </div>
            <p className="text-xs text-muted-foreground">Requieren confirmación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {appointments.filter((apt) => apt.status === "Completada").length}
            </div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Canceladas</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {appointments.filter((apt) => apt.status === "Cancelada").length}
            </div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Tabs */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Citas de Hoy</TabsTrigger>
          <TabsTrigger value="upcoming">Próximas Citas</TabsTrigger>
          <TabsTrigger value="all">Todas las Citas</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Citas de Hoy - {new Date().toLocaleDateString("es-ES")}</CardTitle>
              <CardDescription>Agenda del día actual</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hora</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Especialidad</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Consultorio</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {appointment.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">{appointment.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-primary" />
                          {appointment.doctor}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{appointment.specialty}</Badge>
                      </TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell>{appointment.room}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                            <DropdownMenuItem>Editar Cita</DropdownMenuItem>
                            <DropdownMenuItem>Confirmar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Cancelar Cita</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Citas</CardTitle>
              <CardDescription>Citas programadas para los próximos días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No hay citas programadas para los próximos días</p>
                <Link href="/dashboard/citas/programacion">
                  <Button className="mt-4">Programar Nueva Cita</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todas las Citas</CardTitle>
              <CardDescription>Historial completo de citas médicas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Hora</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.id}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.patient}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
