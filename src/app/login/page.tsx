'use client'

export const dynamic = 'force-dynamic'

import { login } from '@/actions/auth'
import { Button, Input, Card } from '@/components/ui/core'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useActionState } from 'react'

export default function LoginPage() {
    const [state, formAction, isPending] = useActionState(login, null)

    return (
        <div className="min-h-screen flex items-center justify-center bg-paper-texture p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="bg-white/80 backdrop-blur-xl border-primary/10 shadow-2xl overflow-hidden relative">
                    {/* Decorative Top Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

                    <div className="space-y-6 p-6">
                        <div className="text-center space-y-2">
                            <h1 className="text-3xl font-bold text-primary font-tajawal">منصة مدار</h1>
                            <p className="text-muted-foreground">وسعتك المعرفة</p>
                        </div>

                        <form action={formAction} className="space-y-4">
                            {state?.error && (
                                <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm text-center font-medium">
                                    {state.error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                                    البريد الإلكتروني
                                </label>
                                <Input id="email" name="email" type="email" required placeholder="name@example.com" className="text-right" dir="rtl" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">
                                    كلمة المرور
                                </label>
                                <Input id="password" name="password" type="password" required className="text-right" dir="rtl" />
                            </div>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : "تسجيل الدخول"}
                            </Button>
                        </form>

                        <div className="text-center text-sm">
                            ليس لديك حساب؟{" "}
                            <Link href="/signup" className="text-primary hover:underline font-bold">
                                إنشاء حساب جديد
                            </Link>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}
