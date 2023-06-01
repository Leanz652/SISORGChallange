import { Injectable } from '@angular/core';
import { Priority, Status, Task } from '../models/model';
import { BehaviorSubject } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  tasks: Task[] = [
    {
      title: 'Task 1',
      description: 'Description of task 1',
      status: Status.NEW,
      priority: Priority.LOW,
      date: new Date('2023-06-01') 
    },
    {
      title: 'Task 2',
      description: 'Description of task 2',
      status: Status.INPROGRESS,
      priority: Priority.MEDIUM,
      date: new Date('2023-06-02') 
    },
    {
      title: 'Task 3',
      description: 'Description of task 3',
      status: Status.COMPLETED,
      priority: Priority.HIGH,
      date: new Date('2023-06-03') 
    },
    {
      title: 'Task 4',
      description: 'Description of task 4',
      status: Status.NEW,
      priority: Priority.MEDIUM,
      date: new Date('2023-06-04') 
    },
    {
      title: 'Task 5',
      description: 'Description of task 5',
      status: Status.INPROGRESS,
      priority: Priority.LOW,
      date: new Date('2023-06-05') 
    }
  ];

  private taskSubj = new BehaviorSubject<Task[]>(this.tasks)
  public taskObs = this.taskSubj.asObservable()

  addTask(task: Task) {
    this.tasks.push(task)
    this.taskSubj.next(this.tasks)
  }
}
