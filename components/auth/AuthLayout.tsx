"use client";

import * as React from "react";
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import { Logo } from "@/components/core/logo";

interface AuthLayoutProps {
    children: React.ReactNode;
    }

    export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <Box
        sx={{
            display: { xs: "flex", lg: "grid" },
            flexDirection: "column",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "100vh",
        }}
        >
        {/* Columna izquierda - formulario */}
        <Box
            sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            justifyContent: "center",
            px: 4,
            }}
        >
            <Box sx={{ maxWidth: 420, width: "100%", mx: "auto" }}>
                {/* Logo arriba */}
                <Box sx={{ p: 3, textAlign: "center" }}>
                    <Link href="/" style={{ display: "inline-block" }}>
                    <Logo width={140} height={40} />
                    </Link>
                </Box>
            {children}
            </Box>
        </Box>

        {/* Columna derecha - bienvenida */}
        <Box
            sx={{
            alignItems: "center",
            background:
                "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            color: "white",
            display: { xs: "none", lg: "flex" },
            justifyContent: "center",
            p: 6,
            }}
        >
            <Stack spacing={3} maxWidth={400} textAlign="center">
            <Typography variant="h4" fontWeight="bold">
                Bienvenido a{" "}
                <Box component="span" sx={{ color: "#15b79e" }}>
                Tu Dashboard
                </Box>
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
                Dae Seguimientos a tus citas medicas
            </Typography>
            <Box
                component="img"
                src=""
                alt="Auth Widgets"
                sx={{ width: "100%", maxWidth: 350, borderRadius: 2 }}
            />
            </Stack>
        </Box>
        </Box>
    );
}
