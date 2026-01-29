'use client'

import { motion } from 'framer-motion'
import { Button, Card } from '@/components/ui/core'
import { BookOpen, Sparkles, Store, ArrowRight, Star, Quote } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/shared/Navbar'

// Flame/Candle Animation Component
const FlameAnimation = () => (
  <motion.div
    className="relative w-24 h-32 mx-auto mb-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 1 }}
  >
    {/* Candle Base */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-16 bg-gradient-to-t from-yellow-100 to-amber-100 rounded-t-lg shadow-inner" />

    {/* Flame Glow */}
    <motion.div
      className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(255, 200, 100, 0.6) 0%, rgba(255, 150, 50, 0) 70%)',
      }}
      animate={{
        scale: [1, 1.2, 1.1, 1.3, 1],
        opacity: [0.7, 1, 0.8, 1, 0.7],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />

    {/* Flame Core */}
    <motion.div
      className="absolute bottom-12 left-1/2 -translate-x-1/2 w-4 h-8 origin-bottom"
      style={{
        background: 'linear-gradient(to top, #C6A87C 0%, #F97316 40%, #EF4444 100%)',
        borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      }}
      animate={{
        scaleY: [1, 1.3, 1.1, 1.2, 1],
        scaleX: [1, 0.9, 1.1, 0.95, 1],
        rotate: [0, 2, -3, 1, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  </motion.div>
)

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  delay: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ scale: 1.05, translateY: -5 }}
    className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 text-center space-y-4"
  >
    <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:rotate-12">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <h3 className="font-bold text-xl text-primary">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{description}</p>
  </motion.div>
)

const FeaturedBook = ({ book, index }: { book: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="group"
  >
    <Link href={`/books/${book.id}`}>
      <Card className="h-full overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/40 backdrop-blur-sm">
        <div className="aspect-[2/3] bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-8xl group-hover:scale-105 transition-transform duration-700 relative">
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {book.cover}
        </div>
        <div className="p-6">
          <h3 className="font-bold text-lg text-primary mb-1 group-hover:text-secondary transition-colors line-clamp-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{book.author}</p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-secondary">{book.price} ر.س</span>
            <div className="flex items-center gap-1 text-amber-500 text-sm">
              <Star className="w-3 h-3 fill-current" />
              <span>٤.٩</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  </motion.div>
)

const mockFeaturedBooks = [
  { id: '1', title: 'خوارزميات المعرفة', author: 'د. خالد العمري', cover: '📚', price: 55 },
  { id: '2', title: 'أسرار الفكر العربي', author: 'أمل السعيد', cover: '📙', price: 42 },
  { id: '3', title: 'تاريخ المدار', author: 'منصة مدار', cover: '📖', price: 0 },
  { id: '4', title: 'رحلة في أعماق العقل', author: 'محمد يوسف', cover: '📓', price: 68 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper-texture">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[140px]"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <FlameAnimation />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-primary mb-8 tracking-tight leading-tight">
              مدار المعرفة <br />
              <span className="text-secondary italic">بين يديك</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              اكتشف عالماً من الكتب، تواصل مع مؤلفينك المفضلين، وتابع شغفك بالقراءة في منصة واحدة تجمع كل أطراف المعرفة.
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/books">
                <Button variant="primary" size="lg" className="rounded-full shadow-2xl shadow-primary/30 h-16 px-10 text-xl">
                  تصفح المتجر
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary/5 backdrop-blur-sm h-16 px-10 text-xl">
                  انضم إلينا
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/40"
        >
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1">
            <motion.div
              animate={{ height: [4, 8, 4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 bg-current rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Books Section */}
      <section className="py-32 px-6 bg-white/40 backdrop-blur-md relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl text-right">
              <h2 className="text-5xl font-bold text-primary mb-6">إصدارات مختارة</h2>
              <p className="text-lg text-muted-foreground">أحدث الكتب التي أثارت إعجاب القراء في مدار. اختر كتابك القادم وابدأ رحلة جديدة.</p>
            </div>
            <Link href="/books">
              <Button variant="ghost" className="text-primary hover:text-secondary gap-3 text-xl group h-14">
                عرض كل الكتب <ArrowRight className="w-6 h-6 group-hover:translate-x-[-4px] transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {mockFeaturedBooks.map((book, index) => (
              <FeaturedBook key={book.id} book={book} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Quote className="w-16 h-16 text-secondary/30 mx-auto mb-8" />
          <p className="text-3xl md:text-4xl font-tajawal leading-relaxed italic mb-8">
            "القراءة هي المفتاح الذي يفتح أبواب العقول، ومدار هي الجسر الذي يجمعنا تحت مظلة المعرفة."
          </p>
          <div className="text-secondary font-bold text-xl">— فريق مدار</div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-white rounded-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-6xl font-bold text-primary mb-8 tracking-tight">منظومة المعرفة المتكاملة</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">مدار ليست مجرد متجر، إنها بيت لكل من يعشق الكتاب، نربط جميع أطراف الصناعة في مكان واحد.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={BookOpen}
              title="للمؤلفين"
              description="حوّل إبداعك إلى كتاب حقيقي. اربط مسوداتك مع دور النشر، وتابع انتشار كلماتك حول العالم."
              delay={0.2}
            />
            <FeatureCard
              icon={Sparkles}
              title="لدور النشر"
              description="منصة رقمية متكاملة لإدارة إصداراتكم، اكتشاف المواهب الجديدة، وتوسيع قاعدة قرائكم."
              delay={0.4}
            />
            <FeatureCard
              icon={Store}
              title="لمتاجر الكتب"
              description="ارتقِ بمتجرك إلى آفاق جديدة. اعرض مخزونك لملايين القراء في كل أنحاء المملكة وخارجها."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-secondary/20 to-primary/10 rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl border border-white/50">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold text-primary mb-8">ابدأ رحلتك اليوم</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              سجل الآن وانضم إلى آلاف القراء والمبدعين في أكبر منصة عربية متكاملة للكتاب.
            </p>
            <Link href="/signup">
              <Button size="lg" className="px-16 rounded-full h-20 text-2xl shadow-xl shadow-primary/20">اشترك مجاناً</Button>
            </Link>
          </div>

          {/* Decorative background shape */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full -ml-40 -mb-40 blur-3xl" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white/80 backdrop-blur-md border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="space-y-6 max-w-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <span className="text-3xl font-bold text-primary">مدار</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                منصة مدار هي الوجهة الأولى لكل مهتم بصناعة الكتاب، نجمع المؤلف، الناشر، بائع الكتب، والقارئ في مدار واحد.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="space-y-4">
                <h4 className="font-bold text-primary text-xl">المنصة</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link></li>
                  <li><Link href="/books" className="hover:text-primary transition-colors">الكتب</Link></li>
                  <li><Link href="/services" className="hover:text-primary transition-colors">الخدمات</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-primary text-xl">المجتمع</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="#" className="hover:text-primary transition-colors">المؤلفين</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">الناشرين</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">الشركاء</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-primary text-xl">الدعم</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link href="#" className="hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">اتصل بنا</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
            <p>© 2026 منصة مدار. جميع الحقوق محفوظة. بنيت بحب للثقافة العربية.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-primary">الشروط والأحكام</Link>
              <Link href="#" className="hover:text-primary">سياسة الخصوصية</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
