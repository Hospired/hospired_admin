"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Settings, MapPin, Stethoscope, MoreHorizontal, Edit, Trash2, Shield, UserCog } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getAllAdminUsers, updateAdminUserRole } from "@/backend-api/apiService"
import { AdminUserRes } from "@/backend-api/dtos"

const servicios = [
    {
        id: 1,
        nombre: "Cardiología",
        descripcion: "Diagnóstico y tratamiento de enfermedades del corazón",
        activo: true,
        medicos: 5,
        consultorios: ["201A", "201B"],
    },
    {
        id: 2,
        nombre: "Pediatría",
        descripcion: "Atención médica especializada para niños y adolescentes",
        activo: true,
        medicos: 8,
        consultorios: ["105A", "105B", "105C"],
    },
    {
        id: 3,
        nombre: "Neurología",
        descripcion: "Tratamiento de trastornos del sistema nervioso",
        activo: true,
        medicos: 3,
        consultorios: ["301A"],
    },
    {
        id: 4,
        nombre: "Dermatología",
        descripcion: "Cuidado de la piel y tratamiento de enfermedades cutáneas",
        activo: false,
        medicos: 2,
        consultorios: ["102A"],
    },
]

const consultorios = [
    {
        id: 1,
        numero: "201A",
        piso: 2,
        servicio: "Cardiología",
        capacidad: 1,
        equipamiento: ["ECG", "Monitor cardíaco", "Desfibrilador"],
        estado: "Disponible",
    },
    {
        id: 2,
        numero: "105B",
        piso: 1,
        servicio: "Pediatría",
        capacidad: 1,
        equipamiento: ["Báscula pediátrica", "Otoscopio", "Estetoscopio"],
        estado: "Ocupado",
    },
    {
        id: 3,
        numero: "301C",
        piso: 3,
        servicio: "Neurología",
        capacidad: 1,
        equipamiento: ["EEG", "Martillo de reflejos", "Oftalmoscopio"],
        estado: "Mantenimiento",
    },
    ]

    export default function ConfiguracionPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [adminUsers, setAdminUsers] = useState<AdminUserRes[]>([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState<string | null>(null)

    useEffect(() => {
        loadAdminUsers()
    }, [])

    const loadAdminUsers = async () => {
        try {
            setLoading(true)
            const users = await getAllAdminUsers()
            setAdminUsers(users)
        } catch (err) {
            console.error("Error loading admin users:", err)
        } finally {
            setLoading(false)
        }
    }

    const handleRoleUpdate = async (userId: string, isSuperUser: boolean, isPhysician: boolean) => {
        try {
            setUpdating(userId)
            await updateAdminUserRole(userId, { isSuperUser, isPhysician })
            await loadAdminUsers()
        } catch (err) {
            console.error("Error updating user role:", err)
            alert("Error al actualizar el rol del usuario")
        } finally {
            setUpdating(null)
        }
    }

    const getStatusColor = (estado: string) => {
        switch (estado) {
        case "Disponible":
            return "bg-green-500/10 text-green-500 border-green-500/20"
        case "Ocupado":
            return "bg-red-500/10 text-red-500 border-red-500/20"
        case "Mantenimiento":
            return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
        default:
            return "bg-gray-500/10 text-gray-500 border-gray-500/20"
        }
    }

    return (
        <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
            <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Configuración del Sistema</h2>
            <p className="text-muted-foreground">Gestión de servicios, consultorios y usuarios del hospital</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
            <Settings className="mr-2 h-4 w-4" />
            Configuración General
            </Button>
        </div>

        <Tabs defaultValue="servicios" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="servicios">Servicios Médicos</TabsTrigger>
            <TabsTrigger value="consultorios">Consultorios</TabsTrigger>
            <TabsTrigger value="usuarios">Usuarios del Sistema</TabsTrigger>
            </TabsList>

            <TabsContent value="servicios" className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Buscar servicios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Servicio
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {servicios.map((servicio) => (
                <Card key={servicio.id} className="border-border/50">
                    <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                        <Stethoscope className="h-5 w-5 text-blue-500" />
                        <div>
                            <CardTitle className="text-foreground">{servicio.nombre}</CardTitle>
                            <CardDescription>{servicio.descripcion}</CardDescription>
                        </div>
                        </div>
                        <div className="flex items-center space-x-2">
                        <Switch checked={servicio.activo} />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Eliminar
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                    </div>
                    </CardHeader>
                    <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Médicos asignados:</span>
                        <Badge variant="outline">{servicio.medicos} médicos</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Consultorios:</span>
                        <div className="flex space-x-1">
                            {servicio.consultorios.map((consultorio) => (
                            <Badge key={consultorio} variant="secondary" className="text-xs">
                                {consultorio}
                            </Badge>
                            ))}
                        </div>
                        </div>
                        <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Estado:</span>
                        <Badge
                            className={
                            servicio.activo
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20"
                            }
                        >
                            {servicio.activo ? "Activo" : "Inactivo"}
                        </Badge>
                        </div>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
            </TabsContent>

            <TabsContent value="consultorios" className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Buscar consultorios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Consultorio
                </Button>
            </div>

            <div className="grid gap-4">
                {consultorios.map((consultorio) => (
                <Card key={consultorio.id} className="border-border/50">
                    <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg">
                            <MapPin className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-semibold text-foreground">Consultorio {consultorio.numero}</h3>
                            <p className="text-sm text-muted-foreground">
                            Piso {consultorio.piso} - {consultorio.servicio}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Capacidad: {consultorio.capacidad} persona</span>
                            <span>Equipamiento: {consultorio.equipamiento.length} elementos</span>
                            </div>
                        </div>
                        </div>
                        <div className="flex items-center space-x-4">
                        <div className="text-right space-y-1">
                            <Badge className={getStatusColor(consultorio.estado)}>{consultorio.estado}</Badge>
                            <p className="text-sm text-muted-foreground">Servicio: {consultorio.servicio}</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem>Editar consultorio</DropdownMenuItem>
                            <DropdownMenuItem>Gestionar equipamiento</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Desactivar</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground">Equipamiento disponible:</h4>
                        <div className="flex flex-wrap gap-2">
                            {consultorio.equipamiento.map((equipo) => (
                            <Badge key={equipo} variant="outline" className="text-xs">
                                {equipo}
                            </Badge>
                            ))}
                        </div>
                        </div>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
            </TabsContent>

            <TabsContent value="usuarios" className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                    placeholder="Buscar usuarios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
                </div>
            </div>

            {loading ? (
                <Card className="border-border/50">
                <CardContent className="p-6">
                    <p className="text-center text-muted-foreground">Cargando usuarios...</p>
                </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                {adminUsers
                    .filter((user) => {
                    if (!searchTerm) return true
                    const fullName = `${user.firstName} ${user.secondName || ""} ${user.firstLastName} ${user.secondLastName || ""}`.toLowerCase()
                    return fullName.includes(searchTerm.toLowerCase())
                    })
                    .map((usuario) => (
                    <Card key={usuario.id} className="border-border/50">
                        <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-lg">
                                {usuario.isSuperUser ? (
                                <Shield className="h-6 w-6 text-blue-500" />
                                ) : usuario.isPhysician ? (
                                <Stethoscope className="h-6 w-6 text-green-500" />
                                ) : (
                                <UserCog className="h-6 w-6 text-gray-500" />
                                )}
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-semibold text-foreground">
                                {usuario.firstName} {usuario.secondName || ""} {usuario.firstLastName} {usuario.secondLastName || ""}
                                </h3>
                                <p className="text-sm text-muted-foreground">ID: {usuario.id.slice(0, 8)}...</p>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span>
                                    Creado: {usuario.createdAt.toLocaleDateString("es-ES")}
                                </span>
                                </div>
                            </div>
                            </div>
                            <div className="flex items-center space-x-4">
                            <div className="text-right space-y-2">
                                <div className="flex items-center gap-2">
                                <Badge
                                    className={
                                    usuario.isSuperUser
                                        ? "bg-red-500/10 text-red-500 border-red-500/20"
                                        : usuario.isPhysician
                                        ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                        : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                                    }
                                >
                                    {usuario.isSuperUser ? "Administrador" : usuario.isPhysician ? "Médico" : "Usuario"}
                                </Badge>
                                </div>
                                <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Label className="text-xs text-muted-foreground">Admin:</Label>
                                    <Switch
                                    checked={usuario.isSuperUser}
                                    disabled={updating === usuario.id}
                                    onCheckedChange={(checked) =>
                                        handleRoleUpdate(usuario.id, checked, usuario.isPhysician)
                                    }
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Label className="text-xs text-muted-foreground">Médico:</Label>
                                    <Switch
                                    checked={usuario.isPhysician}
                                    disabled={updating === usuario.id}
                                    onCheckedChange={(checked) =>
                                        handleRoleUpdate(usuario.id, usuario.isSuperUser, checked)
                                    }
                                    />
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    ))}
                {adminUsers.filter((user) => {
                    if (!searchTerm) return true
                    const fullName = `${user.firstName} ${user.secondName || ""} ${user.firstLastName} ${user.secondLastName || ""}`.toLowerCase()
                    return fullName.includes(searchTerm.toLowerCase())
                }).length === 0 && (
                    <Card className="border-border/50">
                    <CardContent className="p-6">
                        <p className="text-center text-muted-foreground">
                        No se encontraron usuarios
                        </p>
                    </CardContent>
                    </Card>
                )}
                </div>
            )}

            <Card className="border-border/50 mt-6">
                <CardHeader>
                <CardTitle className="text-foreground">Configuración de Seguridad</CardTitle>
                <CardDescription>Configuraciones generales de seguridad del sistema</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                        <Label className="text-foreground">Autenticación de dos factores</Label>
                        <p className="text-sm text-muted-foreground">Requerir 2FA para todos los usuarios</p>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                        <Label className="text-foreground">Sesiones múltiples</Label>
                        <p className="text-sm text-muted-foreground">Permitir múltiples sesiones activas</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                        <Label className="text-foreground">Auditoría de accesos</Label>
                        <p className="text-sm text-muted-foreground">Registrar todos los accesos al sistema</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    </div>
                    <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="session-timeout" className="text-foreground">
                        Tiempo de sesión (minutos)
                        </Label>
                        <Input id="session-timeout" type="number" defaultValue="30" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password-policy" className="text-foreground">
                        Política de contraseñas
                        </Label>
                        <Select defaultValue="medium">
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Básica (6 caracteres)</SelectItem>
                            <SelectItem value="medium">Media (8 caracteres, números)</SelectItem>
                            <SelectItem value="high">Alta (12 caracteres, símbolos)</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="backup-frequency" className="text-foreground">
                        Frecuencia de respaldo
                        </Label>
                        <Select defaultValue="daily">
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hourly">Cada hora</SelectItem>
                            <SelectItem value="daily">Diario</SelectItem>
                            <SelectItem value="weekly">Semanal</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>
                    </div>
                </div>
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
        </div>
    )
}
