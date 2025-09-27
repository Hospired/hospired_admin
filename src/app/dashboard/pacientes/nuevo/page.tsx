"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, User, Phone, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NuevoPacientePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    router.push("/dashboard/pacientes")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pacientes">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Nuevo Paciente</h1>
          <p className="text-muted-foreground text-pretty">Registra un nuevo paciente en el sistema hospitalario.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Información Personal
            </CardTitle>
            <CardDescription>Datos básicos del paciente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombres *</Label>
                <Input id="firstName" placeholder="Nombres del paciente" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellidos *</Label>
                <Input id="lastName" placeholder="Apellidos del paciente" required />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
                <Input id="birthDate" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Género *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="femenino">Femenino</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="civilStatus">Estado Civil</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado civil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="soltero">Soltero/a</SelectItem>
                    <SelectItem value="casado">Casado/a</SelectItem>
                    <SelectItem value="divorciado">Divorciado/a</SelectItem>
                    <SelectItem value="viudo">Viudo/a</SelectItem>
                    <SelectItem value="union-libre">Unión Libre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="identification">Cédula de Identidad *</Label>
              <Input id="identification" placeholder="000-000000-0000X" required />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Información de Contacto
            </CardTitle>
            <CardDescription>Datos de contacto y ubicación</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono Principal *</Label>
                <Input id="phone" placeholder="+505 0000-0000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alternatePhone">Teléfono Alternativo</Label>
                <Input id="alternatePhone" placeholder="+505 0000-0000" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="paciente@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección Completa *</Label>
              <Textarea
                id="address"
                placeholder="Dirección completa del paciente..."
                className="min-h-[80px]"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">Ciudad</Label>
                <Input id="city" placeholder="Ciudad" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="managua">Managua</SelectItem>
                    <SelectItem value="leon">León</SelectItem>
                    <SelectItem value="granada">Granada</SelectItem>
                    <SelectItem value="masaya">Masaya</SelectItem>
                    <SelectItem value="chinandega">Chinandega</SelectItem>
                    <SelectItem value="esteli">Estelí</SelectItem>
                    <SelectItem value="matagalpa">Matagalpa</SelectItem>
                    <SelectItem value="jinotega">Jinotega</SelectItem>
                    <SelectItem value="nueva-segovia">Nueva Segovia</SelectItem>
                    <SelectItem value="madriz">Madriz</SelectItem>
                    <SelectItem value="boaco">Boaco</SelectItem>
                    <SelectItem value="chontales">Chontales</SelectItem>
                    <SelectItem value="rio-san-juan">Río San Juan</SelectItem>
                    <SelectItem value="raan">RAAN</SelectItem>
                    <SelectItem value="raas">RAAS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              Contacto de Emergencia
            </CardTitle>
            <CardDescription>Persona a contactar en caso de emergencia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="emergencyName">Nombre Completo *</Label>
                <Input id="emergencyName" placeholder="Nombre del contacto de emergencia" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyRelation">Parentesco *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar parentesco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="padre">Padre</SelectItem>
                    <SelectItem value="madre">Madre</SelectItem>
                    <SelectItem value="esposo">Esposo/a</SelectItem>
                    <SelectItem value="hijo">Hijo/a</SelectItem>
                    <SelectItem value="hermano">Hermano/a</SelectItem>
                    <SelectItem value="abuelo">Abuelo/a</SelectItem>
                    <SelectItem value="tio">Tío/a</SelectItem>
                    <SelectItem value="primo">Primo/a</SelectItem>
                    <SelectItem value="amigo">Amigo/a</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Teléfono *</Label>
                <Input id="emergencyPhone" placeholder="+505 0000-0000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyEmail">Correo Electrónico</Label>
                <Input id="emergencyEmail" type="email" placeholder="contacto@email.com" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Información Médica Inicial
            </CardTitle>
            <CardDescription>Datos médicos básicos del paciente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="bloodType">Tipo de Sangre</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de sangre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a+">A+</SelectItem>
                    <SelectItem value="a-">A-</SelectItem>
                    <SelectItem value="b+">B+</SelectItem>
                    <SelectItem value="b-">B-</SelectItem>
                    <SelectItem value="ab+">AB+</SelectItem>
                    <SelectItem value="ab-">AB-</SelectItem>
                    <SelectItem value="o+">O+</SelectItem>
                    <SelectItem value="o-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input id="weight" type="number" placeholder="70" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm)</Label>
                <Input id="height" type="number" placeholder="170" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Alergias Conocidas</Label>
              <Textarea id="allergies" placeholder="Describe cualquier alergia conocida..." className="min-h-[80px]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Medicamentos Actuales</Label>
              <Textarea
                id="medications"
                placeholder="Lista de medicamentos que toma actualmente..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Antecedentes Médicos</Label>
              <Textarea
                id="medicalHistory"
                placeholder="Historial médico relevante, cirugías previas, enfermedades crónicas..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link href="/dashboard/pacientes">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit" disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? "Guardando..." : "Guardar Paciente"}
          </Button>
        </div>
      </form>
    </div>
  )
}
