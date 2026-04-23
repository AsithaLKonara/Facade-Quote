import { Project } from '../types/quote';

export function generateWhatsAppLink(project: Project): string {
    const phone = '94770000000'; // Business WhatsApp
    const message = encodeURIComponent(
        `*A-ZONE Order Update*\n\n` +
        `Hello, my project *${project.projectName}* (ID: ${project.id}) is currently in *${project.status.toUpperCase()}* status.\n\n` +
        `View Quote: https://a-zone-solutions.com/quote/${project.id}/pdf`
    );

    return `https://wa.me/${phone}?text=${message}`;
}

export function generateEmailLink(project: Project): string {
    const email = 'info@a-zone-solutions.com';
    const subject = encodeURIComponent(`Project Update: ${project.id}`);
    const body = encodeURIComponent(
        `Hello A-ZONE Team,\n\nI am checking the status of my project ${project.projectName}.\nStatus: ${project.status}\n\nThank you.`
    );

    return `mailto:${email}?subject=${subject}&body=${body}`;
}
