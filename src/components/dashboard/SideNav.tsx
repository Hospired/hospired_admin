// src/components/dashboard/layout/SideNav.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { navItems } from "./layout/config";
import { navIcons } from "./layout/nav-icons";
import { isNavItemActive } from "@/src/lib/is-nav-item-active";
import { NavItemConfig } from "@/types/nav";
import { Logo } from "../core/logo";

interface SideNavProps {
    openMobile?: boolean;
    onCloseMobile?: () => void;
}

export function SideNav({ openMobile = false, onCloseMobile }: SideNavProps) {
    const pathname = usePathname();

    const drawerContent = (
        <Box
        sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "neutral.900", // estilo oscuro
            color: "neutral.100",
        }}
        >
        {/* Header */}
        <Box sx={{ px: 3, py: 4, display: "flex", alignItems: "center", gap: 1 }}>
            <Logo color="light" width={100} height={32} />
        </Box>

        <Divider sx={{ borderColor: "neutral.700" }} />

        {/* Nav Items */}
        <Box sx={{ flex: 1, overflow: "auto", py: 2 }}>
            <List disablePadding>
            {navItems.map((item: NavItemConfig) => {
            const active = isNavItemActive({ ...item, pathname });
            const Icon = item.icon ? navIcons[item.icon] : null;

            return (
                <ListItemButton
                    key={item.key}
                    component={Link}
                    href={item.href ?? "#"}
                    onClick={onCloseMobile}
                    sx={{
                    px: 3,
                    py: 1.5,
                    mt: 0.5,
                    borderRadius: 1.5,
                    color: active ? "primary.main" : "neutral.300",
                    bgcolor: active ? "neutral.800" : "transparent",
                    "&:hover": { bgcolor: "neutral.800" },
                    }}
                >
                    {Icon && (
                    <ListItemIcon
                        sx={{
                        color: "inherit",
                        minWidth: "40px",
                        }}
                    >
                        <Icon size={22} weight={active ? "fill" : "regular"} />
                    </ListItemIcon>
                    )}
                    <ListItemText primary={item.title} />
                </ListItemButton>
                );
            })}
            </List>
        </Box>

        <Divider sx={{ borderColor: "neutral.700" }} />

        {/* Footer */}
        <Box sx={{ px: 3, py: 3 }}>
            <Typography variant="caption" color="neutral.500">
            v1.0.0
            </Typography>
        </Box>
        </Box>
    );

    return (
        <>
        {/* Mobile temporary drawer */}
        <Drawer
            variant="temporary"
            open={openMobile}
            onClose={onCloseMobile}
            ModalProps={{ keepMounted: true }}
            sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "var(--MobileNav-width)",
            },
            }}
        >
            {drawerContent}
        </Drawer>

        {/* Desktop persistent drawer */}
        <Drawer
            variant="permanent"
            open
            sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "var(--SideNav-width)",
                bgcolor: "neutral.900",
                borderRight: "none",
            },
            }}
        >
            {drawerContent}
        </Drawer>
        </>
    );
}