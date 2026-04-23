'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '@/lib/project-service';
import { Project } from '@/types/quote';
import Link from 'next/link';

export default function DashboardPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setProjects(getProjects());
    }, []);

    return (
        <div className="min-h-screen text-white p-8 pt-24 space-y-12 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-12">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase text-primary leading-none">FACADE <span className="text-white not-italic tracking-[0.3em] font-medium text-xs opacity-50 ml-2">Console</span></h2>
                    <p className="text-gray-500 text-sm font-medium">Manage your software development lifecycle and engagement.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/quote" className="glass-card bg-primary px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest hover:scale-105 transition-transform">New Estimate</Link>
                    <button className="glass-card bg-white/5 border-white/10 px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-colors">Sign Out</button>
                </div>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    <section className="glass-card p-10 border-white/10 overflow-hidden relative min-h-[400px]">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-lg font-black uppercase tracking-widest italic text-primary">Your Engagements</h3>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-30">Total: {projects.length}</div>
                        </div>

                        <div className="space-y-6">
                            {projects.length === 0 ? (
                                <div className="text-center py-20 italic text-gray-600 font-bold uppercase tracking-widest opacity-50">No Active Projects Yet. Start by creating a proposal.</div>
                            ) : (
                                projects.map((p, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        key={p.id}
                                        className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-black/40 border border-white/5 rounded-2xl hover:bg-white/[0.03] transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-6 mb-4 md:mb-0">
                                            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/20 rounded-full flex items-center justify-center text-white ring-8 ring-primary/5 font-black text-xl italic group-hover:scale-110 transition-transform">FS</div>
                                            <div>
                                                <p className="font-black text-xl italic leading-tight">{p.projectName}</p>
                                                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mt-1">{p.dateCreated}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
                                            <div className="text-right">
                                                <p className="text-[10px] text-gray-500 font-black uppercase tracking-tighter">Est. Investment</p>
                                                <p className="text-lg font-black italic tracking-tighter">LKR {(p.quote as any).grandTotal?.toLocaleString() || p.quote.totalCost.toLocaleString()}</p>
                                            </div>
                                            <Link
                                                href={`/quote/${p.id}/pdf`}
                                                className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
                                                title="Download Proposal PDF"
                                            >
                                                📄
                                            </Link>
                                            <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${p.status === 'deployed' ? 'bg-green-500/10 text-green-400 border border-green-500/20 shadow-green-500/10' : 'bg-primary/20 text-primary border border-primary/20 shadow-primary/10'}`}>
                                                {p.status}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </section>
                </div>

                <aside className="space-y-12">
                    <section className="glass-card border-primary/20 p-10 space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <div className="w-32 h-32 bg-primary rounded-full blur-[40px]" />
                        </div>
                        <h3 className="text-lg font-black uppercase tracking-widest italic text-primary leading-tight">Architect <br /> Consultation</h3>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium">Need help refining your technical scope or selecting a tech stack?</p>
                        <a
                            href="https://wa.me/94770000000"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-primary py-4 rounded-xl font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all transform hover:scale-[1.02] block text-center"
                        >
                            Talk to Architect
                        </a>
                        <div className="text-[10px] text-center text-gray-600 font-black tracking-[0.3em] mt-4 uppercase">Direct Line: +94 77 000 0000</div>
                    </section>
                </aside>
            </main>
        </div>
    );
}
