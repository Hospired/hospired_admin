"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, User, Bed, Activity, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NuevaAdmisionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    router.push("/dashboard/admisiones")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/admisiones">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Nueva Admisión</h1>
          <p className="text-muted-foreground text-pretty">Registra una nueva admisión hospitalaria.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Información del Paciente
            </CardTitle>
            <CardDescription>Selecciona el paciente para la admisión</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Paciente *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Buscar paciente..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P-2024-0001">María González Pérez (P-2024-0001)</SelectItem>
                  <SelectItem value="P-2024-0002">Carlos Mendoza López (P-2024-0002)</SelectItem>
                  <SelectItem value="P-2024-0003">Ana Rodríguez Silva (P-2024-0003)</SelectItem>
                  <SelectItem value="P-2024-0004">José Martínez García (P-2024-0004)</SelectItem>
                  <SelectItem value="P-2024-0005">Laura Herrera Morales (P-2024-0005)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Admission Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Detalles de la Admisión
            </CardTitle>
            <CardDescription>Información básica de la admisión</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="admissionDate">Fecha de Admisión *</Label>
                <Input id="admissionDate" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admissionTime">Hora de Admisión *</Label>
                <Input id="admissionTime" type="time" required />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="admissionType">Tipo de Admisión *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergencia">Emergencia</SelectItem>
                    <SelectItem value="programada">Programada</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                    <SelectItem value="transferencia">Transferencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar prioridad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critica">Crítica</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo de Admisión *</Label>
              <Textarea
                id="reason"
                placeholder="Describe el motivo de la admisión..."
                className="min-h-[80px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Información Médica
            </CardTitle>
            <CardDescription>Detalles médicos de la admisión</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="department">Departamento *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicina-interna">Medicina Interna</SelectItem>
                    <SelectItem value="cardiologia">Cardiología</SelectItem>
                    <SelectItem value="neurologia">Neurología</SelectItem>
                    <SelectItem value="traumatologia">Traumatología</SelectItem>
                    <SelectItem value="ginecologia">Ginecología</SelectItem>
                    <SelectItem value="pediatria">Pediatría</SelectItem>
                    <SelectItem value="cirugia">Cirugía General</SelectItem>
                    <SelectItem value="uci">UCI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="attendingDoctor">Médico Responsable *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar médico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-ramirez">Dr. Ramírez - Cardiología</SelectItem>
                    <SelectItem value="dra-rodriguez">Dra. Rodríguez - Medicina Interna</SelectItem>
                    <SelectItem value="dr-garcia">Dr. García - Ginecología</SelectItem>
                    <SelectItem value="dr-lopez">Dr. López - Traumatología</SelectItem>
                    <SelectItem value="dra-morales">Dra. Morales - Neurología</SelectItem>
                    <SelectItem value="dr-martinez">Dr. Martínez - Pediatría</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preliminaryDiagnosis">Diagnóstico Preliminar</Label>
              <Textarea
                id="preliminaryDiagnosis"
                placeholder="Diagnóstico inicial o sospecha diagnóstica..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">Síntomas y Signos</Label>
              <Textarea id="symptoms" placeholder="Describe los síntomas principales..." className="min-h-[80px]" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="condition">Condición del Paciente</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Condición" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critico">Crítico</SelectItem>
                    <SelectItem value="grave">Grave</SelectItem>
                    <SelectItem value="estable">Estable</SelectItem>
                    <SelectItem value="mejorando">Mejorando</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedStay">Estancia Estimada (días)</Label>
                <Input id="estimatedStay" type="number" placeholder="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedDischarge">Alta Estimada</Label>
                <Input id="estimatedDischarge" type="date" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Room and Bed Assignment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-primary" />
              Asignación de Habitación
            </CardTitle>
            <CardDescription>Asigna habitación y cama al paciente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="floor">Piso</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar piso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Piso 1 - Emergencias</SelectItem>
                    <SelectItem value="2">Piso 2 - Medicina Interna</SelectItem>
                    <SelectItem value="3">Piso 3 - Especialidades</SelectItem>
                    <SelectItem value="4">Piso 4 - Cirugía</SelectItem>
                    <SelectItem value="5">Piso 5 - UCI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="room">Habitación</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Asignar automáticamente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="101-A">101-A (Disponible)</SelectItem>
                    <SelectItem value="102-A">102-A (Disponible)</SelectItem>
                    <SelectItem value="201-A">201-A (Disponible)</SelectItem>
                    <SelectItem value="201-B">201-B (Disponible)</SelectItem>
                    <SelectItem value="301-C">301-C (Disponible)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bed">Cama</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Asignar automáticamente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Cama 1</SelectItem>
                    <SelectItem value="2">Cama 2</SelectItem>
                    <SelectItem value="3">Cama 3</SelectItem>
                    <SelectItem value="4">Cama 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomType">Tipo de Habitación</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="doble">Doble</SelectItem>
                  <SelectItem value="multiple">Múltiple</SelectItem>
                  <SelectItem value="uci">UCI</SelectItem>
                  <SelectItem value="aislamiento">Aislamiento</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Notas Adicionales</CardTitle>
            <CardDescription>Información adicional sobre la admisión</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="allergies">Alergias Conocidas</Label>
              <Textarea id="allergies" placeholder="Lista de alergias del paciente..." className="min-h-[60px]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Medicamentos Actuales</Label>
              <Textarea
                id="medications"
                placeholder="Medicamentos que toma actualmente el paciente..."
                className="min-h-[60px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Instrucciones Especiales</Label>
              <Textarea
                id="specialInstructions"
                placeholder="Instrucciones especiales para el cuidado del paciente..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
              <Input id="emergencyContact" placeholder="Nombre y teléfono del contacto de emergencia" />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link href="/dashboard/admisiones">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit" disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? "Guardando..." : "Registrar Admisión"}
          </Button>
        </div>
      </form>
    </div>
  )
}
