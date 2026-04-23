'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProjects } from '@/lib/project-service';
import { Project } from '@/types/quote';
import QuotationPrint from '@/components/quotation-print';

export default function QuotePdfPage() {
    const params = useParams();
    const router = useRouter();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        const projects = getProjects();
        const found = projects.find(p => p.id === params.id);
        if (found) setProject(found);
    }, [params.id]);

    if (!project) return <div className="p-20 text-center text-white italic">Loading Quotation Logic...</div>;

    return (
        <div className="min-h-screen bg-[#0e0918] py-12 px-4 print:bg-white print:p-0">
            <div className="max-w-[800px] mx-auto mb-8 flex justify-between items-center print:hidden">
                <button
                    onClick={() => router.back()}
                    className="text-white/50 hover:text-white transition-colors flex items-center gap-2 font-black uppercase tracking-widest text-[10px]"
                >
                    &larr; Back to Dashboard
                </button>
                <button
                    onClick={() => window.print()}
                    className="bg-primary text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all"
                >
                    Print / Download PDF
                </button>
            </div>

            <QuotationPrint project={project} />

            <div className="max-w-[800px] mx-auto mt-12 text-center text-white/20 text-[10px] font-black uppercase tracking-[0.5em] print:hidden">
                Secure Digital Document &bull; Internal ID: {project.id}
            </div>
        </div>
    );
}
