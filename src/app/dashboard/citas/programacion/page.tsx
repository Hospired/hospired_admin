"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Calendar, Clock, User, Stethoscope } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProgramacionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    router.push("/dashboard/citas")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/citas">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Programar Nueva Cita</h1>
          <p className="text-muted-foreground text-pretty">Agenda una nueva cita médica en el sistema.</p>
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
            <CardDescription>Busca y selecciona el paciente para la cita</CardDescription>
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>¿Paciente nuevo?</span>
              <Link href="/dashboard/pacientes/nuevo" className="text-primary hover:underline">
                Registrar nuevo paciente
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Doctor and Specialty */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              Médico y Especialidad
            </CardTitle>
            <CardDescription>Selecciona el médico y tipo de consulta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="specialty">Especialidad *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medicina-general">Medicina General</SelectItem>
                    <SelectItem value="cardiologia">Cardiología</SelectItem>
                    <SelectItem value="pediatria">Pediatría</SelectItem>
                    <SelectItem value="ginecologia">Ginecología</SelectItem>
                    <SelectItem value="traumatologia">Traumatología</SelectItem>
                    <SelectItem value="neurologia">Neurología</SelectItem>
                    <SelectItem value="dermatologia">Dermatología</SelectItem>
                    <SelectItem value="oftalmologia">Oftalmología</SelectItem>
                    <SelectItem value="otorrinolaringologia">Otorrinolaringología</SelectItem>
                    <SelectItem value="psiquiatria">Psiquiatría</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Médico *</Label>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointmentType">Tipo de Cita *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de consulta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consulta-general">Consulta General</SelectItem>
                  <SelectItem value="control">Control</SelectItem>
                  <SelectItem value="consulta-especializada">Consulta Especializada</SelectItem>
                  <SelectItem value="control-prenatal">Control Prenatal</SelectItem>
                  <SelectItem value="cirugia-menor">Cirugía Menor</SelectItem>
                  <SelectItem value="procedimiento">Procedimiento</SelectItem>
                  <SelectItem value="emergencia">Emergencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Date and Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Fecha y Hora
            </CardTitle>
            <CardDescription>Programa la fecha y hora de la cita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="date">Fecha *</Label>
                <Input id="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Hora *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar hora" />
                  </SelectTrigger>
                  <SelectContent>
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
                <Label htmlFor="duration">Duración</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="30 min" />
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">Consultorio</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Asignar automáticamente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultorio-1">Consultorio 1</SelectItem>
                  <SelectItem value="consultorio-2">Consultorio 2</SelectItem>
                  <SelectItem value="consultorio-3">Consultorio 3</SelectItem>
                  <SelectItem value="consultorio-4">Consultorio 4</SelectItem>
                  <SelectItem value="sala-procedimientos">Sala de Procedimientos</SelectItem>
                  <SelectItem value="emergencias">Emergencias</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Información Adicional
            </CardTitle>
            <CardDescription>Detalles adicionales sobre la cita</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo de la Consulta</Label>
              <Textarea id="reason" placeholder="Describe el motivo de la consulta..." className="min-h-[80px]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas Internas</Label>
              <Textarea
                id="notes"
                placeholder="Notas adicionales para el personal médico..."
                className="min-h-[60px]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="priority">Prioridad</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Normal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baja">Baja</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="urgente">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado Inicial</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pendiente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="confirmada">Confirmada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link href="/dashboard/citas">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit" disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? "Programando..." : "Programar Cita"}
          </Button>
        </div>
      </form>
    </div>
  )
}
