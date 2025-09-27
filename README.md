<div align="center">
  <a href="https://github.com/Hospired">
    <img src="src/assets/hospired.png" alt="Logo" width="300">
  </a>
</div>

<h3 align="center">Hospired · Asistente Virtual</h3>


<p align="center">
  Asistente virtual seguro y escalable para la gestión integral de citas médicas, pacientes y recursos hospitalarios.
</p>

---

![Estado](https://img.shields.io/badge/estado-en%20desarrollo-yellow)
![Versión](https://img.shields.io/badge/version-1.0.0-blue)
![Licencia](https://img.shields.io/badge/licencia-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC)

---

## Características

- Gestión de pacientes, admisiones y consultas
- Programación de citas con vista de calendario
- Administración de personal hospitalario
- Reportes y estadísticas en tiempo real
- Integración con Supabase para backend seguro
- Interfaz moderna con **Next.js 15 + TailwindCSS v4**

---

## Tecnologías Utilizadas

- **Framework**: [Next.js](https://nextjs.org) 15 con App Router  
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) y Material UI  
- **Styling**: Tailwind CSS v4  
- **Icons**: [Lucide React](https://lucide.dev/)  
- **TypeScript**: Tipado estático  
- **Backend**: [Supabase](https://supabase.com/)  

---

## Estructura del Proyecto

```plaintext
app/
├── dashboard/
│   ├── layout.tsx                  # Layout principal con sidebar
│   ├── page.tsx                    # Dashboard principal
│   ├── pacientes/
│   │   ├── page.tsx                # Lista de pacientes
│   │   └── nuevo/page.tsx          # Registro de pacientes
│   ├── citas/
│   │   ├── page.tsx                # Gestión de citas
│   │   ├── calendario/page.tsx     # Vista de calendario
│   │   ├── programacion/page.tsx   # Programar citas
│   │   └── interconsultas/page.tsx # Interconsultas
│   ├── consultas/
│   │   ├── page.tsx                # Consultas activas
│   │   └── historial/page.tsx      # Historial médico
│   ├── admisiones/
│   │   ├── page.tsx                # Lista de admisiones
│   │   └── nuevo/page.tsx          # Nueva admisión
│   ├── examenes/
│   │   ├── page.tsx                # Lista de exámenes
│   │   └── nuevo/page.tsx          # Programar examen
│   ├── personal/
│   │   └── page.tsx                # Gestión de personal
│   ├── reportes/
│   │   └── page.tsx                # Reportes y analytics
│   └── configuracion/
│       └── page.tsx                 # Configuración general
├── components/
│   ├── app-sidebar.tsx             # Sidebar de navegación
│   ├── nav-main.tsx                # Navegación principal
│   └── team-switcher.tsx           # Selector de equipo
└── globals.css                      # Estilos globales
```

## Instalación y Uso

Antes de instalar el proyecto, asegúratse de tener intalado:

- [Node.js](https://nodejs.org/es) Version: >= 18
- npm (Recomendado), pnpm, yarn o bun instalado

1. **Clonar el repositorio**
```bash

git clone https://github.com/Hospired/hospired_admin.git

cd hospired_admin
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecute el servidor de desarrollo**
```bash
npm run dev
```

4. **Acceder al sistema**
<p>Abra http://localhost:3000 con su navegador para ver el resultado.</p>

```
http://localhost:3000
```

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración mínima:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```
⚠️ Estas claves se obtienen desde el panel de Trello.
Si no tienes acceso, contacta al administrador del proyecto.

## Contacto

Gmail: 26martinez.508@gmail.com
Telefono: +505 5745 - 7015
