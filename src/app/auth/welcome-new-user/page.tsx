"use client";

import { useRouter } from "next/navigation";
import { Typography, Button } from "@mui/material";
import { GuestGuard } from "@/components/auth/GuestGuard";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function Page() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <GuestGuard>
      <AuthLayout>
        <>
          <Typography>
            ¡Bienvenido! Tu correo ha sido verificado. Haz clic en el botón para
            ir al dashboard.
          </Typography>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleRedirect}
          >
            Dashboard
          </Button>
        </>
      </AuthLayout>
    </GuestGuard>
  );
}
