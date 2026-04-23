'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
    { id: '1', title: 'Modern Light Box', category: 'Signage', desc: 'Custom metal frame with acrylic letters.', icon: '🏗️' },
    { id: '2', title: 'Laser Engraved Wood', category: 'Art', desc: 'Natural wood panels with deep engraving.', icon: '🪵' },
    { id: '3', title: 'Digital Branding', category: 'Creative', desc: 'Professional logo and color palette design.', icon: '🎯' },
    { id: '4', title: 'Glass Office Sign', category: 'Signage', desc: 'Minimal wall-mounted tempered glass.', icon: '🏢' },
    { id: '5', title: 'CNC Cut Acrylic', category: 'Fabrication', desc: 'Precision cut letters for shop fronts.', icon: '📐' },
    { id: '6', title: 'Infinity Mirror Board', category: 'Signage', desc: 'Dynamic LED mirror for modern spaces.', icon: '✨' },
];

export default function PortfolioPage() {
    return (
        <div className="min-h-screen text-white p-8 pt-32 max-w-7xl mx-auto space-y-20">
            <header className="text-center space-y-6">
                <div className="inline-block px-4 py-1 rounded-full glass-card border-primary/20 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2">Our Portfolio</div>
                <h2 className="text-7xl font-black tracking-tighter italic">Mastercrafted <span className="text-primary not-italic uppercase tracking-widest text-lg ml-2">Legacy</span></h2>
                <p className="text-gray-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed italic opacity-80">A gallery of precision fabrication and digital design projects delivered with excellence.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {projects.map((p, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={p.id}
                        className="group relative h-[450px] overflow-hidden rounded-[3rem] glass-card border-white/5 cursor-pointer hover:border-primary/40 transition-all hover:scale-[1.02] hover:-translate-y-2 bg-gradient-to-b from-white/5 to-transparent"
                    >
                        <div className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center space-y-8 bg-black/40 group-hover:bg-primary/5 transition-colors z-10">
                            <div className="text-7xl mb-4 transform scale-100 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700 bg-black/40 p-10 rounded-full border border-white/5">{p.icon}</div>
                            <div className="space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                                <span className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">{p.category}</span>
                                <h3 className="text-4xl font-black italic tracking-tighter uppercase leading-none">{p.title}</h3>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed italic opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200">{p.desc}</p>
                            </div>
                        </div>
                        {/* Hover Shadow Decor */}
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-20 transition-opacity">
                            <div className="w-48 h-48 bg-primary rounded-full blur-[60px]" />
                        </div>
                    </motion.div>
                ))}
            </section>

            <section className="text-center py-20 pb-40">
                <Link href="/quote" className="glass-card bg-primary px-16 py-8 rounded-full text-2xl font-black hover:shadow-[0_0_50px_rgba(139,92,246,0.3)] transition-all transform hover:scale-110 uppercase tracking-widest leading-none">Calculate Quote Engine</Link>
                <div className="text-[10px] text-gray-600 font-bold tracking-[0.5em] mt-12 uppercase">Instant Pricing &bull; sub-1.5s Execution</div>
            </section>
        </div>
    );
}
