import type { Metadata } from "next";
import { Tajawal } from "next/font/google"; // Using Tajawal for Arabic
import "./globals.css";

const tajawal = Tajawal({
    subsets: ["arabic"],
    weight: ["200", "300", "400", "500", "700", "800", "900"],
    variable: "--font-tajawal",
});

export const metadata: Metadata = {
    title: "Madar Platform | منصة مدار",
    description: "وسعتك المعرفة - المنصة الأحدث للكتب والمؤلفين",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl">
            <body className={`${tajawal.variable} antialiased bg-paper-texture`}>
                {children}
            </body>
        </html>
    );
}
