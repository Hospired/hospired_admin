"use client";

import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function SettingsMenu({
    onItemClick,
}: {
    onItemClick?: (item: string) => void;
}) {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
            size="icon"
            variant="ghost"
            className="size-8 rounded-full"
            aria-label="Open settings menu"
            >
            <SettingsIcon size={16} aria-hidden="true" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onItemClick?.("profile")}>
            Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onItemClick?.("account")}>
            Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onItemClick?.("preferences")}>
            Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onItemClick?.("logout")}>
            Log out
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    );
}
