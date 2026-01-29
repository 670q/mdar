'use client'

export const dynamic = 'force-dynamic'

import Navbar from '@/components/shared/Navbar'
import { Card, Input } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { BookOpen, Package, Search, Truck, CheckCircle, Clock } from 'lucide-react'
import Link from 'next/link'

// Mock order data
const mockOrders = [
    {
        id: 'ORD-2024-001',
        date: '2024-01-20',
        total: 125,
        status: 'delivered',
        items: [
            { title: 'رحلة في عالم الأدب', cover: '📕' },
            { title: 'أسرار النجاح', cover: '📗' },
        ]
    },
    {
        id: 'ORD-2024-002',
        date: '2024-01-25',
        total: 65,
        status: 'shipping',
        items: [
            { title: 'فن التواصل', cover: '📘' },
        ]
    },
    {
        id: 'ORD-2024-003',
        date: '2024-01-28',
        total: 80,
        status: 'processing',
        items: [
            { title: 'علم النفس الحديث', cover: '📙' },
        ]
    },
]

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        delivered: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle, label: 'تم التسليم' },
        shipping: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Truck, label: 'قيد الشحن' },
        processing: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock, label: 'قيد التجهيز' },
    }
    const style = styles[status as keyof typeof styles] || styles.processing
    const Icon = style.icon

    return (
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}>
            <Icon className="w-4 h-4" />
            {style.label}
        </div>
    )
}

export default function OrdersPage() {
    return (
        <div className="min-h-screen bg-paper-texture">
            <Navbar />

            <div className="max-w-5xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-primary">طلباتي</h1>
                    <p className="text-muted-foreground">تتبع حالة طلباتك السابقة</p>
                </motion.div>

                {/* Orders List */}
                <div className="space-y-4">
                    {mockOrders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-4">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    {/* Book Covers */}
                                    <div className="flex -space-x-4 rtl:space-x-reverse">
                                        {order.items.map((item, i) => (
                                            <div
                                                key={i}
                                                className="w-14 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center text-2xl border-2 border-white shadow-sm"
                                            >
                                                {item.cover}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-bold text-primary">{order.id}</span>
                                            <StatusBadge status={order.status} />
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {order.items.length} كتب • {order.date}
                                        </p>
                                    </div>

                                    {/* Total */}
                                    <div className="text-left md:text-right">
                                        <p className="text-sm text-muted-foreground">المجموع</p>
                                        <p className="text-xl font-bold text-secondary">{order.total} ر.س</p>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="mt-4 pt-4 border-t border-primary/10">
                                    <p className="text-sm text-muted-foreground mb-2">الكتب:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {order.items.map((item, i) => (
                                            <span key={i} className="text-sm bg-primary/5 px-3 py-1 rounded-full">
                                                {item.title}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {mockOrders.length === 0 && (
                    <div className="text-center py-20">
                        <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-xl text-muted-foreground mb-4">لا توجد طلبات بعد</p>
                        <Link href="/books" className="text-primary hover:underline">
                            تصفح الكتب وابدأ التسوق
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
