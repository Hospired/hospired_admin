// src/app/dashboard/layout.tsx
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import GlobalStyles from "@mui/material/GlobalStyles";
import { AuthGuard } from "@/src/components/auth/AuthGuard";
import { MainNav } from "@/src/components/dashboard/MainNav";
import { SideNav } from "@/src/components/dashboard/SideNav";

interface LayoutProps {
    children: React.ReactNode;
    }

    export default function DashboardLayout({ children }: LayoutProps): React.JSX.Element {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleOpenMobile = () => setMobileOpen(true);
    const handleCloseMobile = () => setMobileOpen(false);

    return (
        <AuthGuard>
        <GlobalStyles
            styles={{
            body: {
                // variables que puedes ajustar
                "--MainNav-height": "64px",
                "--MainNav-zIndex": 1200,
                "--SideNav-width": "280px",
                "--SideNav-zIndex": 1100,
                "--MobileNav-width": "320px",
                "--MobileNav-zIndex": 1100,
            },
            }}
        />
        <Box
            sx={{
            bgcolor: "background.default",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            minHeight: "100vh",
            }}
        >
            {/* SideNav recibe estado para mobile */}
            <SideNav openMobile={mobileOpen} onCloseMobile={handleCloseMobile} />

            <Box
            sx={{
                display: "flex",
                flex: "1 1 auto",
                flexDirection: "column",
                pl: { lg: "var(--SideNav-width)" }, // deja espacio para el SideNav en desktop
            }}
            >
            {/* MainNav recibe handler para abrir drawer en móvil */}
            <MainNav onOpenMobile={handleOpenMobile} />

            <main>
                <Container maxWidth="xl" sx={{ py: 6 }}>
                {children}
                </Container>
            </main>
            </Box>
        </Box>
        </AuthGuard>
    );
}
