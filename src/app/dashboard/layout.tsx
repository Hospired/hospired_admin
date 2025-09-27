/*import { AuthGuard } from "@/components/auth/AuthGuard"
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
}*/

import { Navbar14 } from "@/components/Navbar/Navbar"
import { AuthGuard } from "@/components/auth/AuthGuard"
import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthGuard>
            <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <header className="flex h-16 min-h-[64px] z-10 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4 w-full">
                <SidebarTrigger className="-ml-1" />
                <div className="relative flex-1">
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Navbar14 />
                </div>
            </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-5">{children}</div>
        </SidebarInset>
        </SidebarProvider>
        </AuthGuard>
        
    )
}
