"use client";

import React, { useState } from "react";
import RouterLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { AuthError } from "@supabase/supabase-js";
import { signUpUser } from "@/backend-api/apiService";

import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

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
    <div className="mx-auto mt-8 max-w-md">
      {confirmationEmailSent ? (
        <div className="mx-auto mt-8 max-w-md flex flex-col items-center gap-4">
          <Alert
            className="flex flex-col items-center justify-center text-center bg-green-100 text-green-800 border border-green-300 shadow-md p-4 rounded-lg animate-in slide-in-from-top"
          >
            <span className="text-2xl mb-2">¡Cuenta creada con éxito!</span>
            <span>
              Hemos enviado un correo a <strong>{submittedEmail}</strong>. 
              Revisa tu bandeja de entrada para confirmar tu cuenta.
            </span>
          </Alert>

            <RouterLink
              href="/auth/sign-in"
              className="mt-2 text-green-700 hover:underline text-sm"
            >
              Ir a inicio
            </RouterLink>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Header */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-2xl font-bold">Crear cuenta</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Ingresa tu correo y contraseña para registrarte
              </p>
            </div>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input id="email" type="email" placeholder="m@example.com" {...field} />
                )}
              />
              {errors.email && (
                <FieldDescription className="text-red-500">{errors.email.message}</FieldDescription>
              )}
              <FieldDescription>
                Usaremos este correo para contactarte. No lo compartiremos con nadie.
              </FieldDescription>
            </Field>

            {/* Password + Confirm */}
            <Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => <Input id="password" type="password" {...field} />}
                  />
                  {errors.password && (
                    <FieldDescription className="text-red-500">{errors.password.message}</FieldDescription>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirmar contraseña</FieldLabel>
                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => <Input id="confirmPassword" type="password" {...field} />}
                  />
                  {errors.confirmPassword && (
                    <FieldDescription className="text-red-500">{errors.confirmPassword.message}</FieldDescription>
                  )}
                </Field>
              </div>
              <FieldDescription>Mínimo 6 caracteres.</FieldDescription>
            </Field>

            {/* Error global */}
            {errors.root && (
              <Alert variant="destructive">{errors.root.message}</Alert>
            )}

            {/* Submit */}
            <Field>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Creando cuenta..." : "Registrarme"}
              </Button>
            </Field>

            {/* Footer */}
            <FieldDescription className="text-center">
              ¿Ya tienes cuenta?{" "}
              <RouterLink href="/auth/sign-in" className="text-blue-600 hover:underline">
                Inicia sesión
              </RouterLink>
            </FieldDescription>
          </FieldGroup>
        </form>
      )}  
    </div>
  );
}
