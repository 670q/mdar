'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Home, LayoutDashboard, LogOut, Settings, Sparkles, Store, Menu, X } from 'lucide-react'
import { clsx } from 'clsx'
import { useState } from 'react'
import PageTransition from './PageTransition'

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
        { href: '/dashboard/bookstore/inventory', label: 'المخزون', icon: Store }, // Changed href to be unique
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className="min-h-screen flex bg-background">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-primary text-white flex items-center justify-between px-6 z-50">
                <Link href="/" className="text-xl font-bold">منصة مدار</Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 hover:bg-white/10 rounded-lg"
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={clsx(
                "fixed inset-y-0 right-0 w-64 bg-primary text-primary-foreground flex flex-col z-40 transition-transform duration-300 lg:relative lg:translate-x-0",
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
            )}>
                {/* Logo */}
                <div className="p-6 border-b border-white/10 text-right hidden lg:block">
                    <Link href="/" className="text-2xl font-bold">منصة مدار</Link>
                    <p className="text-xs text-white/60 mt-1">
                        {role === 'publisher' && 'لوحة دار النشر'}
                        {role === 'bookstore' && 'لوحة متجر الكتب'}
                        {role === 'author' && 'لوحة المؤلف'}
                    </p>
                </div>

                {/* Mobile version of role title */}
                <div className="p-6 border-b border-white/10 text-right lg:hidden mt-16">
                    <p className="text-xs text-white/60">
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
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
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

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto mt-16 lg:mt-0">
                <PageTransition>
                    {children}
                </PageTransition>
            </main>
        </div>
    )
}
