"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z as zod } from "zod"
import { AuthError } from "@supabase/supabase-js"
import { signInUser } from "@/backend-api/apiService"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CircularProgress } from "@mui/material"

const schema = zod.object({
  email: zod.string().min(1, { message: "El correo es requerido" }).email(),
  password: zod.string().min(1, { message: "La contraseña es requerida" }),
})

type Values = zod.infer<typeof schema>

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const [isPending, setIsPending] = React.useState(false)

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  })

  const onSubmit = React.useCallback(
    async (values: Values) => {
      setIsPending(true)
      try {
        await signInUser(values.email, values.password)
      } catch (error) {
        if (error instanceof AuthError) {
          setError("root", { type: "server", message: error.message })
        } else {
          setError("root", {
            type: "server",
            message: "Ocurrió un error inesperado. Inténtalo más tarde.",
          })
        }
      } finally {
        setIsPending(false)
      }
    },
    [router, setError]
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6 max-w-md mx-auto mt-10", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Iniciar sesión</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
              <Input id="email" type="email" placeholder="m@example.com" {...field} />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <Link
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input id="password" type="password" {...field} />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </Field>
          )}
        />

        {/* Error global */}
        {errors.root && (
          <Alert variant="destructive">
            <AlertDescription>{errors.root.message}</AlertDescription>
          </Alert>
        )}

        {/* Submit */}
        <Field>
          <Button type="submit" disabled={isPending} className="flex items-center justify-center gap-2">
            {isPending ?(
              <>
                <CircularProgress size={20} color="inherit" />
                <span>Verificando...</span>
              </>
            ): (
              "Ingresar"
            )}
          </Button>
        </Field>

        {/*<FieldSeparator>O continúa con</FieldSeparator>*/}

        {/* Login con GitHub */}
        <Field>
          <FieldDescription className="text-center">
            ¿No tienes una cuenta?{" "}
            <Link href="/auth/sign-up" className="underline underline-offset-4">
              Regístrate
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

