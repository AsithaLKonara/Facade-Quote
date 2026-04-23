'use client';

import { Project } from '@/types/quote';

interface Props {
    project: Project;
}

export default function QuotationPrint({ project }: Props) {
    const isExport = project.clientLocation === 'export';
    const currency = isExport ? 'USD' : 'LKR';
    const totalAmount = isExport ? project.quote.totalCostBreakdown.grandTotalUSD : project.quote.totalCostBreakdown.grandTotalLKR;

    return (
        <div className="bg-white text-black p-12 max-w-[800px] mx-auto font-sans shadow-2xl border border-gray-100 print:shadow-none print:border-none print:p-0">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-[#8b5cf6] pb-8 mb-8">
                <div>
                    <h1 className="text-4xl font-black italic tracking-tighter text-[#8b5cf6]">FACADE <span className="text-black not-italic text-sm tracking-widest uppercase opacity-50 block mt-1">Center Software Systems</span></h1>
                    <p className="text-xs mt-4 text-gray-500 max-w-[250px] leading-relaxed font-medium">
                        Custom Software Development, Cloud Infrastructure, and Digital Transformation.
                    </p>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-400">Software Proposal</h2>
                    <p className="text-sm font-bold mt-2">{project.id}</p>
                    <p className="text-xs text-gray-400">{project.dateCreated}</p>
                </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-12 mb-12 text-sm">
                <div>
                    <p className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-2">Client Details</p>
                    <p className="font-bold text-lg">{project.clientName}</p>
                    <p className="text-gray-500">Project: {project.projectName}</p>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold italic">{isExport ? 'International Engagement (USD)' : 'Local Engagement (LKR)'}</p>
                </div>
                <div className="text-right">
                    <p className="font-black uppercase tracking-widest text-[10px] text-gray-400 mb-2">Proposal Validity</p>
                    <p className="font-bold">30 Days from Issue</p>
                    <p className="text-gray-500 text-xs">(Requires review for technical scope changes)</p>
                </div>
            </div>

            {/* Item Table */}
            <table className="w-full text-left mb-12 border-collapse">
                <thead className="bg-gray-50 text-[10px] uppercase tracking-widest font-black text-gray-500">
                    <tr>
                        <th className="p-4 border-b">Scope / Module</th>
                        <th className="p-4 border-b text-right">Role</th>
                        <th className="p-4 border-b text-right">Hours</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {project.quote.lineItems.map((item) => (
                        <tr key={item.id}>
                            <td className="p-4 border-b">
                                <p className="font-bold">{item.name}</p>
                                <p className="text-xs text-gray-400 mt-1 italic">{item.category} • {item.options?.complexity} complexity</p>
                            </td>
                            <td className="p-4 border-b text-right text-xs uppercase font-bold text-gray-500">{item.roleId}</td>
                            <td className="p-4 border-b text-right font-mono">{item.options?.estimatedHours}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Financial Model Breakdown */}
            <div className="flex justify-end mb-12">
                <div className="w-80 space-y-3 text-sm">
                    <div className="flex justify-between text-gray-500 text-xs">
                        <span>Direct Delivery (LKR)</span>
                        <span className="font-mono">{project.quote.totalCostBreakdown.totalDelivery.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-xs">
                        <span>Management & Overhead</span>
                        <span className="font-mono">{project.quote.totalCostBreakdown.totalOverhead.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-xs">
                        <span>Risk Reserve (Contingency)</span>
                        <span className="font-mono">{project.quote.totalCostBreakdown.totalRisk.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-xs border-b pb-2">
                        <span>Pass-through Costs</span>
                        <span className="font-mono">{project.quote.totalCostBreakdown.totalPassThrough.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between font-black text-2xl text-[#8b5cf6] pt-2">
                        <span>TOTAL ({currency})</span>
                        <span className="font-mono">{currency} {totalAmount.toLocaleString()}</span>
                    </div>
                    {isExport && (
                        <p className="text-[9px] text-right text-gray-400 italic">Converted at LKR {project.quote.exchangeRate} / USD rate</p>
                    )}
                </div>
            </div>

            {/* Terms */}
            <div className="border-t pt-8 text-[10px] text-gray-400 leading-relaxed">
                <p className="font-black uppercase tracking-widest text-black mb-2">Standard Engagement Terms</p>
                <ul className="list-disc pl-4 space-y-1">
                    <li>30% Commitment fee required to initiate development.</li>
                    <li>Milestone-based billing: 40% upon UAT deployment, 30% upon final production launch.</li>
                    <li>Source code ownership transferred upon final payment settlement.</li>
                    <li>Estimated delivery timeline: {project.quote.estimatedTimeWeeks} weeks.</li>
                    <li>{isExport ? 'All payments must be made in USD via international wire transfer.' : 'All payments must be made in LKR via bank transfer.'}</li>
                </ul>
            </div>

            {/* Signature */}
            <div className="mt-20 flex justify-between items-end border-t pt-8">
                <div className="text-center">
                    <div className="w-48 border-b-2 border-gray-200 mb-2"></div>
                    <p className="text-[10px] font-black uppercase tracking-widest">Client Authorization</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#8b5cf6] italic">FACADE Center Solutions Architect</p>
                </div>
            </div>
        </div>
    );
}
