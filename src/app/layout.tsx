import type { Metadata } from "next";
import { Tajawal } from "next/font/google"; // Using Tajawal for Arabic
import "./globals.css";

const tajawal = Tajawal({
    subsets: ["arabic"],
    weight: ["200", "300", "400", "500", "700", "800", "900"],
    variable: "--font-tajawal",
});

export const metadata: Metadata = {
    title: "منصة مدار | وسعتك المعرفة",
    description: "المنصة الأحدث للكتب والمؤلفين - اكتشف عالم المعرفة مع مدار",
    icons: {
        icon: "/favicon.jpg",
        apple: "/logo.jpg",
    },
    openGraph: {
        title: "منصة مدار | وسعتك المعرفة",
        description: "المنصة الأحدث للكتب والمؤلفين - اكتشف عالم المعرفة مع مدار",
        images: ["/logo.jpg"],
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl" suppressHydrationWarning>
            <body className={`${tajawal.variable} antialiased bg-paper-texture`}>
                {children}
            </body>
        </html>
    );
}
