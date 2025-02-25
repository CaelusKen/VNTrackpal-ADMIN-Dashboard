import type React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  state: "success" | "warning" | "error" | "default";
  children: React.ReactNode;
};

const statusStyles = {
  success: "bg-green-100 text-green-800 hover:bg-green-200",
  warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  error: "bg-red-100 text-red-800 hover:bg-red-200",
  default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
};

export function StatusBadge({ state = "default", children }: StatusBadgeProps) {
  return (
    <Badge className={cn(statusStyles[state], "transition-colors")}>
      {children}
    </Badge>
  );
}
