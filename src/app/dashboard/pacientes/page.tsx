"use client";

import { useEffect, useState } from "react";
import { getAllPatients } from "@/backend-api/apiService";
import { PatientRes } from "@/backend-api/dtos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";

// Tipo local adaptado
type TablePatient = {
  id: number;
  nombreCompleto: string;
  edad: number | null;
  telefono: string;
  cedula: string;
  ocupacion: string;
  municipio: string;
  inss: string;
  direccion: string;
  notasMedicas: string;
};

export default function PacientesPage() {
  const [patients, setPatients] = useState<TablePatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, userData, isLoading } = useUser();

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await getAllPatients();

        // ⚙️ Mapeo: construimos nombre completo desde el objeto anidado app_users
        const mapped = data.map((p: any) => {
          const user = p.app_users || {};
          const fullName = [
            userData?.firstName,
            user.secondName,
            user.firstSurname,
            user.secondSurname,
          ]
            .filter(Boolean)
            .join(" ");

          const edad = user.dateOfBirth
            ? Math.floor(
                (Date.now() - new Date(user.dateOfBirth).getTime()) / 31557600000
              )
            : null;

          return {
            id: p.id,
            nombreCompleto: fullName || "—",
            edad,
            telefono: p.phone ?? "—",
            cedula: p.nationalId ?? "—",
            ocupacion: p.occupation ?? "—",
            municipio: p.municipalityId?.toString() ?? "—",
            inss: p.inss?.toString() ?? "—",
            direccion: p.address ?? "—",
            notasMedicas: p.medicalNotes ?? "—",
          };
        });

        setPatients(mapped);
      } catch (err: any) {
        console.error("Error cargando pacientes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Cargando pacientes...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center text-red-600">
        <AlertCircle className="h-6 w-6 mb-2" />
        <p>Error al cargar los pacientes:</p>
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Pacientes</h1>
        <Link href="/dashboard/pacientes/nuevo">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Nuevo Paciente
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm border border-border">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Lista de Pacientes Registrados
          </CardTitle>
        </CardHeader>
        <CardContent>
          {patients.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              No hay pacientes registrados todavía.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre Completo</TableHead>
                    <TableHead>Edad</TableHead>
                    <TableHead>Teléfono</TableHead>
                    <TableHead>Cédula</TableHead>
                    <TableHead>Ocupación</TableHead>
                    <TableHead>Municipio</TableHead>
                    <TableHead>INSS</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Notas Médicas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patients.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.id}</TableCell>
                      <TableCell>{p.nombreCompleto}</TableCell>
                      <TableCell>{p.edad ?? "—"}</TableCell>
                      <TableCell>{p.telefono}</TableCell>
                      <TableCell>{p.cedula}</TableCell>
                      <TableCell>{p.ocupacion}</TableCell>
                      <TableCell>{p.municipio}</TableCell>
                      <TableCell>{p.inss}</TableCell>
                      <TableCell>{p.direccion}</TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {p.notasMedicas}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
