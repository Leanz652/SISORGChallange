export enum Status {
    NEW = 'New',
    INPROGRESS = 'In progress',
    COMPLETED = 'Completed',
}

export enum Priority {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
}

export interface Task {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    date: Date;
}