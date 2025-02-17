import type * as React from "react";
import { cn } from "@/lib/utils";

export const Sidebar = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const SidebarHeader = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex h-[60px] items-center border-b px-4", className)}>
      {children}
    </div>
  );
};

export const SidebarContent = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex-1 overflow-auto", className)}>{children}</div>
  );
};

export const SidebarNav = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <nav className={cn("grid gap-2 p-2", className)}>{children}</nav>;
};

export const SidebarFooter = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <footer className={cn("border-t p-4", className)}>{children}</footer>;
};
