// src/components/dashboard/layout/config.ts
import type { NavItemConfig } from "@/types/nav";

export const navItems: NavItemConfig[] = [
    { key: "dashboard", title: "Dashboard", href: "/dashboard", icon: "house" },
    { key: "pacientes", title: "Pacientes", href: "/dashboard/pacientes", icon: "users" },
    { key: "citas", title: "Citas", href: "/dashboard/citas", icon: "calendar" },
    { key: "consultas", title: "Consultas", href: "/dashboard/consultas", icon: "stethoscope" },
    { key: "examenes", title: "Exámenes", href: "/dashboard/examenes", icon: "flask" },
];
