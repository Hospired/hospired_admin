"use client";

import { Loader2 } from "lucide-react"; // Icono spinner
import React from "react";

interface LoadingPageProps {
  message?: string;
}

export default function Loading({ message = "Cargando..." }: LoadingPageProps) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background">
      <Loader2 className="animate-spin h-12 w-12 text-primary" />
      <p className="text-lg font-medium text-foreground">{message}</p>
    </div>
  );
}
