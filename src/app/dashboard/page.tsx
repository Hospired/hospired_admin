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
  Hospital,
} from "lucide-react";
import { 
  getAllAppointments,
  getAllPatients,
  getTotalUsersCount, 
  getHealthcareFacilities
} from "@/backend-api/apiService";

import { useEffect, useState } from "react";

function isToday(date: Date) {
  const hoy = new Date();
  return (
    date.getDate() === hoy.getDate() &&
    date.getMonth() === hoy.getMonth() &&
    date.getFullYear() === hoy.getFullYear()
  );
}

export default function DashboardPage() {
  const [citasHoy, setCitasHoy] = useState<number>(0);
  const [totalPacientes, setTotalPacientes] = useState<number>(0);
  const [nuevosSemana, setNuevosSemana] = useState<number>(0);
  const [consultasCompletadasHoy, setConsultasCompletadasHoy] = useState<number>(0);

  const [loadingCitas, setLoadingCitas] = useState<boolean>(true);
  const [loadingPacientes, setLoadingPacientes] = useState<boolean>(true);
  const [consultasCompletadas, setConsultasCompletadas] = useState<number>(0);
  const [loadingConsultasCompletadas, setLoadingConsultasCompletadas] = useState<boolean>(true);

  const [usuariosRegistrados, setUsuariosRegistrados] = useState<number>(0);
  const [loadingUsuariosRegistrados, setLoadingUsuariosRegistrados] = useState<boolean>(true);

  const [actividades, setActividades] = useState<any[]>([]);
  const [loadingActividades, setLoadingActividades] = useState<boolean>(true);

  const [instalacionesRecientes, setInstalacionesRecientes] = useState<any[]>([]);
  const [loadingInstalaciones, setLoadingInstalaciones] = useState<boolean>(true);
  const [totalInstalaciones, setTotalInstalaciones] = useState<number>(0);

  useEffect(() => {
    async function fetchUsuariosRegistrados() {
      setLoadingUsuariosRegistrados(true);
      try {
        const total = await getTotalUsersCount();
        setUsuariosRegistrados(total);
      } catch (error) {
        setUsuariosRegistrados(0);
      } finally {
        setLoadingUsuariosRegistrados(false);
      }
    }
    fetchUsuariosRegistrados();
  }, []);

  useEffect(() => {
    async function fetchCitasHoy() {
      setLoadingCitas(true);
      try {
        const allAppointments = await getAllAppointments();
        const citasDeHoy = allAppointments.filter(a => {
          if (!a.start) return false;
          const fecha = new Date(a.start);
          return (
            isToday(fecha) &&
            (a.status === "scheduled" || a.status === "completed")
          );
        });
        setCitasHoy(citasDeHoy.length);
      } catch (error) {
        setCitasHoy(0);
      } finally {
        setLoadingCitas(false);
      }
    }
    fetchCitasHoy();
  }, []);

  useEffect(() => {
    async function fetchPacientes() {
      setLoadingPacientes(true);
      try {
        const pacientes = await getAllPatients();
        setTotalPacientes(pacientes.length);

        const hoy = new Date();
        const startOfWeek = new Date(hoy);
        startOfWeek.setDate(hoy.getDate() - hoy.getDay()); // Domingo

        const nuevos = pacientes.filter(
          p =>
            p.createdAt &&
            p.createdAt >= startOfWeek &&
            p.createdAt <= hoy
        );
        setNuevosSemana(nuevos.length);
      } catch (error) {
        setTotalPacientes(0);
        setNuevosSemana(0);
      } finally {
        setLoadingPacientes(false);
      }
    }
    fetchPacientes();
  }, []);

  useEffect(() => {
    async function fetchConsultasCompletadas() {
      setLoadingConsultasCompletadas(true);
      try {
        const allAppointments = await getAllAppointments();
        const completadas = allAppointments.filter(a => a.status === "completed");
        setConsultasCompletadas(completadas.length);
      } catch (error) {
        setConsultasCompletadas(0);
      } finally {
        setLoadingConsultasCompletadas(false);
      }
    }
    fetchConsultasCompletadas();
  }, []);

  useEffect(() => {
    async function fetchActividades() {
      setLoadingActividades(true);
      try {
        // Trae pacientes recientes
        const pacientes = await getAllPatients();
        const pacientesRecientes = pacientes.slice(0, 5).map(p => ({
          tipo: "paciente",
          fecha: p.createdAt,
          descripcion: `Nuevo paciente registrado: ${p.fullName}`,
          detalle: `Expediente #${p.id}`,
        }));

        // Trae citas recientes
        const citas = await getAllAppointments();
        const citasRecientes = citas.slice(0, 5).map(c => ({
          tipo: c.status === "completed" ? "consulta" : "cita",
          fecha: c.createdAt,
          descripcion: c.status === "completed"
            ? `Consulta completada: ${c.patientName}`
            : `Nueva cita programada: ${c.patientName}`,
          detalle: c.physicianName
            ? `Dr/a: ${c.physicianName} - Especialidad: ${c.specialty}`
            : `Especialidad: ${c.specialty}`,
        }));

        // Aquí podrías agregar admin_users si tienes función para obtenerlos

        // Combina y ordena por fecha descendente
        const todas = [...pacientesRecientes, ...citasRecientes]
          .sort((a, b) => b.fecha.getTime() - a.fecha.getTime())
          .slice(0, 5); // Muestra solo las 5 más recientes

        setActividades(todas);
      } catch (error) {
        setActividades([]);
      } finally {
        setLoadingActividades(false);
      }
    }
    fetchActividades();
  }, []);

  useEffect(() => {
    async function fetchInstalacionesRecientes() {
      setLoadingInstalaciones(true);
      try {
        const facilities = await getHealthcareFacilities();
        // Ordena por fecha descendente y toma las 4 más recientes
        const recientes = facilities
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .slice(0, 4);
        setInstalacionesRecientes(recientes);
      } catch {
        setInstalacionesRecientes([]);
      } finally {
        setLoadingInstalaciones(false);
      }
    }
    fetchInstalacionesRecientes();
  }, []);

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
              <div className="text-2xl font-bold text-primary">
                {loadingCitas ? "..." : citasHoy}
              </div>
              <p className="text-xs text-muted-foreground">
                Citas programadas/completadas hoy
              </p>
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
              <div className="text-2xl font-bold text-primary">
                {loadingPacientes ? "..." : totalPacientes}
              </div>
              <p className="text-xs text-muted-foreground">
                +{nuevosSemana} nuevos esta semana
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
              <div className="text-2xl font-bold text-primary">
                {loadingConsultasCompletadas ? "..." : consultasCompletadas}
              </div>
              <p className="text-xs text-muted-foreground">
                Total de consultas completadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Usuarios Registrados
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {loadingUsuariosRegistrados ? "..." : usuariosRegistrados}
              </div>
              <p className="text-xs text-muted-foreground">
                Total de usuarios (admin + app)
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
            {loadingActividades ? (
              <div>Cargando...</div>
            ) : actividades.length === 0 ? (
              <div>No hay actividades recientes</div>
            ) : (
              actividades.map((act, idx) => (
                <div key={idx} className="flex items-center space-x-4 rounded-lg border p-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full
                    ${act.tipo === "cita" ? "bg-primary/10" :
                      act.tipo === "paciente" ? "bg-chart-2/10" :
                      "bg-chart-3/10"}`}>
                    {act.tipo === "cita" && <Calendar className="h-5 w-5 text-primary" />}
                    {act.tipo === "paciente" && <Users className="h-5 w-5 text-chart-2" />}
                    {act.tipo === "consulta" && <Stethoscope className="h-5 w-5 text-chart-3" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {act.descripcion}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {act.detalle}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {act.fecha.toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-3 lg:col-span-3 sm:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hospital className="h-5 w-5 text-primary" />
              Instalaciones de Salud Recientes
            </CardTitle>
            <CardDescription>
              Instalaciones agregadas recientemente al sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {loadingInstalaciones ? (
                <div className="text-xs text-muted-foreground">Cargando...</div>
              ) : instalacionesRecientes.length === 0 ? (
                <div className="text-xs text-muted-foreground">No hay instalaciones recientes</div>
              ) : (
                instalacionesRecientes.map((inst, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{inst.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {inst.municipalityName}{inst.department ? `, ${inst.department}` : ""}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{inst.createdAt.toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">
                        {inst.address}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  );
}
