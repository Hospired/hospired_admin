// src/components/dashboard/layout/mobile-nav.tsx
'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';
import { ArrowSquareUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareUpRight';

import { paths } from '@/paths';
import { Logo } from '../../core/logo';
import { navItems } from './config';
import { navIcons } from './nav-icons';
import { isNavItemActive } from '@/src/lib/is-nav-item-active';
import type { NavItemConfig } from '@/types/nav';

export interface MobileNavProps {
  open?: boolean;
  onClose?: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps): React.JSX.Element {
    const pathname = usePathname();

    const drawerContent = (
        <Stack spacing={2} sx={{ p: 3 }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
            <Logo color="light" height={32} width={122} />
        </Box>

        <Box
            sx={{
            alignItems: 'center',
            backgroundColor: 'var(--mui-palette-neutral-950)',
            border: '1px solid var(--mui-palette-neutral-700)',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            p: '4px 12px',
            }}
        >
            <Box sx={{ flex: '1 1 auto' }}>
            <Typography color="var(--mui-palette-neutral-400)" variant="body2">
                Workspace
            </Typography>
            <Typography color="inherit" variant="subtitle1">
                Hospital Admin
            </Typography>
            </Box>
            <CaretUpDownIcon />
        </Box>

        <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />

        <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
            <ListNavItems pathname={pathname} />
        </Box>

        <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />

        <Stack spacing={2} sx={{ p: '12px' }}>
            <Typography color="var(--mui-palette-neutral-100)" variant="subtitle2">
            Need more features?
            </Typography>
            <Typography color="var(--mui-palette-neutral-400)" variant="body2">
            Check out our Pro solution template.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
                component="img"
                alt="Pro version"
                src="/assets/devias-kit-pro.png"
                sx={{ height: 'auto', width: '160px' }}
            />
            </Box>
            <Button
            component="a"
            endIcon={<ArrowSquareUpRightIcon fontSize="var(--icon-fontSize-md)" />}
            fullWidth
            href="https://material-kit-pro-react.devias.io/"
            sx={{ mt: 2 }}
            target="_blank"
            variant="contained"
            >
            Pro version
            </Button>
        </Stack>
        </Stack>
    );

    return (
        <Drawer
        PaperProps={{
            sx: {
            '--MobileNav-background': 'var(--mui-palette-neutral-950)',
            '--MobileNav-color': 'var(--mui-palette-common-white)',
            '--NavItem-color': 'var(--mui-palette-neutral-300)',
            '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
            '--NavItem-active-background': 'var(--mui-palette-primary-main)',
            '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
            '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
            '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
            '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
            '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
            bgcolor: 'var(--MobileNav-background)',
            color: 'var(--MobileNav-color)',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            scrollbarWidth: 'none',
            width: 'var(--MobileNav-width)',
            zIndex: 'var(--MobileNav-zIndex)',
            '&::-webkit-scrollbar': { display: 'none' },
            },
        }}
        onClose={onClose}
        open={open}
        >
        {drawerContent}
        </Drawer>
    );
    }

    // Renderiza la lista de navegación
    function ListNavItems({ pathname }: { pathname: string }): React.JSX.Element {
    const menu: NavItemConfig[] = [
        { key: 'dashboard', title: 'Inicio', href: paths.dashboard.root, icon: 'home' },
        { key: 'pacientes', title: 'Pacientes', href: paths.dashboard.pacientes, icon: 'people' },
        { key: 'citas', title: 'Citas', href: paths.dashboard.citas, icon: 'calendar' },
        { key: 'consultas', title: 'Consultas', href: paths.dashboard.consultas, icon: 'medical' },
        { key: 'examenes', title: 'Exámenes', href: paths.dashboard.examenes, icon: 'description' },
    ];

    return (
        <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {menu.map((item) => {
            const active = isNavItemActive({ href: item.href, pathname });
            const Icon = item.icon ? navIcons[item.icon] : null;
            return (
            <li key={item.key}>
            <Box
            component={RouterLink as any} // forzar a "any"
            href={item.href!} // asegura que no sea undefined
            sx={{
                alignItems: 'center',
                borderRadius: 1,
                color: active ? 'var(--NavItem-active-color)' : 'var(--NavItem-color)',
                display: 'flex',
                gap: 1,
                p: '6px 16px',
                textDecoration: 'none',
            }}
            >
            {Icon && <Icon fontSize="var(--icon-fontSize-md)" fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'} />}
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>{item.title}</Typography>
            </Box>

            </li>
            );
        })}
        </Stack>
    );
}