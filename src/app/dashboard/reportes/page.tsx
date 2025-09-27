"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp, Users, Calendar, Activity } from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    } from "recharts"

    const citasPorMes = [
    { mes: "Ene", citas: 245, completadas: 220, canceladas: 25 },
    { mes: "Feb", citas: 280, completadas: 260, canceladas: 20 },
    { mes: "Mar", citas: 320, completadas: 295, canceladas: 25 },
    { mes: "Abr", citas: 290, completadas: 275, canceladas: 15 },
    { mes: "May", citas: 350, completadas: 330, canceladas: 20 },
    { mes: "Jun", citas: 380, completadas: 360, canceladas: 20 },
    ]

    const especialidades = [
    { nombre: "Cardiología", pacientes: 120, color: "#3b82f6" },
    { nombre: "Pediatría", pacientes: 95, color: "#10b981" },
    { nombre: "Neurología", pacientes: 80, color: "#f59e0b" },
    { nombre: "Dermatología", pacientes: 65, color: "#ef4444" },
    { nombre: "Ginecología", pacientes: 75, color: "#8b5cf6" },
    { nombre: "Otros", pacientes: 45, color: "#6b7280" },
    ]

    const ingresosMensuales = [
    { mes: "Ene", ingresos: 45000 },
    { mes: "Feb", ingresos: 52000 },
    { mes: "Mar", ingresos: 48000 },
    { mes: "Abr", ingresos: 61000 },
    { mes: "May", ingresos: 55000 },
    { mes: "Jun", ingresos: 67000 },
    ]

    const ocupacionCamas = [
    { dia: "Lun", ocupadas: 85, disponibles: 15 },
    { dia: "Mar", ocupadas: 92, disponibles: 8 },
    { dia: "Mie", ocupadas: 78, disponibles: 22 },
    { dia: "Jue", ocupadas: 88, disponibles: 12 },
    { dia: "Vie", ocupadas: 95, disponibles: 5 },
    { dia: "Sab", ocupadas: 70, disponibles: 30 },
    { dia: "Dom", ocupadas: 65, disponibles: 35 },
    ]

    export default function ReportesPage() {
    return (
        <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
            <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Reportes y Análisis</h2>
            <p className="text-muted-foreground">Análisis detallado del rendimiento hospitalario</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" />
            Exportar Reportes
            </Button>
        </div>

        {/* Métricas principales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Citas del Mes</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">380</div>
                <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+12%</span> vs mes anterior
                </p>
            </CardContent>
            </Card>
            <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pacientes Activos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">1,247</div>
                <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+8%</span> vs mes anterior
                </p>
            </CardContent>
            </Card>
            <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Ocupación Camas</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">85%</div>
                <p className="text-xs text-muted-foreground">
                <span className="text-yellow-500">-2%</span> vs mes anterior
                </p>
            </CardContent>
            </Card>
            <Card className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos Mensuales</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">$67,000</div>
                <p className="text-xs text-muted-foreground">
                <span className="text-green-500">+15%</span> vs mes anterior
                </p>
            </CardContent>
            </Card>
        </div>

        <Tabs defaultValue="citas" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="citas">Citas Médicas</TabsTrigger>
            <TabsTrigger value="especialidades">Especialidades</TabsTrigger>
            <TabsTrigger value="financiero">Financiero</TabsTrigger>
            <TabsTrigger value="ocupacion">Ocupación</TabsTrigger>
            </TabsList>

            <TabsContent value="citas" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-border/50">
                <CardHeader>
                    <CardTitle className="text-foreground">Citas por Mes</CardTitle>
                    <CardDescription>Evolución mensual de citas médicas</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={citasPorMes}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="mes" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                        contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                        }}
                        />
                        <Bar dataKey="completadas" fill="#3b82f6" name="Completadas" />
                        <Bar dataKey="canceladas" fill="#ef4444" name="Canceladas" />
                    </BarChart>
                    </ResponsiveContainer>
                </CardContent>
                </Card>

                <Card className="border-border/50">
                <CardHeader>
                    <CardTitle className="text-foreground">Tendencia de Citas</CardTitle>
                    <CardDescription>Análisis de tendencias mensuales</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={citasPorMes}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="mes" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                        contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                        }}
                        />
                        <Line type="monotone" dataKey="citas" stroke="#10b981" strokeWidth={3} name="Total Citas" />
                    </LineChart>
                    </ResponsiveContainer>
                </CardContent>
                </Card>
            </div>
            </TabsContent>

            <TabsContent value="especialidades" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-border/50">
                <CardHeader>
                    <CardTitle className="text-foreground">Distribución por Especialidad</CardTitle>
                    <CardDescription>Pacientes atendidos por especialidad</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                        data={especialidades}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="pacientes"
                        label={({ nombre, pacientes }) => `${nombre}: ${pacientes}`}
                        >
                        {especialidades.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        </Pie>
                        <Tooltip
                        contentStyle={{
                            backgroundColor: "#1f2937",
                            border: "1px solid #374151",
                            borderRadius: "8px",
                        }}
                        />
                    </PieChart>
                    </ResponsiveContainer>
                </CardContent>
                </Card>

                <Card className="border-border/50">
                <CardHeader>
                    <CardTitle className="text-foreground">Ranking de Especialidades</CardTitle>
                    <CardDescription>Especialidades más demandadas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {especialidades.map((especialidad, index) => (
                    <div key={especialidad.nombre} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: especialidad.color }} />
                        <span className="font-medium text-foreground">{especialidad.nombre}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <span className="text-muted-foreground">{especialidad.pacientes} pacientes</span>
                        <Badge variant="outline">#{index + 1}</Badge>
                        </div>
                    </div>
                    ))}
                </CardContent>
                </Card>
            </div>
            </TabsContent>

            <TabsContent value="financiero" className="space-y-4">
            <Card className="border-border/50">
                <CardHeader>
                <CardTitle className="text-foreground">Ingresos Mensuales</CardTitle>
                <CardDescription>Evolución de ingresos hospitalarios</CardDescription>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={ingresosMensuales}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="mes" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                        contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        }}
                        formatter={(value) => [`$${value.toLocaleString()}`, "Ingresos"]}
                    />
                    <Area type="monotone" dataKey="ingresos" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    </AreaChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
            </TabsContent>

            <TabsContent value="ocupacion" className="space-y-4">
            <Card className="border-border/50">
                <CardHeader>
                <CardTitle className="text-foreground">Ocupación de Camas</CardTitle>
                <CardDescription>Ocupación semanal de camas hospitalarias</CardDescription>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={ocupacionCamas}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="dia" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                        contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        }}
                    />
                    <Bar dataKey="ocupadas" stackId="a" fill="#ef4444" name="Ocupadas" />
                    <Bar dataKey="disponibles" stackId="a" fill="#10b981" name="Disponibles" />
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
        </div>
    )
}
