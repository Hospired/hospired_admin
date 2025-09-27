import { AuthGuard } from "@/components/auth/AuthGuard"
import { AppSidebar } from "@/components/app-sidebar"
    import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar"

    export default function Page({children}:{ children: React.ReactNode}) {
    return (
        <AuthGuard>
            <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </SidebarProvider>
        </AuthGuard>
    )
}
