"use client";

import {
  LayoutDashboard,
  PiggyBank,
  Users2,
  UserPlus,
  Lock,
  Bell,
  HelpCircle,
  Printer,
  Settings,
  CircleUser,
  Database,
  PackageOpen,
} from "lucide-react";
import type { NavSection, FooterAction, UserProfile } from "@/types/sidebar";

// Main navigation sections configuration
export const navSections: NavSection[] = [
  {
    title: "GENERAL",
    collapsedTitle: "GEN",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "User Accounts",
        href: "/accounts",
        icon: CircleUser,
        badge: {
          content: "05",
          variant: "secondary",
        },
      },
      {
        title: "Food Database",
        href: "/food-data",
        icon: Database,
      },
      {
        title: "Subscriptions",
        href: "/subscriptions",
        icon: PackageOpen,
      },
      {
        title: "Budgets",
        href: "/budgets",
        icon: PiggyBank,
        badge: {
          content: "New",
          variant: "secondary",
          className: "bg-primary text-primary-foreground",
        },
      },
    ],
  },
  {
    title: "MY SPACES",
    collapsedTitle: "MY",
    items: [
      {
        title: "All",
        href: "/all",
        icon: () => (
          <div className="grid h-4 w-4 place-items-center">
            <div className="h-1.5 w-1.5 rounded-full bg-current" />
          </div>
        ),
      },
      {
        title: "Assigned to me",
        href: "/assigned",
        icon: Users2,
      },
      {
        title: "Shared",
        href: "/shared",
        icon: Users2,
      },
      {
        title: "Private",
        href: "/private",
        icon: Lock,
      },
      {
        title: "Add team member",
        href: "/add-member",
        icon: UserPlus,
      },
    ],
  },
];

// Footer action buttons configuration
export const footerActions: FooterAction[] = [
  {
    icon: Bell,
    label: "Notifications",
    onClick: () => console.log("Notifications clicked"),
  },
  {
    icon: HelpCircle,
    label: "Help",
    onClick: () => console.log("Help clicked"),
  },
  {
    icon: Printer,
    label: "Print",
    onClick: () => console.log("Print clicked"),
  },
  {
    icon: Settings,
    label: "Settings",
    onClick: () => console.log("Settings clicked"),
  },
];

// User profile configuration
export const userProfile: UserProfile = {
  initials: "U",
  name: "User",
  email: "user@example.com",
  onClick: () => console.log("User profile clicked"),
};
