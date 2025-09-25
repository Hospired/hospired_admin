"use client";

import { AuthGuard } from "@/src/components/auth/AuthGuard";
import { Sidebar } from "@/src/components/dashboard/Sidebar";
import { Navbar } from "@/src/components/dashboard/Navbar";

export default function DashboardLayout({
    children,
    }: {
    children: React.ReactNode;
    }) {
    return (
        <AuthGuard>
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex flex-col flex-1">
            <Navbar />
            <main className="p-6 overflow-y-auto flex-1 bg-gray-50">
                {children}
            </main>
            </div>
        </div>
        </AuthGuard>
    );
}
