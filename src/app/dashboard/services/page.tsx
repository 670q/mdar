'use client'

import DashboardLayout from '@/components/shared/DashboardLayout'
import { Button, Card, Input } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

// Mock Data
const mockServices = [
    { id: '1', name: 'تدقيق لغوي', price: 500, description: 'مراجعة لغوية شاملة للمخطوطة' },
    { id: '2', name: 'تصميم غلاف', price: 800, description: 'تصميم غلاف احترافي يليق بكتابك' },
    { id: '3', name: 'تحرير أدبي', price: 1200, description: 'تحرير وتحسين أسلوب الكتابة' },
]

export default function PublisherServicesPage() {
    const [showAddModal, setShowAddModal] = useState(false)

    return (
        <DashboardLayout role="publisher">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-primary">خدمات التأليف</h1>
                        <p className="text-muted-foreground">أضف الخدمات التي تقدمها للمؤلفين</p>
                    </div>
                    <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        إضافة خدمة
                    </Button>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="h-full flex flex-col">
                                <h3 className="text-xl font-bold text-primary mb-2">{service.name}</h3>
                                <p className="text-muted-foreground text-sm flex-1">{service.description}</p>
                                <div className="flex justify-between items-center mt-4 pt-4 border-t border-primary/10">
                                    <span className="text-xl font-bold text-secondary">{service.price} ر.س</span>
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Add Service Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"
                        >
                            <h2 className="text-2xl font-bold text-primary mb-6">إضافة خدمة جديدة</h2>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">اسم الخدمة</label>
                                    <Input name="name" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">السعر (ر.س)</label>
                                    <Input name="price" type="number" required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">الوصف</label>
                                    <textarea name="description" className="w-full h-24 rounded-md border border-input bg-background/50 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <Button type="submit" className="flex-1">حفظ الخدمة</Button>
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
