"use client";

import * as React from "react";
import RouterLink from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { AuthError } from "@supabase/supabase-js";
import { signInUser } from "@/backend-api/apiService";

const schema = zod.object({
  email: zod.string().min(1, { message: "El correo es requerido" }).email(),
  password: zod.string().min(1, { message: "La contraseña es requerida" }),
});

type Values = zod.infer<typeof schema>;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
      try {
        await signInUser(values.email, values.password);
        router.push("/dashboard");
      } catch (error) {
        if (error instanceof AuthError) {
          setError("root", { type: "server", message: error.message });
        }
      } finally {
        setIsPending(false);
      }
    },
    [router, setError],
  );

  return (
    <Stack spacing={4} sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      <Stack spacing={1} textAlign="center">
        <Typography variant="h4">Iniciar sesión</Typography>
        <Typography color="text.secondary" variant="body2">
          ¿No tienes cuenta?{" "}
          <Link
            component={RouterLink}
            href="/auth/sign-up"
            underline="hover"
            variant="subtitle2"
          >
            Regístrate
          </Link>
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Correo electrónico</InputLabel>
                <OutlinedInput
                  {...field}
                  type="email"
                  label="Correo electrónico"
                />
                {errors.email ? (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Contraseña</InputLabel>
                <OutlinedInput
                  {...field}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    showPassword ? (
                      <Eye
                        cursor="pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeSlash
                        cursor="pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    )
                  }
                  label="Contraseña"
                />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          {errors.root ? (
            <Alert severity="error">{errors.root.message}</Alert>
          ) : null}

          <Button
            disabled={isPending}
            type="submit"
            variant="contained"
            fullWidth
          >
            {isPending ? "Ingresando..." : "Ingresar"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
