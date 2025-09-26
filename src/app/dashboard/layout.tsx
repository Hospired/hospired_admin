// src/app/dashboard/layout.tsx
/*'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import { AuthGuard } from '@/src/components/auth/AuthGuard';
import { SideNav } from '@/src/components/dashboard/layout/SideNav';
import { MainNav } from '@/src/components/dashboard/layout/MainNav';
import { TooltipProvider } from '@/components/ui/tooltip';

interface LayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps): React.JSX.Element {
    const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

    return (
    <AuthGuard>

        <Box
            sx={{
            display: 'flex',
            minHeight: '100vh',
            bgcolor: 'background.default',
            }}
        >
            { Side Navigation }
            <SideNav openMobile={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />

            { Main content }
            <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                pl: { lg: 'var(--SideNav-width)' },
            }}
            >
            { Top Navigation }
            <MainNav onMobileNavOpen={() => setMobileNavOpen(true)} />

            { Page content }
            <main>
                <TooltipProvider delayDuration={300}>
                    <Container maxWidth="xl" sx={{ py: '80px' }}>
                        {children}
                    </Container>
                </TooltipProvider>

            </main>
            </Box>
        </Box>
        </AuthGuard>
    );
}*/

import { AuthGuard } from "@/src/components/auth/AuthGuard"
import { Navbar } from "@/src/components/dashboard/Navbar/Navbar"
import { TooltipProvider } from "@radix-ui/react-tooltip"

export default function DashboardLayout({children} : {children: React.ReactElement}){
    return(
        <AuthGuard>
            <TooltipProvider>
                <div className="flex w-full h-full">
                    <div className="hidden xl:block w-80 h-full xl:fixed">
                        Sidebar
                    </div>
                    <div className="w-full xl:ml-80">
                        <Navbar />
                        <div className="p-6 bg-[#fafbfc] dark:bg-secondary">
                            {children}
                        </div>
                    </div>
                </div>
            </TooltipProvider>
        </AuthGuard>
    )
}