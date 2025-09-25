import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

interface UseUserReturn {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    checkSession?: () => Promise<void>;
    }

    export function useUser(): UseUserReturn {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const checkSession = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) setError(error.message);
        else setUser(data.session?.user ?? null);
    };

    useEffect(() => {
        checkSession().finally(() => setIsLoading(false));

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        });

        return () => {
        listener.subscription.unsubscribe();
        };
    }, []);

    return { user, isLoading, error, checkSession };
}
