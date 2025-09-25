"use client";
import { Sheet } from "@/src/components/ui/sheet";
import { SheetContent } from "@/src/components/ui/sheet";
import Link from "next/link";
import { Home, Users, Calendar, Stethoscope, ActivitySquare } from "lucide-react";

const menuItems = [
    { name: "Inicio", href: "/dashboard", icon: Home },
    { name: "Pacientes", href: "/dashboard/pacientes", icon: Users },
    { name: "Citas", href: "/dashboard/citas", icon: Calendar },
    { name: "Consultas", href: "/dashboard/consultas", icon: Stethoscope },
    { name: "Exámenes", href: "/dashboard/examenes", icon: ActivitySquare },
    ];

    export function Sidebar() {
    return (
        <Sheet open={true}>
        <SheetContent side="left" className="w-64 p-4 bg-white">
            <h1 className="text-xl font-bold mb-6">Hospital Admin</h1>
            <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                    <Icon className="h-5 w-5 text-gray-700" />
                    {item.name}
                </Link>
                );
            })}
            </nav>
        </SheetContent>
        </Sheet>
    );
}
