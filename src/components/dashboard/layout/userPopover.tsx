'use client';

import * as React from 'react';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import RouterLink from 'next/link';
import { GearSixIcon, UserIcon, SignOutIcon } from '@phosphor-icons/react';

import { useUser } from '@/src/hooks/use-user';
import { paths } from '@/paths';
import { supabase } from '@/src/lib/supabaseClient';;

interface UserPopoverProps {
    anchorEl: Element | null;
    onClose: () => void;
    open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps) {
    const { checkSession } = useUser();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        await checkSession?.();
        onClose();
    };

    return (
        <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        PaperProps={{ sx: { width: 240 } }}
        >
        <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1">Usuario</Typography>
            <Typography variant="body2" color="text.secondary">usuario@hospital.com</Typography>
        </Box>
        <Divider />
        <MenuList>
            <MenuItem component={RouterLink} href={paths.dashboard.settings} onClick={onClose}>
            <ListItemIcon><GearSixIcon /></ListItemIcon> Configuración
            </MenuItem>
            <MenuItem component={RouterLink} href={paths.dashboard.settings} onClick={onClose}>
            <ListItemIcon><GearSixIcon /></ListItemIcon> Configuración
            </MenuItem>
            <MenuItem onClick={handleSignOut}>
            <ListItemIcon><SignOutIcon /></ListItemIcon> Cerrar sesión
            </MenuItem>
        </MenuList>
        </Popover>
    );
}
