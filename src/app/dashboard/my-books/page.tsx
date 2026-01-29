'use client'

import DashboardLayout from '@/components/shared/DashboardLayout'
import { Button, Card } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { BookOpen, CheckCircle, Clock, Eye, TrendingUp, XCircle } from 'lucide-react'
import Link from 'next/link'

// Mock Data
const myBooks = [
    {
        id: '1',
        title: 'رحلة في عالم الأدب',
        publisher: 'دار المعارف',
        status: 'approved',
        sales: 1250,
        views: 8500,
        cover: '📕'
    },
    {
        id: '2',
        title: 'قصص من الماضي',
        publisher: 'دار النشر العربية',
        status: 'pending',
        sales: 0,
        views: 0,
        cover: '📗'
    },
    {
        id: '3',
        title: 'أسرار الكتابة',
        publisher: 'دار الثقافة',
        status: 'approved',
        sales: 850,
        views: 6200,
        cover: '📘'
    },
]

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        approved: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'مقبول' },
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'قيد المراجعة' },
        rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle, label: 'مرفوض' },
    }
    const style = styles[status as keyof typeof styles] || styles.pending
    const Icon = style.icon

    return (
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
            <Icon className="w-3 h-3" />
            {style.label}
        </div>
    )
}

export default function AuthorMyBooksPage() {
    const totalSales = myBooks.reduce((sum, book) => sum + book.sales, 0)
    const totalViews = myBooks.reduce((sum, book) => sum + book.views, 0)

    return (
        <DashboardLayout role="author">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">كتبي</h1>
                        <p className="text-muted-foreground">تابع أداء كتبك ومبيعاتها</p>
                    </div>
                    <Link href="/dashboard/author">
                        <Button>ربط كتاب جديد</Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-6 shadow-md border border-primary/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">إجمالي الكتب</p>
                                <p className="text-2xl font-bold text-primary">{myBooks.length}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-md border border-primary/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-secondary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">إجمالي المبيعات</p>
                                <p className="text-2xl font-bold text-secondary">{totalSales.toLocaleString()}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl p-6 shadow-md border border-primary/5"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Eye className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">إجمالي المشاهدات</p>
                                <p className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myBooks.map((book, index) => (
                        <motion.div
                            key={book.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col">
                                {/* Cover */}
                                <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center text-5xl mb-4">
                                    {book.cover}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-bold text-primary">{book.title}</h3>
                                        <StatusBadge status={book.status} />
                                    </div>
                                    <p className="text-sm text-muted-foreground">{book.publisher}</p>
                                </div>

                                {/* Stats */}
                                {book.status === 'approved' && (
                                    <div className="mt-4 pt-4 border-t border-primary/10 grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <p className="text-2xl font-bold text-secondary">{book.sales}</p>
                                            <p className="text-xs text-muted-foreground">مبيعات</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-blue-600">{book.views}</p>
                                            <p className="text-xs text-muted-foreground">مشاهدات</p>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    )
}
