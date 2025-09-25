// src/components/dashboard/layout/MainNav.tsx
'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { BellIcon, ListIcon, MagnifyingGlassIcon, UsersIcon } from '@phosphor-icons/react';

import { usePopover } from '@/src/hooks/use-propover';
import { MobileNav } from './movileNav';
import { UserPopover } from './userPopover';

export function MainNav(): React.JSX.Element {
    const [openMobileNav, setOpenMobileNav] = React.useState(false);

    const userPopover = usePopover<HTMLDivElement>();

    return (
        <React.Fragment>
        <Box
            component="header"
            sx={{
            borderBottom: '1px solid var(--mui-palette-divider)',
            backgroundColor: 'var(--mui-palette-background-paper)',
            position: 'sticky',
            top: 0,
            zIndex: 'var(--MainNav-zIndex)',
            }}
        >
            <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
            >
            {/* Left section: Mobile menu and search */}
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <IconButton
                onClick={() => setOpenMobileNav(true)}
                sx={{ display: { lg: 'none' } }}
                >
                <ListIcon />
                </IconButton>

                <Tooltip title="Buscar">
                <IconButton>
                    <MagnifyingGlassIcon />
                </IconButton>
                </Tooltip>
            </Stack>

            {/* Right section: Contacts, notifications, user */}
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Tooltip title="Contactos">
                <IconButton>
                    <UsersIcon />
                </IconButton>
                </Tooltip>

                <Tooltip title="Notificaciones">
                <Badge badgeContent={4} color="success" variant="dot">
                    <IconButton>
                    <BellIcon />
                    </IconButton>
                </Badge>
                </Tooltip>

                <Avatar
                src="/assets/avatar.png"
                onClick={userPopover.handleOpen}
                ref={userPopover.anchorRef}
                sx={{ cursor: 'pointer' }}
                />
            </Stack>
            </Stack>
        </Box>

        {/* User popover */}
        <UserPopover
            anchorEl={userPopover.anchorRef.current}
            open={userPopover.open}
            onClose={userPopover.handleClose}
        />

        {/* Mobile navigation drawer */}
        <MobileNav
            open={openMobileNav}
            onClose={() => setOpenMobileNav(false)}
        />
        </React.Fragment>
    );
}
