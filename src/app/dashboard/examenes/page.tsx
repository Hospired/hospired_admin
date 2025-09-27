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
  FlaskConical,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Calendar,
} from "lucide-react"
import Link from "next/link"

// Mock data for exams
const exams = [
  {
    id: "EX-2024-0001",
    patient: "María González Pérez",
    patientId: "P-2024-0001",
    examType: "Electrocardiograma",
    category: "Cardiología",
    requestedBy: "Dr. Ramírez",
    requestDate: "2024-01-20",
    scheduledDate: "2024-01-22",
    scheduledTime: "09:00",
    status: "Programado",
    priority: "Normal",
    location: "Laboratorio Cardiología",
    preparation: "Ayuno de 8 horas",
    results: null,
  },
  {
    id: "EX-2024-0002",
    patient: "Carlos Mendoza López",
    patientId: "P-2024-0002",
    examType: "Hemograma Completo",
    category: "Laboratorio",
    requestedBy: "Dra. Rodríguez",
    requestDate: "2024-01-19",
    scheduledDate: "2024-01-20",
    scheduledTime: "08:00",
    status: "En Proceso",
    priority: "Normal",
    location: "Laboratorio Clínico",
    preparation: "Ayuno de 12 horas",
    results: null,
  },
  {
    id: "EX-2024-0003",
    patient: "Ana Rodríguez Silva",
    patientId: "P-2024-0003",
    examType: "Ecografía Obstétrica",
    category: "Imagenología",
    requestedBy: "Dr. García",
    requestDate: "2024-01-18",
    scheduledDate: "2024-01-19",
    scheduledTime: "14:00",
    status: "Completado",
    priority: "Alta",
    location: "Sala de Ecografía",
    preparation: "Vejiga llena",
    results: "Feto en desarrollo normal, 28 semanas de gestación",
  },
  {
    id: "EX-2024-0004",
    patient: "José Martínez García",
    patientId: "P-2024-0004",
    examType: "Radiografía de Tobillo",
    category: "Imagenología",
    requestedBy: "Dr. López",
    requestDate: "2024-01-17",
    scheduledDate: "2024-01-18",
    scheduledTime: "11:30",
    status: "Completado",
    priority: "Urgente",
    location: "Sala de Rayos X",
    preparation: "Ninguna",
    results: "Fractura de peroné distal, requiere inmovilización",
  },
  {
    id: "EX-2024-0005",
    patient: "Laura Herrera Morales",
    patientId: "P-2024-0005",
    examType: "Resonancia Magnética Cerebral",
    category: "Imagenología",
    requestedBy: "Dra. Morales",
    requestDate: "2024-01-16",
    scheduledDate: "2024-01-21",
    scheduledTime: "16:00",
    status: "Programado",
    priority: "Alta",
    location: "Sala de Resonancia",
    preparation: "Retirar objetos metálicos",
    results: null,
  },
]

const scheduledExams = exams.filter((exam) => exam.status === "Programado")
const inProgressExams = exams.filter((exam) => exam.status === "En Proceso")
const completedExams = exams.filter((exam) => exam.status === "Completado")

export default function ExamenesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredExams = exams.filter(
    (exam) =>
      exam.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Programado":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Programado</Badge>
      case "En Proceso":
        return (
          <Badge variant="outline" className="border-yellow-500/20 text-yellow-600">
            En Proceso
          </Badge>
        )
      case "Completado":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completado</Badge>
      case "Cancelado":
        return <Badge variant="destructive">Cancelado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Urgente":
        return <Badge variant="destructive">Urgente</Badge>
      case "Alta":
        return (
          <Badge variant="outline" className="border-yellow-500/20 text-yellow-600">
            Alta
          </Badge>
        )
      case "Normal":
        return <Badge variant="outline">Normal</Badge>
      case "Baja":
        return <Badge variant="secondary">Baja</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Laboratorio":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Laboratorio
          </Badge>
        )
      case "Imagenología":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Imagenología
          </Badge>
        )
      case "Cardiología":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cardiología
          </Badge>
        )
      default:
        return <Badge variant="outline">{category}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Gestión de Exámenes</h1>
          <p className="text-muted-foreground text-pretty">
            Administra los exámenes médicos, laboratorios e imagenología del centro.
          </p>
        </div>
        <Link href="/dashboard/examenes/nuevo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Asignar Examen
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programados</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{scheduledExams.length}</div>
            <p className="text-xs text-muted-foreground">Exámenes pendientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Proceso</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{inProgressExams.length}</div>
            <p className="text-xs text-muted-foreground">En ejecución</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedExams.length}</div>
            <p className="text-xs text-muted-foreground">Con resultados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {exams.filter((exam) => exam.priority === "Urgente").length}
            </div>
            <p className="text-xs text-muted-foreground">Prioridad alta</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Exámenes</CardTitle>
          <CardDescription>Encuentra exámenes por paciente, tipo o médico solicitante</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por paciente, tipo de examen, ID o médico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Exams Tabs */}
      <Tabs defaultValue="scheduled" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scheduled">Programados</TabsTrigger>
          <TabsTrigger value="inprogress">En Proceso</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
          <TabsTrigger value="all">Todos los Exámenes</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exámenes Programados</CardTitle>
              <CardDescription>Exámenes pendientes de realizar</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Tipo de Examen</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Médico Solicitante</TableHead>
                    <TableHead>Fecha/Hora</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.id}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{exam.patient}</p>
                          <p className="text-sm text-muted-foreground">{exam.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FlaskConical className="h-4 w-4 text-primary" />
                          {exam.examType}
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryBadge(exam.category)}</TableCell>
                      <TableCell>{exam.requestedBy}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{exam.scheduledDate}</p>
                          <p className="text-sm text-muted-foreground">{exam.scheduledTime}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(exam.priority)}</TableCell>
                      <TableCell>{exam.location}</TableCell>
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
                            <DropdownMenuItem>Reprogramar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Iniciar Examen</DropdownMenuItem>
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

        <TabsContent value="inprogress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exámenes en Proceso</CardTitle>
              <CardDescription>Exámenes que se están realizando actualmente</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Tipo de Examen</TableHead>
                    <TableHead>Médico Solicitante</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inProgressExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.id}</TableCell>
                      <TableCell>{exam.patient}</TableCell>
                      <TableCell>{exam.examType}</TableCell>
                      <TableCell>{exam.requestedBy}</TableCell>
                      <TableCell>{exam.location}</TableCell>
                      <TableCell>{getStatusBadge(exam.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                            <DropdownMenuItem>Finalizar Examen</DropdownMenuItem>
                            <DropdownMenuItem>Cargar Resultados</DropdownMenuItem>
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

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Exámenes Completados</CardTitle>
              <CardDescription>Exámenes finalizados con resultados disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Tipo de Examen</TableHead>
                    <TableHead>Fecha Realizado</TableHead>
                    <TableHead>Médico Solicitante</TableHead>
                    <TableHead>Resultados</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.id}</TableCell>
                      <TableCell>{exam.patient}</TableCell>
                      <TableCell>{exam.examType}</TableCell>
                      <TableCell>{exam.scheduledDate}</TableCell>
                      <TableCell>{exam.requestedBy}</TableCell>
                      <TableCell>
                        <div className="max-w-[250px] truncate" title={exam.results || ""}>
                          {exam.results ? (
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-green-500" />
                              <span className="text-sm">{exam.results}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">Sin resultados</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Resultados</DropdownMenuItem>
                            <DropdownMenuItem>Imprimir Reporte</DropdownMenuItem>
                            <DropdownMenuItem>Enviar por Email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Repetir Examen</DropdownMenuItem>
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
              <CardTitle>Todos los Exámenes ({filteredExams.length})</CardTitle>
              <CardDescription>Historial completo de exámenes médicos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Prioridad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.id}</TableCell>
                      <TableCell>{exam.patient}</TableCell>
                      <TableCell>{exam.examType}</TableCell>
                      <TableCell>{getCategoryBadge(exam.category)}</TableCell>
                      <TableCell>{exam.scheduledDate}</TableCell>
                      <TableCell>{getStatusBadge(exam.status)}</TableCell>
                      <TableCell>{getPriorityBadge(exam.priority)}</TableCell>
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
