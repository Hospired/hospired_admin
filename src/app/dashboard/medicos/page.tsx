"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getAllPhysicians, updatePhysicianTable, deletePhysician } from "@/backend-api/apiService"
import { PhysicianWithAdminUser, medicalSpecialtyMap } from "@/backend-api/dtos"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
import { ArrowUpDown, Eye, Edit, MoreHorizontal, Plus, Trash2, User, Phone, Stethoscope } from "lucide-react"

type SortConfig = {
  key: keyof PhysicianWithAdminUser | null
  direction: "asc" | "desc"
}

export default function PhysiciansPage() {
  const [physicians, setPhysicians] = useState<PhysicianWithAdminUser[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: "asc" })
  const [selectedPhysician, setSelectedPhysician] = useState<PhysicianWithAdminUser | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [deletingPhysician, setDeletingPhysician] = useState<PhysicianWithAdminUser | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editForm, setEditForm] = useState<PhysicianWithAdminUser | null>(null)
  const [isEditLoading, setIsEditLoading] = useState(false)
  const [editResult, setEditResult] = useState<null | "success" | "error">(null)
  const [deleteResult, setDeleteResult] = useState<null | "success" | "error">(null)

  useEffect(() => {
    const fetchPhysicians = async () => {
      try {
        const data = await getAllPhysicians()
        setPhysicians(data)
      } catch (err) {
        console.error("Error cargando médicos:", err)
      }
    }
    fetchPhysicians()
  }, [])

  const handleSort = (key: keyof PhysicianWithAdminUser) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc"
    setSortConfig({ key, direction })
  }

  const filteredPhysicians = physicians
    .filter((p) =>
      `${p.firstName} ${p.secondName ?? ""} ${p.firstLastName} ${p.secondLastName ?? ""}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.specialty ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.licenseId ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.public_email ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.phone_number ?? "").toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleViewDetails = (p: PhysicianWithAdminUser) => {
    setSelectedPhysician(p)
    setIsDetailOpen(true)
  }

  const handleDelete = (p: PhysicianWithAdminUser) => {
    setDeletingPhysician(p)
    setIsDeleteOpen(true)
  }

  const confirmDelete = async () => {
    if (!deletingPhysician) return
    try {
      await deletePhysician(deletingPhysician.id)
      setPhysicians(prev => prev.filter(p => p.id !== deletingPhysician.id))
      setDeleteResult("success")
    } catch (err) {
      setDeleteResult("error")
    }
    setIsDeleteOpen(false)
    setDeletingPhysician(null)
  }

  const handleEdit = (p: PhysicianWithAdminUser) => {
    setEditForm(p)
    setIsEditOpen(true)
  }

  const handleEditChange = (field: keyof PhysicianWithAdminUser, value: any) => {
    setEditForm(prev => prev ? { ...prev, [field]: value } : prev)
  }

  const handleEditSave = async () => {
    if (!editForm) return
    setIsEditLoading(true)
    try {
      await updatePhysicianTable(editForm.id, {
        licenseId: editForm.licenseId,
        specialty: editForm.specialty,
        public_email: editForm.public_email,
        phone_number: editForm.phone_number,
        notes: editForm.notes ?? ""
      })
      setPhysicians(prev => prev.map(p => p.id === editForm.id ? { ...p, ...editForm } : p))
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
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Médicos</h1>
          <p className="text-muted-foreground">Administra la información de todos los médicos registrados.</p>
        </div>
        <Link href="/dashboard/medicos/nuevo">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Nuevo Médico
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Médicos</CardTitle>
          <CardDescription>Filtra por nombre, especialidad, licencia, email o teléfono</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input placeholder="Buscar por nombre, especialidad, licencia, email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Médicos ({filteredPhysicians.length})</CardTitle>
          <CardDescription>Visualiza y gestiona médicos registrados</CardDescription>
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
                    <Button variant="ghost" onClick={() => handleSort("firstName" as any)} className="h-auto p-0 font-semibold hover:bg-transparent">
                      Nombre Completo
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("specialty")} className="h-auto p-0 font-semibold hover:bg-transparent">
                      Especialidad
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSort("licenseId")} className="h-auto p-0 font-semibold hover:bg-transparent">
                      Licencia
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredPhysicians.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleViewDetails(p)}>
                    <TableCell className="font-medium">{p.id}</TableCell>
                    <TableCell>{`${p.firstName} ${p.secondName ?? ""} ${p.firstLastName} ${p.secondLastName ?? ""}`}</TableCell>
                    <TableCell>{medicalSpecialtyMap[p.specialty] || p.specialty}</TableCell>
                    <TableCell>{p.licenseId}</TableCell>
                    <TableCell>{p.public_email}</TableCell>
                    <TableCell>{p.phone_number}</TableCell>
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
            <SheetTitle className="text-2xl">Perfil del Médico</SheetTitle>
            <SheetDescription>Información detallada del médico</SheetDescription>
          </SheetHeader>

          {selectedPhysician && (
            <div className="mt-6 space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Stethoscope className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{`${selectedPhysician.firstName} ${selectedPhysician.secondName ?? ""} ${selectedPhysician.firstLastName} ${selectedPhysician.secondLastName ?? ""}`}</h3>
                      <p className="text-sm text-muted-foreground">{selectedPhysician.licenseId}</p>
                      <p className="text-sm text-muted-foreground">{selectedPhysician.specialty}</p>
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
                  <p><strong>Email:</strong> {selectedPhysician.public_email}</p>
                  <p><strong>Teléfono:</strong> {selectedPhysician.phone_number}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5" /> Identificación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p><strong>ID:</strong> {selectedPhysician.id}</p>
                  <p><strong>Licencia:</strong> {selectedPhysician.licenseId}</p>
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
      <DialogTitle>Eliminar médico</DialogTitle>
      <DialogDescription>Esta acción no se puede deshacer.</DialogDescription>
    </DialogHeader>
    {deletingPhysician && (
      <div className="py-4">
        <p><strong>{`${deletingPhysician.firstName} ${deletingPhysician.secondName ?? ""} ${deletingPhysician.firstLastName} ${deletingPhysician.secondLastName ?? ""}`}</strong></p>
        <p className="text-sm text-muted-foreground">{deletingPhysician.licenseId}</p>
      </div>
    )}
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancelar</Button>
      <Button variant="destructive" onClick={confirmDelete}>Eliminar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<Dialog open={!!deleteResult} onOpenChange={() => setDeleteResult(null)}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>
        {deleteResult === "success"
          ? "Médico eliminado correctamente"
          : "Error al eliminar médico"}
      </DialogTitle>
      <DialogDescription>
        {deleteResult === "success"
          ? "El médico fue eliminado correctamente."
          : "No se pudo eliminar el médico. Por favor, inténtalo de nuevo."}
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button onClick={() => setDeleteResult(null)}>
        Cerrar
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      {/* Modal de edición */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Médico</DialogTitle>
            <DialogDescription>Modifica los datos y guarda los cambios.</DialogDescription>
          </DialogHeader>
          {editForm && (
            <form className="space-y-3" onSubmit={e => {e.preventDefault(); handleEditSave();}}>
              <label className="text-sm text-muted-foreground" htmlFor="licenseId">Licencia</label>
              <Input id="licenseId" value={editForm.licenseId} onChange={e => handleEditChange("licenseId", e.target.value)} />
              <label className="text-sm text-muted-foreground" htmlFor="specialty">Especialidad</label>
              <Select
                value={editForm?.specialty ?? ""}
                onValueChange={value => handleEditChange("specialty", value)}
              >
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="Selecciona una especialidad" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(medicalSpecialtyMap).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <label className="text-sm text-muted-foreground" htmlFor="public_email">Email</label>
              <Input id="public_email" value={editForm.public_email} onChange={e => handleEditChange("public_email", e.target.value)} />
              <label className="text-sm text-muted-foreground" htmlFor="phone_number">Teléfono</label>
              <Input id="phone_number" value={editForm.phone_number} onChange={e => handleEditChange("phone_number", e.target.value)} />
              <label className="text-sm text-muted-foreground" htmlFor="notes">Notas</label>
              <Input id="notes" value={editForm.notes || ""} onChange={e => handleEditChange("notes", e.target.value)} />
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

      {/* Confirmación de edición */}
      <Dialog open={!!editResult} onOpenChange={() => setEditResult(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editResult === "success"
                ? "Médico actualizado correctamente"
                : "Error al actualizar médico"}
            </DialogTitle>
            <DialogDescription>
              {editResult === "success"
                ? "Los datos del médico se han guardado correctamente."
                : "No se pudo actualizar el médico. Por favor, inténtalo de nuevo."}
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