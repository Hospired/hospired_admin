// src/types/nav.ts
export interface NavItemConfig {
    key: string;
    title: string;
    href?: string;
    icon?: string; // nombre del ícono en nav-icons.ts
    external?: boolean;
    disabled?: boolean;
    matcher?: (pathname: string) => boolean; // opcional, para paths dinámicos
}
