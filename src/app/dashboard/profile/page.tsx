"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  User,
  Mail,
  Phone,
  Calendar,
  Award as IdCard,
  Briefcase,
  Shield,
  Camera,
  Save,
  Lock,
  Edit,
  CheckCircle2,
  FileText,
  X,
} from "lucide-react"

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [userData, setUserData] = useState({
    primerNombre: "Jonathan",
    segundoNombre: "Alberto",
    primerApellido: "Martinez",
    segundoApellido: "Lopez",
    email: "jonathan.martinez@hospital.com",
    telefono: "+505 8888-8888",
    cedula: "001-120589-0001K",
    fechaNacimiento: "1989-05-12",
    especialidad: "Cardiología",
    descripcion:
      "Especialista en cardiología intervencionista con 10 años de experiencia. Certificado en procedimientos de cateterismo cardíaco.",
    numeroLicencia: "MED-2015-00234",
    roles: {
      doctor: true,
      enfermero: false,
      admin: true,
    },
  })

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    setShowPasswordModal(true)
  }

  const getRoles = () => {
    const roles = []
    if (userData.roles.doctor) roles.push("Doctor")
    if (userData.roles.enfermero) roles.push("Enfermero")
    if (userData.roles.admin) roles.push("Administrador")
    return roles
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4 md:p-8">
      <div className="container max-w-6xl mx-auto">
        <Card className="border-2 shadow-2xl overflow-hidden">
          {/* Imagen de portada */}
          <div className="relative h-32 md:h-40 overflow-hidden">
            <img src="/medical-professional-office-background.jpg" alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
          </div>

          <CardContent className="pt-0 -mt-16 relative">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              {/* Avatar */}
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-background shadow-xl ring-2 ring-primary/10">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile" />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    {userData.primerNombre[0]}
                    {userData.primerApellido[0]}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* Información principal */}
              <div className="flex-1 space-y-3 pb-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">
                    {userData.primerNombre} {userData.segundoNombre} {userData.primerApellido}{" "}
                    {userData.segundoApellido}
                  </h1>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Briefcase className="h-4 w-4" />
                    {userData.especialidad}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {getRoles().map((role) => (
                    <Badge key={role} variant="secondary" className="px-3 py-1">
                      <Shield className="h-3 w-3 mr-1" />
                      {role}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="px-3 py-1 border-green-500 text-green-500">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Activo
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {userData.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {userData.telefono}
                  </div>
                  <div className="flex items-center gap-2">
                    <IdCard className="h-4 w-4" />
                    {userData.cedula}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 self-start md:self-end pb-4">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs con información detallada */}
        <Tabs defaultValue="personal" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="personal">Información Personal</TabsTrigger>
            <TabsTrigger value="profesional">Información Profesional</TabsTrigger>
            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          </TabsList>

          {/* Información Personal */}
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Datos Personales
                </CardTitle>
                <CardDescription>
                  Información básica y de contacto. Los campos sensibles como cédula y fecha de nacimiento no son
                  editables.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primerNombre">Primer Nombre</Label>
                    <Input id="primerNombre" value={userData.primerNombre} disabled className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="segundoNombre">Segundo Nombre</Label>
                    <Input id="segundoNombre" value={userData.segundoNombre} disabled className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primerApellido">Primer Apellido</Label>
                    <Input id="primerApellido" value={userData.primerApellido} disabled className="bg-muted/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="segundoApellido">Segundo Apellido</Label>
                    <Input id="segundoApellido" value={userData.segundoApellido} disabled className="bg-muted/50" />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cedula">Número de Cédula</Label>
                    <div className="relative">
                      <IdCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="cedula" value={userData.cedula} disabled className="pl-10 bg-muted/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fechaNacimiento"
                        type="date"
                        value={userData.fechaNacimiento}
                        disabled
                        className="pl-10 bg-muted/50"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" value={userData.email} disabled className="pl-10 bg-muted/50" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      El correo electrónico no puede ser modificado por seguridad
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="telefono"
                        value={userData.telefono}
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? "bg-muted/50" : ""}`}
                        onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Información Profesional */}
          <TabsContent value="profesional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Información Profesional
                </CardTitle>
                <CardDescription>
                  Especialidad, licencia y descripción profesional. Puedes editar estos campos cuando actives el modo de
                  edición.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Roles en el Sistema</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="doctor"
                        checked={userData.roles.doctor}
                        disabled
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="doctor" className="font-normal">
                        Doctor
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="enfermero"
                        checked={userData.roles.enfermero}
                        disabled
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="enfermero" className="font-normal">
                        Enfermero
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="admin"
                        checked={userData.roles.admin}
                        disabled
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="admin" className="font-normal">
                        Administrador
                      </Label>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Los roles son asignados por el administrador del sistema
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="especialidad">Especialidad</Label>
                    <Input
                      id="especialidad"
                      value={userData.especialidad}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted/50" : ""}
                      onChange={(e) => setUserData({ ...userData, especialidad: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numeroLicencia">Número de Licencia</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="numeroLicencia"
                        value={userData.numeroLicencia}
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? "bg-muted/50" : ""}`}
                        onChange={(e) => setUserData({ ...userData, numeroLicencia: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción Profesional</Label>
                  <Textarea
                    id="descripcion"
                    value={userData.descripcion}
                    disabled={!isEditing}
                    rows={6}
                    className={`resize-none ${!isEditing ? "bg-muted/50" : ""}`}
                    onChange={(e) => setUserData({ ...userData, descripcion: e.target.value })}
                    placeholder="Información adicional sobre experiencia, certificaciones, áreas de interés..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Describe tu experiencia profesional, certificaciones y áreas de especialización
                  </p>
                </div>

                {isEditing && (
                  <Button onClick={handleSave} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Seguridad */}
          <TabsContent value="seguridad" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Seguridad de la Cuenta
                </CardTitle>
                <CardDescription>Gestiona la seguridad de tu cuenta y contraseña</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4 p-4 border rounded-lg bg-muted/50">
                  <div className="p-2 rounded-full bg-blue-500/10">
                    <Lock className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium">Contraseña</h3>
                    <p className="text-sm text-muted-foreground">
                      Mantén tu cuenta segura actualizando tu contraseña regularmente. Te enviaremos un enlace de
                      restablecimiento a tu correo electrónico.
                    </p>
                  </div>
                </div>

                <Button onClick={handlePasswordChange} className="w-full" size="lg">
                  <Lock className="h-4 w-4 mr-2" />
                  Actualizar Contraseña
                </Button>

                <div className="p-4 border rounded-lg bg-amber-500/5 border-amber-500/20">
                  <div className="flex gap-3">
                    <Shield className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Recomendaciones de Seguridad</p>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Usa una contraseña única que no utilices en otros sitios</li>
                        <li>Incluye al menos 8 caracteres con mayúsculas, minúsculas y números</li>
                        <li>Cambia tu contraseña cada 3-6 meses</li>
                        <li>No compartas tu contraseña con nadie</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal for password reset confirmation */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Mail className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">Correo Enviado</DialogTitle>
            <DialogDescription className="text-center space-y-2 pt-2">
              <p>Se ha enviado un enlace de restablecimiento de contraseña a:</p>
              <p className="font-medium text-foreground">{userData.email}</p>
              <p className="text-sm pt-2">
                Por favor revisa tu bandeja de entrada y sigue las instrucciones para actualizar tu contraseña.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center pt-4">
            <Button onClick={() => setShowPasswordModal(false)} className="w-full">
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
