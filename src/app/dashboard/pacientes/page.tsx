"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, Eye, Edit, FileText, Phone, Mail } from "lucide-react"
import Link from "next/link"

// Mock data for patients
const patients = [
  {
    id: "P-2024-0001",
    name: "María González Pérez",
    age: 34,
    gender: "Femenino",
    phone: "+505 8765-4321",
    email: "maria.gonzalez@email.com",
    lastVisit: "2024-01-15",
    status: "Activo",
    condition: "Diabetes Tipo 2",
  },
  {
    id: "P-2024-0002",
    name: "Carlos Mendoza López",
    age: 45,
    gender: "Masculino",
    phone: "+505 8765-4322",
    email: "carlos.mendoza@email.com",
    lastVisit: "2024-01-12",
    status: "Activo",
    condition: "Hipertensión",
  },
  {
    id: "P-2024-0003",
    name: "Ana Rodríguez Silva",
    age: 28,
    gender: "Femenino",
    phone: "+505 8765-4323",
    email: "ana.rodriguez@email.com",
    lastVisit: "2024-01-10",
    status: "Inactivo",
    condition: "Control Prenatal",
  },
  {
    id: "P-2024-0004",
    name: "José Martínez García",
    age: 52,
    gender: "Masculino",
    phone: "+505 8765-4324",
    email: "jose.martinez@email.com",
    lastVisit: "2024-01-08",
    status: "Activo",
    condition: "Artritis",
  },
  {
    id: "P-2024-0005",
    name: "Laura Herrera Morales",
    age: 39,
    gender: "Femenino",
    phone: "+505 8765-4325",
    email: "laura.herrera@email.com",
    lastVisit: "2024-01-05",
    status: "Activo",
    condition: "Migraña Crónica",
  },
]

export default function PacientesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Gestión de Pacientes</h1>
          <p className="text-muted-foreground text-pretty">
            Administra la información de todos los pacientes registrados en el sistema.
          </p>
        </div>
        <Link href="/dashboard/pacientes/nuevo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Paciente
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Pacientes</CardTitle>
          <CardDescription>Encuentra pacientes por nombre, ID o condición médica</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, ID o condición..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filtros</Button>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes ({filteredPatients.length})</CardTitle>
          <CardDescription>Información detallada de todos los pacientes registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Paciente</TableHead>
                <TableHead>Nombre Completo</TableHead>
                <TableHead>Edad</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Última Visita</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Condición</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">{patient.gender}</p>
                    </div>
                  </TableCell>
                  <TableCell>{patient.age} años</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {patient.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Badge variant={patient.status === "Activo" ? "default" : "secondary"}>{patient.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.condition}</Badge>
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
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4" />
                          Ver Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4" />
                          Editar Información
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <FileText className="h-4 w-4" />
                          Historial Médico
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">Programar Cita</DropdownMenuItem>
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
