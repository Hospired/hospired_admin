"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { CalendarIcon, UserIcon, ShieldCheckIcon, StethoscopeIcon, ImageIcon, Upload } from "lucide-react"

export default function AdminUserStatic() {
  const [firstName, setFirstName] = useState("")
  const [secondName, setSecondName] = useState("")
  const [firstLastName, setFirstLastName] = useState("")
  const [secondLastName, setSecondLastName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [isPhysician, setIsPhysician] = useState(false)
  const [isSuperUser, setIsSuperUser] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const [avatarFileName, setAvatarFileName] = useState<string>("")

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFileName(file.name)
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getInitials = () => {
    return `${firstName.charAt(0)}${firstLastName.charAt(0)}`.toUpperCase() || "UN"
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Gestión de Usuario Administrativo</h1>
          <p className="text-muted-foreground">Complete la información del usuario del sistema</p>
        </div>

        {/* Avatar Card */}
        <Card className="border-2 border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Foto de Perfil
            </CardTitle>
            <CardDescription>Imagen del usuario (opcional)</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarImage src={avatarPreview || "/placeholder.svg"} alt="Avatar" />
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="w-full max-w-sm">
              <Label htmlFor="avatar">Seleccionar imagen</Label>
              <div className="mt-1 flex items-center gap-2">
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              {avatarFileName && <p className="text-xs text-muted-foreground mt-1">Archivo seleccionado: {avatarFileName}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Personal Information Card */}
        <Card className="border-2 border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary" />
              Información Personal
            </CardTitle>
            <CardDescription>Datos básicos del usuario</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first_name">Primer Nombre *</Label>
              <Input id="first_name" required placeholder="Juan" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="second_name">Segundo Nombre</Label>
              <Input id="second_name" placeholder="Carlos" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="first_last_name">Primer Apellido *</Label>
              <Input id="first_last_name" required placeholder="Pérez" value={firstLastName} onChange={(e) => setFirstLastName(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="second_last_name">Segundo Apellido</Label>
              <Input id="second_last_name" placeholder="García" value={secondLastName} onChange={(e) => setSecondLastName(e.target.value)} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="date_of_birth">Fecha de Nacimiento</Label>
              <div className="relative">
                <Input
                  id="date_of_birth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roles and Permissions Card */}
        <Card className="border-2 border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-primary" />
              Roles y Permisos
            </CardTitle>
            <CardDescription>Configure los permisos del usuario en el sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${isPhysician ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${isPhysician ? "bg-green-100" : "bg-gray-100"}`}>
                  <StethoscopeIcon className={`h-5 w-5 ${isPhysician ? "text-green-600" : "text-gray-500"}`} />
                </div>
                <div>
                  <Label htmlFor="is_physician" className="text-base font-medium cursor-pointer">Es Médico</Label>
                  <p className="text-sm text-muted-foreground">Usuario con credenciales médicas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${isPhysician ? "text-green-600" : "text-gray-500"}`}>{isPhysician ? "Activo" : "Inactivo"}</span>
                <Switch id="is_physician" checked={isPhysician} onCheckedChange={setIsPhysician} />
              </div>
            </div>

            <div className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${isSuperUser ? "bg-blue-50 border-blue-200" : "bg-gray-50 border-gray-200"}`}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${isSuperUser ? "bg-blue-100" : "bg-gray-100"}`}>
                  <ShieldCheckIcon className={`h-5 w-5 ${isSuperUser ? "text-blue-600" : "text-gray-500"}`} />
                </div>
                <div>
                  <Label htmlFor="is_super_user" className="text-base font-medium cursor-pointer">Super Usuario</Label>
                  <p className="text-sm text-muted-foreground">Acceso completo al sistema</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${isSuperUser ? "text-blue-600" : "text-gray-500"}`}>{isSuperUser ? "Activo" : "Inactivo"}</span>
                <Switch id="is_super_user" checked={isSuperUser} onCheckedChange={setIsSuperUser} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" size="lg">Cancelar</Button>
          <Button type="button" size="lg" className="bg-primary hover:bg-primary/90">Crear Usuario</Button>
        </div>
      </div>
    </div>
  )
}
