"use client";
import { useState, ChangeEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CreateAdminUserReq } from "@/backend-api/dtos";
import { useRouter } from "next/navigation";
import { createAdminUser, getAuthUser } from "@/backend-api/apiService";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/mode-toggle";
import {
  CalendarIcon,
  UserIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
  ImageIcon,
  PhoneIcon,
  Upload,
  AwardIcon as IdCardIcon
} from "lucide-react";

export default function AdminUserForm() {
  const router = useRouter();
  const [inputValues, setInputValues] = useState<
    Omit<CreateAdminUserReq, "id" | "avatar">
  >({
    firstName: "",
    secondName: "",
    firstLastName: "",
    secondLastName: "",
    isPhysician: false,
    isSuperUser: false,
    dateOfBirth: undefined,
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFileName, setAvatarFileName] = useState<string | null>(null);

  // Cambios en inputs de texto/fecha
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Cambios en switches booleanos
  function handleSwitch(name: keyof CreateAdminUserReq, checked: boolean) {
    setInputValues((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  // Avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Iniciales de fallback
  const getInitials = () => {
    const first = inputValues.firstName?.charAt(0) || "";
    const last = inputValues.firstLastName?.charAt(0) || "";
    return `${first}${last}`.toUpperCase() || "UN";
  };

  // Insert en Supabase
async function onCreate() {
  try {
    const user = await getAuthUser();
    const payload: CreateAdminUserReq = {
      id: user.id,
      firstName: inputValues.firstName,
      secondName: inputValues.secondName,
      firstLastName: inputValues.firstLastName,
      secondLastName: inputValues.secondLastName,
      isPhysician: inputValues.isPhysician,
      isSuperUser: false,
      dateOfBirth: inputValues.dateOfBirth
        ? new Date(inputValues.dateOfBirth)
        : undefined,
      avatar: avatarPreview || undefined,
    }

    await createAdminUser(payload)
    alert("Usuario creado correctamente 🎉")
    router.push("/dashboard/")
  } catch (error: any) {
    alert("Error: " + error.message)
  }
}


  // Reset formulario
  function resetForm() {
    setInputValues({
      firstName: "",
      secondName: "",
      firstLastName: "",
      secondLastName: "",
      isPhysician: false,
      isSuperUser: false,
      dateOfBirth: undefined,
    });
    setAvatarPreview(null);
    setAvatarFileName(null);
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Gestión de Usuario Administrativo
          </h1>
          <p className="text-muted-foreground">
            Complete la información del usuario del sistema
          </p>
          <p className="text-muted-foreground">
            Este formulario es obligatorio
          </p>
        </div>

        {/* Avatar Card */}
        <Card className="border-2 border-border/50 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Foto de Perfil
            </CardTitle>
            <CardDescription>Imagen del usuario (opcional)</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarImage
                src={avatarPreview || "/placeholder.svg"}
                alt="Avatar"
              />
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="w-full max-w-sm">
              <Label htmlFor="avatar">Seleccionar imagen</Label>
              <div className="mt-1 flex items-center gap-2">
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                <Upload className="h-4 w-4 text-muted-foreground" />
              </div>
              {avatarFileName && (
                <p className="text-xs text-muted-foreground mt-1">
                  Archivo seleccionado: {avatarFileName}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Personal Information Card */}
        <Card className="border-2 border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary" />
              Información Personal
            </CardTitle>
            <CardDescription>Datos básicos del usuario</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Primer Nombre *</Label>
              <Input
                id="firstName"
                name="firstName"
                required
                placeholder="Juan"
                value={inputValues.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondName">Segundo Nombre</Label>
              <Input
                id="secondName"
                name="secondName"
                placeholder="Carlos"
                value={inputValues.secondName || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstLastName">Primer Apellido *</Label>
              <Input
                id="firstLastName"
                name="firstLastName"
                required
                placeholder="Pérez"
                value={inputValues.firstLastName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondLastName">Segundo Apellido</Label>
              <Input
                id="secondLastName"
                name="secondLastName"
                placeholder="García"
                value={inputValues.secondLastName || ""}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="dateOfBirth">Fecha de Nacimiento</Label>
              <div className="relative">
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={
                    inputValues.dateOfBirth
                      ? inputValues.dateOfBirth.toString()
                      : ""
                  }
                  onChange={handleChange}
                />
                <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roles and Permissions Card */}
        <Card className="border-2 border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheckIcon className="h-5 w-5 text-primary" />
              Roles y Permisos
            </CardTitle>
            <CardDescription>
              Configure los permisos del usuario en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Médico */}
            <div
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 
                ${
                  inputValues.isPhysician
                  ? "bg-emerald-50 dark:bg-emerald-900/40 border-emerald-200 dark:border-emerald-700"
                  : "bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700"
                }`}
                >
                  <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${inputValues.isPhysician ? "bg-green-100" : "bg-gray-100"}`}
                >
                  <StethoscopeIcon
                    className={`h-5 w-5 ${inputValues.isPhysician ? "text-green-600" : "text-gray-500"}`}
                  />
                </div>
                <div>
                  <Label
                    htmlFor="isPhysician"
                    className="text-base font-medium cursor-pointer"
                  >
                    Es Médico
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Usuario con credenciales médicas
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`text-sm font-medium ${
                    inputValues.isPhysician ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {inputValues.isPhysician ? "Activo" : "Inactivo"}
                </span>
                <Switch
                  id="isPhysician"
                  checked={inputValues.isPhysician}
                  onCheckedChange={(checked) =>
                    handleSwitch("isPhysician", checked)
                  }
                />
              </div>
            </div>

          </CardContent>
        </Card>
                {inputValues.isPhysician && (
            <Card className="border-2 border-emerald-300 dark:border-emerald-600 shadow-lg animate-in slide-in-from-top-4 duration-300">
              <CardHeader className=" bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-200 dark:border-emerald-700">
                <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <StethoscopeIcon className="h-5 w-5" />
                  Información Profesional del Médico
                </CardTitle>
                <CardDescription className="text-emerald-600 dark:text-emerald-400">
                  Complete los datos profesionales y credenciales médicas
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 pt-6 focus-ring">
                <div className="space-y-2">
                  <Label htmlFor="specialty" className="flex items-center gap-2 text-foreground text-emerald-600 dark:text-emerald-400">
                    <StethoscopeIcon className="h-4 w-4" />
                    Especialidad *
                  </Label>
                  <Input
                    id="specialty"
                    required={inputValues.isPhysician}
                    placeholder="Cardiología, Pediatría, etc."
                    defaultValue={""}
                    className="border-slate-300 bg-white  text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="professional_id" className="flex items-center gap-2 text-foreground text-emerald-600 dark:text-emerald-400">
                    <IdCardIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    Carnet de Identidad Profesional *
                  </Label>
                  <Input
                    id="professional_id"
                    required={inputValues.isPhysician}
                    placeholder="CIP-12345"
                    defaultValue={""}
                    className="border-slate-300 bg-white  text-slate-900"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-foreground text-emerald-600 dark:text-emerald-400">
                    <PhoneIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required={inputValues.isPhysician}
                    placeholder="+505 5745 - 7015"
                    defaultValue={""}
                    className="border-slate-300 bg-white  text-slate-900"
                  />
                </div>
              </CardContent>
            </Card>
          )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" size="lg" onClick={resetForm}>
            Cancelar
          </Button>
          <Button
            type="button"
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={onCreate}
          >
            Crear Usuario
          </Button>
        </div>
      </div>
    </div>
  );
}
