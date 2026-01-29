'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, ShoppingCart, User, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import { createClient } from '@/lib/supabase/client'
import { signOut } from '@/actions/auth'

const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/books', label: 'الكتب' },
    { href: '/services', label: 'خدمات التأليف' },
]

export default function Navbar() {
    const pathname = usePathname()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState<any>(null)
    const supabase = createClient()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                setUser(session.user)
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single()
                setProfile(profileData)
            }
        }
        checkUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            if (!session) {
                setProfile(null)
            } else {
                // Fetch profile on auth change if session exists
                supabase.from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single()
                    .then(({ data }) => setProfile(data))
            }
        })

        return () => subscription.unsubscribe()
    }, [supabase])

    const getDashboardHref = () => {
        if (!profile) return '/dashboard'
        if (profile.role === 'publisher') return '/dashboard'
        if (profile.role === 'bookstore') return '/dashboard/bookstore'
        if (profile.role === 'author') return '/dashboard/author'
        return '/dashboard'
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-primary/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-primary">مدار</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user && (
                            <>
                                <Link href="/library" className={clsx("text-sm font-medium transition-colors hover:text-primary", pathname === '/library' ? "text-primary" : "text-muted-foreground")}>مكتبتي</Link>
                                <Link href="/orders" className={clsx("text-sm font-medium transition-colors hover:text-primary", pathname === '/orders' ? "text-primary" : "text-muted-foreground")}>طلباتي</Link>
                            </>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link href="/cart" className="relative p-2 hover:bg-primary/10 rounded-lg transition-colors">
                            <ShoppingCart className="w-5 h-5 text-primary" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-xs flex items-center justify-center rounded-full text-secondary-foreground font-bold">
                                0
                            </span>
                        </Link>

                        {user ? (
                            <div className="hidden md:flex items-center gap-4">
                                <Link href={getDashboardHref()} className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                    <User className="w-4 h-4" />
                                    <span>لوحة التحكم</span>
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm text-muted-foreground hover:text-red-500 transition-colors"
                                >
                                    خروج
                                </button>
                            </div>
                        ) : (
                            <Link href="/login" className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                                <User className="w-4 h-4" />
                                <span>دخول</span>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-primary/10 rounded-lg"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-white border-t border-primary/10 py-4"
                >
                    <div className="px-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={clsx(
                                    "block py-2 px-4 rounded-lg transition-colors",
                                    pathname === link.href ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {user ? (
                            <>
                                <Link href="/library" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-primary/5 rounded-lg">مكتبتي</Link>
                                <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="block py-2 px-4 hover:bg-primary/5 rounded-lg">طلباتي</Link>
                                <Link href={getDashboardHref()} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-4 bg-primary/10 text-primary rounded-lg mt-4 text-center">لوحة التحكم</Link>
                                <button onClick={() => signOut()} className="block w-full py-2 px-4 text-red-500 text-center mt-2">خروج</button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-2 px-4 bg-primary text-white text-center rounded-lg mt-4"
                            >
                                تسجيل الدخول
                            </Link>
                        )}
                    </div>
                </motion.div>
            )}
        </nav>
    )
}
