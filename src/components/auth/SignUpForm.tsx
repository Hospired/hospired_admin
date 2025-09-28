"use client";

import React, { useState } from "react";
import RouterLink from "next/link";
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

import { AuthError } from "@supabase/supabase-js";
import { signUpUser } from "@/backend-api/apiService";

const schema = zod
  .object({
    email: zod.string().min(1, { message: "El correo es requerido" }).email(),
    password: zod.string().min(6, { message: "Mínimo 6 caracteres" }),
    confirmPassword: zod.string().min(6, { message: "Confirma tu contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

type Values = zod.infer<typeof schema>;

export function SignUpForm(): React.JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [confirmationEmailSent, setConfirmationEmailSent] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: Values) => {
    setIsPending(true);
    try {
      await signUpUser(values.email, values.password);
      setSubmittedEmail(values.email);
      setConfirmationEmailSent(true);
    } catch (error) {
      if (error instanceof AuthError) {
        setError("root", { type: "server", message: error.message });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Stack spacing={4} sx={{ maxWidth: 400, mx: "auto", mt: 8 }}>
      {confirmationEmailSent ? (
        <Stack spacing={4} textAlign="center">
          <Alert severity="success">
            Hemos enviado un correo a {submittedEmail}. Revisa tu correo para
            confirmar tu cuenta.
          </Alert>
          <Link
            component={RouterLink}
            href="/auth/sign-in"
            underline="hover"
            variant="subtitle2"
          >
            Ir a inicio
          </Link>
        </Stack>
      ) : (
        <>
          <Stack spacing={1} textAlign="center">
            <Typography variant="h4">Crear cuenta</Typography>
            <Typography color="text.secondary" variant="body2">
              ¿Ya tienes cuenta?{" "}
              <Link
                component={RouterLink}
                href="/auth/sign-in"
                underline="hover"
                variant="subtitle2"
              >
                Inicia sesión
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
                    {errors.email && (
                      <FormHelperText>{errors.email.message}</FormHelperText>
                    )}
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
                      type="password"
                      label="Contraseña"
                    />
                    {errors.password && (
                      <FormHelperText>{errors.password.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormControl error={Boolean(errors.confirmPassword)}>
                    <InputLabel>Confirmar contraseña</InputLabel>
                    <OutlinedInput
                      {...field}
                      type="password"
                      label="Confirmar contraseña"
                    />
                    {errors.confirmPassword && (
                      <FormHelperText>
                        {errors.confirmPassword.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />

              {errors.root && (
                <Alert severity="error">{errors.root.message}</Alert>
              )}

              <Button
                disabled={isPending}
                type="submit"
                variant="contained"
                fullWidth
              >
                {isPending ? "Creando cuenta..." : "Registrarme"}
              </Button>
            </Stack>
          </form>
        </>
      )}
    </Stack>
  );
}
