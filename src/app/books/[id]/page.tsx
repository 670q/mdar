'use client'

import Navbar from '@/components/shared/Navbar'
import { Button, Card } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Building2, ShoppingCart, Star, User } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'

// Mock book data
const getBook = (id: string) => ({
    id,
    title: 'رحلة في عالم الأدب',
    author: 'أحمد محمود',
    publisher: 'دار المعارف',
    price: 45,
    description: 'كتاب يأخذك في رحلة ممتعة عبر تاريخ الأدب العربي، من العصر الجاهلي إلى العصر الحديث. يستعرض الكتاب أهم الأعمال الأدبية والشعراء والكتاب الذين شكلوا الهوية الثقافية العربية.',
    pages: 320,
    isbn: '978-3-16-148410-0',
    rating: 4.5,
    reviews: 128,
    stock: 50,
    cover: '📕',
})

export default function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const book = getBook(id)

    return (
        <div className="min-h-screen bg-paper-texture">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Breadcrumb */}
                <Link href="/books" className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                    العودة للكتب
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Book Cover */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <motion.div
                            whileHover={{ rotateY: 10, rotateX: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="aspect-[3/4] bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 rounded-2xl shadow-2xl flex items-center justify-center text-9xl relative overflow-hidden"
                            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                        >
                            {/* Book spine effect */}
                            <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/20 to-transparent" />

                            {book.cover}

                            {/* Page edge effect */}
                            <div className="absolute right-0 top-2 bottom-2 w-2 bg-gradient-to-l from-gray-200 to-white rounded-r" />
                        </motion.div>
                    </motion.div>

                    {/* Book Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div>
                            <h1 className="text-4xl font-bold text-primary mb-2">{book.title}</h1>

                            <div className="flex items-center gap-4 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    <span>{book.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Building2 className="w-4 h-4" />
                                    <span>{book.publisher}</span>
                                </div>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex text-secondary">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'fill-current' : ''}`} />
                                ))}
                            </div>
                            <span className="font-bold">{book.rating}</span>
                            <span className="text-muted-foreground">({book.reviews} تقييم)</span>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed">{book.description}</p>

                        {/* Details */}
                        <Card className="p-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground">عدد الصفحات</span>
                                    <p className="font-bold">{book.pages} صفحة</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">ISBN</span>
                                    <p className="font-bold font-mono">{book.isbn}</p>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">المتوفر</span>
                                    <p className="font-bold text-green-600">{book.stock} نسخة</p>
                                </div>
                            </div>
                        </Card>

                        {/* Price & Actions */}
                        <div className="flex items-center gap-6 pt-4">
                            <div>
                                <span className="text-muted-foreground text-sm">السعر</span>
                                <p className="text-4xl font-bold text-secondary">{book.price} <span className="text-lg">ر.س</span></p>
                            </div>

                            <div className="flex-1 flex gap-4">
                                <Button className="flex-1 h-14 text-lg gap-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    أضف للسلة
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
