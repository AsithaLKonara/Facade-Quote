import { Project, QuoteResponse, QuoteRequest } from '../types/quote';

const STORAGE_KEY = 'a-zone-projects';

export function getProjects(): Project[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function createProject(request: QuoteRequest, quote: QuoteResponse): Project {
    const newProject: Project = {
        id: `PRJ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        clientName: 'Demo Client',
        projectName: `${request.serviceType.replace(/-/g, ' ')} Project`,
        status: 'pending',
        quote: quote,
        dateCreated: new Date().toISOString().split('T')[0],
        tasks: [
            { id: 't1', name: 'Initial Design Approval', status: 'todo', estimatedHours: 2 },
            { id: 't2', name: 'Material Procurement', status: 'todo', estimatedHours: 4 },
            { id: 't3', name: 'Production Execution', status: 'todo', estimatedHours: 8 },
            { id: 't4', name: 'Quality Check & Finish', status: 'todo', estimatedHours: 2 },
        ]
    };

    const projects = getProjects();
    const updated = [newProject, ...projects];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newProject;
}

export function updateProjectStatus(id: string, status: Project['status']): void {
    const projects = getProjects();
    const updated = projects.map(p => p.id === id ? { ...p, status } : p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
