"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, User, FlaskConical, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NuevoExamenPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    router.push("/dashboard/examenes")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/examenes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Asignar Nuevo Examen</h1>
          <p className="text-muted-foreground text-pretty">Programa un nuevo examen médico para un paciente.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Selección de Paciente
            </CardTitle>
            <CardDescription>Selecciona el paciente para el examen</CardDescription>
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

        {/* Exam Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-primary" />
              Detalles del Examen
            </CardTitle>
            <CardDescription>Información del examen a realizar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laboratorio">Laboratorio</SelectItem>
                    <SelectItem value="imagenologia">Imagenología</SelectItem>
                    <SelectItem value="cardiologia">Cardiología</SelectItem>
                    <SelectItem value="neurologia">Neurología</SelectItem>
                    <SelectItem value="endoscopia">Endoscopia</SelectItem>
                    <SelectItem value="patologia">Patología</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="examType">Tipo de Examen *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar examen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hemograma">Hemograma Completo</SelectItem>
                    <SelectItem value="glucosa">Glucosa en Sangre</SelectItem>
                    <SelectItem value="colesterol">Perfil Lipídico</SelectItem>
                    <SelectItem value="radiografia">Radiografía</SelectItem>
                    <SelectItem value="ecografia">Ecografía</SelectItem>
                    <SelectItem value="tomografia">Tomografía</SelectItem>
                    <SelectItem value="resonancia">Resonancia Magnética</SelectItem>
                    <SelectItem value="electrocardiograma">Electrocardiograma</SelectItem>
                    <SelectItem value="ecocardiograma">Ecocardiograma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requestedBy">Médico Solicitante *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar médico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-ramirez">Dr. Ramírez - Cardiología</SelectItem>
                  <SelectItem value="dra-rodriguez">Dra. Rodríguez - Medicina General</SelectItem>
                  <SelectItem value="dr-garcia">Dr. García - Ginecología</SelectItem>
                  <SelectItem value="dr-lopez">Dr. López - Traumatología</SelectItem>
                  <SelectItem value="dra-morales">Dra. Morales - Neurología</SelectItem>
                  <SelectItem value="dr-martinez">Dr. Martínez - Pediatría</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo del Examen *</Label>
              <Textarea
                id="reason"
                placeholder="Describe el motivo médico del examen..."
                className="min-h-[80px]"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Scheduling */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Programación
            </CardTitle>
            <CardDescription>Fecha y hora del examen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="scheduledDate">Fecha Programada *</Label>
                <Input id="scheduledDate" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduledTime">Hora Programada *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar hora" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="07:00">07:00 AM</SelectItem>
                    <SelectItem value="07:30">07:30 AM</SelectItem>
                    <SelectItem value="08:00">08:00 AM</SelectItem>
                    <SelectItem value="08:30">08:30 AM</SelectItem>
                    <SelectItem value="09:00">09:00 AM</SelectItem>
                    <SelectItem value="09:30">09:30 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="10:30">10:30 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="11:30">11:30 AM</SelectItem>
                    <SelectItem value="14:00">02:00 PM</SelectItem>
                    <SelectItem value="14:30">02:30 PM</SelectItem>
                    <SelectItem value="15:00">03:00 PM</SelectItem>
                    <SelectItem value="15:30">03:30 PM</SelectItem>
                    <SelectItem value="16:00">04:00 PM</SelectItem>
                    <SelectItem value="16:30">04:30 PM</SelectItem>
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
                    <SelectItem value="urgente">Urgente</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Asignar automáticamente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laboratorio-clinico">Laboratorio Clínico</SelectItem>
                  <SelectItem value="laboratorio-cardiologia">Laboratorio Cardiología</SelectItem>
                  <SelectItem value="sala-rayos-x">Sala de Rayos X</SelectItem>
                  <SelectItem value="sala-ecografia">Sala de Ecografía</SelectItem>
                  <SelectItem value="sala-resonancia">Sala de Resonancia</SelectItem>
                  <SelectItem value="sala-tomografia">Sala de Tomografía</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Preparation Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Instrucciones de Preparación
            </CardTitle>
            <CardDescription>Indicaciones para el paciente antes del examen</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="preparation">Preparación Requerida</Label>
              <Textarea
                id="preparation"
                placeholder="Ej: Ayuno de 12 horas, no tomar medicamentos, etc..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contraindications">Contraindicaciones</Label>
              <Textarea
                id="contraindications"
                placeholder="Condiciones que impiden realizar el examen..."
                className="min-h-[60px]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">Duración Estimada</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutos</SelectItem>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">1 hora</SelectItem>
                    <SelectItem value="90">1.5 horas</SelectItem>
                    <SelectItem value="120">2 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Costo Estimado</Label>
                <Input id="cost" type="number" placeholder="0.00" step="0.01" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle>Información Adicional</CardTitle>
            <CardDescription>Notas y observaciones adicionales</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clinicalHistory">Antecedentes Clínicos Relevantes</Label>
              <Textarea
                id="clinicalHistory"
                placeholder="Historial médico relevante para el examen..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Instrucciones Especiales</Label>
              <Textarea
                id="specialInstructions"
                placeholder="Instrucciones especiales para el técnico o laboratorista..."
                className="min-h-[60px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgentContact">Contacto en Caso de Urgencia</Label>
              <Input id="urgentContact" placeholder="Teléfono de contacto para resultados urgentes" />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link href="/dashboard/examenes">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit" disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? "Programando..." : "Programar Examen"}
          </Button>
        </div>
      </form>
    </div>
  )
}
