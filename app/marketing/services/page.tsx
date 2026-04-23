'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
    { id: '1', title: 'CNC Router Cutting', desc: 'Precision cutting for wood, acrylic, and boards up to 8x4ft.', icon: '🦾' },
    { id: '2', title: 'Laser Engraving', desc: 'Fine detail engraving for gifts, name boards, and art.', icon: '🎯' },
    { id: '3', title: 'Light Box Signs', desc: 'Custom metal frame light boxes with premium LED modules.', icon: '✨' },
    { id: '4', title: '3D Embossed Letters', desc: 'Dimensional signage in acrylic, foam, or PVC with lighting.', icon: '🏷️' },
    { id: '5', title: 'Glass Signage', desc: 'Elegant wall-mounted glass boards for modern office spaces.', icon: '🏢' },
    { id: '6', title: 'Logo & UI Design', desc: 'Professional branding and digital interface design.', icon: '🎨' },
];

export default function ServicesPage() {
    return (
        <div className="min-h-screen text-white p-8 pt-32 max-w-7xl mx-auto space-y-16">
            <header className="text-center space-y-4">
                <h2 className="text-6xl font-black tracking-tighter italic">Expert <span className="text-primary not-italic uppercase tracking-widest text-lg ml-2">Services</span></h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">High-precision fabrication and digital design solutions for every business need.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((s, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={s.id}
                        className="glass-card p-10 border-white/5 hover:border-primary/20 transition-all group relative overflow-hidden flex flex-col justify-between h-full"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <div className="w-24 h-24 bg-primary rounded-full blur-[30px]" />
                        </div>
                        <div>
                            <div className="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left inline-block">{s.icon}</div>
                            <h3 className="text-2xl font-black italic mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors">{s.title}</h3>
                            <p className="text-gray-500 font-medium leading-relaxed mb-8">{s.desc}</p>
                        </div>
                        <Link href="/quote" className="text-primary font-black uppercase tracking-widest text-xs hover:underline underline-offset-8 decoration-primary/50 group-hover:translate-x-1 transition-transform inline-block">Calculate Quote &rarr;</Link>
                    </motion.div>
                ))}
            </section>

            <section className="glass-card p-12 border-primary/20 text-center space-y-8 bg-primary/5 relative overflow-hidden">
                <h3 className="text-3xl font-black italic tracking-tighter">Ready to build your masterpiece?</h3>
                <p className="text-gray-400 font-medium max-w-xl mx-auto">Skip the manual emails. Use our smart quote tool to get accurate pricing in seconds.</p>
                <div className="flex gap-4 justify-center">
                    <Link href="/quote" className="bg-primary text-white px-10 py-5 rounded-full text-xl font-black hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all">Start Quoting</Link>
                    <button className="glass-card border-white/10 px-10 py-5 rounded-full text-xl font-black hover:bg-white/5 transition-colors">Contact Expert</button>
                </div>
            </section>
        </div>
    );
}
