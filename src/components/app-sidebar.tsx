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
import { useUser } from "@/hooks/use-user"


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
    },
    {
      title: "Medicos",
      url: "/dashboard/medicos",
      icon: Users,
    },
    {
      title: "Citas",
      url: "/dashboard/citas",
      icon: Calendar,
      /*items: [
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
      ],*/
    },
    /*{
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
    },*/
    {
      title: "Calendario",
      url: "/dashboard/citas/calendario",
      icon: Users,
    },
    /*{
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
    },*/
    {
      title: "Centros de salud",
      url: "/dashboard/centros",
      icon: Home,
      isActive: true,
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
      name: "Consultas Activas",
      url: "/dashboard/consultas",
      icon: Stethoscope,
    },
    {
      name: "Historial de consultas",
      url: "#/dashboard/consultas/historial",
      icon: ClipboardList,
    },
    {
      name: "Programación",
      url: "/dashboard/citas/programacion",
      icon: FilePlus,
    },
    {
      name: "Interconsultas",
      url: "/dashboard/citas/interconsultas",
      icon: FilePlus,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userData, isLoading } = useUser()
  
  // Filter navigation items based on user role
  const filteredNavMain = React.useMemo(() => {
    if (isLoading || !userData) return []
    
    // If user is an admin, show all navigation items
    if (userData.isSuperUser) {
      return data.navMain
    }
    
    // If user is a doctor (but not admin), show only doctor-specific tabs
    if (userData.isPhysician) {
      return data.navMain.filter(item => {
        const doctorAllowedPages = [
          "/dashboard",
          "/dashboard/pacientes", 
          "/dashboard/citas",
          "/dashboard/citas/calendario",
        ]
        return doctorAllowedPages.includes(item.url)
      })
    }
    
    // Default: show minimal navigation
    return data.navMain.filter(item => item.url === "/dashboard")
  }, [userData, isLoading])

  const filteredProjects = React.useMemo(() => {
    if (isLoading || !userData) return []
    
    // If user is an admin, show all projects
    if (userData.isSuperUser) {
      return data.projects
    }
    
    // If user is a doctor, show doctor-specific projects
    if (userData.isPhysician) {
      return data.projects.filter(project => {
        const doctorAllowedProjects = [
          "/dashboard/consultas",
          "/dashboard/citas/programacion",
        ]
        return doctorAllowedProjects.includes(project.url)
      })
    }
    
    // Default: no projects
    return []
  }, [userData, isLoading])

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Encabezado del sidebar */}
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      {/* Contenido principal */}
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        <NavProjects projects={filteredProjects} />
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