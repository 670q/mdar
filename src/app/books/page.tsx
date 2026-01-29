'use client'

import Navbar from '@/components/shared/Navbar'
import { Button, Card, Input } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { Search, Filter, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

// Mock Data
const mockBooks = [
    { id: '1', title: 'رحلة في عالم الأدب', author: 'أحمد محمود', price: 45, cover: '📕', publisher: 'دار المعارف' },
    { id: '2', title: 'أسرار النجاح', author: 'سارة علي', price: 35, cover: '📗', publisher: 'دار النشر العربية' },
    { id: '3', title: 'فن التواصل', author: 'محمد خالد', price: 50, cover: '📘', publisher: 'دار الثقافة' },
    { id: '4', title: 'علم النفس الحديث', author: 'ليلى أحمد', price: 65, cover: '📙', publisher: 'دار العلم' },
    { id: '5', title: 'تاريخ الحضارات', author: 'عمر فاروق', price: 80, cover: '📕', publisher: 'دار التراث' },
    { id: '6', title: 'الفيزياء للجميع', author: 'نورا حسن', price: 55, cover: '📗', publisher: 'دار العلوم' },
]

const BookCard = ({ book, index }: { book: typeof mockBooks[0]; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="group"
    >
        <Link href={`/books/${book.id}`}>
            <Card className="overflow-hidden cursor-pointer h-full flex flex-col">
                {/* Cover */}
                <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                    {book.cover}
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        {book.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <p className="text-xs text-muted-foreground mt-1">{book.publisher}</p>

                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-primary/10">
                        <span className="text-lg font-bold text-secondary">{book.price} ر.س</span>
                        <button className="p-2 bg-primary/10 rounded-lg hover:bg-primary hover:text-white transition-colors">
                            <ShoppingCart className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </Card>
        </Link>
    </motion.div>
)

export default function BooksPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredBooks = mockBooks.filter(book =>
        book.title.includes(searchTerm) || book.author.includes(searchTerm)
    )

    return (
        <div className="min-h-screen bg-paper-texture">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-primary mb-4">اكتشف الكتب</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        تصفح مجموعة واسعة من الكتب من أفضل دور النشر والمتاجر
                    </p>
                </motion.div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder="ابحث عن كتاب أو مؤلف..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pr-10"
                        />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        تصفية
                    </Button>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredBooks.map((book, index) => (
                        <BookCard key={book.id} book={book} index={index} />
                    ))}
                </div>

                {filteredBooks.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        لا توجد نتائج للبحث
                    </div>
                )}
            </div>
        </div>
    )
}
