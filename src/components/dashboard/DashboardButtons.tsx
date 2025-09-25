"use client";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { logout } from "@/src/lib/auth/logout";

export default function DashboardButtons() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
        await logout();
        router.push("/auth/sign-in");
        } catch (err) {
        console.error(err);
        }
    };

    return <Button onClick={handleLogout}>Cerrar sesión</Button>;
}
