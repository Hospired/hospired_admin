// src/components/dashboard/layout/MainNav.tsx
"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useUser } from "@/src/hooks/use-user";
import { supabase } from "@/src/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface MainNavProps {
    onOpenMobile: () => void;
    }

    const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.04),
    "&:hover": { backgroundColor: alpha(theme.palette.common.black, 0.06) },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: { width: "320px" },
    }));

    const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
    fontSize: 14,
    }));

    export function MainNav({ onOpenMobile }: MainNavProps) {
    const router = useRouter();
    const { user } = useUser();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace("/auth/sign-in");
    };

    return (
        <AppBar
        position="sticky"
        color="inherit"
        elevation={1}
        sx={{
            height: "var(--MainNav-height)",
            zIndex: "var(--MainNav-zIndex)",
            justifyContent: "center",
            background: "transparent",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
        >
        <Toolbar sx={{ minHeight: "var(--MainNav-height)", px: { xs: 1, md: 3 } }}>
            {/* Mobile menu button */}
            <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onOpenMobile}
            sx={{ display: { lg: "none" }, mr: 1 }}
            >
            <MenuIcon />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Hospital Admin
            </Typography>
            </Box>

            <Box sx={{ flex: 1 }} />

            {/* Search */}
            <Box sx={{ display: { xs: "none", md: "block" }, mr: 2 }}>
            <Search>
                <SearchIconWrapper>
                <SearchIcon fontSize="small" />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Buscar pacientes, citas..." inputProps={{ "aria-label": "search" }} />
            </Search>
            </Box>

            {/* User / avatar */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ display: { xs: "none", md: "block" } }}>
                {user ? `${user.email}` : ""}
            </Typography>
            <Avatar sx={{ width: 36, height: 36 }}>{user ? (user.email?.charAt(0).toUpperCase() ?? "U") : "U"}</Avatar>
            <IconButton onClick={handleLogout} sx={{ ml: 1 }}>
                <Typography variant="button" color="error">Salir</Typography>
            </IconButton>
            </Box>
        </Toolbar>
        </AppBar>
    );
}
