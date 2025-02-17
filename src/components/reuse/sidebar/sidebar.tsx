"use client";

import type * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Search, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNav,
} from "@/components/ui/sidebar";
import type { SidebarProps } from "@/types/sidebar";

// Main sidebar component props

export function AppSidebar({
  isCollapsed,
  navSections,
  footerActions,
  userProfile,
  onSearch,
  className,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar
      className={cn(
        "flex flex-col border-r bg-background",
        isCollapsed ? "w-[80px]" : "w-[240px]",
        className
      )}
    >
      <SidebarHeader className="flex h-[60px] items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-primary/10 p-1">
            <div className="h-6 w-6 rounded-md bg-primary text-primary-foreground grid place-items-center text-sm font-medium">
              D
            </div>
          </div>
          {!isCollapsed && <span className="font-semibold">DesignLib</span>}
        </Link>
        {!isCollapsed && (
          <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </SidebarHeader>

      {!isCollapsed && onSearch && (
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-8 pr-12"
              onChange={(e) => onSearch(e.target.value)}
            />
            <kbd className="pointer-events-none absolute right-2 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              Ctrl+D
            </kbd>
          </div>
        </div>
      )}

      <SidebarContent className="flex-1 overflow-auto">
        <SidebarNav className="grid gap-2 p-2">
          {navSections.map((section) => (
            <div key={section.title} className="px-3 py-2">
              <h2 className="mb-2 text-xs font-semibold tracking-tight">
                {isCollapsed ? section.collapsedTitle : section.title}
              </h2>
              <div className="grid gap-1">
                {section.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                      pathname === item.href && "bg-accent"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed &&
                      (item.badge ? (
                        <div className="flex flex-1 items-center justify-between">
                          <span>{item.title}</span>
                          <Badge
                            variant={item.badge.variant}
                            className={cn("ml-auto", item.badge.className)}
                          >
                            {item.badge.content}
                          </Badge>
                        </div>
                      ) : (
                        item.title
                      ))}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </SidebarNav>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 justify-around">
            {footerActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={action.onClick}
              >
                <action.icon className="h-4 w-4" />
                <span className="sr-only">{action.label}</span>
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-2"
            onClick={userProfile.onClick}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {userProfile.initials}
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium leading-none">
                    {userProfile.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {userProfile.email}
                  </div>
                </div>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
