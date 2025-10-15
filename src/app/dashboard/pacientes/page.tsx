"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getAllPatients } from "@/backend-api/apiService"
import { PatientWithUser } from "@/backend-api/dtos"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ArrowUpDown, Eye, Edit, MoreHorizontal, Plus, Trash2, User, Phone, Briefcase, ClipboardList } from "lucide-react"

type SortConfig = {
  key: keyof PatientWithUser | null
  direction: "asc" | "desc"
}

export default function PacientesPage() {
  const [patients, setPatients] = useState<PatientWithUser[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" })
  const [selectedPatient, setSelectedPatient] = useState<PatientWithUser | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [deletingPatient, setDeletingPatient] = useState<PatientWithUser | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatients()
        setPatients(data)
      } catch (err) {
        console.error("Error cargando pacientes:", err)
      }
    }
    fetchPatients()
  }, [])

  const calculateAge = (date?: Date) => {
    if (!date) return "—"
    const birth = new Date(date)
    const diff = Date.now() - birth.getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
  }

  const handleSort = (key: keyof PatientWithUser) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc"
    setSortConfig({ key, direction })
  }

  const filteredPatients = patients
    .filter((p) =>
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nationalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.occupation ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.address ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.municipalityName ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.department ?? "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0
      const aValue = (a as any)[sortConfig.key]
      const bValue = (b as any)[sortConfig.key]
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1
      return 0
    })

  const handleViewDetails = (p: PatientWithUser) => {
    setSelectedPatient(p)
    setIsDetailOpen(true)
  }

  const handleDelete = (p: PatientWithUser) => {
    setDeletingPatient(p)
    setIsDeleteOpen(true)
  }

  const confirmDelete = () => {
    console.log("Deleting:", deletingPatient?.id)
    setIsDeleteOpen(false)
  }

  const handleEdit = (p: PatientWithUser) => {
    window.location.href = `/dashboard/pacientes/editar/${p.id}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Pacientes</h1>
          <p className="text-muted-foreground">Administra la información de todos los pacientes registrados.</p>
        </div>
        <Link href="/dashboard/pacientes/nuevo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Nuevo Paciente
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Pacientes</CardTitle>
          <CardDescription>Filtra por nombre, cédula, ocupación, municipio o departamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input placeholder="Buscar por nombre, cédula, municipio..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pacientes ({filteredPatients.length})</CardTitle>
          <CardDescription>Visualiza y gestiona pacientes registrados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("id")} className="h-auto p-0 font-semibold hover:bg-transparent">
                      ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("fullName" as any)} className="h-auto p-0 font-semibold hover:bg-transparent">
                      Nombre Completo
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Edad</TableHead>
                  <TableHead>Cédula</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Ocupación</TableHead>
                  <TableHead>Municipio</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredPatients.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewDetails(p)}>
                    <TableCell className="font-medium">{p.id}</TableCell>
                    <TableCell>{p.fullName}</TableCell>
                    <TableCell>{calculateAge(p.dateOfBirth)}</TableCell>
                    <TableCell className="font-mono">{p.nationalId || "—"}</TableCell>
                    <TableCell>{p.phone || "—"}</TableCell>
                    <TableCell>{p.occupation || "—"}</TableCell>
                    <TableCell>{p.municipalityName || "—"}</TableCell>
                    <TableCell>{p.department || "—"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewDetails(p) }}>
                            <Eye className="mr-2 h-4 w-4" /> Ver Perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEdit(p) }}>
                            <Edit className="mr-2 h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive" onClick={(e) => { e.stopPropagation(); handleDelete(p) }}>
                            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Sheet detalle */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl">Perfil del Paciente</SheetTitle>
            <SheetDescription>Información detallada del paciente</SheetDescription>
          </SheetHeader>

          {selectedPatient && (
            <div className="mt-6 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedPatient.fullName}</h3>
                      <p className="text-sm text-muted-foreground">{selectedPatient.nationalId}</p>
                      <p className="text-sm text-muted-foreground">Edad: {calculateAge(selectedPatient.dateOfBirth)} años</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Phone className="h-5 w-5" /> Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p><strong>Teléfono:</strong> {selectedPatient.phone}</p>
                  <p><strong>Dirección:</strong> {selectedPatient.address}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Briefcase className="h-5 w-5" /> Ocupación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{selectedPatient.occupation}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ClipboardList className="h-5 w-5" /> Notas Médicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{selectedPatient.medicalNotes || "Sin notas registradas."}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Dialog eliminar */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar paciente</DialogTitle>
            <DialogDescription>Esta acción no se puede deshacer.</DialogDescription>
          </DialogHeader>
          {deletingPatient && (
            <div className="py-4">
              <p><strong>{deletingPatient.fullName}</strong></p>
              <p className="text-sm text-muted-foreground">{deletingPatient.nationalId}</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={confirmDelete}>Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
