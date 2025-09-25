"use client";

import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "next/navigation";

export function Navbar() {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace("/auth/sign-in");
    };

    return (
        <header className="h-14 border-b bg-white flex items-center justify-between px-6 shadow-sm">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
        >
            Cerrar sesión
        </button>
        </header>
    );
}
