'use client'

export const dynamic = 'force-dynamic'

import Navbar from '@/components/shared/Navbar'
import { Button, Card, Input } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { Check, CreditCard, MapPin, Package, Truck } from 'lucide-react'
import { useState } from 'react'

export default function CheckoutPage() {
    const [step, setStep] = useState(1)

    const steps = [
        { id: 1, label: 'الشحن', icon: MapPin },
        { id: 2, label: 'الدفع', icon: CreditCard },
        { id: 3, label: 'التأكيد', icon: Check },
    ]

    return (
        <div className="min-h-screen bg-paper-texture">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 py-12">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-primary mb-8 text-center"
                >
                    إتمام الطلب
                </motion.h1>

                {/* Steps Indicator */}
                <div className="flex justify-center mb-12">
                    {steps.map((s, i) => {
                        const Icon = s.icon
                        const isActive = step === s.id
                        const isComplete = step > s.id

                        return (
                            <div key={s.id} className="flex items-center">
                                <div className={`flex flex-col items-center ${isActive ? 'text-primary' : isComplete ? 'text-green-600' : 'text-muted-foreground'}`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${isActive ? 'border-primary bg-primary/10' : isComplete ? 'border-green-600 bg-green-50' : 'border-muted-foreground/30'}`}>
                                        {isComplete ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                    </div>
                                    <span className="text-sm mt-2 font-medium">{s.label}</span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`w-20 h-0.5 mx-2 ${step > s.id ? 'bg-green-600' : 'bg-muted-foreground/30'}`} />
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Step Content */}
                <Card className="p-8">
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <h2 className="text-xl font-bold text-primary mb-6">معلومات الشحن</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">الاسم الكامل</label>
                                    <Input placeholder="أدخل اسمك" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">رقم الجوال</label>
                                    <Input placeholder="05xxxxxxxx" dir="ltr" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">العنوان</label>
                                <Input placeholder="الشارع، الحي" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">المدينة</label>
                                    <Input placeholder="الرياض" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">المنطقة</label>
                                    <Input placeholder="المنطقة الوسطى" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">الرمز البريدي</label>
                                    <Input placeholder="12345" dir="ltr" />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={() => setStep(2)} className="px-8">
                                    التالي
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                        >
                            <h2 className="text-xl font-bold text-primary mb-6">معلومات الدفع</h2>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">رقم البطاقة</label>
                                <Input placeholder="1234 5678 9012 3456" dir="ltr" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">تاريخ الانتهاء</label>
                                    <Input placeholder="MM/YY" dir="ltr" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">CVV</label>
                                    <Input placeholder="123" dir="ltr" type="password" />
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <Button variant="outline" onClick={() => setStep(1)}>
                                    السابق
                                </Button>
                                <Button onClick={() => setStep(3)} className="px-8">
                                    تأكيد الطلب
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <Check className="w-12 h-12 text-green-600" />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-primary mb-2">تم الطلب بنجاح!</h2>
                            <p className="text-muted-foreground mb-6">شكراً لك، سيتم شحن طلبك قريباً</p>

                            <div className="flex items-center justify-center gap-2 text-secondary mb-8">
                                <Truck className="w-5 h-5" />
                                <span>متوقع الوصول خلال 3-5 أيام عمل</span>
                            </div>

                            <Button onClick={() => window.location.href = '/books'}>
                                تصفح المزيد من الكتب
                            </Button>
                        </motion.div>
                    )}
                </Card>
            </div>
        </div>
    )
}
