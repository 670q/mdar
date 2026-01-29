'use client'

export const dynamic = 'force-dynamic'

import Navbar from '@/components/shared/Navbar'
import { Card } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { BookOpen, Download, Eye } from 'lucide-react'
import Link from 'next/link'

// Mock Data
const myBooks = [
    { id: '1', title: 'رحلة في عالم الأدب', author: 'أحمد محمود', cover: '📕', type: 'digital' },
    { id: '2', title: 'أسرار النجاح', author: 'سارة علي', cover: '📗', type: 'physical' },
]

export default function LibraryPage() {
    return (
        <div className="min-h-screen bg-paper-texture">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-primary">مكتبتي</h1>
                    <p className="text-muted-foreground">الكتب التي قمت بشرائها</p>
                </motion.div>

                {myBooks.length === 0 ? (
                    <div className="text-center py-20">
                        <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-xl text-muted-foreground mb-4">مكتبتك فارغة</p>
                        <Link href="/books">
                            <Button>ابدأ التسوق</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {myBooks.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full flex flex-col group overflow-hidden">
                                    <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                                        {book.cover}
                                    </div>
                                    <div className="p-4 flex-1">
                                        <h3 className="font-bold text-primary">{book.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">{book.author}</p>

                                        <div className="flex gap-2">
                                            {book.type === 'digital' ? (
                                                <>
                                                    <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary text-white rounded-lg text-sm transition-colors hover:bg-primary/90">
                                                        <Eye className="w-4 h-4" />
                                                        قراءة
                                                    </button>
                                                    <button className="p-2 border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">
                                                        <Download className="w-4 h-4 text-primary" />
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-secondary text-white rounded-lg text-sm transition-colors hover:bg-secondary/90">
                                                    <Package className="w-4 h-4" />
                                                    نسخة مطبوعة
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

import { Package } from 'lucide-react'
import { Button } from '@/components/ui/core'
