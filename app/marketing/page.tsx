'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const features = [
    { id: '1', title: 'AI Architect', description: 'Intelligent project scoping in seconds.', icon: '🧠' },
    { id: '2', title: 'Fullstack Precision', description: 'Accurate estimates for web, mobile & cloud.', icon: '🚀' },
    { id: '3', title: 'Automated Proposals', description: 'Generate professional PDF proposals instantly.', icon: '📄' },
];

export default function MarketingPage() {
    return (
        <div className="flex flex-col min-h-screen text-white">
            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-black/50"
            >
                <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
                    <h1 className="text-xl font-bold tracking-tighter uppercase tracking-widest text-primary italic">FACADE <span className="text-white opacity-50 not-italic uppercase tracking-widest text-xs ml-2">Center</span></h1>
                    <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
                        <Link href="/marketing/services" className="hover:text-primary transition-colors">Services</Link>
                        <Link href="/marketing/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
                        <Link href="/quote" className="hover:text-primary transition-colors">Instant Quote</Link>
                        <Link href="/dashboard" className="glass-card bg-primary px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform">Dashboard</Link>
                    </nav>
                </div>
            </motion.header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-40 text-center relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-6 max-w-5xl"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full glass-card border-primary/20 text-xs font-black uppercase tracking-[0.2em] text-primary mb-4 bg-primary/5">
                        Premium Software Estimation Engine
                    </div>
                    <h2 className="text-6xl md:text-9xl font-black tracking-tight leading-none bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent italic">
                        Vision Meets <br /> <span className="text-primary not-italic">Execution.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        The ultimate platform for high-end software development agencies.
                        Architect complex projects and generate accurate quotes with AI-powered scoping.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Link href="/quote" className="bg-primary text-white p-6 rounded-full text-xl font-black hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all transform hover:scale-105">
                            Start Estimation
                        </Link>
                        <Link href="/marketing/portfolio" className="glass-card hover:bg-white/5 transition-colors p-6 rounded-full text-xl font-black border-white/20">
                            View Case Studies
                        </Link>
                    </div>
                </motion.div>

                {/* Feature Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-32">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 * i }}
                            className="glass-card p-8 text-left hover:border-primary/30 transition-all cursor-default group"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{f.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
                        </motion.div>
                    ))}
                </section>
            </main>

            <footer className="p-12 border-t border-white/5 bg-black/50 backdrop-blur-md text-center">
                <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.5em]">&copy; {new Date().getFullYear()} FACADE CENTER. Powered by Antigravity AI.</p>
            </footer>
        </div>
    );
}
