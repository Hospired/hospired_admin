"use client";
import { GuestGuard } from "@/src/components/auth/GuestGuard";
import { AuthLayout } from "@/src/components/auth/AuthLayout";
import { SignInForm } from "@/src/components/auth/SignInForm";

export default function Page() {
  return (
    <GuestGuard>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </GuestGuard>
  );
}
