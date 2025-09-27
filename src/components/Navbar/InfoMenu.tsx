// src/components/layout/InfoMenu.tsx
"use client";

import { InfoIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function InfoMenu({ onItemClick }: { onItemClick?: (item: string) => void }) {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="size-8 rounded-full">
            <InfoIcon size={16} />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={() => onItemClick?.("About")}>About</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onItemClick?.("Help")}>Help</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
    );
}
