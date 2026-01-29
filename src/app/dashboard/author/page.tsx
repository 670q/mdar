'use client'

import DashboardLayout from '@/components/shared/DashboardLayout'
import { Button, Card, Input } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { Search, BookOpen, CheckCircle, Clock, XCircle } from 'lucide-react'
import { useState } from 'react'

// Mock Data
const myLinkedBooks = [
    { id: '1', title: 'رحلة في عالم الأدب', publisher: 'دار المعارف', status: 'approved' },
    { id: '2', title: 'قصص من الماضي', publisher: 'دار النشر العربية', status: 'pending' },
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

export default function AuthorDashboardPage() {
    const [isbnSearch, setIsbnSearch] = useState('')
    const [searchResult, setSearchResult] = useState<null | { title: string; publisher: string; isbn: string }>(null)
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSearching(true)
        // Simulate API call
        setTimeout(() => {
            setSearchResult({
                title: 'الكتاب المطلوب',
                publisher: 'دار المعارف',
                isbn: isbnSearch,
            })
            setIsSearching(false)
        }, 1000)
    }

    return (
        <DashboardLayout role="author">
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-primary">لوحة المؤلف</h1>
                    <p className="text-muted-foreground">اربط كتبك بدور النشر وتابع حالة الطلبات</p>
                </div>

                {/* Search ISBN Section */}
                <Card>
                    <h2 className="text-xl font-bold text-primary mb-4">ربط كتاب جديد</h2>
                    <p className="text-muted-foreground text-sm mb-4">ابحث عن كتابك برقم ISBN لربطه بحسابك</p>

                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                placeholder="أدخل رقم ISBN..."
                                value={isbnSearch}
                                onChange={(e) => setIsbnSearch(e.target.value)}
                                className="pr-10"
                            />
                        </div>
                        <Button type="submit" disabled={!isbnSearch || isSearching}>
                            {isSearching ? 'جاري البحث...' : 'بحث'}
                        </Button>
                    </form>

                    {/* Search Result */}
                    {searchResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-accent/20 rounded-lg border border-accent"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-primary">{searchResult.title}</h3>
                                    <p className="text-sm text-muted-foreground">{searchResult.publisher} • {searchResult.isbn}</p>
                                </div>
                                <Button>طلب الربط</Button>
                            </div>
                        </motion.div>
                    )}
                </Card>

                {/* My Linked Books */}
                <div>
                    <h2 className="text-xl font-bold text-primary mb-4">كتبي المرتبطة</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {myLinkedBooks.map((book, index) => (
                            <motion.div
                                key={book.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="flex items-center gap-4">
                                    <div className="w-12 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold">{book.title}</h3>
                                        <p className="text-sm text-muted-foreground">{book.publisher}</p>
                                    </div>
                                    <StatusBadge status={book.status} />
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}
