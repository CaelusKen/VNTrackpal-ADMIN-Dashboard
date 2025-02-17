import type * as React from "react"
import type { LucideIcon } from "lucide-react"

// Custom type for icons that can be either Lucide icons or custom components
export type IconType = LucideIcon | React.ComponentType<{ className?: string }>

// Interface for individual navigation items
export interface NavItem {
    title: string
    href: string
    icon: IconType // Updated to use the new IconType
    badge?: {
        content: string
        variant?: "default" | "secondary" | "destructive" | "outline"
        className?: string
    }
}

// Interface for sections of navigation items (e.g., "GENERAL", "MY SPACES")
export interface NavSection {
    title: string // Full title shown when sidebar is expanded
    collapsedTitle: string // Abbreviated title shown when sidebar is collapsed
    items: NavItem[] // Array of navigation items in this section
}

// Interface for action buttons in the footer
export interface FooterAction {
    icon: LucideIcon // Icon for the action button
    onClick?: () => void // Click handler for the action
    label: string // Accessible label for screen readers
}

// Interface for user profile section in footer
export interface UserProfile {
    initials: string // User's initials shown in avatar
    name: string // User's display name
    email: string // User's email address
    onClick?: () => void // Click handler for profile section
}

// Props interface for the Sidebar component
export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    isCollapsed: boolean // Controls expanded/collapsed state
    navSections: NavSection[] // Navigation sections to render
    footerActions: FooterAction[] // Footer action buttons
    userProfile: UserProfile // User profile information
    onSearch?: (query: string) => void // Optional search handler
}

