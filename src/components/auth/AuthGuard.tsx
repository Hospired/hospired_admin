"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import { useUser } from "@/src/hooks/use-user";

interface AuthGuardProps {
    children: React.ReactNode;
    }

    export function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const { user, error, isLoading } = useUser();

    React.useEffect(() => {
        if (!isLoading && !user) {
        router.replace("/auth/sign-in");
        }
    }, [isLoading, user, router]);

    if (isLoading) return null;

    if (error) return <Alert severity="error">{error}</Alert>;

    if (!user) return null;

    return <>{children}</>;
}
