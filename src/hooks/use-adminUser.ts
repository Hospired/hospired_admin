"use client";

import { useState, useEffect } from "react";
import { getAuthUser, getAdminUser } from "@/backend-api/apiService";
import { AdminUserRes } from "@/backend-api/dtos";

export function useAdminUser() {
  const [user, setUser] = useState<AdminUserRes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const authUser = await getAuthUser();
        if (!authUser) {
          setError("Usuario no autenticado");
          return;
        }

        const adminUser = await getAdminUser(authUser.id);
        setUser(adminUser);
      } catch (err: any) {
        setError(err.message || "Error al obtener usuario");
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, isLoading, error };
}

