"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Save,
  User,
  FileText,
  Lock,
  Upload,
  CheckCircle2,
  Mail,
} from "lucide-react"
import { invitePatientUser, createAppUser, createPatient, getMunicipalities } from "@/backend-api/apiService"
import { supabase } from "@/lib/supabaseClient"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function sanitizeString(str: string | undefined): string {
  // Permite letras, números, espacios y algunos signos de puntuación básicos
  return (str ?? "")
    .replace(/[<>"'/;`%]/g, "") // Elimina caracteres peligrosos
    .replace(/\s{2,}/g, " ")    // Reduce múltiples espacios a uno solo
    .trim();
}

function sanitizeFreeText(str: string | undefined): string {
  // Permite espacios y saltos de línea, elimina solo los caracteres peligrosos
  return (str ?? "")
    .replace(/[<>"'/;`%]/g, "")
    .replace(/\r/g, "") // Elimina retornos de carro innecesarios
    .replace(/\n{3,}/g, "\n\n") // Máximo dos saltos de línea seguidos
    .trim();
}

function validateEmail(email: string): boolean {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateDate(date?: string): boolean {
  if (!date) return false;
  return !isNaN(Date.parse(date)) && Date.parse(date) < Date.now();
}

type Municipality = {
  id: number
  name: string
  departmentId: number
  departmentName: string
}

type PatientForm = {
  email: string
  firstName: string
  secondName?: string
  firstSurname: string
  secondSurname?: string
  dateOfBirth?: string
  nationalId?: string
  inss?: string
  phone?: string
  occupation?: string
  address: string
  municipalityId?: number
  medicalNotes?: string
  avatar?: string
}

export default function NuevoPacientePage() {
  const router = useRouter()
  const [formData, setFormData] = useState<PatientForm>({
    email: "",
    firstName: "",
    secondName: "",
    firstSurname: "",
    secondSurname: "",
    dateOfBirth: "",
    nationalId: "",
    inss: "",
    phone: "",
    occupation: "",
    address: "",
    municipalityId: undefined,
    medicalNotes: "",
    avatar: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const [generatedPassword, setGeneratedPassword] = useState<string>("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [patientEmail, setPatientEmail] = useState("")
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])
  const [formErrors, setFormErrors] = useState<{ [k: string]: string }>({})

  // 🔹 Generar contraseña aleatoria una sola vez
  useEffect(() => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    const password = Array.from({ length: 12 })
      .map(() => charset.charAt(Math.floor(Math.random() * charset.length)))
      .join("")
    setGeneratedPassword(password)
  }, [])

  // 🔹 Cargar municipios desde la base de datos
  useEffect(() => {
    const loadMunicipalities = async () => {
      try {
        const data = await getMunicipalities()
        setMunicipalities(data)
      } catch (error) {
        console.error("Error al cargar municipios:", error)
      }
    }
    loadMunicipalities()
  }, [])

  const validateForm = (data: PatientForm): { [k: string]: string } => {
    const errors: { [k: string]: string } = {};
    if (!validateEmail(data.email)) errors.email = "Correo electrónico inválido";
    if (!data.firstName || sanitizeString(data.firstName).length < 2) errors.firstName = "Primer nombre requerido y mínimo 2 caracteres";
    if (!data.firstSurname || sanitizeString(data.firstSurname).length < 2) errors.firstSurname = "Primer apellido requerido y mínimo 2 caracteres";
    if (!validateDate(data.dateOfBirth)) errors.dateOfBirth = "Fecha de nacimiento inválida";
    if (!data.nationalId || sanitizeString(data.nationalId).length < 5) errors.nationalId = "Cédula requerida y mínimo 5 caracteres";
    if (!data.inss || !/^\d{5,}$/.test(sanitizeString(data.inss))) errors.inss = "INSS requerido y mínimo 5 dígitos";
    if (!data.phone || !/^[\d\s\-\+]{8,}$/.test(sanitizeString(data.phone))) errors.phone = "Teléfono requerido y mínimo 8 caracteres";
    if (!data.address || sanitizeFreeText(data.address).length < 5) errors.address = "Dirección requerida y mínimo 5 caracteres";
    if (!data.municipalityId) errors.municipalityId = "Debe seleccionar un municipio";
    return errors;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    // Permitir espacios y saltos de línea para dirección y notas médicas
    if (id === "address" || id === "medicalNotes") {
      setFormData((prev) => ({ ...prev, [id]: sanitizeFreeText(value) }))
    } else {
      setFormData((prev) => ({ ...prev, [id]: sanitizeString(value) }))
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setAvatarPreview(result)
        setFormData((prev) => ({ ...prev, avatar: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validación de inputs
    const errors = validateForm(formData)
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) {
      setIsLoading(false)
      return
    }

    try {
      const {
        email,
        firstName,
        secondName,
        firstSurname,
        secondSurname,
        dateOfBirth,
        nationalId,
        inss,
        phone,
        occupation,
        address,
        municipalityId,
        medicalNotes,
      } = formData

      setPatientEmail(email)

      // 1. Crear usuario con contraseña temporal
      const { user } = await invitePatientUser(email, generatedPassword)
      if (!user) throw new Error("No se pudo crear el usuario de autenticación")

      // 2. Enviar correo de recuperación para que el usuario defina su contraseña
      const redirectTo = "http://localhost:3000/auth/reset-password"
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
      if (resetError) throw resetError

      // 3. Crear registro en AppUser
      await createAppUser({
        id: user.id,
        firstName: sanitizeString(firstName),
        secondName: sanitizeString(secondName),
        firstSurname: sanitizeString(firstSurname),
        secondSurname: sanitizeString(secondSurname),
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        avatar: avatarPreview || undefined,
      })

      // 4. Crear registro en Patient
      await createPatient({
        appUserId: user.id,
        nationalId: sanitizeString(nationalId || ""),
        inss: inss ? Number(sanitizeString(inss)) : 0,
        phone: sanitizeString(phone || ""),
        occupation: sanitizeString(occupation || ""),
        address: sanitizeFreeText(address || ""),
        municipalityId: Number(municipalityId), // <-- aseguras que siempre sea number
        medicalNotes: sanitizeFreeText(medicalNotes || ""),
      })

      setShowSuccessModal(true)
    } catch (error: any) {
      console.error("Error al registrar paciente:", error)
      alert(`Error: ${error.message || "Ocurrió un error inesperado"}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
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
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Nuevo Paciente</h1>
          <p className="text-muted-foreground">Registra un nuevo paciente en el sistema hospitalario.</p>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección: Autenticación */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Autenticación
            </CardTitle>
            <CardDescription>Credenciales de acceso al sistema</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
              {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña (Generada Automáticamente)</Label>
              <Input id="password" type="text" value={generatedPassword} readOnly className="font-mono bg-muted" />
            </div>
          </CardContent>
        </Card>

        {/* Sección: Usuario */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Información de Usuario
            </CardTitle>
            <CardDescription>Datos personales del usuario</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarPreview || "/placeholder.svg"} alt="Avatar del paciente" />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar</Label>
                <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Primer Nombre *</Label>
                <Input id="firstName" value={formData.firstName} onChange={handleChange} required />
                {formErrors.firstName && <p className="text-xs text-red-500">{formErrors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondName">Segundo Nombre</Label>
                <Input id="secondName" value={formData.secondName} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="firstSurname">Primer Apellido *</Label>
                <Input id="firstSurname" value={formData.firstSurname} onChange={handleChange} required />
                {formErrors.firstSurname && <p className="text-xs text-red-500">{formErrors.firstSurname}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondSurname">Segundo Apellido</Label>
                <Input id="secondSurname" value={formData.secondSurname} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Fecha de Nacimiento *</Label>
                <Input id="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
                {formErrors.dateOfBirth && <p className="text-xs text-red-500">{formErrors.dateOfBirth}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Paciente */}
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
                <Label htmlFor="nationalId">No. de Cédula *</Label>
                <Input id="nationalId" value={formData.nationalId} onChange={handleChange} required />
                {formErrors.nationalId && <p className="text-xs text-red-500">{formErrors.nationalId}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="inss">INSS *</Label>
                <Input id="inss" value={formData.inss} onChange={handleChange} required />
                {formErrors.inss && <p className="text-xs text-red-500">{formErrors.inss}</p>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input id="phone" value={formData.phone} onChange={handleChange} required />
                {formErrors.phone && <p className="text-xs text-red-500">{formErrors.phone}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Ocupación</Label>
                <Input id="occupation" value={formData.occupation} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Dirección *</Label>
              <Textarea id="address" value={formData.address} onChange={handleChange} required />
              {formErrors.address && <p className="text-xs text-red-500">{formErrors.address}</p>}
            </div>

            {/* 🔹 Municipio Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="municipalityId">Municipio *</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, municipalityId: Number(value) }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un municipio" />
                </SelectTrigger>
                <SelectContent>
                  {municipalities.map((m) => (
                    <SelectItem key={m.id} value={String(m.id)}>
                      {m.name} ({m.departmentName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formErrors.municipalityId && <p className="text-xs text-red-500">{formErrors.municipalityId}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalNotes">Notas Médicas</Label>
              <Textarea id="medicalNotes" value={formData.medicalNotes} onChange={handleChange} />
            </div>
          </CardContent>
        </Card>

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <Link href="/dashboard/pacientes">
            <Button variant="outline">Cancelar</Button>
          </Link>
          <Button type="submit" disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? "Guardando..." : "Guardar Paciente"}
          </Button>
        </div>
      </form>

      {/* Modal de éxito */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">
              Paciente Guardado Exitosamente
            </DialogTitle>
              <DialogDescription className="text-center space-y-2 pt-4">
                El paciente ha sido registrado correctamente.
              </DialogDescription>

              <div className="flex justify-center gap-2 text-muted-foreground mt-2">
                <Mail className="h-5 w-5" />
                Se envió un correo de activación y recuperación de contraseña a{" "}
                <span className="font-semibold text-foreground">{patientEmail}</span>.
              </div>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={handleCloseModal}>Entendido</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}