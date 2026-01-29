'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Home, LayoutDashboard, LogOut, Settings, Sparkles, Store } from 'lucide-react'
import { clsx } from 'clsx'

interface DashboardLayoutProps {
    children: React.ReactNode
    role: 'publisher' | 'bookstore' | 'author'
}

const navItems = {
    publisher: [
        { href: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
        { href: '/dashboard/books', label: 'الكتب', icon: BookOpen },
        { href: '/dashboard/services', label: 'خدمات التأليف', icon: Sparkles },
        { href: '/dashboard/settings', label: 'الإعدادات', icon: Settings },
    ],
    bookstore: [
        { href: '/dashboard/bookstore', label: 'لوحة التحكم', icon: LayoutDashboard },
        { href: '/dashboard/bookstore', label: 'المخزون', icon: Store },
        { href: '/dashboard/settings', label: 'الإعدادات', icon: Settings },
    ],
    author: [
        { href: '/dashboard/author', label: 'لوحة التحكم', icon: LayoutDashboard },
        { href: '/dashboard/my-books', label: 'كتبي', icon: BookOpen },
        { href: '/dashboard/settings', label: 'الإعدادات', icon: Settings },
    ],
}

import { signOut } from '@/actions/auth'

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
    const pathname = usePathname()
    const items = navItems[role]

    return (
        <div className="min-h-screen flex bg-background">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-primary-foreground flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-white/10 text-right">
                    <Link href="/" className="text-2xl font-bold">منصة مدار</Link>
                    <p className="text-xs text-white/60 mt-1">
                        {role === 'publisher' && 'لوحة دار النشر'}
                        {role === 'bookstore' && 'لوحة متجر الكتب'}
                        {role === 'author' && 'لوحة المؤلف'}
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2" dir="rtl">
                    {items.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link key={item.href} href={item.href}>
                                <motion.div
                                    whileHover={{ x: -5 }}
                                    className={clsx(
                                        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                        isActive
                                            ? "bg-white/20 text-white"
                                            : "text-white/70 hover:bg-white/10 hover:text-white"
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </motion.div>
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => signOut()}
                        className="flex items-center gap-3 px-4 py-3 w-full text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        dir="rtl"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    )
}
