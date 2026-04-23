'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SettingsPage() {
    const router = useRouter();
    const [materials, setMaterials] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchMaterials();
    }, []);

    const fetchMaterials = async () => {
        try {
            const res = await fetch('/api/settings/materials');
            const data = await res.json();
            setMaterials(data.materials || []);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch materials', error);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await fetch('/api/settings/materials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ materials })
            });
            alert('Prices updated successfully!');
        } catch (error) {
            console.error('Failed to save materials', error);
            alert('Failed to save prices.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleMaterialChange = (index: number, field: string, value: any) => {
        const newMaterials = [...materials];
        newMaterials[index] = { ...newMaterials[index], [field]: value };
        setMaterials(newMaterials);
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-white">Loading Settings...</div>;
    }

    return (
        <div className="min-h-screen text-white p-6 pt-24 max-w-7xl mx-auto space-y-12">
            <header className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <h2 className="text-5xl font-black tracking-tighter italic">Admin <span className="text-primary not-italic uppercase tracking-widest text-lg ml-2">Settings</span></h2>
                    <p className="text-gray-400 text-lg mt-2">Manage live material costs and pricing margins.</p>
                </div>
                <button 
                    onClick={() => router.push('/quote')}
                    className="glass-card px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors uppercase tracking-widest text-xs"
                >
                    Back to Quoter
                </button>
            </header>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 space-y-6 border-white/10">
                <div className="flex justify-between items-center">
                    <h3 className="font-black uppercase tracking-widest text-xl text-primary">Material Inventory Pricing</h3>
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-primary hover:bg-primary/80 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg transition-colors"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                                <th className="p-4">Material Name</th>
                                <th className="p-4">Base Cost</th>
                                <th className="p-4">Sheet Details (W x H | Price)</th>
                                <th className="p-4">Waste/Hardness</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materials.map((m, index) => (
                                <tr key={m.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-bold text-sm">{m.name}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 font-mono">Rs.</span>
                                            <input 
                                                type="number" 
                                                value={m.pricePerSqFt || m.pricePerMeter || 0} 
                                                onChange={(e) => handleMaterialChange(index, m.pricePerSqFt ? 'pricePerSqFt' : 'pricePerMeter', Number(e.target.value))}
                                                className="bg-black/50 border border-white/10 p-2 rounded focus:ring-1 focus:ring-primary outline-none font-mono w-24"
                                            />
                                            <span className="text-gray-400 text-xs uppercase">{m.unit}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="number" 
                                                placeholder="W"
                                                value={m.sheetWidthInch || ''} 
                                                onChange={(e) => handleMaterialChange(index, 'sheetWidthInch', Number(e.target.value))}
                                                className="bg-black/50 border border-white/10 p-2 rounded focus:ring-1 focus:ring-primary outline-none font-mono w-16 text-xs"
                                            />
                                            <span className="text-gray-500">x</span>
                                            <input 
                                                type="number" 
                                                placeholder="H"
                                                value={m.sheetHeightInch || ''} 
                                                onChange={(e) => handleMaterialChange(index, 'sheetHeightInch', Number(e.target.value))}
                                                className="bg-black/50 border border-white/10 p-2 rounded focus:ring-1 focus:ring-primary outline-none font-mono w-16 text-xs"
                                            />
                                            <span className="text-gray-500">| Rs.</span>
                                            <input 
                                                type="number" 
                                                placeholder="Sheet Price"
                                                value={m.pricePerSheet || ''} 
                                                onChange={(e) => handleMaterialChange(index, 'pricePerSheet', Number(e.target.value))}
                                                className="bg-black/50 border border-white/10 p-2 rounded focus:ring-1 focus:ring-primary outline-none font-mono w-24 text-xs"
                                            />
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="flex items-center gap-2 text-xs text-gray-400">
                                                Waste:
                                                <input 
                                                    type="number" 
                                                    step="0.05"
                                                    value={m.wastageFactor || 1.0} 
                                                    onChange={(e) => handleMaterialChange(index, 'wastageFactor', Number(e.target.value))}
                                                    className="bg-black/50 border border-white/10 p-1 rounded focus:ring-1 focus:ring-primary outline-none font-mono w-16"
                                                />
                                            </label>
                                            <label className="flex items-center gap-2 text-xs text-gray-400">
                                                Hard:
                                                <input 
                                                    type="number" 
                                                    step="0.1"
                                                    value={m.machinabilityFactor || 1.0} 
                                                    onChange={(e) => handleMaterialChange(index, 'machinabilityFactor', Number(e.target.value))}
                                                    className="bg-black/50 border border-white/10 p-1 rounded focus:ring-1 focus:ring-primary outline-none font-mono w-16"
                                                />
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
