"use client";

import { GuestGuard } from "@/components/auth/GuestGuard";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default function Page() {
  return (
    <GuestGuard>
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </GuestGuard>
  );
}
