"use client";

import React, { useState, useEffect } from "react";
import {
  getHealthcareFacilities,
  createHealthcareFacility,
  getFacilityUnits,
  createFacilityUnit,
  getMunicipalities,
} from "@/backend-api/apiService";
import {
  HealthcareFacilityRes,
  FacilityUnitRes,
  Municipality,
  CreateHealthcareFacilityReq,
  CreateFacilityUnitReq,
} from "@/backend-api/dtos";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Hospital } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function HealthcareFacilitiesAndUnitsPage() {
  const [tab, setTab] = useState("facilities");

  // Facilities
  const [facilities, setFacilities] = useState<HealthcareFacilityRes[]>([]);
  const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
  const [loadingFacilities, setLoadingFacilities] = useState(true);
  const [newFacility, setNewFacility] = useState<CreateHealthcareFacilityReq>({
    name: "",
    servesInss: false,
    isPublicMinsa: false,
    address: "",
    district: "",
    municipalityId: 0,
    latitude: 0,
    longitude: 0,
    notes: "",
  });
  const [openFacilityDialog, setOpenFacilityDialog] = useState(false);

  // Units
  const [units, setUnits] = useState<FacilityUnitRes[]>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState<number | null>(null);
  const [loadingUnits, setLoadingUnits] = useState(false);
  const [newUnit, setNewUnit] = useState<CreateFacilityUnitReq>({
    facilityId: 0,
    name: "",
    indications: "",
  });
  const [openUnitDialog, setOpenUnitDialog] = useState(false);

  // Search
  const [searchFacilityTerm, setSearchFacilityTerm] = useState("");
  const [searchUnitTerm, setSearchUnitTerm] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingFacilities(true);
        const [facilitiesData, municipalitiesData] = await Promise.all([
          getHealthcareFacilities(),
          getMunicipalities(),
        ]);
        setFacilities(facilitiesData);
        setMunicipalities(municipalitiesData);
      } catch (error: any) {
        alert("Error cargando datos: " + error.message);
      } finally {
        setLoadingFacilities(false);
      }
    }
    loadData();
  }, []);

  async function loadUnits(facilityId: number) {
    try {
      setLoadingUnits(true);
      setUnits([]); // <--- Vacía el array al iniciar la carga
      const unitsData = await getFacilityUnits(facilityId);
      setUnits(unitsData);
    } catch (error: any) {
      alert("Error cargando unidades: " + error.message);
    } finally {
      setLoadingUnits(false);
    }
  }

  async function saveFacility() {
    try {
      const created = await createHealthcareFacility(newFacility);
      setFacilities((prev) => [created, ...prev]);
      setNewFacility({
        name: "",
        servesInss: false,
        isPublicMinsa: false,
        address: "",
        district: "",
        municipalityId: 0,
        latitude: 0,
        longitude: 0,
        notes: "",
      });
      setOpenFacilityDialog(false);
      alert("Centro de salud creado correctamente");
    } catch (error: any) {
      alert("Error al crear centro de salud: " + error.message);
    }
  }

  async function saveUnit() {
    if (!selectedFacilityId) {
      alert("Seleccione un centro de salud primero");
      return;
    }
    try {
      const created = await createFacilityUnit({ ...newUnit, facilityId: selectedFacilityId });
      setUnits((prev) => [created, ...prev]);
      setNewUnit({ facilityId: 0, name: "", indications: "" });
      setOpenUnitDialog(false);
      alert("Unidad médica creada correctamente");
    } catch (error: any) {
      alert("Error al crear unidad médica: " + error.message);
    }
  }

  const filteredFacilities = facilities.filter((f) =>
    f.name.toLowerCase().includes(searchFacilityTerm.toLowerCase())
  );

  const filteredUnits = units.filter((u) =>
    u.name.toLowerCase().includes(searchUnitTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Sistema de Centros de Salud
          </h2>
          <p className="text-muted-foreground">Gestión de centros de salud y unidades médicas</p>
        </div>
      </div>

      <Tabs defaultValue="facilities" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="facilities">Centros de Salud</TabsTrigger>
          <TabsTrigger value="units">Unidades Médicas</TabsTrigger>
        </TabsList>

        {/* Centros de Salud */}
        <TabsContent value="facilities" className="space-y-4">
          <div className="flex items-center justify-between">
            <Input
              placeholder="Buscar centros de salud..."
              value={searchFacilityTerm}
              onChange={(e) => setSearchFacilityTerm(e.target.value)}
              className="max-w-sm"
            />
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setOpenFacilityDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Centro de Salud
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredFacilities.map((facility) => (
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
                              <Badge className={facility.servesInss ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}>
                                {facility.servesInss ? "Sí" : "No"}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">MINSA Público:</span>
                              <Badge className={facility.isPublicMinsa ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500"}>
                                {facility.isPublicMinsa ? "Sí" : "No"}
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Unidades Médicas */}
        <TabsContent value="units" className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <select
                className="border rounded p-2 w-full md:w-1/2"
                value={selectedFacilityId ?? ""}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  setSelectedFacilityId(id);
                  if (id) loadUnits(id);
                }}
              >
                <option value="">Seleccione instalación</option>
                {facilities.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>

              {/* Input de búsqueda visible solo si hay instalación seleccionada */}
              {selectedFacilityId && (
                <Input
                  placeholder="Buscar unidad médica..."
                  value={searchUnitTerm}
                  onChange={(e) => setSearchUnitTerm(e.target.value)}
                  className="w-full md:w-1/3"
                />
              )}
            </div>

            {/* Botón para agregar nueva unidad */}
            <Dialog open={openUnitDialog} onOpenChange={setOpenUnitDialog}>
              <DialogTrigger asChild>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" /> Nueva unidad
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Registrar unidad</DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
                  <select
                    className="border rounded p-2 w-full"
                    value={selectedFacilityId ?? ""}
                    onChange={(e) => setSelectedFacilityId(Number(e.target.value))}
                  >
                    <option value="">Seleccione instalación</option>
                    {facilities.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>

                  <input
                    placeholder="Nombre de la unidad"
                    className="border rounded p-2 w-full"
                    value={newUnit.name}
                    onChange={(e) =>
                      setNewUnit({
                        ...newUnit,
                        name: e.target.value,
                      })
                    }
                  />

                  <textarea
                    placeholder="Indicaciones"
                    className="border rounded p-2 w-full"
                    value={newUnit.indications}
                    onChange={(e) =>
                      setNewUnit({
                        ...newUnit,
                        indications: e.target.value,
                      })
                    }
                  />

                  <Button onClick={saveUnit}>Guardar unidad</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {!selectedFacilityId ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredFacilities.map((facility) => (
                <Card
                  key={facility.id}
                  className="border-border/50 cursor-pointer hover:border-blue-500/50 transition-colors"
                  onClick={() => {
                    setSelectedFacilityId(facility.id);
                    loadUnits(facility.id);
                  }}
                >
                  <CardHeader>
                    <CardTitle>{facility.name}</CardTitle>
                    <CardDescription>{facility.district}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Unidades médicas:</span>
                      <Badge variant="outline">{facility.unitsCount}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div>
              <Button variant="outline" size="sm" onClick={() => setSelectedFacilityId(null)}>
                ← Volver a centros
              </Button>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
                {filteredUnits.map((unit) => (
                  <Card key={unit.id} className="border-border/50">
                    <CardHeader>
                      <CardTitle>{unit.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {unit.indications && <p>{unit.indications}</p>}
                      <p className="text-xs text-muted-foreground mt-2">Creado: {new Date(unit.createdAt).toLocaleDateString()}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <Dialog open={openFacilityDialog} onOpenChange={setOpenFacilityDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar instalación</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <input
                  placeholder="Nombre"
                  className="border rounded p-2 w-full"
                  value={newFacility.name}
                    onChange={(e) =>
                    setNewFacility({
                      ...newFacility,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  placeholder="Dirección"
                  className="border rounded p-2 w-full"
                  value={newFacility.address}
                  onChange={(e) =>
                  setNewFacility({
                    ...newFacility,
                          address: e.target.value,
                    })
                  }
                />
                <input
                  placeholder="Distrito"
                  className="border rounded p-2 w-full"
                  value={newFacility.district}
                  onChange={(e) =>
                    setNewFacility({
                    ...newFacility,
                    district: e.target.value,
                    })
                  }
                />
                <select
                  className="border rounded p-2 w-full"
                  value={newFacility.municipalityId}
                  onChange={(e) =>
                  setNewFacility({
                      ...newFacility,
                          municipalityId: Number(e.target.value),
                        })
                      }
                    >
                  <option value="">Seleccione municipio</option>
                    {municipalities.map((m) => (
                      <option key={m.id} value={m.id}>
                      {m.name} ({m.department})
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    step="any"
                    placeholder="Latitud"
                    className="border rounded p-2"
                    value={newFacility.latitude}
                      onChange={(e) =>
                        setNewFacility({
                          ...newFacility,
                          latitude: parseFloat(e.target.value),
                        })
                        }
                    />
                  <input
                    type="number"
                    step="any"
                    placeholder="Longitud"
                    className="border rounded p-2"
                    value={newFacility.longitude}
                    onChange={(e) =>
                      setNewFacility({
                        ...newFacility,
                        longitude: parseFloat(e.target.value),
                        })
                      }
                      />
                    </div>
                    <textarea
                      placeholder="Notas"
                      className="border rounded p-2 w-full"
                      value={newFacility.notes}
                      onChange={(e) =>
                        setNewFacility({
                          ...newFacility,
                          notes: e.target.value,
                        })
                      }
                    />
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newFacility.servesInss}
                        onChange={(e) =>
                          setNewFacility({
                            ...newFacility,
                            servesInss: e.target.checked,
                          })
                        }
                      />
                        Atiende INSS
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newFacility.isPublicMinsa}
                        onChange={(e) =>
                        setNewFacility({
                        ...newFacility,
                        isPublicMinsa: e.target.checked,
                        })
                      }
                  />
                  Pública (MINSA)
                </label>
              </div>
            <Button onClick={saveFacility}>Guardar instalación</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
