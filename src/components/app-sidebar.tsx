"use client"

import * as React from "react"
import {
  Home,
  Users,
  Calendar,
  Stethoscope,
  Activity,
  FlaskConical,
  UserCog,
  BarChart2,
  Settings,
  FilePlus,
  ClipboardList,
  FileText,
  Briefcase,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


const data = {
  teams: [
    {
      name: "Hospired",
      logo: Briefcase,
      plan: "Asistente Virtual -Managua",
    },
  ],
  navMain: [
    {
      title: "Inicio",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Pacientes",
      url: "/dashboard/pacientes",
      icon: Users,
      items: [
        {
          title: "Lista de Pacientes",
          url: "/dashboard/pacientes",
        },
        {
          title: "Nuevo Paciente",
          url: "/dashboard/pacientes/nuevo",
        },
      ],
    },
    {
      title: "Citas",
      url: "/dashboard/citas",
      icon: Calendar,
      items: [
        {
          title: "Calendario",
          url: "/dashboard/citas/calendario",
        },
        {
          title: "Programación",
          url: "/dashboard/citas/programacion",
        },
        {
          title: "Interconsultas",
          url: "/dashboard/citas/interconsultas",
        },
      ],
    },
    {
      title: "Consultas",
      url: "/dashboard/consultas",
      icon: Stethoscope,
      items: [
        {
          title: "Consultas Activas",
          url: "/dashboard/consultas",
        },
        {
          title: "Historial de Consultas",
          url: "/dashboard/consultas/historial",
        },
      ],
    },
    {
      title: "Admisiones",
      url: "/dashboard/admisiones",
      icon: Activity,
      items: [
        {
          title: "Nueva Admisión",
          url: "/dashboard/admisiones/nuevo",
        },
        {
          title: "Listado",
          url: "/dashboard/admisiones",
        },
      ],
    },
    {
      title: "Inicio",
      url: "/dashboard/centros",
      icon: Home,
    },
    {
      title: "Exámenes",
      url: "/dashboard/examenes",
      icon: FlaskConical,
      items: [
        {
          title: "Lista de Exámenes",
          url: "/dashboard/examenes",
        },
        {
          title: "Asignar Examen",
          url: "/dashboard/examenes/nuevo",
        },
      ],
    },
    {
      title: "Personal",
      url: "/dashboard/personal",
      icon: UserCog,
    },
    {
      title: "Reportes",
      url: "/dashboard/reportes",
      icon: BarChart2,
    },
    {
      title: "Configuración",
      url: "/dashboard/configuracion",
      icon: Settings,
    },
  ],
  projects: [
    {
      name: "Consultorio 1",
      url: "#",
      icon: ClipboardList,
    },
    {
      name: "Consultorio 2",
      url: "#",
      icon: ClipboardList,
    },
    {
      name: "Emergencias",
      url: "#",
      icon: FilePlus,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Encabezado del sidebar */}
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      {/* Contenido principal */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavProjects projects={data.projects} />*/}
      </SidebarContent>

      {/* Usuario autenticado */}
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>

      {/* Rail lateral para modo compacto */}
      <SidebarRail />
    </Sidebar>
  )
}
