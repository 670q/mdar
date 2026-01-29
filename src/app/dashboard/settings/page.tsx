'use client'

import DashboardLayout from '@/components/shared/DashboardLayout'
import { Button, Card, Input } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { Camera, Save } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => setIsSaving(false), 1500)
    }

    return (
        <DashboardLayout role="publisher">
            <div className="max-w-3xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-primary">الإعدادات</h1>
                    <p className="text-muted-foreground">إدارة معلومات حسابك</p>
                </div>

                {/* Profile Section */}
                <Card>
                    <h2 className="text-xl font-bold text-primary mb-6">الملف الشخصي</h2>

                    <div className="flex items-center gap-6 mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-4xl">
                                👤
                            </div>
                            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <div>
                            <p className="font-bold text-lg">دار المعارف للنشر</p>
                            <p className="text-sm text-muted-foreground">publisher@example.com</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">اسم الجهة</label>
                            <Input defaultValue="دار المعارف للنشر" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">البريد الإلكتروني</label>
                            <Input defaultValue="publisher@example.com" type="email" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">رقم الجوال</label>
                            <Input defaultValue="0512345678" dir="ltr" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">رقم الترخيص</label>
                            <Input defaultValue="LIC-2024-1234" dir="ltr" />
                        </div>
                    </div>
                </Card>

                {/* Password Section */}
                <Card>
                    <h2 className="text-xl font-bold text-primary mb-6">تغيير كلمة المرور</h2>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">كلمة المرور الحالية</label>
                            <Input type="password" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">كلمة المرور الجديدة</label>
                            <Input type="password" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">تأكيد كلمة المرور</label>
                            <Input type="password" />
                        </div>
                    </div>
                </Card>

                {/* Notifications Section */}
                <Card>
                    <h2 className="text-xl font-bold text-primary mb-6">الإشعارات</h2>

                    <div className="space-y-4">
                        {[
                            { label: 'إشعارات الطلبات الجديدة', checked: true },
                            { label: 'إشعارات طلبات الربط من المؤلفين', checked: true },
                            { label: 'تحديثات المنصة والعروض', checked: false },
                        ].map((item) => (
                            <label key={item.label} className="flex items-center justify-between cursor-pointer">
                                <span>{item.label}</span>
                                <input
                                    type="checkbox"
                                    defaultChecked={item.checked}
                                    className="w-5 h-5 rounded border-primary text-primary focus:ring-primary"
                                />
                            </label>
                        ))}
                    </div>
                </Card>

                {/* Save Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-end"
                >
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-8"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                    </Button>
                </motion.div>
            </div>
        </DashboardLayout>
    )
}
