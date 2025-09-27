
# Hopired Addmin

A brief description of what this project does and who it's for

  ![Vista del Dashboard](./assets/hospired.png)




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Sistema Hospitalario - Gestión de Citas Médicas

Un sistema completo de gestión hospitalaria desarrollado con Next.js 15, diseñado para el seguimiento y administración de citas médicas, pacientes, personal y recursos hospitalarios.

## 🏥 Características Principales

### Dashboard Principal
- Vista general con métricas clave del hospital
- Estadísticas de citas, pacientes y ocupación
- Actividad reciente y próximas citas
- Indicadores de rendimiento en tiempo real

### Gestión de Pacientes
- **Lista de Pacientes**: Búsqueda, filtrado y gestión completa
- **Registro de Nuevos Pacientes**: Formulario completo con información médica
- Historial médico y datos de contacto
- Gestión de seguros y información de emergencia

### Sistema de Citas
- **Calendario Interactivo**: Vista mensual con citas programadas
- **Programación de Citas**: Formulario avanzado con selección de médicos y especialidades
- **Interconsultas**: Gestión de referencias entre especialidades
- Estados de citas (Programada, En Curso, Completada, Cancelada)

### Consultas Médicas
- **Consultas Activas**: Seguimiento en tiempo real
- **Historial de Consultas**: Búsqueda avanzada y filtros
- Diagnósticos, tratamientos y seguimientos
- Notas médicas y prescripciones

### Admisiones Hospitalarias
- **Gestión de Admisiones**: Lista completa con estados
- **Nueva Admisión**: Formulario detallado para ingresos
- Seguimiento de camas y recursos
- Tipos de admisión (Urgencia, Programada, Observación)

### Exámenes Médicos
- **Lista de Exámenes**: Gestión completa con estados
- **Programación de Exámenes**: Asignación por categorías
- Seguimiento de resultados y reportes
- Integración con laboratorios

### Personal Médico
- **Gestión de Personal**: Médicos, enfermeras y administrativos
- **Roles y Permisos**: Sistema de autorización granular
- Horarios y disponibilidad
- Especialidades y certificaciones

### Reportes y Analytics
- **Gráficos Interactivos**: Visualización de datos con Recharts
- Reportes de citas por período
- Análisis de especialidades médicas
- Métricas de ingresos y ocupación
- Exportación de datos

### Configuración del Sistema
- **Servicios Médicos**: Gestión de especialidades
- **Consultorios**: Administración de espacios físicos
- **Usuarios del Sistema**: Control de acceso y permisos
- Configuraciones generales

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15 con App Router
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts para visualización de datos
- **Icons**: Lucide React
- **TypeScript**: Para tipado estático
- **Responsive Design**: Mobile-first approach

## 🎨 Diseño

- **Tema**: Profesional con esquema de colores oscuros
- **Colores Principales**: Azul médico (#0ea5e9) y verde hospitalario (#10b981)
- **Tipografía**: Sistema de fuentes optimizado para legibilidad
- **Accesibilidad**: Cumple con estándares WCAG
- **Responsive**: Optimizado para dispositivos móviles y desktop

## 📁 Estructura del Proyecto

\`\`\`
app/
├── dashboard/
│   ├── layout.tsx                 # Layout principal con sidebar
│   ├── page.tsx                   # Dashboard principal
│   ├── pacientes/
│   │   ├── page.tsx              # Lista de pacientes
│   │   └── nuevo/page.tsx        # Registro de pacientes
│   ├── citas/
│   │   ├── page.tsx              # Gestión de citas
│   │   ├── calendario/page.tsx   # Vista de calendario
│   │   ├── programacion/page.tsx # Programar citas
│   │   └── interconsultas/page.tsx # Interconsultas
│   ├── consultas/
│   │   ├── page.tsx              # Consultas activas
│   │   └── historial/page.tsx    # Historial médico
│   ├── admisiones/
│   │   ├── page.tsx              # Lista de admisiones
│   │   └── nuevo/page.tsx        # Nueva admisión
│   ├── examenes/
│   │   ├── page.tsx              # Lista de exámenes
│   │   └── nuevo/page.tsx        # Programar examen
│   ├── personal/
│   │   └── page.tsx              # Gestión de personal
│   ├── reportes/
│   │   └── page.tsx              # Reportes y analytics
│   └── configuracion/
│       └── page.tsx              # Configuración del sistema
├── components/
│   ├── app-sidebar.tsx           # Sidebar de navegación
│   ├── nav-main.tsx              # Navegación principal
│   ├── nav-projects.tsx          # Navegación de proyectos
│   ├── nav-user.tsx              # Navegación de usuario
│   └── team-switcher.tsx         # Selector de equipo
└── globals.css                   # Estilos globales y tema
\`\`\`

## 🚀 Instalación y Uso

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

1. **Clonar el repositorio**
\`\`\`bash
git clone [repository-url]
cd hospital-system
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Ejecutar en desarrollo**
\`\`\`bash
npm run dev
\`\`\`

4. **Acceder al sistema**
\`\`\`
http://localhost:3000
\`\`\`

## 📊 Funcionalidades Clave

### Dashboard
- Métricas en tiempo real
- Gráficos de actividad
- Alertas y notificaciones
- Accesos rápidos

### Gestión de Citas
- Calendario visual interactivo
- Programación automática
- Recordatorios automáticos
- Gestión de cancelaciones

### Seguimiento de Pacientes
- Historial médico completo
- Seguimiento de tratamientos
- Gestión de documentos
- Comunicación con familiares

### Reportes Avanzados
- Análisis de tendencias
- Métricas de rendimiento
- Reportes personalizables
- Exportación de datos

## 🔒 Seguridad

- Autenticación de usuarios
- Control de acceso basado en roles
- Protección de datos médicos
- Cumplimiento con normativas de salud

## 📱 Responsive Design

El sistema está completamente optimizado para:
- **Desktop**: Experiencia completa con sidebar
- **Tablet**: Navegación adaptada
- **Mobile**: Interfaz táctil optimizada

## 🎯 Casos de Uso

1. **Recepcionistas**: Programación de citas y registro de pacientes
2. **Médicos**: Consulta de historiales y gestión de citas
3. **Enfermeras**: Seguimiento de pacientes y administración
4. **Administradores**: Reportes, configuración y gestión de personal
5. **Directivos**: Analytics y métricas de rendimiento

## 📈 Métricas y KPIs

- Tiempo promedio de espera
- Tasa de ocupación de consultorios
- Satisfacción del paciente
- Eficiencia del personal médico
- Ingresos por especialidad

## 🔄 Actualizaciones Futuras

- Integración con sistemas de laboratorio
- Telemedicina y consultas virtuales
- App móvil nativa
- Integración con dispositivos médicos
- IA para diagnóstico asistido

## 📞 Soporte

Para soporte técnico o consultas sobre el sistema, contactar al equipo de desarrollo.

---

**Desarrollado con ❤️ para mejorar la atención médica**
