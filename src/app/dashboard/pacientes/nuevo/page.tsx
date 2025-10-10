"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Save, User, FileText, Lock, Upload, CheckCircle2, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NuevoPacientePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const [generatedPassword, setGeneratedPassword] = useState<string>("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [patientEmail, setPatientEmail] = useState("")

  useEffect(() => {
    const generatePassword = () => {
      const length = 12
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
      let password = ""
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length))
      }
      return password
    }
    setGeneratedPassword(generatePassword())
  }, [])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    setPatientEmail(email)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setShowSuccessModal(true)
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
    router.push("/dashboard/pacientes")
  }

  return (
    <div className="space-y-6">
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Autenticación
            </CardTitle>
            <CardDescription>Credenciales de acceso al sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico *</Label>
                <Input id="email" name="email" type="email" placeholder="paciente@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña (Generada Automáticamente) *</Label>
                <Input id="password" type="text" value={generatedPassword} readOnly className="font-mono bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Información de Usuario
            </CardTitle>
            <CardDescription>Datos personales del usuario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarPreview || "/placeholder.svg"} alt="Avatar del paciente" />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="cursor-pointer"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => document.getElementById("avatar")?.click()}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Primer Nombre *</Label>
                <Input id="firstName" placeholder="Primer nombre" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondName">Segundo Nombre</Label>
                <Input id="secondName" placeholder="Segundo nombre" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstSurname">Primer Apellido *</Label>
                <Input id="firstSurname" placeholder="Primer apellido" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondSurname">Segundo Apellido</Label>
                <Input id="secondSurname" placeholder="Segundo apellido" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
              <Input id="birthDate" type="date"/>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Información del Paciente
            </CardTitle>
            <CardDescription>Datos específicos del paciente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nationality">No de Cedula</Label>
                <Input id="national.id" placeholder="Número de Cedula" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inss">INSS *</Label>
                <Input id="inss" placeholder="Número de INSS"/>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Número Telefónico *</Label>
                <Input id="phone" placeholder="+505 0000-0000"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Ocupación</Label>
                <Input id="occupation" placeholder="Ocupación del paciente" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <Textarea
                id="address"
                placeholder="Dirección completa del paciente..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Municipio, Departamento *</Label>
              <Input id="location" placeholder="Ej: Managua, Managua" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalNotes">Notas Médicas</Label>
              <Textarea
                id="medicalNotes"
                placeholder="Notas médicas relevantes del paciente..."
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

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

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Paciente Guardado Exitosamente</DialogTitle>
            <DialogDescription className="text-center space-y-4 pt-4">
              <p className="text-base">El paciente ha sido registrado correctamente en el sistema.</p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5" />
                <p className="text-sm">
                  Se ha enviado un correo electrónico a{" "}
                  <span className="font-semibold text-foreground">{patientEmail}</span> para que el paciente pueda
                  cambiar su contraseña desde la aplicación móvil.
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={handleCloseModal} className="w-full sm:w-auto">
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
