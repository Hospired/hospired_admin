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
import { Search, Plus, MoreHorizontal, Activity, Bed, AlertTriangle, CheckCircle, Calendar } from "lucide-react"
import Link from "next/link"

// Mock data for admissions
const admissions = [
  {
    id: "ADM-2024-0001",
    patient: "María González Pérez",
    patientId: "P-2024-0001",
    admissionDate: "2024-01-20",
    admissionTime: "08:30",
    doctor: "Dr. Ramírez",
    department: "Cardiología",
    room: "201-A",
    bed: "1",
    status: "Activa",
    type: "Emergencia",
    diagnosis: "Infarto agudo de miocardio",
    condition: "Estable",
    estimatedDischarge: "2024-01-25",
  },
  {
    id: "ADM-2024-0002",
    patient: "Carlos Mendoza López",
    patientId: "P-2024-0002",
    admissionDate: "2024-01-19",
    admissionTime: "14:15",
    doctor: "Dra. Rodríguez",
    department: "Medicina Interna",
    room: "105-B",
    bed: "2",
    status: "Activa",
    type: "Programada",
    diagnosis: "Neumonía bacteriana",
    condition: "Mejorando",
    estimatedDischarge: "2024-01-23",
  },
  {
    id: "ADM-2024-0003",
    patient: "Ana Rodríguez Silva",
    patientId: "P-2024-0003",
    admissionDate: "2024-01-18",
    admissionTime: "22:45",
    doctor: "Dr. García",
    department: "Ginecología",
    room: "301-C",
    bed: "1",
    status: "Alta",
    type: "Emergencia",
    diagnosis: "Parto prematuro",
    condition: "Recuperada",
    estimatedDischarge: "2024-01-20",
    dischargeDate: "2024-01-20",
  },
  {
    id: "ADM-2024-0004",
    patient: "José Martínez García",
    patientId: "P-2024-0004",
    admissionDate: "2024-01-17",
    admissionTime: "16:20",
    doctor: "Dr. López",
    department: "Traumatología",
    room: "102-A",
    bed: "3",
    status: "Activa",
    type: "Programada",
    diagnosis: "Fractura de fémur",
    condition: "Estable",
    estimatedDischarge: "2024-01-22",
  },
]

const activeAdmissions = admissions.filter((adm) => adm.status === "Activa")
const recentDischarges = admissions.filter((adm) => adm.status === "Alta")

export default function AdmisionesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAdmissions = admissions.filter(
    (admission) =>
      admission.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Activa":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Activa</Badge>
      case "Alta":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Alta</Badge>
      case "Transferida":
        return (
          <Badge variant="outline" className="border-yellow-500/20 text-yellow-600">
            Transferida
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Emergencia":
        return <Badge variant="destructive">Emergencia</Badge>
      case "Programada":
        return <Badge variant="outline">Programada</Badge>
      case "Urgente":
        return (
          <Badge variant="outline" className="border-yellow-500/20 text-yellow-600">
            Urgente
          </Badge>
        )
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case "Crítico":
        return <Badge variant="destructive">Crítico</Badge>
      case "Estable":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Estable</Badge>
      case "Mejorando":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Mejorando</Badge>
      case "Recuperada":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Recuperada</Badge>
      default:
        return <Badge variant="secondary">{condition}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Gestión de Admisiones</h1>
          <p className="text-muted-foreground text-pretty">
            Administra las admisiones hospitalarias, camas y altas de pacientes.
          </p>
        </div>
        <Link href="/dashboard/admisiones/nuevo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Admisión
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admisiones Activas</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeAdmissions.length}</div>
            <p className="text-xs text-muted-foreground">Pacientes hospitalizados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Camas Ocupadas</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeAdmissions.length}</div>
            <p className="text-xs text-muted-foreground">de 50 disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Altas Hoy</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{recentDischarges.length}</div>
            <p className="text-xs text-muted-foreground">Pacientes dados de alta</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergencias</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {admissions.filter((adm) => adm.type === "Emergencia" && adm.status === "Activa").length}
            </div>
            <p className="text-xs text-muted-foreground">Admisiones de emergencia</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Admisiones</CardTitle>
          <CardDescription>Encuentra admisiones por paciente, médico o departamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por paciente, médico, ID o departamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Admissions Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Admisiones Activas</TabsTrigger>
          <TabsTrigger value="recent">Altas Recientes</TabsTrigger>
          <TabsTrigger value="all">Todas las Admisiones</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admisiones Activas</CardTitle>
              <CardDescription>Pacientes actualmente hospitalizados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico/Departamento</TableHead>
                    <TableHead>Habitación/Cama</TableHead>
                    <TableHead>Fecha Ingreso</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Condición</TableHead>
                    <TableHead>Alta Estimada</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeAdmissions.map((admission) => (
                    <TableRow key={admission.id}>
                      <TableCell className="font-medium">{admission.id}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{admission.patient}</p>
                          <p className="text-sm text-muted-foreground">{admission.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{admission.doctor}</p>
                          <p className="text-sm text-muted-foreground">{admission.department}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Bed className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {admission.room} - Cama {admission.bed}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{admission.admissionDate}</p>
                          <p className="text-sm text-muted-foreground">{admission.admissionTime}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(admission.type)}</TableCell>
                      <TableCell>{getConditionBadge(admission.condition)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {admission.estimatedDischarge}
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
                            <DropdownMenuItem>Editar Información</DropdownMenuItem>
                            <DropdownMenuItem>Cambiar Habitación</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Programar Alta</DropdownMenuItem>
                            <DropdownMenuItem>Transferir</DropdownMenuItem>
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
              <CardTitle>Altas Recientes</CardTitle>
              <CardDescription>Pacientes dados de alta recientemente</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Fecha Alta</TableHead>
                    <TableHead>Días Hospitalizado</TableHead>
                    <TableHead>Diagnóstico</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentDischarges.map((admission) => (
                    <TableRow key={admission.id}>
                      <TableCell className="font-medium">{admission.id}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{admission.patient}</p>
                          <p className="text-sm text-muted-foreground">{admission.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>{admission.doctor}</TableCell>
                      <TableCell>{admission.dischargeDate}</TableCell>
                      <TableCell>
                        {Math.ceil(
                          (new Date(admission.dischargeDate!).getTime() - new Date(admission.admissionDate).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        días
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={admission.diagnosis}>
                          {admission.diagnosis}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(admission.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                            <DropdownMenuItem>Imprimir Resumen</DropdownMenuItem>
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

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todas las Admisiones ({filteredAdmissions.length})</CardTitle>
              <CardDescription>Historial completo de admisiones hospitalarias</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Médico</TableHead>
                    <TableHead>Fecha Ingreso</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmissions.map((admission) => (
                    <TableRow key={admission.id}>
                      <TableCell className="font-medium">{admission.id}</TableCell>
                      <TableCell>{admission.patient}</TableCell>
                      <TableCell>{admission.doctor}</TableCell>
                      <TableCell>{admission.admissionDate}</TableCell>
                      <TableCell>{admission.department}</TableCell>
                      <TableCell>{getTypeBadge(admission.type)}</TableCell>
                      <TableCell>{getStatusBadge(admission.status)}</TableCell>
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
