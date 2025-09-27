"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, ArrowRightLeft, Clock, User, FileText } from "lucide-react"

// Mock data for interconsultations
const interconsultations = [
  {
    id: "IC-2024-0001",
    patient: "María González Pérez",
    patientId: "P-2024-0001",
    referringDoctor: "Dr. Ramírez",
    referringSpecialty: "Cardiología",
    consultingDoctor: "Dr. López",
    consultingSpecialty: "Traumatología",
    date: "2024-01-22",
    time: "10:00",
    status: "Pendiente",
    priority: "Alta",
    reason: "Evaluación de dolor articular",
    notes: "Paciente con antecedentes cardíacos requiere evaluación traumatológica",
  },
  {
    id: "IC-2024-0002",
    patient: "Carlos Mendoza López",
    patientId: "P-2024-0002",
    referringDoctor: "Dra. Rodríguez",
    referringSpecialty: "Medicina General",
    consultingDoctor: "Dra. Morales",
    consultingSpecialty: "Neurología",
    date: "2024-01-23",
    time: "14:30",
    status: "Confirmada",
    priority: "Normal",
    reason: "Evaluación neurológica por cefaleas",
    notes: "Paciente presenta cefaleas recurrentes, requiere evaluación especializada",
  },
  {
    id: "IC-2024-0003",
    patient: "Ana Rodríguez Silva",
    patientId: "P-2024-0003",
    referringDoctor: "Dr. García",
    referringSpecialty: "Ginecología",
    consultingDoctor: "Dr. Martínez",
    consultingSpecialty: "Pediatría",
    date: "2024-01-20",
    time: "09:30",
    status: "Completada",
    priority: "Alta",
    reason: "Evaluación pediátrica prenatal",
    notes: "Interconsulta completada, recomendaciones enviadas",
  },
]

export default function InterconsultasPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInterconsultations = interconsultations.filter(
    (ic) =>
      ic.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ic.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ic.referringDoctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ic.consultingDoctor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pendiente":
        return (
          <Badge variant="outline" className="border-yellow-500/20 text-yellow-600">
            Pendiente
          </Badge>
        )
      case "Confirmada":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Confirmada</Badge>
      case "Completada":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completada</Badge>
      case "Cancelada":
        return <Badge variant="destructive">Cancelada</Badge>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Interconsultas</h1>
          <p className="text-muted-foreground text-pretty">Gestiona las interconsultas entre especialidades médicas.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Interconsulta
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{interconsultations.length}</div>
            <p className="text-xs text-muted-foreground">Interconsultas registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {interconsultations.filter((ic) => ic.status === "Pendiente").length}
            </div>
            <p className="text-xs text-muted-foreground">Esperando confirmación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmadas</CardTitle>
            <User className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {interconsultations.filter((ic) => ic.status === "Confirmada").length}
            </div>
            <p className="text-xs text-muted-foreground">Programadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {interconsultations.filter((ic) => ic.status === "Completada").length}
            </div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Interconsultas</CardTitle>
          <CardDescription>Encuentra interconsultas por paciente, médico o ID</CardDescription>
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

      {/* Interconsultations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Interconsultas ({filteredInterconsultations.length})</CardTitle>
          <CardDescription>Todas las interconsultas registradas en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Médico Referente</TableHead>
                <TableHead>Médico Consultor</TableHead>
                <TableHead>Fecha/Hora</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterconsultations.map((ic) => (
                <TableRow key={ic.id}>
                  <TableCell className="font-medium">{ic.id}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{ic.patient}</p>
                      <p className="text-sm text-muted-foreground">{ic.patientId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{ic.referringDoctor}</p>
                      <p className="text-sm text-muted-foreground">{ic.referringSpecialty}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{ic.consultingDoctor}</p>
                      <p className="text-sm text-muted-foreground">{ic.consultingSpecialty}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{ic.date}</p>
                      <p className="text-sm text-muted-foreground">{ic.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(ic.priority)}</TableCell>
                  <TableCell>{getStatusBadge(ic.status)}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={ic.reason}>
                      {ic.reason}
                    </div>
                  </TableCell>
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
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Confirmar</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Ver Respuesta</DropdownMenuItem>
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
    </div>
  )
}
