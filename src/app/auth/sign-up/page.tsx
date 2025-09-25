"use client";

import { GuestGuard } from "@/src/components/auth/GuestGuard";
import { AuthLayout } from "@/src/components/auth/AuthLayout";
import { SignUpForm } from "@/src/components/auth/SignUpForm";

export default function Page() {
    return (
        <GuestGuard>
        <AuthLayout>
            <SignUpForm />
        </AuthLayout>
        </GuestGuard>
    );
}
