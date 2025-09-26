import { CardSumary } from "@/src/components/CardSumary";
import { Button } from "@/src/components/ui/button";
import { ToothIcon } from "@phosphor-icons/react";
import { BookOpenCheck, Icon, UserRound, Waypoints } from "lucide-react";

export const dataCardsSumary = [
    {
        icon: UserRound,
        total: "145",
        awerage: 15,
        title: "Pacientes Nuevos",
        tooltipText: "Todos los pacientes nuevos, con respecto al mes pasado"
    },
        {
        icon: UserRound,
        total: "89",
        awerage: 15,
        title: "Operaciones",
        tooltipText: "Operaciones"
    },
        {
        icon: UserRound,
        total: "2350",
        awerage: 15,
        title: "Total de Usuarios",
        tooltipText: "Usuarios del sistema"
    },
        {
        icon: UserRound,
        total: "C$ 9583",
        awerage: 15,
        title: "Ingresos Totales",
        tooltipText: "Con respecto al mes pasado"
    },
]

export default function DashboardHome() {
    return (
        <div>
            <div>
                <h2 className="text-2xl mb-4">Dasboard</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
                {dataCardsSumary.map(({ icon, total, awerage, title, tooltipText}) => (
                    <CardSumary 
                        key = {title}
                        icon = { icon}
                        total = { total}
                        awerage={awerage}
                        title={title}
                        tooltipText={tooltipText}
                    />
                ))}
            </div>
        </div>

    );
}
0