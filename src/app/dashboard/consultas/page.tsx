"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import {
  Search,
  Plus,
  MoreHorizontal,
  Stethoscope,
  Clock,
  FileText,
  Activity,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

// Mock data for consultations
const activeConsultations = [
  {
    id: "CON-2024-0001",
    patient: "María González Pérez",
    patientId: "P-2024-0001",
    doctor: "Dr. Ramírez",
    specialty: "Cardiología",
    startTime: "09:00",
    currentTime: "09:25",
    status: "En Progreso",
    room: "Consultorio 1",
    type: "Consulta General",
    priority: "Normal",
    symptoms: "Dolor en el pecho, dificultad para respirar",
  },
  {
    id: "CON-2024-0002",
    patient: "Carlos Mendoza López",
    patientId: "P-2024-0002",
    doctor: "Dra. Rodríguez",
    specialty: "Medicina General",
    startTime: "10:30",
    currentTime: "10:45",
    status: "Esperando",
    room: "Consultorio 2",
    type: "Control",
    priority: "Normal",
    symptoms: "Control de presión arterial",
  },
  {
    id: "CON-2024-0003",
    patient: "Ana Rodríguez Silva",
    patientId: "P-2024-0003",
    doctor: "Dr. García",
    specialty: "Ginecología",
    startTime: "14:00",
    currentTime: "14:00",
    status: "Iniciando",
    room: "Consultorio 3",
    type: "Control Prenatal",
    priority: "Alta",
    symptoms: "Control prenatal rutinario",
  },
]

const recentConsultations = [
  {
    id: "CON-2024-0004",
    patient: "José Martínez García",
    patientId: "P-2024-0004",
    doctor: "Dr. López",
    specialty: "Traumatología",
    date: "2024-01-19",
    time: "15:30",
    duration: "45 min",
    status: "Completada",
    diagnosis: "Esguince de tobillo grado II",
    treatment: "Reposo, antiinflamatorios, fisioterapia",
  },
  {
    id: "CON-2024-0005",
    patient: "Laura Herrera Morales",
    patientId: "P-2024-0005",
    doctor: "Dra. Morales",
    specialty: "Neurología",
    date: "2024-01-19",
    time: "11:00",
    duration: "60 min",
    status: "Completada",
    diagnosis: "Migraña crónica",
    treatment: "Medicación preventiva, cambios en estilo de vida",
  },
]

export default function ConsultasPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredActiveConsultations = activeConsultations.filter(
    (consultation) =>
      consultation.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "En Progreso":
        return <Badge className="bg-primary/10 text-primary border-primary/20">En Progreso</Badge>
      case "Esperando":
        return (
          <Badge variant="outline" className="border-yellow-500/20 text-yellow-600">
            Esperando
          </Badge>
        )
      case "Iniciando":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Iniciando</Badge>
      case "Completada":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Alta":
        return <Badge variant="destructive">Alta</Badge>
      case "Normal":
        return <Badge variant="outline">Normal</Badge>
      case "Baja":
        return <Badge variant="secondary">Baja</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "En Progreso":
        return <Activity className="h-4 w-4 text-primary animate-pulse" />
      case "Esperando":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Iniciando":
        return <AlertCircle className="h-4 w-4 text-green-500" />
      case "Completada":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Stethoscope className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Consultas Médicas</h1>
          <p className="text-muted-foreground text-pretty">
            Gestiona las consultas activas y revisa el historial de consultas completadas.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/consultas/historial">
            <Button variant="outline" className="gap-2 bg-transparent">
              <FileText className="h-4 w-4" />
              Ver Historial
            </Button>
          </Link>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Consulta
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas Activas</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeConsultations.length}</div>
            <p className="text-xs text-muted-foreground">En curso ahora</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Progreso</CardTitle>
            <Stethoscope className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeConsultations.filter((c) => c.status === "En Progreso").length}
            </div>
            <p className="text-xs text-muted-foreground">Consultas activas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esperando</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {activeConsultations.filter((c) => c.status === "Esperando").length}
            </div>
            <p className="text-xs text-muted-foreground">En sala de espera</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas Hoy</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{recentConsultations.length}</div>
            <p className="text-xs text-muted-foreground">Finalizadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Consultas</CardTitle>
          <CardDescription>Encuentra consultas por paciente, médico o ID</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por paciente, médico o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Consultations Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Consultas Activas</TabsTrigger>
          <TabsTrigger value="recent">Recientes</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consultas Activas</CardTitle>
              <CardDescription>Consultas médicas en curso o esperando atención</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Estado</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Especialidad</TableHead>
                    <TableHead>Hora Inicio</TableHead>
                    <TableHead>Duración</TableHead>
                    <TableHead>Consultorio</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActiveConsultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(consultation.status)}
                          {getStatusBadge(consultation.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{consultation.patient}</p>
                          <p className="text-sm text-muted-foreground">{consultation.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-primary" />
                          {consultation.doctor}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{consultation.specialty}</Badge>
                      </TableCell>
                      <TableCell>{consultation.startTime}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {consultation.status === "En Progreso" && (
                            <span className="text-primary font-medium">
                              {Math.floor(
                                (new Date(`2024-01-20 ${consultation.currentTime}`).getTime() -
                                  new Date(`2024-01-20 ${consultation.startTime}`).getTime()) /
                                  60000,
                              )}{" "}
                              min
                            </span>
                          )}
                          {consultation.status !== "En Progreso" && <span className="text-muted-foreground">--</span>}
                        </div>
                      </TableCell>
                      <TableCell>{consultation.room}</TableCell>
                      <TableCell>{getPriorityBadge(consultation.priority)}</TableCell>
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
                            <DropdownMenuItem>Iniciar Consulta</DropdownMenuItem>
                            <DropdownMenuItem>Ver Historial</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Finalizar Consulta</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Cancelar</DropdownMenuItem>
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

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consultas Recientes</CardTitle>
              <CardDescription>Consultas completadas recientemente</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Fecha/Hora</TableHead>
                    <TableHead>Duración</TableHead>
                    <TableHead>Diagnóstico</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentConsultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell className="font-medium">{consultation.id}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{consultation.patient}</p>
                          <p className="text-sm text-muted-foreground">{consultation.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{consultation.doctor}</p>
                          <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{consultation.date}</p>
                          <p className="text-sm text-muted-foreground">{consultation.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>{consultation.duration}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={consultation.diagnosis}>
                          {consultation.diagnosis}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(consultation.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                            <DropdownMenuItem>Ver Receta</DropdownMenuItem>
                            <DropdownMenuItem>Imprimir Reporte</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Programar Seguimiento</DropdownMenuItem>
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
