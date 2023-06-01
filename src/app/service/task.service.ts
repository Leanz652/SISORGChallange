import { Injectable } from '@angular/core';
import { Priority, Status, Task } from '../models/model';
import { Observable, delay, of } from 'rxjs';


const tasks: Task[] = [
  {
    title: 'Task 1',
    description: 'Description of task 1',
    status: Status.NEW,
    priority: Priority.LOW,
    date: new Date('2023-06-01') // Cambia la fecha a la que desees
  },
  {
    title: 'Task 2',
    description: 'Description of task 2',
    status: Status.INPROGRESS,
    priority: Priority.MEDIUM,
    date: new Date('2023-06-02') // Cambia la fecha a la que desees
  },
  {
    title: 'Task 3',
    description: 'Description of task 3',
    status: Status.COMPLETED,
    priority: Priority.HIGH,
    date: new Date('2023-06-03') // Cambia la fecha a la que desees
  },
  {
    title: 'Task 4',
    description: 'Description of task 4',
    status: Status.NEW,
    priority: Priority.MEDIUM,
    date: new Date('2023-06-04') // Cambia la fecha a la que desees
  },
  {
    title: 'Task 5',
    description: 'Description of task 5',
    status: Status.INPROGRESS,
    priority: Priority.LOW,
    date: new Date('2023-06-05') // Cambia la fecha a la que desees
  }
];

@Injectable({
  providedIn: 'root'
})
export class TaskService {


/**
 * This function returns an observable of an array of tasks, emulating an http request.
 * @returns An Observable of an array of Task objects is being returned. The array of Task objects is
 * obtained from the `tasks` variable
 */
  getAllTasks(): Observable<Task[]> {
    return of(tasks).pipe(delay(2000))
  }  
}
