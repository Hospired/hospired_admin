"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()

  const handleRedirect = () => {
    router.push("/auth/setup-user")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-success/20 blur-3xl rounded-full animate-pulse" />
              <div className="relative bg-success/10 rounded-full p-6 border-2 border-success/20">
                <CheckCircle2 className="w-20 h-20 text-success" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20">
              <Sparkles className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-success">Cuenta Activada</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">¡Bienvenido a bordo!</h1>

            <p className="text-xl text-muted-foreground max-w-lg mx-auto text-pretty leading-relaxed">
              Tu cuenta ha sido activada exitosamente. Completa tus datos para acceder al dashboard.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              size="lg"
              onClick={handleRedirect}
              className="group text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              Completar mis Datos
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Additional Info */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              ¿Necesitas ayuda?{" "}
              <a href="#" className="text-foreground hover:text-primary underline underline-offset-4 transition-colors">
                Visita nuestro centro de soporte
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
