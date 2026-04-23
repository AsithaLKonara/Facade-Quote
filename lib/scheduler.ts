export interface Task {
    id: string;
    name: string;
    durationHours: number;
    workerId?: string;
    machineId?: string;
    deadline: Date;
}

export function scheduleTasks(tasks: Task[]): Task[] {
    // Simple "Earliest Deadline First" implementation as per rules
    return [...tasks].sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
}

export function checkConflicts(scheduledTasks: Task[]): boolean {
    // Logic to prevent machine/worker overlap
    // For now, return false (no conflicts) for the MVP
    return false;
}
