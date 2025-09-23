"use client";

import { useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

interface UseUserReturn {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    }

    export function useUser(): UseUserReturn {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUser = async () => {
        try {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
            setError(error.message);
            } else {
            setUser(data.session?.user ?? null);
            }
        } catch (err) {
            setError("Error checking session");
        } finally {
            setIsLoading(false);
        }
        };

        getUser();

        // Listener para cambios en auth
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        });

        return () => {
        listener.subscription.unsubscribe();
        };
    }, []);

    return { user, isLoading, error };
}
