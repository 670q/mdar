'use client'

import DashboardLayout from '@/components/shared/DashboardLayout'
import { motion } from 'framer-motion'
import { BookOpen, Sparkles, Users, Store } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const StatCard = ({
    icon: Icon,
    title,
    value,
    delay,
}: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    title: string
    value: string
    delay: number
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-md border border-primary/5"
    >
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold text-primary">{value}</p>
            </div>
        </div>
    </motion.div>
)

const PublisherOverview = () => (
    <div className="space-y-8 text-right" dir="rtl">
        <div>
            <h1 className="text-3xl font-bold text-primary">مرحباً دار النشر!</h1>
            <p className="text-muted-foreground">هذه نظرة عامة على نشاطك في المنصة.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={BookOpen} title="إجمالي الكتب" value="١٢" delay={0.1} />
            <StatCard icon={Sparkles} title="خدمات التأليف" value="٥" delay={0.2} />
            <StatCard icon={Users} title="طلبات الربط" value="٣" delay={0.3} />
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-primary/5">
            <h2 className="text-xl font-bold text-primary mb-4">إجراءات سريعة</h2>
            <div className="flex flex-wrap gap-4">
                <Link href="/dashboard/books" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                    إدارة الكتب
                </Link>
                <Link href="/dashboard/services" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors">
                    إدارة الخدمات
                </Link>
            </div>
        </div>
    </div>
)

const BookstoreOverview = () => (
    <div className="space-y-8 text-right" dir="rtl">
        <div>
            <h1 className="text-3xl font-bold text-primary">مرحباً متجر الكتب!</h1>
            <p className="text-muted-foreground">تابع حالة المخزون والمبيعات.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={Store} title="إجمالي المخزون" value="٤٥٠" delay={0.1} />
            <StatCard icon={Users} title="طلبات الشراء" value="٢٨" delay={0.2} />
        </div>
        <Link href="/dashboard/bookstore" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            إدارة المخزون
        </Link>
    </div>
)

const AuthorOverview = () => (
    <div className="space-y-8 text-right" dir="rtl">
        <div>
            <h1 className="text-3xl font-bold text-primary">مرحباً أيها المؤلف!</h1>
            <p className="text-muted-foreground">تابع كتبك المرتبطة وطلبات الربط الجديدة.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={BookOpen} title="كتبي المرتبطة" value="٤" delay={0.1} />
            <StatCard icon={Sparkles} title="الخدمات المطلوبة" value="٢" delay={0.2} />
        </div>
        <div className="flex gap-4">
            <Link href="/dashboard/author" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                ربط كتاب جديد
            </Link>
            <Link href="/dashboard/my-books" className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors">
                كتبي
            </Link>
        </div>
    </div>
)

export default function DashboardPage() {
    const [role, setRole] = useState<'publisher' | 'bookstore' | 'author' | 'reader' | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const fetchRole = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                const email = session.user.email ?? null
                setUserEmail(email)

                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single()

                if (profile?.role) {
                    if (profile.role === 'reader') {
                        router.push('/')
                    } else {
                        setRole(profile.role as any)
                    }
                } else if (email === 'admin@madar.com') {
                    // Default role for admin if profile is missing
                    setRole('publisher')
                } else {
                    // Not admin and no role found - probably a reader without a complete profile
                    router.push('/')
                }
            } else {
                router.push('/login')
            }
            setLoading(false)
        }
        fetchRole()
    }, [supabase, router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-paper-texture">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                />
            </div>
        )
    }

    const isAdmin = userEmail === 'admin@madar.com'
    const currentRole = role || 'publisher' // Fallback

    return (
        <DashboardLayout role={currentRole as any}>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Admin Role Switcher */}
                {isAdmin && (
                    <div className="bg-secondary/10 p-4 rounded-xl border border-secondary/20 mb-8" dir="rtl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-secondary font-bold">
                                <Users className="w-5 h-5" />
                                <span>وضع التجربة (Admin Mode)</span>
                            </div>
                            <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">خاص بالمطور</span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setRole('publisher')}
                                className={clsx(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    currentRole === 'publisher' ? "bg-primary text-white shadow-lg" : "bg-white/50 text-primary hover:bg-white"
                                )}
                            >
                                لوحة الناشر
                            </button>
                            <button
                                onClick={() => setRole('bookstore')}
                                className={clsx(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    currentRole === 'bookstore' ? "bg-primary text-white shadow-lg" : "bg-white/50 text-primary hover:bg-white"
                                )}
                            >
                                لوحة المتجر
                            </button>
                            <button
                                onClick={() => setRole('author')}
                                className={clsx(
                                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                    currentRole === 'author' ? "bg-primary text-white shadow-lg" : "bg-white/50 text-primary hover:bg-white"
                                )}
                            >
                                لوحة المؤلف
                            </button>
                        </div>
                    </div>
                )}

                {currentRole === 'publisher' && <PublisherOverview />}
                {currentRole === 'bookstore' && <BookstoreOverview />}
                {currentRole === 'author' && <AuthorOverview />}
            </div>
        </DashboardLayout>
    )
}

import { clsx } from 'clsx'
