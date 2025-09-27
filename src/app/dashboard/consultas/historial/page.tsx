"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Filter,
  Download,
  MoreHorizontal,
  FileText,
  Calendar,
  Stethoscope,
  User,
  Clock,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

// Mock data for consultation history
const consultationHistory = [
  {
    id: "CON-2024-0001",
    patient: "María González Pérez",
    patientId: "P-2024-0001",
    doctor: "Dr. Ramírez",
    specialty: "Cardiología",
    date: "2024-01-20",
    time: "09:00",
    duration: "45 min",
    type: "Consulta General",
    diagnosis: "Hipertensión arterial controlada",
    treatment: "Continuar medicación actual, control en 3 meses",
    status: "Completada",
    followUp: "2024-04-20",
    notes: "Paciente estable, presión arterial dentro de parámetros normales",
  },
  {
    id: "CON-2024-0002",
    patient: "Carlos Mendoza López",
    patientId: "P-2024-0002",
    doctor: "Dra. Rodríguez",
    specialty: "Medicina General",
    date: "2024-01-19",
    time: "10:30",
    duration: "30 min",
    type: "Control",
    diagnosis: "Diabetes tipo 2 controlada",
    treatment: "Ajuste en dieta, continuar metformina",
    status: "Completada",
    followUp: "2024-02-19",
    notes: "Niveles de glucosa mejorados, paciente adherente al tratamiento",
  },
  {
    id: "CON-2024-0003",
    patient: "Ana Rodríguez Silva",
    patientId: "P-2024-0003",
    doctor: "Dr. García",
    specialty: "Ginecología",
    date: "2024-01-18",
    time: "14:00",
    duration: "40 min",
    type: "Control Prenatal",
    diagnosis: "Embarazo de 28 semanas, evolución normal",
    treatment: "Continuar vitaminas prenatales, reposo relativo",
    status: "Completada",
    followUp: "2024-02-01",
    notes: "Feto en posición cefálica, signos vitales normales",
  },
  {
    id: "CON-2024-0004",
    patient: "José Martínez García",
    patientId: "P-2024-0004",
    doctor: "Dr. López",
    specialty: "Traumatología",
    date: "2024-01-17",
    time: "15:30",
    duration: "50 min",
    type: "Consulta Especializada",
    diagnosis: "Esguince de tobillo grado II",
    treatment: "Inmovilización, antiinflamatorios, fisioterapia",
    status: "Completada",
    followUp: "2024-01-31",
    notes: "Lesión en proceso de recuperación, iniciar fisioterapia en 1 semana",
  },
  {
    id: "CON-2024-0005",
    patient: "Laura Herrera Morales",
    patientId: "P-2024-0005",
    doctor: "Dra. Morales",
    specialty: "Neurología",
    date: "2024-01-16",
    time: "11:00",
    duration: "60 min",
    type: "Consulta General",
    diagnosis: "Migraña crónica",
    treatment: "Medicación preventiva, cambios en estilo de vida",
    status: "Completada",
    followUp: "2024-02-16",
    notes: "Reducción significativa en frecuencia de episodios",
  },
  {
    id: "CON-2024-0006",
    patient: "Roberto Sánchez Vega",
    patientId: "P-2024-0006",
    doctor: "Dr. Martínez",
    specialty: "Pediatría",
    date: "2024-01-15",
    time: "09:30",
    duration: "25 min",
    type: "Control",
    diagnosis: "Desarrollo normal para la edad",
    treatment: "Continuar esquema de vacunación",
    status: "Completada",
    followUp: "2024-04-15",
    notes: "Niño de 5 años con desarrollo psicomotor adecuado",
  },
]

export default function HistorialConsultasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecialty, setFilterSpecialty] = useState("all")
  const [filterDoctor, setFilterDoctor] = useState("all")
  const [filterDateRange, setFilterDateRange] = useState("all")

  const filteredConsultations = consultationHistory.filter((consultation) => {
    const matchesSearch =
      consultation.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialty = filterSpecialty === "all" || consultation.specialty === filterSpecialty
    const matchesDoctor = filterDoctor === "all" || consultation.doctor === filterDoctor

    return matchesSearch && matchesSpecialty && matchesDoctor
  })

  const specialties = [...new Set(consultationHistory.map((c) => c.specialty))]
  const doctors = [...new Set(consultationHistory.map((c) => c.doctor))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/consultas">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Historial de Consultas</h1>
          <p className="text-muted-foreground text-pretty">
            Revisa el historial completo de todas las consultas médicas realizadas.
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consultas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{consultationHistory.length}</div>
            <p className="text-xs text-muted-foreground">Registradas en el sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {consultationHistory.filter((c) => new Date(c.date) >= new Date("2024-01-15")).length}
            </div>
            <p className="text-xs text-muted-foreground">Consultas realizadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">42min</div>
            <p className="text-xs text-muted-foreground">Duración promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seguimientos</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {consultationHistory.filter((c) => c.followUp).length}
            </div>
            <p className="text-xs text-muted-foreground">Programados</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filtros y Búsqueda
          </CardTitle>
          <CardDescription>Filtra las consultas por diferentes criterios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por paciente, médico, ID o diagnóstico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Especialidad</label>
              <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las especialidades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las especialidades</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Médico</label>
              <Select value={filterDoctor} onValueChange={setFilterDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los médicos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los médicos</SelectItem>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor} value={doctor}>
                      {doctor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={filterDateRange} onValueChange={setFilterDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los períodos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los períodos</SelectItem>
                  <SelectItem value="today">Hoy</SelectItem>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mes</SelectItem>
                  <SelectItem value="quarter">Último trimestre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consultation History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Consultas ({filteredConsultations.length})</CardTitle>
          <CardDescription>Registro completo de consultas médicas realizadas</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Fecha/Hora</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Médico</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Diagnóstico</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Seguimiento</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConsultations.map((consultation) => (
                <TableRow key={consultation.id}>
                  <TableCell className="font-medium">{consultation.id}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{consultation.date}</p>
                      <p className="text-sm text-muted-foreground">{consultation.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{consultation.patient}</p>
                      <p className="text-sm text-muted-foreground">{consultation.patientId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-primary" />
                        <span className="font-medium">{consultation.doctor}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {consultation.specialty}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{consultation.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[250px]">
                      <p className="font-medium truncate" title={consultation.diagnosis}>
                        {consultation.diagnosis}
                      </p>
                      <p className="text-sm text-muted-foreground truncate" title={consultation.treatment}>
                        {consultation.treatment}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{consultation.duration}</TableCell>
                  <TableCell>
                    {consultation.followUp ? (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{consultation.followUp}</p>
                        <Badge variant="outline" className="text-xs">
                          Programado
                        </Badge>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">No programado</span>
                    )}
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
                        <DropdownMenuItem>Ver Detalles Completos</DropdownMenuItem>
                        <DropdownMenuItem>Ver Receta Médica</DropdownMenuItem>
                        <DropdownMenuItem>Imprimir Reporte</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Programar Seguimiento</DropdownMenuItem>
                        <DropdownMenuItem>Enviar por Email</DropdownMenuItem>
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
