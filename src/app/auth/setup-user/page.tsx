"use client";
import { useState, ChangeEvent, useRef } from "react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
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
  GlobeIcon,
  MailIcon,
  FileTextIcon,
  Upload,
  AwardIcon as IdCardIcon,
  Check,
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

    const [physicianData, setPhysicianData] = useState({
    nationality: "",
    licenseNumber: "",
    specialty: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFileName, setAvatarFileName] = useState<string | null>(null);

  // Comboboxes
  const [nationalitySearch, setNationalitySearch] = useState("");
  const [specialtySearch, setSpecialtySearch] = useState("");
  const [nationalityFocused, setNationalityFocused] = useState(false);
  const [specialtyFocused, setSpecialtyFocused] = useState(false);

  const nationalityRef = useRef<HTMLDivElement>(null);

    // Datos de ejemplo para combobox
  const nationalities = [
    { value: "nicaraguense", label: "Nicaragüense" },
    { value: "costarricense", label: "Costarricense" },
    { value: "hondureno", label: "Hondureño" },
    { value: "salvadoreno", label: "Salvadoreño" },
    { value: "guatemalteco", label: "Guatemalteco" },
    { value: "panameño", label: "Panameño" },
    { value: "mexicano", label: "Mexicano" },
    { value: "estadounidense", label: "Estadounidense" },
    { value: "español", label: "Español" },
    { value: "otro", label: "Otro" },
  ];

  const specialties = [
    { value: "cardiologia", label: "Cardiología" },
    { value: "pediatria", label: "Pediatría" },
    { value: "neurologia", label: "Neurología" },
    { value: "dermatologia", label: "Dermatología" },
    { value: "ginecologia", label: "Ginecología" },
    { value: "traumatologia", label: "Traumatología" },
    { value: "oftalmologia", label: "Oftalmología" },
    { value: "psiquiatria", label: "Psiquiatría" },
    { value: "medicina-general", label: "Medicina General" },
    { value: "cirugia-general", label: "Cirugía General" },
    { value: "anestesiologia", label: "Anestesiología" },
    { value: "radiologia", label: "Radiología" },
    { value: "urologia", label: "Urología" },
    { value: "endocrinologia", label: "Endocrinología" },
    { value: "gastroenterologia", label: "Gastroenterología" },
  ];

    const filteredNationalities = nationalities.filter((nat) =>
    nat.label.toLowerCase().includes(nationalitySearch.toLowerCase())
  );

  const filteredSpecialties = specialties.filter((spec) =>
    spec.label.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  const specialtyRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (nationalityRef.current && !nationalityRef.current.contains(event.target as Node)) {
        setNationalityFocused(false);
      }
      if (specialtyRef.current && !specialtyRef.current.contains(event.target as Node)) {
        setSpecialtyFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const selectNationality = (value: string, label: string) => {
    setPhysicianData((prev) => ({ ...prev, nationality: value }));
    setNationalitySearch(label);
    setNationalityFocused(false);
  };

  const selectSpecialty = (value: string, label: string) => {
    setPhysicianData((prev) => ({ ...prev, specialty: value }));
    setSpecialtySearch(label);
    setSpecialtyFocused(false);
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

  function handlePhysicianChange(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setPhysicianData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

{/* Información Profesional del Médico */}
        {inputValues.isPhysician && (
          <Card className="border-2 border-emerald-300 dark:border-emerald-600 shadow-lg animate-in slide-in-from-top-4 duration-300">
            <CardHeader className="bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-200 dark:border-emerald-700">
              <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <StethoscopeIcon className="h-5 w-5" />
                Información Profesional del Médico
              </CardTitle>
              <CardDescription className="text-emerald-600 dark:text-emerald-400">
                Complete los datos profesionales y credenciales médicas
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 pt-6">
              {/* Nacionalidad */}
              <div className="space-y-2 relative" ref={nationalityRef}>
                <Label htmlFor="nationality" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <GlobeIcon className="h-4 w-4" />
                  Nacionalidad *
                </Label>
                <Input
                  id="nationality"
                  placeholder="Buscar o seleccionar nacionalidad..."
                  value={nationalitySearch}
                  onChange={(e) => setNationalitySearch(e.target.value)}
                  onFocus={() => setNationalityFocused(true)}
                  className="border-slate-300 dark:border-slate-600"
                  autoComplete="off"
                />
                {nationalityFocused && filteredNationalities.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredNationalities.map((nat) => (
                      <button
                        key={nat.value}
                        type="button"
                        onClick={() => selectNationality(nat.value, nat.label)}
                        className={cn("w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center gap-2", physicianData.nationality === nat.value && "bg-accent")}
                      >
                        <Check className={cn("h-4 w-4", physicianData.nationality === nat.value ? "opacity-100" : "opacity-0")} />
                        {nat.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* No. Licencia */}
              <div className="space-y-2">
                <Label htmlFor="licenseNumber" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <IdCardIcon className="h-4 w-4" />
                  No. Licencia *
                </Label>
                <Input id="licenseNumber" name="licenseNumber" required={inputValues.isPhysician} placeholder="LIC-12345" value={physicianData.licenseNumber} onChange={handlePhysicianChange} className="border-slate-300 dark:border-slate-600" />
              </div>

              {/* Especialidad */}
              <div className="space-y-2 relative" ref={specialtyRef}>
                <Label htmlFor="specialty" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <StethoscopeIcon className="h-4 w-4" />
                  Especialidad *
                </Label>
                <Input id="specialty" placeholder="Buscar o seleccionar especialidad..." value={specialtySearch} onChange={(e) => setSpecialtySearch(e.target.value)} onFocus={() => setSpecialtyFocused(true)} className="border-slate-300 dark:border-slate-600" autoComplete="off" />
                {specialtyFocused && filteredSpecialties.length > 0 && (
                  <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredSpecialties.map((spec) => (
                      <button
                        key={spec.value}
                        type="button"
                        onClick={() => selectSpecialty(spec.value, spec.label)}
                        className={cn("w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center gap-2", physicianData.specialty === spec.value && "bg-accent")}
                      >
                        <Check className={cn("h-4 w-4", physicianData.specialty === spec.value ? "opacity-100" : "opacity-0")} />
                        {spec.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <MailIcon className="h-4 w-4" />
                  Email *
                </Label>
                <Input id="email" name="email" type="email" required={inputValues.isPhysician} placeholder="doctor@ejemplo.com" value={physicianData.email} onChange={handlePhysicianChange} className="border-slate-300 dark:border-slate-600" />
              </div>

              {/* Teléfono */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <PhoneIcon className="h-4 w-4" />
                  Teléfono *
                </Label>
                <Input id="phone" name="phone" type="tel" required={inputValues.isPhysician} placeholder="+505 5745-7015" value={physicianData.phone} onChange={handlePhysicianChange} className="border-slate-300 dark:border-slate-600" />
              </div>

              {/* Notas */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes" className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <FileTextIcon className="h-4 w-4" />
                  Notas
                </Label>
                <Textarea id="notes" name="notes" placeholder="Información adicional sobre el médico..." value={physicianData.notes} onChange={handlePhysicianChange} className="border-slate-300 dark:border-slate-600 min-h-[100px]" />
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
