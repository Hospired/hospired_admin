"use client";
import * as React from "react";
import { useId, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import NotificationMenu from "./NotificationMenu";
import SettingsMenu from "./SettingMenu";
import { Input } from "@/components/ui/input";
import { UserMenu } from "../user-menu";
import { signOutUser } from "@/backend-api/apiService";
import { useUser } from "@/hooks/use-user";

import { cn } from "@/lib/utils";
import { ModeToggle } from "../mode-toggle";

// Types
export interface Navbar14Props extends React.HTMLAttributes<HTMLElement> {
  searchPlaceholder?: string;
  searchValue?: string;
  testMode?: boolean;
  showTestMode?: boolean;
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    time: string;
    unread?: boolean;
  }>;

  onSearchChange?: (value: string) => void;
  onTestModeChange?: (enabled: boolean) => void;
  onLayoutClick?: () => void;
  onAddClick?: () => void;
  onInfoItemClick?: (item: string) => void;
  onNotificationClick?: (notificationId: string) => void;
  onSettingsItemClick?: (item: string) => void;
}

export const Navbar14 = React.forwardRef<HTMLElement, Navbar14Props>(
  (
    {
      className,
      searchPlaceholder = "Search...",
      searchValue,
      testMode: controlledTestMode,
      showTestMode = true,
      notifications,
      onSearchChange,
      onTestModeChange,
      onLayoutClick,
      onAddClick,
      onInfoItemClick,
      onNotificationClick,
      onSettingsItemClick,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const router = useRouter();
    const { user, userData, isLoading } = useUser();

    const callSignOutUser = useCallback(async () => {
      try {
        await signOutUser();
        router.push("/auth/sign-in");
      } catch (error) {
        // TODO
      }
    }, [router]);

    return (
      <header
        ref={ref}
        className={cn("border-b px-4 md:px-6 [&_*]:no-underline", className)}
        {...props}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="relative flex-1">
            <Input
              id={`input-${id}`}
              className="peer h-8 w-full max-w-xs ps-8 pe-2"
              placeholder={searchPlaceholder}
              type="search"
              value={searchValue}
              disabled={isLoading}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/*Modo Toggle*/}
              <ModeToggle />
              {/* Layout button
                <Button
                    size="icon"
                    variant="ghost"
                    className="text-muted-foreground size-8 rounded-full shadow-none"
                    aria-label="Open layout menu"
                    onClick={(e) => {
                    e.preventDefault();
                    if (onLayoutClick) onLayoutClick();
                    }}
                >
                    <LayoutGridIcon size={16} aria-hidden="true" />
                </Button>*/}
              {/* Info menu
                <InfoMenu onItemClick={onInfoItemClick} />*/}
              {/* Notification */}
              <NotificationMenu
                notifications={notifications}
                onNotificationClick={onNotificationClick}
              />
              {/* Settings */}
              <SettingsMenu onItemClick={onSettingsItemClick} />
              <UserMenu
                name={
                  userData
                    ? `${userData.firstName} ${userData.secondName} ${userData.firstLastName} ${userData.secondLastName}`
                    : ""
                }
                email={user?.email ?? ""}
                image={userData?.avatar ?? ""}
                onSignOut={() => callSignOutUser()}
              />
            </div>
          </div>
        </div>
      </header>
    );
  },
);

Navbar14.displayName = "Navbar14";
