import type { HeaderConfig } from "@/types/header";

export const headerConfig: HeaderConfig = {
  logo: <span className="text-2xl font-bold text-primary">MyApp</span>,
  navItems: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "User Accounts", href: "/user-accounts" },
    { label: "Food Database", href: "/food-data" },
    { label: "Subscriptions", href: "/subscriptions" },
    { label: "Budgets", href: "/budgets" },
  ],
  userMenuItems: [
    { label: "Profile", href: "/dashboard/profile" },
    { label: "Settings", href: "/dashboard/settings" },
    { label: "Sign out", href: "/auth/signout" },
  ],
};
