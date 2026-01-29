'use client'

export const dynamic = 'force-dynamic'

import Navbar from '@/components/shared/Navbar'
import { Button, Card, Input } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { Search, Star, Building2 } from 'lucide-react'
import { useState } from 'react'

// Mock Services Data
const mockServices = [
    { id: '1', name: 'تدقيق لغوي احترافي', publisher: 'دار المعارف', price: 500, rating: 4.8, description: 'مراجعة لغوية شاملة بواسطة خبراء اللغة العربية' },
    { id: '2', name: 'تصميم غلاف إبداعي', publisher: 'دار النشر العربية', price: 800, rating: 4.9, description: 'تصميم غلاف يجذب القراء ويعكس محتوى كتابك' },
    { id: '3', name: 'تحرير أدبي', publisher: 'دار الثقافة', price: 1200, rating: 4.7, description: 'تحسين أسلوب الكتابة وتطوير البنية السردية' },
    { id: '4', name: 'ترجمة احترافية', publisher: 'دار العلم', price: 2000, rating: 4.6, description: 'ترجمة دقيقة إلى اللغة الإنجليزية' },
    { id: '5', name: 'تنسيق وإخراج فني', publisher: 'دار التراث', price: 600, rating: 4.8, description: 'تنسيق الكتاب وإعداده للطباعة' },
    { id: '6', name: 'تسويق رقمي', publisher: 'دار الإبداع', price: 1500, rating: 4.5, description: 'حملة تسويقية شاملة على منصات التواصل' },
]

const ServiceCard = ({ service, index }: { service: typeof mockServices[0]; index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        whileHover={{ y: -5 }}
    >
        <Card className="h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-primary">{service.name}</h3>
                <div className="flex items-center gap-1 text-secondary">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">{service.rating}</span>
                </div>
            </div>

            <p className="text-sm text-muted-foreground flex-1">{service.description}</p>

            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span>{service.publisher}</span>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-primary/10">
                <span className="text-2xl font-bold text-secondary">{service.price} <span className="text-sm">ر.س</span></span>
                <Button size="sm">طلب الخدمة</Button>
            </div>
        </Card>
    </motion.div>
)

export default function ServicesPage() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredServices = mockServices.filter(service =>
        service.name.includes(searchTerm) || service.publisher.includes(searchTerm)
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
                    <h1 className="text-4xl font-bold text-primary mb-4">خدمات التأليف</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        استعن بخبرات دور النشر لتحويل مخطوطتك إلى كتاب احترافي
                    </p>
                </motion.div>

                {/* Search */}
                <div className="max-w-md mx-auto mb-12">
                    <div className="relative">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            placeholder="ابحث عن خدمة..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pr-10"
                        />
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}
