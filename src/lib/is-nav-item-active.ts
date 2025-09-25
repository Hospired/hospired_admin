// src/lib/is-nav-item-active.ts
import type { NavItemConfig } from "@/types/nav";

interface Params extends Omit<NavItemConfig, "title" | "icon" | "key"> {
    pathname: string;
    }

    export function isNavItemActive({ disabled, external, href, matcher, pathname }: Params): boolean {
    if (disabled) return false;
    if (!href) return false;
    if (matcher) return matcher(pathname);

    // Exact match o empieza con el href
    return pathname === href || pathname.startsWith(`${href}/`);
}
