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

/**
 * Hook para manejar la sesión de Supabase y existencia del usuario en admin_users.
 * Mantiene tus funcionalidades avanzadas y agrega isLoading + error.
 */
export function useUser(): UseUserReturn {
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);
  const [userData, setUserData] = useState<AdminUserRes | null>(null);
  const [exists, setExists] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const checkUser = async () => {
      try {
        // Verificar sesión actual
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const sessionUser = data.session?.user ?? null;

        if (!sessionUser) {
          if (mounted) {
            setUser(null);
            setExists(false);
            setUserData(null);
            router.push("/auth/sign-in");
          }
          return;
        }

        if (mounted) setUser(sessionUser);

        // Verificar usuario en admin_users (trae todos los datos con getAdminUser)
        const adminUser = await getAdminUser(sessionUser.id);

        if (mounted) {
          if (adminUser) {
            setExists(true);
            setUserData(adminUser);
          } else {
            setExists(false);
            setUserData(null);
            router.push("/auth/setup-user");
          }
        }
      } catch (err: any) {
        console.error("Error en useUser:", err);
        if (mounted) {
          setUser(null);
          setExists(false);
          setUserData(null);
          setError(err?.message ?? "Unknown error");
          router.push("/auth/sign-in");
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    checkUser();

    // Escuchar cambios en la sesión (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        const sessionUser = session?.user ?? null;
        setUser(sessionUser);

        if (!sessionUser) {
          setUserData(null);
          setExists(false);
          router.push("/auth/sign-in");
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
            router.push("/auth/setup-user");
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
