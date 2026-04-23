'use client';

import { useState, useEffect } from 'react';
import { calculateProjectQuote } from '@/lib/quote-engine';
import { QuoteLineItem, ProjectQuoteRequest, ProjectQuoteResponse, ServiceCategory, RoleId } from '@/types/quote';
import servicesData from '@/data/services.json';
import pricingData from '@/data/pricing.json';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const categories: { id: ServiceCategory, label: string, icon: string }[] = [
    { id: 'CONSULTATION', label: 'Discovery', icon: '🧠' },
    { id: 'UI_UX', label: 'Design', icon: '🎨' },
    { id: 'FULLSTACK', label: 'Fullstack', icon: '🚀' },
    { id: 'FRONTEND', label: 'Frontend', icon: '💻' },
    { id: 'BACKEND', label: 'Backend', icon: '⚙️' },
    { id: 'MOBILE', label: 'Mobile', icon: '📱' },
    { id: 'DEVOPS', label: 'DevOps', icon: '☁️' },
    { id: 'QA', label: 'Testing', icon: '🧪' },
    { id: 'MAINTENANCE', label: 'Support', icon: '🛠️' },
];

const packages = [
    { id: 'startup', name: 'Startup / MVP', desc: 'Limited scope, faster delivery, lower entry price.', icon: '🌱' },
    { id: 'growth', name: 'Growth', desc: 'Integrations, admin panels, automation, scaling.', icon: '📈' },
    { id: 'enterprise', name: 'Enterprise', desc: 'Security, audit trail, compliance, high SLA.', icon: '🏛️' },
];

export default function QuotePage() {
    const [project, setProject] = useState<ProjectQuoteRequest>({
        projectName: 'New Software Project',
        clientLocation: 'local',
        lineItems: [],
        globalOptions: {
            urgent: false,
            timeline: 'standard',
            targetMargin: 0.35
        }
    });

    const [currentComponent, setCurrentComponent] = useState<Omit<QuoteLineItem, 'id'>>({
        name: '',
        category: 'FULLSTACK',
        roleId: 'mid',
        quantity: 1,
        options: {
            complexity: 'simple',
            riskLevel: 'standard',
            estimatedHours: 40,
            sslRequired: false,
            domainRequired: false,
            hostingRequired: false,
            apiIntegrationsCount: 0
        }
    });

    const router = useRouter();
    const [result, setResult] = useState<ProjectQuoteResponse | null>(null);
    const [aiText, setAiText] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    useEffect(() => {
        if (project.lineItems.length > 0) {
            try {
                const res = calculateProjectQuote(project);
                setResult(res);
            } catch (err) {
                console.error('Calculation Error:', err);
            }
        } else {
            setResult(null);
        }
    }, [project]);

    const addComponentToProject = () => {
        if (!currentComponent.name) {
            alert('Please enter a module/component name');
            return;
        }
        setProject(prev => ({
            ...prev,
            lineItems: [...prev.lineItems, { ...currentComponent, id: crypto.randomUUID() }]
        }));
        setCurrentComponent(prev => ({ ...prev, name: '' }));
    };

    const removeComponent = (id: string) => {
        setProject(prev => ({
            ...prev,
            lineItems: prev.lineItems.filter(item => item.id !== id)
        }));
    };

    const updateGlobalOption = (key: keyof ProjectQuoteRequest['globalOptions'], value: any) => {
        setProject(prev => ({
            ...prev,
            globalOptions: { ...prev.globalOptions, [key]: value }
        }));
    };

    const handleServiceSelect = (serviceId: string) => {
        const service = servicesData.services.find(s => s.id === serviceId);
        if (service) {
            setCurrentComponent(prev => ({
                ...prev,
                serviceId: service.id,
                category: service.category as ServiceCategory,
                roleId: service.defaultRole as RoleId,
                options: { ...prev.options, estimatedHours: service.baseHours }
            }));
        }
    };

    const handleParseAI = async () => {
        if (!aiText) return;
        setIsAiLoading(true);
        try {
            const response = await fetch('/api/parse-quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: aiText })
            });
            const data = await response.json();
            if (data.lineItems) {
                setProject(prev => ({
                    ...prev,
                    lineItems: [...prev.lineItems, ...data.lineItems]
                }));
                setAiText('');
            }
        } catch (error) {
            console.error('AI Parse Error:', error);
        } finally {
            setIsAiLoading(false);
        }
    };

    return (
        <div className="min-h-screen text-white p-6 pt-24 max-w-7xl mx-auto space-y-12">
            <header className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6 gap-6">
                <div>
                    <h2 className="text-5xl font-black tracking-tighter italic text-white">FACADE <span className="text-primary not-italic uppercase tracking-widest text-lg ml-2">Smart Estimator</span></h2>
                    <p className="text-gray-400 text-lg mt-2 font-medium">Sri Lanka's premier ICT project pricing engine.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white/5 p-1 rounded-xl flex border border-white/10">
                        <button 
                            onClick={() => setProject({...project, clientLocation: 'local'})}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all ${project.clientLocation === 'local' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                        >
                            LKR Local
                        </button>
                        <button 
                            onClick={() => setProject({...project, clientLocation: 'export'})}
                            className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all ${project.clientLocation === 'export' ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                        >
                            USD Export
                        </button>
                    </div>
                </div>
            </header>

            {/* Packaging Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages.map(pkg => (
                    <div key={pkg.id} className="glass-card p-6 border-white/5 hover:border-primary/40 transition-all cursor-pointer group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-4xl">{pkg.icon}</div>
                        <h4 className="font-black italic uppercase tracking-widest text-primary mb-1">{pkg.name}</h4>
                        <p className="text-xs text-gray-400 font-medium leading-relaxed">{pkg.desc}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* LEFT PANEL */}
                <div className="space-y-6">
                    <div className="glass-card p-6 border-primary/40 bg-primary/5 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-black italic uppercase tracking-widest text-lg text-primary flex items-center gap-2">✨ AI Architect</h3>
                            <span className="text-[10px] uppercase font-black tracking-widest text-primary/60 border border-primary/20 px-2 py-1 rounded-md">Sri Lanka Role-Based Model</span>
                        </div>
                        <textarea
                            value={aiText}
                            onChange={(e) => setAiText(e.target.value)}
                            placeholder="e.g. 'Build a scalable e-commerce MVP for a local client with USD 10k budget'..."
                            className="w-full bg-black/40 border border-white/10 p-4 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm resize-none h-24 text-white"
                        />
                        <button
                            onClick={handleParseAI}
                            disabled={isAiLoading || !aiText}
                            className="w-full py-4 bg-primary rounded-xl font-black uppercase tracking-widest text-sm italic shadow-lg hover:shadow-primary/20 disabled:opacity-50"
                        >
                            {isAiLoading ? 'Scoping Modules...' : 'Architect Project Scope'}
                        </button>
                    </div>

                    <div className="glass-card p-8 border-white/10 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary/50"></div>
                        <h3 className="font-black italic uppercase tracking-widest text-lg">Define Deliverable</h3>
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Package / Service</label>
                            <select 
                                onChange={(e) => handleServiceSelect(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-sm text-white outline-none"
                            >
                                <option value="">Custom Engagement</option>
                                {servicesData.services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Module Description</label>
                            <input
                                type="text"
                                value={currentComponent.name}
                                onChange={(e) => setCurrentComponent({...currentComponent, name: e.target.value})}
                                placeholder="e.g. Core API Infrastructure"
                                className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-sm text-white outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Primary Role</label>
                                <select 
                                    value={currentComponent.roleId}
                                    onChange={(e) => setCurrentComponent({...currentComponent, roleId: e.target.value as RoleId})}
                                    className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-sm text-white outline-none"
                                >
                                    {pricingData.roles.map(r => <option key={r.id} value={r.id}>{r.name} (Rs. {r.hourlyRateLKR}/hr)</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Complexity</label>
                                <select 
                                    value={currentComponent.options?.complexity}
                                    onChange={(e) => setCurrentComponent({...currentComponent, options: {...currentComponent.options, complexity: e.target.value as any}})}
                                    className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-sm text-white outline-none"
                                >
                                    <option value="simple">Simple (1.0x)</option>
                                    <option value="medium">Medium (1.3x)</option>
                                    <option value="complex">Complex (1.8x)</option>
                                    <option value="enterprise">Enterprise (2.5x)</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Estimated Effort (Hrs)</label>
                                <input
                                    type="number"
                                    value={currentComponent.options?.estimatedHours}
                                    onChange={(e) => setCurrentComponent({...currentComponent, options: {...currentComponent.options, estimatedHours: Number(e.target.value)}})}
                                    className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-sm text-white outline-none font-mono"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Risk Reserve</label>
                                <select 
                                    value={currentComponent.options?.riskLevel}
                                    onChange={(e) => setCurrentComponent({...currentComponent, options: {...currentComponent.options, riskLevel: e.target.value as any}})}
                                    className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-sm text-white outline-none"
                                >
                                    <option value="clearScope">Low Risk (10%)</option>
                                    <option value="standard">Standard (15%)</option>
                                    <option value="highUncertainty">High Risk (25%)</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            {['hostingRequired', 'sslRequired', 'domainRequired'].map(opt => (
                                <label key={opt} className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors border border-white/5">
                                    <input 
                                        type="checkbox" 
                                        checked={(currentComponent.options as any)[opt]} 
                                        onChange={(e) => setCurrentComponent({...currentComponent, options: {...currentComponent.options, [opt]: e.target.checked}})} 
                                        className="accent-primary"
                                    />
                                    <span className="text-[9px] font-black uppercase tracking-tighter text-gray-500">{opt.replace('Required', '')}</span>
                                </label>
                            ))}
                        </div>

                        <button
                            onClick={addComponentToProject}
                            className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all shadow-xl"
                        >
                            Add to Proposal
                        </button>
                    </div>

                    <div className="glass-card p-8 border-white/10 space-y-6">
                        <h3 className="font-black italic uppercase tracking-widest text-lg border-b border-white/10 pb-4">Financial Guardrails</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Target Gross Margin</label>
                                <select 
                                    value={project.globalOptions.targetMargin}
                                    onChange={(e) => updateGlobalOption('targetMargin', Number(e.target.value))}
                                    className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-sm text-white outline-none"
                                >
                                    <option value={0.25}>Retainer (25%)</option>
                                    <option value={0.35}>Standard Build (35%)</option>
                                    <option value={0.45}>High Value / R&D (45%)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Delivery Velocity</label>
                                <select 
                                    value={project.globalOptions.timeline}
                                    onChange={(e) => updateGlobalOption('timeline', e.target.value)}
                                    className="w-full bg-black/40 border border-white/10 p-3 rounded-lg text-sm text-white outline-none"
                                >
                                    <option value="standard">Standard</option>
                                    <option value="express">Express (+50% Risk)</option>
                                    <option value="extended">Extended (Cost Focused)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: Proposal Preview */}
                <motion.div className="space-y-6 sticky top-24">
                    {project.lineItems.length === 0 ? (
                        <div className="glass-card h-96 flex flex-col items-center justify-center text-gray-500 border-dashed border-2 border-white/10 space-y-4">
                            <span className="text-5xl">📊</span>
                            <p className="text-xs uppercase tracking-widest font-black opacity-50 text-center">Architect your first module <br/> to generate the financial model</p>
                        </div>
                    ) : (
                        <div className="glass-card p-10 border-primary/30 bg-primary/[0.02] space-y-8 shadow-2xl">
                            <div className="flex justify-between items-start border-b border-white/10 pb-8">
                                <div>
                                    <h3 className="text-3xl font-black italic tracking-tighter uppercase text-white">{project.projectName}</h3>
                                    <p className="text-xs text-primary font-bold uppercase tracking-[0.2em] mt-2">Commercial Proposal Draft</p>
                                </div>
                                <div className="text-right">
                                    <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{project.clientLocation === 'export' ? 'USD Export' : 'LKR Local'}</span>
                                </div>
                            </div>

                            {/* Detailed Breakdown */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic">Financial Model (4-Layer)</h4>
                                    <div className="space-y-2 bg-black/40 p-6 rounded-2xl border border-white/5">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400 font-medium">1. Direct Delivery Cost (Labor)</span>
                                            <span className="font-mono">Rs. {result?.totalCostBreakdown.totalDelivery.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400 font-medium">2. Operational Overhead (PM/Admin)</span>
                                            <span className="font-mono">Rs. {result?.totalCostBreakdown.totalOverhead.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400 font-medium">3. Risk Reserve (Contingency)</span>
                                            <span className="font-mono">Rs. {result?.totalCostBreakdown.totalRisk.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm border-b border-white/5 pb-3">
                                            <span className="text-gray-400 font-medium">4. Pass-through (Cloud/Licenses)</span>
                                            <span className="font-mono">Rs. {result?.totalCostBreakdown.totalPassThrough.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm pt-2">
                                            <span className="text-primary font-black uppercase tracking-widest text-xs">Gross Margin ({(project.globalOptions.targetMargin! * 100).toFixed(0)}%)</span>
                                            <span className="font-mono text-primary font-bold">Rs. {result?.totalCostBreakdown.totalMargin.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-primary/20 space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs text-primary font-black uppercase tracking-[0.3em]">Total Value</span>
                                        <div className="text-right">
                                            {project.clientLocation === 'export' ? (
                                                <>
                                                    <p className="text-6xl font-black italic tracking-tighter text-white">
                                                        ${result?.totalCostBreakdown.grandTotalUSD.toLocaleString()}
                                                    </p>
                                                    <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">@ LKR {result?.exchangeRate} FX Rate</p>
                                                </>
                                            ) : (
                                                <p className="text-5xl font-black italic tracking-tighter text-white">
                                                    LKR {result?.totalCostBreakdown.grandTotalLKR.toLocaleString()}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Timeline</p>
                                        <p className="text-xl font-black italic">{result?.estimatedTimeWeeks} Weeks</p>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-right">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Contract Type</p>
                                        <p className="text-lg font-black italic uppercase text-primary">Fixed Price</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex gap-4">
                                <button className="glass-card px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs italic hover:bg-white/5 transition-all">
                                    Export Proposal
                                </button>
                                <button className="flex-1 bg-primary py-5 rounded-2xl font-black uppercase tracking-widest text-sm italic shadow-lg hover:shadow-primary/40 transition-all transform hover:scale-[1.02]">
                                    Lock Project
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
