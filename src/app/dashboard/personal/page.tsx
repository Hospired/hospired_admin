"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Filter, MoreHorizontal, Phone, Mail, MapPin } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const medicos = [
    {
        id: 1,
        nombre: "Dr. Carlos Mendoza",
        especialidad: "Cardiología",
        telefono: "+1 234-567-8901",
        email: "carlos.mendoza@hospital.com",
        estado: "Activo",
        turno: "Mañana",
        experiencia: "15 años",
        consultorio: "201A",
    },
    {
        id: 2,
        nombre: "Dra. Ana García",
        especialidad: "Pediatría",
        telefono: "+1 234-567-8902",
        email: "ana.garcia@hospital.com",
        estado: "Activo",
        turno: "Tarde",
        experiencia: "12 años",
        consultorio: "105B",
    },
    {
        id: 3,
        nombre: "Dr. Miguel Torres",
        especialidad: "Neurología",
        telefono: "+1 234-567-8903",
        email: "miguel.torres@hospital.com",
        estado: "En consulta",
        turno: "Mañana",
        experiencia: "20 años",
        consultorio: "301C",
    },
    ]

    const enfermeras = [
    {
        id: 1,
        nombre: "Enf. María López",
        area: "UCI",
        telefono: "+1 234-567-8904",
        email: "maria.lopez@hospital.com",
        estado: "Activo",
        turno: "Noche",
        experiencia: "8 años",
    },
    {
        id: 2,
        nombre: "Enf. Carmen Ruiz",
        area: "Emergencias",
        telefono: "+1 234-567-8905",
        email: "carmen.ruiz@hospital.com",
        estado: "Activo",
        turno: "Mañana",
        experiencia: "10 años",
    },
    {
        id: 3,
        nombre: "Enf. José Martín",
        area: "Pediatría",
        telefono: "+1 234-567-8906",
        email: "jose.martin@hospital.com",
        estado: "Descanso",
        turno: "Tarde",
        experiencia: "6 años",
    },
    ]

    export default function PersonalPage() {
    const [searchTerm, setSearchTerm] = useState("")

    const getStatusColor = (estado: string) => {
        switch (estado) {
        case "Activo":
            return "bg-green-500/10 text-green-500 border-green-500/20"
        case "En consulta":
            return "bg-blue-500/10 text-blue-500 border-blue-500/20"
        case "Descanso":
            return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
        default:
            return "bg-gray-500/10 text-gray-500 border-gray-500/20"
        }
    }

    return (
        <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
            <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Personal Médico</h2>
            <p className="text-muted-foreground">Gestión del personal médico y administrativo</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Personal
            </Button>
        </div>

        <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
                placeholder="Buscar personal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
            />
            </div>
            <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
            </Button>
        </div>

        <Tabs defaultValue="medicos" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="medicos">Médicos</TabsTrigger>
            <TabsTrigger value="enfermeras">Enfermeras</TabsTrigger>
            <TabsTrigger value="roles">Roles y Permisos</TabsTrigger>
            </TabsList>

            <TabsContent value="medicos" className="space-y-4">
            <div className="grid gap-4">
                {medicos.map((medico) => (
                <Card key={medico.id} className="border-border/50">
                    <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage
                            src={`/placeholder-icon.png?height=48&width=48&text=${medico.nombre.split(" ")[0]}`}
                            />
                            <AvatarFallback>
                            {medico.nombre
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h3 className="font-semibold text-foreground">{medico.nombre}</h3>
                            <p className="text-sm text-muted-foreground">{medico.especialidad}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <Phone className="mr-1 h-3 w-3" />
                                {medico.telefono}
                            </div>
                            <div className="flex items-center">
                                <Mail className="mr-1 h-3 w-3" />
                                {medico.email}
                            </div>
                            <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                Consultorio {medico.consultorio}
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="flex items-center space-x-4">
                        <div className="text-right space-y-1">
                            <Badge className={getStatusColor(medico.estado)}>{medico.estado}</Badge>
                            <p className="text-sm text-muted-foreground">Turno: {medico.turno}</p>
                            <p className="text-sm text-muted-foreground">{medico.experiencia} de experiencia</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                            <DropdownMenuItem>Editar información</DropdownMenuItem>
                            <DropdownMenuItem>Ver horarios</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Desactivar</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
            </TabsContent>

            <TabsContent value="enfermeras" className="space-y-4">
            <div className="grid gap-4">
                {enfermeras.map((enfermera) => (
                <Card key={enfermera.id} className="border-border/50">
                    <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage
                            src={`/placeholder-icon.png?height=48&width=48&text=${enfermera.nombre.split(" ")[1]}`}
                            />
                            <AvatarFallback>
                            {enfermera.nombre.split(" ")[1][0]}
                            {enfermera.nombre.split(" ")[2][0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                            <h3 className="font-semibold text-foreground">{enfermera.nombre}</h3>
                            <p className="text-sm text-muted-foreground">Área: {enfermera.area}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <Phone className="mr-1 h-3 w-3" />
                                {enfermera.telefono}
                            </div>
                            <div className="flex items-center">
                                <Mail className="mr-1 h-3 w-3" />
                                {enfermera.email}
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="flex items-center space-x-4">
                        <div className="text-right space-y-1">
                            <Badge className={getStatusColor(enfermera.estado)}>{enfermera.estado}</Badge>
                            <p className="text-sm text-muted-foreground">Turno: {enfermera.turno}</p>
                            <p className="text-sm text-muted-foreground">{enfermera.experiencia} de experiencia</p>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                            <DropdownMenuItem>Editar información</DropdownMenuItem>
                            <DropdownMenuItem>Ver horarios</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Desactivar</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
            </TabsContent>

            <TabsContent value="roles" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-border/50">
                <CardHeader>
                    <CardTitle className="text-foreground">Roles del Sistema</CardTitle>
                    <CardDescription>Gestión de roles y permisos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                        <div>
                        <h4 className="font-medium text-foreground">Administrador</h4>
                        <p className="text-sm text-muted-foreground">Acceso completo al sistema</p>
                        </div>
                        <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Admin</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                        <div>
                        <h4 className="font-medium text-foreground">Médico</h4>
                        <p className="text-sm text-muted-foreground">Gestión de pacientes y consultas</p>
                        </div>
                        <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Médico</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                        <div>
                        <h4 className="font-medium text-foreground">Enfermera</h4>
                        <p className="text-sm text-muted-foreground">Asistencia médica y cuidados</p>
                        </div>
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Enfermera</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                        <div>
                        <h4 className="font-medium text-foreground">Recepcionista</h4>
                        <p className="text-sm text-muted-foreground">Gestión de citas y admisiones</p>
                        </div>
                        <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Recepción</Badge>
                    </div>
                    </div>
                </CardContent>
                </Card>

                <Card className="border-border/50">
                <CardHeader>
                    <CardTitle className="text-foreground">Permisos por Módulo</CardTitle>
                    <CardDescription>Control de acceso detallado</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                    <div className="p-3 border border-border/50 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Gestión de Pacientes</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Crear</span>
                            <Badge variant="outline" className="text-xs">
                            Admin, Médico
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Editar</span>
                            <Badge variant="outline" className="text-xs">
                            Admin, Médico
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Ver</span>
                            <Badge variant="outline" className="text-xs">
                            Todos
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Eliminar</span>
                            <Badge variant="outline" className="text-xs">
                            Admin
                            </Badge>
                        </div>
                        </div>
                    </div>
                    <div className="p-3 border border-border/50 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Citas Médicas</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Programar</span>
                            <Badge variant="outline" className="text-xs">
                            Admin, Recepción
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Modificar</span>
                            <Badge variant="outline" className="text-xs">
                            Admin, Médico
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Cancelar</span>
                            <Badge variant="outline" className="text-xs">
                            Admin, Médico
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Ver</span>
                            <Badge variant="outline" className="text-xs">
                            Todos
                            </Badge>
                        </div>
                        </div>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </div>
            </TabsContent>
        </Tabs>
        </div>
    )
}
