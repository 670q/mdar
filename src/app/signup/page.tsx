'use client'

export const dynamic = 'force-dynamic'

import { signup } from '@/actions/auth'
import { Button, Input, Card } from '@/components/ui/core'
import { motion } from 'framer-motion'
import { BookOpen, Building2, Store, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { clsx } from 'clsx'

import { useActionState } from 'react'

export default function SignupPage() {
    const [selectedRole, setSelectedRole] = useState('reader')
    const [state, formAction, isPending] = useActionState(signup, null)

    const roles = [
        { id: 'reader', label: 'قارئ', icon: User, desc: 'استمتع بالقراءة والشراء' },
        { id: 'author', label: 'مؤلف', icon: BookOpen, desc: 'اربط كتبك وتابع مبيعاتك' },
        { id: 'publisher', label: 'دار نشر', icon: Building2, desc: 'أضف كتب وخدمات تأليف' },
        { id: 'bookstore', label: 'متجر كتب', icon: Store, desc: 'اعرض مخزونك للبيع' },
    ]

    return (
        <div className="min-h-screen flex items-center justify-center bg-paper-texture p-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <Card className="bg-white/90 backdrop-blur-xl border-primary/10 shadow-2xl relative overflow-hidden">
                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-primary to-secondary" />

                    <div className="space-y-8 p-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold text-primary font-tajawal">انضم إلى مدار</h1>
                            <p className="text-muted-foreground">اختر نوع حسابك للبدء</p>
                        </div>

                        <form action={formAction} className="space-y-6">
                            {state?.error && (
                                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium">
                                    {state.error}
                                </div>
                            )}

                            {/* Role Selection */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="rtl">
                                {roles.map((role) => {
                                    const Icon = role.icon
                                    const isSelected = selectedRole === role.id
                                    return (
                                        <div
                                            key={role.id}
                                            onClick={() => setSelectedRole(role.id)}
                                            className={clsx(
                                                "cursor-pointer rounded-lg border-2 p-4 transition-all duration-300 flex flex-col items-center text-center space-y-2 hover:shadow-md",
                                                isSelected
                                                    ? "border-primary bg-primary/5 text-primary scale-[1.02]"
                                                    : "border-transparent bg-background/50 hover:bg-background hover:border-primary/20"
                                            )}
                                        >
                                            <Icon className={clsx("w-8 h-8", isSelected ? "text-primary" : "text-muted-foreground")} />
                                            <div className="font-bold">{role.label}</div>
                                            <div className="text-xs text-muted-foreground">{role.desc}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <input type="hidden" name="role" value={selectedRole} />

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium block text-right">الاسم الكامل / اسم الجهة</label>
                                    <Input name="fullName" required className="text-right" dir="rtl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium block text-right">البريد الإلكتروني</label>
                                    <Input name="email" type="email" required className="text-right" dir="rtl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium block text-right">كلمة المرور</label>
                                    <Input name="password" type="password" required className="text-right" dir="rtl" />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-primary hover:bg-primary/90 text-white text-lg h-12 flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : "إنشاء الحساب"}
                            </Button>
                        </form>

                        <div className="text-center text-sm">
                            لديك حساب بالفعل؟{" "}
                            <Link href="/login" className="text-primary hover:underline font-bold">
                                تسجيل الدخول
                            </Link>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}
