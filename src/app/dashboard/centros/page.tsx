"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Building2, Hospital, MoreHorizontal, Edit, Trash2, ChevronRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

type HealthcareFacility = {
  id: number
  name: string
  serves_inss: boolean
  is_public_minsa: boolean
  address: string
  district: string
  municipality_id: number
  latitude: number
  longitude: number
  created_at: string
  notes?: string
}

type FacilityUnit = {
  id: number
  facility_id: number
  name: string
  indications?: string
  created_at: string
}

const facilitiesData: HealthcareFacility[] = [
  {
    id: 1,
    name: "Hospital Manolo Morales",
    serves_inss: true,
    is_public_minsa: true,
    address: "Barrio Altagracia, Managua",
    district: "Distrito III",
    municipality_id: 1,
    latitude: 12.1364,
    longitude: -86.2514,
    created_at: "2024-01-15T10:00:00Z",
    notes: "Hospital de referencia nacional",
  },
  {
    id: 2,
    name: "Centro de Salud Villa Libertad",
    serves_inss: false,
    is_public_minsa: true,
    address: "Villa Libertad, Managua",
    district: "Distrito V",
    municipality_id: 1,
    latitude: 12.115,
    longitude: -86.2362,
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 3,
    name: "Hospital Escuela Oscar Danilo Rosales",
    serves_inss: true,
    is_public_minsa: true,
    address: "León Centro",
    district: "Distrito I",
    municipality_id: 2,
    latitude: 12.4333,
    longitude: -86.8833,
    created_at: "2024-01-15T10:00:00Z",
    notes: "Hospital universitario",
  },
]

const unitsData: FacilityUnit[] = [
  {
    id: 1,
    facility_id: 1,
    name: "Cardiología",
    indications: "Consultas de lunes a viernes de 7am a 3pm",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    facility_id: 1,
    name: "Emergencias",
    indications: "Atención 24/7",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 3,
    facility_id: 2,
    name: "Medicina General",
    indications: "Lunes a viernes de 8am a 4pm",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: 4,
    facility_id: 3,
    name: "Pediatría",
    indications: "Consultas con cita previa",
    created_at: "2024-01-15T10:00:00Z",
  },
]

export default function HealthcareFacilitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchFacilityTerm, setSearchFacilityTerm] = useState("")

  // Estados para centros de salud
  const [facilities, setFacilities] = useState<HealthcareFacility[]>(facilitiesData)
  const [facilityDialogOpen, setFacilityDialogOpen] = useState(false)
  const [editingFacility, setEditingFacility] = useState<HealthcareFacility | null>(null)
  const [facilityForm, setFacilityForm] = useState({
    name: "",
    serves_inss: false,
    is_public_minsa: false,
    address: "",
    district: "",
    municipality_id: 1,
    latitude: 0,
    longitude: 0,
    notes: "",
  })

  // Estados para unidades
  const [units, setUnits] = useState<FacilityUnit[]>(unitsData)
  const [unitDialogOpen, setUnitDialogOpen] = useState(false)
  const [editingUnit, setEditingUnit] = useState<FacilityUnit | null>(null)
  const [unitForm, setUnitForm] = useState({
    facility_id: 1,
    name: "",
    indications: "",
  })

  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null)

  // Funciones para centros de salud
  const openFacilityDialog = (facility?: HealthcareFacility) => {
    if (facility) {
      setEditingFacility(facility)
      setFacilityForm({
        name: facility.name,
        serves_inss: facility.serves_inss,
        is_public_minsa: facility.is_public_minsa,
        address: facility.address,
        district: facility.district,
        municipality_id: facility.municipality_id,
        latitude: facility.latitude,
        longitude: facility.longitude,
        notes: facility.notes || "",
      })
    } else {
      setEditingFacility(null)
      setFacilityForm({
        name: "",
        serves_inss: false,
        is_public_minsa: false,
        address: "",
        district: "",
        municipality_id: 1,
        latitude: 0,
        longitude: 0,
        notes: "",
      })
    }
    setFacilityDialogOpen(true)
  }

  const saveFacility = () => {
    if (editingFacility) {
      setFacilities(facilities.map((f) => (f.id === editingFacility.id ? { ...f, ...facilityForm } : f)))
    } else {
      const newFacility: HealthcareFacility = {
        id: Math.max(...facilities.map((f) => f.id)) + 1,
        ...facilityForm,
        created_at: new Date().toISOString(),
      }
      setFacilities([...facilities, newFacility])
    }
    setFacilityDialogOpen(false)
  }

  const deleteFacility = (id: number) => {
    setFacilities(facilities.filter((f) => f.id !== id))
  }

  // Funciones para unidades
  const openUnitDialog = (unit?: FacilityUnit) => {
    if (unit) {
      setEditingUnit(unit)
      setUnitForm({
        facility_id: unit.facility_id,
        name: unit.name,
        indications: unit.indications || "",
      })
    } else {
      setEditingUnit(null)
      setUnitForm({
        facility_id: selectedFacilityId || 1,
        name: "",
        indications: "",
      })
    }
    setUnitDialogOpen(true)
  }

  const saveUnit = () => {
    if (editingUnit) {
      setUnits(units.map((u) => (u.id === editingUnit.id ? { ...u, ...unitForm } : u)))
    } else {
      const newUnit: FacilityUnit = {
        id: Math.max(...units.map((u) => u.id)) + 1,
        ...unitForm,
        created_at: new Date().toISOString(),
      }
      setUnits([...units, newUnit])
    }
    setUnitDialogOpen(false)
  }

  const deleteUnit = (id: number) => {
    setUnits(units.filter((u) => u.id !== id))
  }

  const getFacilityName = (id: number) => {
    return facilities.find((f) => f.id === id)?.name || "Desconocido"
  }

  const getUnitsCount = (facilityId: number) => {
    return units.filter((u) => u.facility_id === facilityId).length
  }

  const getFilteredUnits = () => {
    if (!selectedFacilityId) return []
    return units.filter((u) => u.facility_id === selectedFacilityId)
  }

  return (
    <>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Sistema de Centros de Salud</h2>
            <p className="text-muted-foreground">Gestión de centros de salud y unidades médicas</p>
          </div>
        </div>

        <Tabs defaultValue="facilities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="facilities">Centros de Salud</TabsTrigger>
            <TabsTrigger value="units">Unidades Médicas</TabsTrigger>
          </TabsList>

          {/* Tab de Centros de Salud */}
          <TabsContent value="facilities" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar centros de salud..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => openFacilityDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Centro de Salud
              </Button>
            </div>

            <div className="grid gap-4">
              {facilities
                .filter((f) => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((facility) => (
                  <Card key={facility.id} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg flex-shrink-0">
                            <Hospital className="h-6 w-6 text-blue-500" />
                          </div>
                          <div className="space-y-3 flex-1">
                            <div>
                              <h3 className="font-semibold text-foreground text-lg">{facility.name}</h3>
                              <p className="text-sm text-muted-foreground">{facility.address}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Distrito:</span>
                                  <span className="text-sm">{facility.district}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Coordenadas:</span>
                                  <span className="text-xs text-muted-foreground">
                                    {facility.latitude.toFixed(4)}, {facility.longitude.toFixed(4)}
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">INSS:</span>
                                  <Badge
                                    className={
                                      facility.serves_inss
                                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                                        : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                                    }
                                  >
                                    {facility.serves_inss ? "Sí" : "No"}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">MINSA Público:</span>
                                  <Badge
                                    className={
                                      facility.is_public_minsa
                                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                                        : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                                    }
                                  >
                                    {facility.is_public_minsa ? "Sí" : "No"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            {facility.notes && (
                              <div className="pt-2 border-t border-border/50">
                                <p className="text-sm text-muted-foreground">
                                  <span className="font-medium">Notas:</span> {facility.notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openFacilityDialog(facility)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => deleteFacility(facility.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="units" className="space-y-4">
            {!selectedFacilityId ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Buscar centros de salud..."
                      value={searchFacilityTerm}
                      onChange={(e) => setSearchFacilityTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => openUnitDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Unidad
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {facilities
                    .filter((f) => f.name.toLowerCase().includes(searchFacilityTerm.toLowerCase()))
                    .map((facility) => (
                      <Card
                        key={facility.id}
                        className="border-border/50 cursor-pointer hover:border-blue-500/50 transition-colors"
                        onClick={() => setSelectedFacilityId(facility.id)}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Hospital className="h-5 w-5 text-blue-500" />
                              <div>
                                <CardTitle className="text-foreground">{facility.name}</CardTitle>
                                <CardDescription>{facility.district}</CardDescription>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Unidades médicas:</span>
                            <Badge variant="outline">{getUnitsCount(facility.id)}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" size="sm" onClick={() => setSelectedFacilityId(null)}>
                      ← Volver a centros
                    </Button>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{getFacilityName(selectedFacilityId)}</h3>
                      <p className="text-sm text-muted-foreground">Unidades médicas del centro</p>
                    </div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => openUnitDialog()}>
                    <Plus className="mr-2 h-4 w-4" />
                    Nueva Unidad
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {getFilteredUnits().map((unit) => (
                    <Card key={unit.id} className="border-border/50">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Building2 className="h-5 w-5 text-blue-500" />
                            <div>
                              <CardTitle className="text-foreground">{unit.name}</CardTitle>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => openUnitDialog(unit)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600" onClick={() => deleteUnit(unit.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {unit.indications && (
                            <div className="pt-2">
                              <p className="text-sm text-muted-foreground">
                                <span className="font-medium">Indicaciones:</span> {unit.indications}
                              </p>
                            </div>
                          )}
                          <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
                            <span className="text-muted-foreground">Creado:</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(unit.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {getFilteredUnits().length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No hay unidades médicas</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Este centro aún no tiene unidades médicas registradas
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => openUnitDialog()}>
                        <Plus className="mr-2 h-4 w-4" />
                        Crear primera unidad
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Dialog para Centros de Salud */}
        <Dialog open={facilityDialogOpen} onOpenChange={setFacilityDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingFacility ? "Editar Centro de Salud" : "Nuevo Centro de Salud"}</DialogTitle>
              <DialogDescription>
                {editingFacility
                  ? "Modifica los datos del centro de salud"
                  : "Ingresa los datos del nuevo centro de salud"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="facility-name">Nombre del Centro</Label>
                <Input
                  id="facility-name"
                  value={facilityForm.name}
                  onChange={(e) => setFacilityForm({ ...facilityForm, name: e.target.value })}
                  placeholder="Ej: Hospital Manolo Morales"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facility-address">Dirección</Label>
                  <Input
                    id="facility-address"
                    value={facilityForm.address}
                    onChange={(e) => setFacilityForm({ ...facilityForm, address: e.target.value })}
                    placeholder="Ej: Barrio Altagracia"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facility-district">Distrito</Label>
                  <Input
                    id="facility-district"
                    value={facilityForm.district}
                    onChange={(e) => setFacilityForm({ ...facilityForm, district: e.target.value })}
                    placeholder="Ej: Distrito III"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facility-latitude">Latitud</Label>
                  <Input
                    id="facility-latitude"
                    type="number"
                    step="0.0001"
                    value={facilityForm.latitude}
                    onChange={(e) => setFacilityForm({ ...facilityForm, latitude: Number.parseFloat(e.target.value) })}
                    placeholder="12.1364"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facility-longitude">Longitud</Label>
                  <Input
                    id="facility-longitude"
                    type="number"
                    step="0.0001"
                    value={facilityForm.longitude}
                    onChange={(e) => setFacilityForm({ ...facilityForm, longitude: Number.parseFloat(e.target.value) })}
                    placeholder="-86.2514"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="facility-inss"
                    checked={facilityForm.serves_inss}
                    onCheckedChange={(checked) => setFacilityForm({ ...facilityForm, serves_inss: checked })}
                  />
                  <Label htmlFor="facility-inss" className="cursor-pointer">
                    Atiende INSS
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="facility-minsa"
                    checked={facilityForm.is_public_minsa}
                    onCheckedChange={(checked) => setFacilityForm({ ...facilityForm, is_public_minsa: checked })}
                  />
                  <Label htmlFor="facility-minsa" className="cursor-pointer">
                    MINSA Público
                  </Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="facility-notes">Notas (opcional)</Label>
                <Textarea
                  id="facility-notes"
                  value={facilityForm.notes}
                  onChange={(e) => setFacilityForm({ ...facilityForm, notes: e.target.value })}
                  placeholder="Información adicional sobre el centro de salud"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFacilityDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={saveFacility} className="bg-blue-600 hover:bg-blue-700">
                {editingFacility ? "Guardar Cambios" : "Crear Centro"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dialog para Unidades */}
        <Dialog open={unitDialogOpen} onOpenChange={setUnitDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUnit ? "Editar Unidad Médica" : "Nueva Unidad Médica"}</DialogTitle>
              <DialogDescription>
                {editingUnit ? "Modifica los datos de la unidad" : "Ingresa los datos de la nueva unidad"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="unit-name">Nombre de la Unidad</Label>
                <Input
                  id="unit-name"
                  value={unitForm.name}
                  onChange={(e) => setUnitForm({ ...unitForm, name: e.target.value })}
                  placeholder="Ej: Cardiología"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit-facility">Centro de Salud</Label>
                <Select
                  value={unitForm.facility_id.toString()}
                  onValueChange={(value) => setUnitForm({ ...unitForm, facility_id: Number.parseInt(value) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {facilities.map((facility) => (
                      <SelectItem key={facility.id} value={facility.id.toString()}>
                        {facility.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit-indications">Indicaciones (opcional)</Label>
                <Textarea
                  id="unit-indications"
                  value={unitForm.indications}
                  onChange={(e) => setUnitForm({ ...unitForm, indications: e.target.value })}
                  placeholder="Horarios, requisitos, etc."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setUnitDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={saveUnit} className="bg-blue-600 hover:bg-blue-700">
                {editingUnit ? "Guardar Cambios" : "Crear Unidad"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
