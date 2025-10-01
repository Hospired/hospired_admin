"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getAdminUser } from "@/backend-api/apiService";
import { AdminUserRes } from "@/backend-api/dtos";
import { useRouter } from "next/navigation";

interface UseUserReturn {
  user: any | null;
  userData: AdminUserRes | null;
  exists: boolean | null;
  isLoading: boolean;
  error: string | null;
}

export function useUser(): UseUserReturn {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [userData, setUserData] = useState<AdminUserRes | null>(null);
  const [exists, setExists] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // rutas que NO necesitan sesión
  const publicRoutes = ["/auth/sign-in", "/auth/sign-up"];

  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const sessionUser = data.session?.user ?? null;

        if (!sessionUser) {
          if (mounted) {
            setUser(null);
            setExists(false);
            setUserData(null);

            // redirigir solo si NO estoy en ruta pública
            if (!publicRoutes.includes(window.location.pathname)) {
              router.push("/auth/sign-in");
            }
          }
          return;
        }

        if (mounted) setUser(sessionUser);

        // Buscar en admin_users
        const adminUser = await getAdminUser(sessionUser.id);

        if (mounted) {
          if (adminUser) {
            setExists(true);
            setUserData(adminUser);
          } else {
            setExists(false);
            setUserData(null);
            // si ya está logueado pero no tiene perfil → mandar al setup
            if (window.location.pathname !== "/auth/setup-user") {
              router.push("/auth/setup-user");
            }
          }
        }
      } catch (err: any) {
        console.error("Error en useUser:", err);
        if (mounted) {
          setUser(null);
          setExists(false);
          setUserData(null);
          setError(err?.message ?? "Unknown error");

          if (!publicRoutes.includes(window.location.pathname)) {
            router.push("/auth/sign-in");
          }
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    checkUser();

    // Escuchar cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        const sessionUser = session?.user ?? null;
        setUser(sessionUser);

        if (!sessionUser) {
          setUserData(null);
          setExists(false);
          if (!publicRoutes.includes(window.location.pathname)) {
            router.push("/auth/sign-in");
          }
          return;
        }

        try {
          const adminUser = await getAdminUser(sessionUser.id);
          if (adminUser) {
            setExists(true);
            setUserData(adminUser);
          } else {
            setExists(false);
            setUserData(null);
            if (window.location.pathname !== "/auth/setup-user") {
              router.push("/auth/setup-user");
            }
          }
        } catch (err: any) {
          console.error("Error al verificar adminUser:", err);
          setError(err?.message ?? "Unknown error");
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return { user, userData, exists, isLoading, error };
}
