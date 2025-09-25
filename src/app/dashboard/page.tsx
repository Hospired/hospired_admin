import { Button } from "@/src/components/ui/button";
"use client";
import { AuthGuard } from "@/src/components/auth/AuthGuard";
import DashboardButtons from "@/src/components/dashboard/DashboardButtons";

export default function DashboardPage() {
    return (
        <AuthGuard>
        <h1>Bienvenido al Dashboard</h1>
        <DashboardButtons />
        </AuthGuard>
    );
}

