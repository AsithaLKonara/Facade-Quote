'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects, updateProjectStatus } from '@/lib/project-service';
import { Project } from '@/types/quote';

export default function AdminDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setProjects(getProjects());
    }, []);

    const changeStatus = (id: string, newStatus: Project['status']) => {
        updateProjectStatus(id, newStatus);
        setProjects(getProjects());
    };

    const totalRevenue = projects.reduce((total, p) => total + p.quote.totalCost, 0);

    const stats = [
        { label: 'Live Projects', value: projects.length.toString(), icon: '📁' },
        { label: 'Revenue (LKR)', value: (totalRevenue / 1000).toFixed(1) + 'K', icon: '💰' },
        { label: 'Active Workers', value: '8', icon: '👷' },
        { label: 'Pending Quotes', value: '12', icon: '⏳' },
    ];

    return (
        <div className="min-h-screen text-white p-8 pt-24 space-y-12 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-12">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase text-primary leading-none">Admin <span className="text-white not-italic tracking-[0.3em] font-medium text-xs opacity-50 ml-2">Control Panel</span></h2>
                    <p className="text-gray-500 text-sm font-medium italic">Full system control for A ZONE Solutions.</p>
                </div>
                <div className="flex gap-4">
                    <button className="glass-card bg-primary/10 border-primary/20 px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest hover:bg-primary/20 transition-all shadow-lg shadow-primary/10">Manage Catalog</button>
                    <button className="glass-card bg-white/5 border-white/10 px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-colors">Sign Out</button>
                </div>
            </header>

            <main className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((s, i) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * i }}
                            key={s.label}
                            className="glass-card p-8 border-white/10 hover:border-primary/30 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <div className="w-16 h-16 bg-primary rounded-full blur-[20px]" />
                            </div>
                            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{s.icon}</div>
                            <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest leading-none mb-2">{s.label}</span>
                            <p className="text-4xl font-black italic tracking-tighter group-hover:text-primary transition-colors">{s.value}</p>
                        </motion.div>
                    ))}
                </div>

                <section className="glass-card bg-black/40 border-white/10 rounded-3xl overflow-hidden p-10 relative scrollbar-hide">
                    <h3 className="text-xl font-black uppercase tracking-widest italic text-primary mb-10">Live Project Feed</h3>
                    {projects.length === 0 ? (
                        <p className="text-gray-600 font-bold uppercase tracking-widest text-center py-20 italic">No Projects in the system feed.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className="border-b border-white/5 text-[10px] opacity-30 uppercase tracking-[0.4em] font-black italic">
                                    <tr>
                                        <th className="pb-6">Project Details</th>
                                        <th className="pb-6">System Status</th>
                                        <th className="pb-6">Value (LKR)</th>
                                        <th className="pb-6 text-right">Admin Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {projects.map((p, i) => (
                                        <motion.tr
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + (0.1 * i) }}
                                            key={p.id}
                                            className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                                        >
                                            <td className="py-8 pr-4">
                                                <p className="font-black text-xl italic group-hover:text-primary transition-colors underline-offset-8 group-hover:underline leading-none">{p.projectName}</p>
                                                <span className="text-[10px] text-gray-600 font-black uppercase tracking-[0.3em] mt-3 block">{p.id} &bull; {p.dateCreated}</span>
                                            </td>
                                            <td className="py-8 pr-4">
                                                <select
                                                    className="bg-black/60 border border-white/10 rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-primary h-10"
                                                    value={p.status}
                                                    onChange={(e) => changeStatus(p.id, e.target.value as any)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="design">Design</option>
                                                    <option value="production">Production</option>
                                                    <option value="assembly">Assembly</option>
                                                    <option value="delivery">Delivery</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </td>
                                            <td className="py-8 pr-4 font-black italic tracking-tighter text-lg">{p.quote.totalCost.toLocaleString()}</td>
                                            <td className="py-8 pr-4 text-right">
                                                <button className="px-6 py-2 bg-white/5 text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10 hover:bg-white/10 transition-all italic">View Logic</button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
