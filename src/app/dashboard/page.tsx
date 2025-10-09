"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Calendar,
  Users,
  Stethoscope,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Panel de Control - Hospired
          </h1>
          <p className="text-muted-foreground text-pretty">
            Bienvenido al sistema de gestión hospitalaria. Aquí tienes un
            resumen de las actividades del día.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">24</div>
              <p className="text-xs text-muted-foreground">+12% desde ayer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pacientes Activos
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">156</div>
              <p className="text-xs text-muted-foreground">
                +8 nuevos esta semana
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Consultas Completadas
              </CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">18</div>
              <p className="text-xs text-muted-foreground">
                75% de las citas programadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tiempo Promedio
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">32min</div>
              <p className="text-xs text-muted-foreground">
                -5min desde la semana pasada
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>
                Últimas actividades del sistema hospitalario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Nueva cita programada
                  </p>
                  <p className="text-sm text-muted-foreground">
                    María González - Consulta General - 14:30
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">Hace 5 min</div>
              </div>

              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-2/10">
                  <Users className="h-5 w-5 text-chart-2" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Nuevo paciente registrado
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Carlos Mendoza - Expediente #P-2024-0156
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">Hace 12 min</div>
              </div>

              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-3/10">
                  <Stethoscope className="h-5 w-5 text-chart-3" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Consulta completada
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dr. Ramírez - Paciente: Ana López
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">Hace 25 min</div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Próximas Citas
              </CardTitle>
              <CardDescription>Citas programadas para hoy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Dr. Martínez</p>
                    <p className="text-xs text-muted-foreground">Cardiología</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">09:00</p>
                    <p className="text-xs text-muted-foreground">
                      Consultorio 1
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Dra. Rodríguez</p>
                    <p className="text-xs text-muted-foreground">Pediatría</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">10:30</p>
                    <p className="text-xs text-muted-foreground">
                      Consultorio 2
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Dr. García</p>
                    <p className="text-xs text-muted-foreground">
                      Medicina General
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">11:15</p>
                    <p className="text-xs text-muted-foreground">
                      Consultorio 1
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Dra. López</p>
                    <p className="text-xs text-muted-foreground">Ginecología</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">14:00</p>
                    <p className="text-xs text-muted-foreground">
                      Consultorio 3
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
