"use client";
import { GuestGuard } from "@/components/auth/GuestGuard";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignInForm } from "@/components/auth/SignInForm";


export default function Page() {
  return (
    <GuestGuard>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </GuestGuard>
  );
}
