'use client'

import Navbar from '@/components/shared/Navbar'
import { Button, Card, Input } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Mock cart data
const initialCart = [
    { id: '1', title: 'رحلة في عالم الأدب', author: 'أحمد محمود', price: 45, quantity: 1, cover: '📕' },
    { id: '2', title: 'أسرار النجاح', author: 'سارة علي', price: 35, quantity: 2, cover: '📗' },
]

export default function CartPage() {
    const [cart, setCart] = useState(initialCart)

    const updateQuantity = (id: string, delta: number) => {
        setCart(cart.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        ))
    }

    const removeItem = (id: string) => {
        setCart(cart.filter(item => item.id !== id))
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = 15
    const total = subtotal + shipping

    return (
        <div className="min-h-screen bg-paper-texture">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-primary mb-8"
                >
                    سلة التسوق
                </motion.h1>

                {cart.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-xl text-muted-foreground mb-4">السلة فارغة</p>
                        <Link href="/books">
                            <Button>تصفح الكتب</Button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="flex gap-4 p-4">
                                        {/* Cover */}
                                        <div className="w-20 h-28 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                                            {item.cover}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-primary">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">{item.author}</p>
                                            <p className="text-lg font-bold text-secondary mt-2">{item.price} ر.س</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex flex-col items-end justify-between">
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>

                                            <div className="flex items-center gap-2 bg-primary/5 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="p-1 hover:bg-primary/10 rounded transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="p-1 hover:bg-primary/10 rounded transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card className="sticky top-24">
                                <h2 className="text-xl font-bold text-primary mb-6">ملخص الطلب</h2>

                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">المجموع الفرعي</span>
                                        <span className="font-bold">{subtotal} ر.س</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">الشحن</span>
                                        <span className="font-bold">{shipping} ر.س</span>
                                    </div>
                                    <div className="border-t border-primary/10 pt-4 flex justify-between text-lg">
                                        <span className="font-bold">الإجمالي</span>
                                        <span className="font-bold text-secondary">{total} ر.س</span>
                                    </div>
                                </div>

                                <Link href="/checkout" className="block mt-6">
                                    <Button className="w-full h-12 text-lg">
                                        إتمام الشراء
                                    </Button>
                                </Link>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
