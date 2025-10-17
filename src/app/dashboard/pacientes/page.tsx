"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import Link from "next/link"
import {
  getAllPatients,
  deletePatient,
  getAppointmentsByPatientId,
  updatePatient,
  getMunicipalities
} from "@/backend-api/apiService"
import { PatientWithUser, medicalSpecialtyMap, AppointmentStatus, appointmentStatusMap } from "@/backend-api/dtos"

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

type MunicipalityWithDepartment = {
  id: number,
  name: string,
  departmentName: string
}

export default function PacientesPage() {
  const [patients, setPatients] = useState<PatientWithUser[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" })
  const [selectedPatient, setSelectedPatient] = useState<PatientWithUser | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [deletingPatient, setDeletingPatient] = useState<PatientWithUser | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deleteResult, setDeleteResult] = useState<null | "success" | "error">(null)
  const [isResultOpen, setIsResultOpen] = useState(false)
  const [appointments, setAppointments] = useState<any[]>([])
  const [municipalities, setMunicipalities] = useState<MunicipalityWithDepartment[]>([])
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editForm, setEditForm] = useState<PatientWithUser | null>(null)
  const [isEditLoading, setIsEditLoading] = useState(false)
  const [editResult, setEditResult] = useState<null | "success" | "error">(null)

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

  useEffect(() => {
    const loadMunicipalities = async () => {
      try {
        const data = await getMunicipalities();
        setMunicipalities(data);
      } catch (error) {
        console.error("Error al cargar municipios:", error);
      }
    };
    loadMunicipalities();
  }, []);

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
      (p.departmentName ?? "").toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleViewDetails = async (p: PatientWithUser) => {
    setSelectedPatient(p)
    setIsDetailOpen(true)
    try {
      const data = await getAppointmentsByPatientId(p.id)
      setAppointments(data)
    } catch (err) {
      setAppointments([])
    }
  }

  const handleDelete = (p: PatientWithUser) => {
    setDeletingPatient(p)
    setIsDeleteOpen(true)
  }

  const confirmDelete = async () => {
    if (!deletingPatient) return
    try {
      await deletePatient(deletingPatient.id)
      setPatients(prev => prev.filter(p => p.id !== deletingPatient.id))
      setDeleteResult("success")
    } catch (err) {
      console.error("Error eliminando paciente:", err)
      setDeleteResult("error")
    }
    setIsDeleteOpen(false)
    setDeletingPatient(null)
    setIsResultOpen(true)
  }

  const handleEdit = (p: PatientWithUser) => {
    setEditForm(p)
    setIsEditOpen(true)
  }

  const handleEditChange = (field: keyof PatientWithUser, value: any) => {
    setEditForm(prev => prev ? { ...prev, [field]: value } : prev)
    // Si cambia el municipio, también actualiza su nombre y departamento para mostrar en UI
    if(field === "municipalityId") {
      const m = municipalities.find(muni => muni.id === value)
      setEditForm(prev => prev ? {
        ...prev,
        municipalityName: m?.name ?? "",
        departmentName: m?.departmentName ?? ""
      } : prev)
    }
  }

  const handleEditSave = async () => {
    if (!editForm) return
    setIsEditLoading(true)
    try {
      await updatePatient(editForm.id, {
        nationalId: editForm.nationalId,
        inss: editForm.inss,
        phone: editForm.phone,
        occupation: editForm.occupation,
        address: editForm.address,
        medicalNotes: editForm.medicalNotes,
        municipalityId: editForm.municipalityId
      })
      // Busca el municipio seleccionado
      const m = municipalities.find(muni => muni.id === editForm.municipalityId)
      setPatients(prev => prev.map(p =>
        p.id === editForm.id
          ? {
              ...p,
              ...editForm,
              municipalityName: m?.name ?? "",
              departmentName: m?.departmentName ?? ""
            }
          : p
      ))
      setIsEditOpen(false)
      setEditResult("success")
    } catch (err) {
      setEditResult("error")
    }
    setIsEditLoading(false)
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
                    <TableCell>{p.departmentName || "—"}</TableCell>
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
              {/* Avatar, nombre y edad */}
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1">
                  <Input
                    value={selectedPatient.fullName}
                    readOnly
                    className="mb-2 font-bold text-xl"
                    aria-label="Nombre Completo"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={selectedPatient.nationalId}
                      readOnly
                      className="w-1/2"
                      aria-label="Cédula"
                      placeholder="Cédula"
                    />
                    <Input
                      value={calculateAge(selectedPatient.dateOfBirth) + " años"}
                      readOnly
                      className="w-1/2"
                      aria-label="Edad"
                      placeholder="Edad"
                    />
                  </div>
                </div>
              </div>

              {/* Sección: Información General */}
              <Card>
                <CardHeader>
                  <CardTitle>Información General</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">ID</label>
                    <Input value={selectedPatient.id} readOnly />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">INSS</label>
                    <Input value={selectedPatient.inss} readOnly />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Fecha de Nacimiento</label>
                    <Input value={selectedPatient.dateOfBirth ? selectedPatient.dateOfBirth.toLocaleDateString() : "—"} readOnly />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Fecha de Registro</label>
                    <Input value={selectedPatient.createdAt.toLocaleDateString()} readOnly />
                  </div>
                </CardContent>
              </Card>

              {/* Sección: Contacto */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Phone className="h-5 w-5" /> Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Teléfono</label>
                    <Input value={selectedPatient.phone} readOnly />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Dirección</label>
                    <Input value={selectedPatient.address || "—"} readOnly />
                  </div>
                </CardContent>
              </Card>

              {/* Sección: Ubicación */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    Ubicación
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Municipio</label>
                    <Input value={selectedPatient.municipalityName || "—"} readOnly />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Departamento</label>
                    <Input value={selectedPatient.departmentName || "—"} readOnly />
                  </div>
                </CardContent>
              </Card>

              {/* Sección: Ocupación */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Briefcase className="h-5 w-5" /> Ocupación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input value={selectedPatient.occupation || "—"} readOnly />
                </CardContent>
              </Card>

              {/* Sección: Notas Médicas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ClipboardList className="h-5 w-5" /> Notas Médicas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    value={selectedPatient.medicalNotes || "Sin notas registradas."}
                    readOnly
                    className="font-normal"
                  />
                </CardContent>
              </Card>

              {/* Historial de Citas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ClipboardList className="h-5 w-5" /> Historial de Citas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {appointments.length === 0 ? (
                    <span className="text-muted-foreground">Sin citas registradas.</span>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Médico</TableHead>
                          <TableHead>Especialidad</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Motivo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.map((a) => (
                          <TableRow key={a.id}>
                            <TableCell>{a.start ? new Date(a.start).toLocaleString() : "—"}</TableCell>
                            <TableCell>{a.physicians?.public_email || "—"}</TableCell>
                            <TableCell>{medicalSpecialtyMap[a.specialty] || a.specialty}</TableCell>
                            <TableCell>{appointmentStatusMap[a.status as AppointmentStatus] || a.status}</TableCell>
                            <TableCell>{a.motive || "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Modal de edición */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Paciente</DialogTitle>
            <DialogDescription>Modifica los datos y guarda los cambios.</DialogDescription>
          </DialogHeader>
          {editForm && (
            <form className="space-y-3" onSubmit={e => {e.preventDefault(); handleEditSave();}}>
              <label className="text-sm text-muted-foreground" htmlFor="nationalId">Cédula</label>
              <Input id="nationalId" value={editForm.nationalId} onChange={e => handleEditChange("nationalId", e.target.value)} />
              <label className="text-sm text-muted-foreground" htmlFor="inss">INSS</label>
              <Input id="inss" value={editForm.inss} onChange={e => handleEditChange("inss", Number(e.target.value))} />
              <label className="text-sm text-muted-foreground" htmlFor="phone">Teléfono</label>
              <Input id="phone" value={editForm.phone} onChange={e => handleEditChange("phone", e.target.value)} />
              <label className="text-sm text-muted-foreground" htmlFor="occupation">Ocupación</label>
              <Input id="occupation" value={editForm.occupation || ""} onChange={e => handleEditChange("occupation", e.target.value)} />
              <label className="text-sm text-muted-foreground" htmlFor="address">Dirección</label>
              <Input id="address" value={editForm.address || ""} onChange={e => handleEditChange("address", e.target.value)} />
              <label className="text-sm text-muted-foreground" htmlFor="municipalityId">Municipio</label>
              <Select
                value={editForm?.municipalityId?.toString() ?? ""}
                onValueChange={value => handleEditChange("municipalityId", Number(value))}
              >
                <SelectTrigger id="municipalityId">
                  <SelectValue placeholder="Selecciona un municipio" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map(m => (
                    <SelectItem key={m.id} value={m.id.toString()}>
                      {m.name} ({m.departmentName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <label className="text-sm text-muted-foreground" htmlFor="medicalNotes">Notas Médicas</label>
              <Input id="medicalNotes" value={editForm.medicalNotes || ""} onChange={e => handleEditChange("medicalNotes", e.target.value)} />

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsEditOpen(false)}>Cancelar</Button>
                <Button type="submit" disabled={isEditLoading}>
                  {isEditLoading ? "Guardando..." : "Guardar"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
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
      <Dialog open={isResultOpen} onOpenChange={setIsResultOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {deleteResult === "success" ? "Paciente eliminado" : "Error al eliminar"}
            </DialogTitle>
            <DialogDescription>
              {deleteResult === "success"
                ? "El paciente fue eliminado correctamente."
                : "No se pudo eliminar el paciente. Por favor, inténtalo de nuevo."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsResultOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editResult} onOpenChange={() => setEditResult(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editResult === "success"
                ? "Paciente actualizado correctamente"
                : "Error al actualizar paciente"}
            </DialogTitle>
            <DialogDescription>
              {editResult === "success"
                ? "Los datos del paciente se han guardado correctamente."
                : "No se pudo actualizar el paciente. Por favor, inténtalo de nuevo."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setEditResult(null)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}