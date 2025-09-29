"use client";

import { useRouter } from "next/navigation";
import { Typography, Button, Stack } from "@mui/material";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function Page() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <AuthLayout>
      <Stack spacing={4} textAlign="center">
        <Typography>
          ¡Bienvenido! Tu cuenta ha sido activada exitosamente. Haz clic en el
          botón para ir al dashboard.
        </Typography>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          onClick={handleRedirect}
        >
          Dashboard
        </Button>
      </Stack>
    </AuthLayout>
  );
}
