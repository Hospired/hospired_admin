"use client";

import { BellIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    unread?: boolean;
}

export default function NotificationMenu({
    notifications = [],
    onNotificationClick,
    }: {
    notifications?: Notification[];
    onNotificationClick?: (notificationId: string) => void;
    }) {
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
            size="icon"
            variant="ghost"
            className="size-8 rounded-full relative"
            >
            <BellIcon size={16} aria-hidden="true" />
            {notifications.some((n) => n.unread) && (
                <span className="absolute right-1 top-1 block size-2 rounded-full bg-red-500" />
            )}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
            <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
            ) : (
            notifications.map((n) => (
                <DropdownMenuItem
                key={n.id}
                onClick={() => onNotificationClick?.(n.id)}
                className={n.unread ? "font-bold" : ""}
                >
                <div className="flex flex-col gap-1">
                    <span>{n.title}</span>
                    <span className="text-xs text-muted-foreground">
                    {n.message}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                    {n.time}
                    </span>
                </div>
                </DropdownMenuItem>
            ))
            )}
        </DropdownMenuContent>
        </DropdownMenu>
    );
}
