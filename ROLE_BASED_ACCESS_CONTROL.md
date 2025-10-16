# Role-Based Access Control (RBAC) Implementation

## Overview
This document describes the role-based access control system implemented in the Hospired Admin application. The system allows administrators to manage user roles and controls which navigation items are visible to different user types.

## User Roles

### 1. Administrator (Super User)
- **Field**: `is_super_user = true`
- **Access**: Full access to all pages and features
- **Visible Navigation**:
  - Dashboard (Home)
  - Pacientes (Patients)
  - Médicos (Doctors)
  - Citas (Appointments)
  - Calendario (Calendar)
  - Centros de salud (Healthcare Centers)
  - Personal (Staff)
  - Reportes (Reports)
  - Configuración (Configuration)
  - All project shortcuts (Consultas, Programación, etc.)

### 2. Doctor (Physician)
- **Field**: `is_physician = true` and `is_super_user = false`
- **Access**: Limited to medical functions
- **Visible Navigation**:
  - Dashboard (Home)
  - Pacientes (Patients)
  - Citas (Appointments)
  - Calendario (Calendar)
  - Consultas Activas (Active Consultations)
  - Programación (Scheduling)

### 3. Regular User
- **Field**: `is_physician = false` and `is_super_user = false`
- **Access**: Minimal access
- **Visible Navigation**:
  - Dashboard (Home) only

## Configuration Page

### Admin User Management
The configuration page (`/dashboard/configuracion`) includes a new "Usuarios del Sistema" tab that allows administrators to:

1. **View All Admin Users**: Displays a list of all admin users with their current roles
2. **Update Roles**: Toggle switches to change user roles in real-time
   - **Admin Toggle**: Grants/revokes administrator privileges
   - **Médico Toggle**: Grants/revokes doctor privileges

### Role Update Process
1. Navigate to `/dashboard/configuracion`
2. Click on the "Usuarios del Sistema" tab
3. Find the user you want to modify
4. Toggle the "Admin" or "Médico" switches
5. Changes are saved immediately to the database
6. The user's navigation will update on their next page load

## Technical Implementation

### Database Structure
The `admin_users` table includes the following fields:
```sql
- id: UUID (primary key)
- first_name: VARCHAR
- second_name: VARCHAR (nullable)
- first_last_name: VARCHAR
- second_last_name: VARCHAR (nullable)
- is_physician: BOOLEAN
- is_super_user: BOOLEAN
- date_of_birth: DATE (nullable)
- avatar: VARCHAR (nullable)
- created_at: TIMESTAMP
```

### API Functions
**File**: `src/backend-api/apiService.ts`

#### `getAllAdminUsers(): Promise<AdminUserRes[]>`
Fetches all admin users from the database.

#### `updateAdminUserRole(id: string, updates: { isSuperUser?: boolean; isPhysician?: boolean })`
Updates the role of a specific admin user.

### Components

#### AppSidebar Component
**File**: `src/components/app-sidebar.tsx`

The `AppSidebar` component now uses the `useUser()` hook to get the current user's role information and filters the navigation items accordingly:

```typescript
const { userData, isLoading } = useUser()

const filteredNavMain = React.useMemo(() => {
  if (isLoading || !userData) return []
  
  if (userData.isSuperUser) {
    return data.navMain // All items
  }
  
  if (userData.isPhysician) {
    return data.navMain.filter(item => {
      const doctorAllowedPages = [...]
      return doctorAllowedPages.includes(item.url)
    })
  }
  
  return data.navMain.filter(item => item.url === "/dashboard")
}, [userData, isLoading])
```

#### Configuration Page
**File**: `src/app/dashboard/configuracion/page.tsx`

The configuration page includes:
- Real-time loading of admin users from the database
- Visual indicators for user roles (Admin badge, Doctor badge, etc.)
- Toggle switches for easy role management
- Search functionality to find specific users

## Usage Examples

### Example 1: Making a User an Administrator
1. Log in as an administrator
2. Go to `/dashboard/configuracion`
3. Click "Usuarios del Sistema" tab
4. Find the user "Dr. Carlos Mendoza"
5. Toggle the "Admin" switch to ON
6. The user now has full administrator access

### Example 2: Creating a Doctor-Only Account
1. Create a new admin user account
2. By default, they will have minimal access
3. Go to configuration page
4. Toggle only the "Médico" switch to ON
5. Leave "Admin" switch OFF
6. The user can now access patient and appointment management but not system configuration

## Security Considerations

1. **Database-Level Enforcement**: Role checks are performed at the database level through Row Level Security (RLS) policies in Supabase
2. **Client-Side Filtering**: Navigation filtering is done client-side for UX purposes
3. **Server-Side Validation**: API endpoints should implement their own authorization checks
4. **Audit Trail**: All role changes should be logged for security auditing

## Future Enhancements

Potential improvements to the RBAC system:
1. Add more granular permission levels (e.g., read-only vs read-write)
2. Implement role hierarchies
3. Add page-level access control guards
4. Create audit logs for role changes
5. Add bulk role assignment features
6. Implement custom role definitions

## Testing

To test the role-based access control:
1. Create test users with different roles
2. Log in as each user type
3. Verify that navigation items are filtered correctly
4. Attempt to access restricted pages directly via URL
5. Verify that role updates take effect immediately

## Support

For questions or issues with the RBAC implementation, please contact the development team or create an issue in the repository.
