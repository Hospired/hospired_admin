"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { User, PostgrestError, AuthError } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { getAdminUser } from "@/backend-api/apiService";
import { AdminUserRes } from "@/backend-api/dtos";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface UseUserReturn {
  user: User | null;
  userData: AdminUserRes | null;
  isLoading: boolean;
  error: string | null;
}

export function useUser(): UseUserReturn {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<AdminUserRes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // rutas que NO necesitan sesión
  const publicRoutes = useMemo(() => ["/auth/sign-in", "/auth/sign-up"], []);

  const redirectToSignIn = useCallback(() => {
    if (!publicRoutes.includes(pathname)) {
      router.push("/auth/sign-in");
    }
  }, [pathname, publicRoutes, router]);

  const fetchUserData = useCallback(
    async (sessionUser: User) => {
      try {
        const adminUser = await getAdminUser(sessionUser.id);
        if (adminUser) {
          setUserData(adminUser);
        } else {
          setUserData(null);
          const allowedNoAdminRoutes = ["/auth/welcome-new-user", "/auth/setup-user"];
          if (!allowedNoAdminRoutes.includes(pathname)) {
            router.push("/auth/welcome-new-user");
          }
        }
      } catch (err) {
        if (err instanceof PostgrestError) {
          setError(err.message);
        } else {
          setError("Unknown error fetching admin user data");
        }
        console.error("Error fetching admin user:", err);
        setUserData(null);
      }
    },
    [pathname, router],
  );

  const checkUser = useCallback(async () => {
    try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);
      if (!sessionUser) {
        setUserData(null);
        redirectToSignIn();
        return;
      }
      await fetchUserData(sessionUser);
    } catch (err) {
      console.error("Error in useUser:", err);
      if (err instanceof AuthError || err instanceof Error) {
        setError(err.message ?? "Unknown error");
      } else {
        setError("Unknown error fetching auth user");
      }
      setUserData(null);
      redirectToSignIn();
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserData, redirectToSignIn]);

  useEffect(() => {
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionUser = session?.user ?? null;
        setUser(sessionUser);

        if (!sessionUser) {
          setUserData(null);
          redirectToSignIn();
        } else {
          fetchUserData(sessionUser);
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [checkUser, fetchUserData, redirectToSignIn]);

  return { user, userData, isLoading, error };
}