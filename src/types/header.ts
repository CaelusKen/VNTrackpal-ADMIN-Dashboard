import type { ReactNode } from "react"

export interface NavItem {
    label: string
    href: string
}

export interface UserMenuItem {
    label: string
    href: string
}

export interface HeaderConfig {
    logo: ReactNode
    navItems: NavItem[]
    userMenuItems: UserMenuItem[]
}

export interface HeaderProps extends HeaderConfig {
    notificationCount?: number
    userAvatar?: string
    userName?: string
    onMenuClick?: () => void
}

