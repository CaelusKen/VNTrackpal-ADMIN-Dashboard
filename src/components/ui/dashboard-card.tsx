"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Separate interface for our custom props
interface DashboardCardCustomProps {
  headerTitle?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  defaultPadding?: boolean;
  noPadding?: boolean;
  contentClassName?: string;
}

// Combine our custom props with HTML div props using intersection
type DashboardCardProps = DashboardCardCustomProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof DashboardCardCustomProps>;

export function DashboardCard({
  headerTitle,
  action,
  footer,
  defaultPadding = true,
  noPadding = false,
  className,
  contentClassName,
  children,
  ...props
}: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      {(headerTitle || action) && (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          {headerTitle && <div className="font-semibold">{headerTitle}</div>}
          {action && <div>{action}</div>}
        </CardHeader>
      )}
      <CardContent
        className={cn(
          contentClassName,
          !defaultPadding && "p-0",
          noPadding && "px-0 pb-0"
        )}
      >
        {children}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
