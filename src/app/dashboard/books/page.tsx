'use client'

import DashboardLayout from '@/components/shared/DashboardLayout'
import { Button, Card, Input } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { Plus, Search, Trash2, Edit } from 'lucide-react'
import { useState } from 'react'

// Mock Data - In real app, fetch from Supabase
const mockBooks = [
    { id: '1', title: 'رحلة في عالم الأدب', isbn: '978-3-16-148410-0', price: 45, stock: 120 },
    { id: '2', title: 'أسرار النجاح', isbn: '978-0-13-110362-7', price: 35, stock: 80 },
    { id: '3', title: 'فن التواصل', isbn: '978-0-262-03293-3', price: 50, stock: 45 },
]

export default function PublisherBooksPage() {
    const [showAddModal, setShowAddModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredBooks = mockBooks.filter(book =>
        book.title.includes(searchTerm) || book.isbn.includes(searchTerm)
    )

    return (
        <DashboardLayout role="publisher">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">إدارة الكتب</h1>
                        <p className="text-muted-foreground">أضف وعدّل كتبك المتاحة للبيع</p>
                    </div>
                    <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        إضافة كتاب
                    </Button>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-md">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="ابحث بالعنوان أو ISBN..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-10"
                    />
                </div>

                {/* Books Table */}
                <Card className="overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-primary/5">
                            <tr>
                                <th className="text-right p-4 font-medium text-primary">العنوان</th>
                                <th className="text-right p-4 font-medium text-primary">ISBN</th>
                                <th className="text-right p-4 font-medium text-primary">السعر</th>
                                <th className="text-right p-4 font-medium text-primary">المخزون</th>
                                <th className="text-right p-4 font-medium text-primary">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((book, index) => (
                                <motion.tr
                                    key={book.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-t border-primary/5 hover:bg-primary/5 transition-colors"
                                >
                                    <td className="p-4 font-medium">{book.title}</td>
                                    <td className="p-4 text-muted-foreground font-mono text-sm">{book.isbn}</td>
                                    <td className="p-4">{book.price} ر.س</td>
                                    <td className="p-4">{book.stock} نسخة</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </Card>

                {/* Add Book Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold text-primary mb-6">إضافة كتاب جديد</h2>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">عنوان الكتاب</label>
                                    <Input name="title" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">ISBN</label>
                                    <Input name="isbn" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">السعر (ر.س)</label>
                                        <Input name="price" type="number" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">المخزون</label>
                                        <Input name="stock" type="number" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">الوصف</label>
                                    <textarea name="description" className="w-full h-24 rounded-md border border-input bg-background/50 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <Button type="submit" className="flex-1">حفظ الكتاب</Button>
                                    <Button type="button" variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">إلغاء</Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
