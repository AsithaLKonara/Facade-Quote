import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "FACADE CENTER | Software Quote Platform",
    description: "Premium AI-powered software project estimation and quotation platform.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-black text-white relative`}>
                {/* Nano-Banana Background Elements */}
                <div className="bg-gradient-container pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="gradient-circle -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#8b5cf6] animate-pulse-slow" />
                    <div className="gradient-circle -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[#4f46e5] animate-pulse-slow" style={{ animationDelay: '4s' }} />
                    <div className="gradient-circle top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-[#ec4899] animate-pulse-slow" style={{ animationDelay: '8s' }} />
                </div>

                {/* Main Content */}
                <div className="relative z-10">{children}</div>
            </body>
        </html>
    );
}
