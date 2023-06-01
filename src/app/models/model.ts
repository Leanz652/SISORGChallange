import { FormControl } from "@angular/forms";

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

export interface TaskForm {
    title: FormControl<string | null> ;
    description: FormControl<string | null> ;
    status: FormControl<Status | null>  ;
    priority: FormControl<Priority | null>;
    date: FormControl<Date | null> ;
}