import { Injectable } from '@angular/core';
import { Priority, Status, Task } from '../models/model';
import { BehaviorSubject } from 'rxjs';


/**
 * The function deletes a task from an array of tasks based on its title and description.
 * @param {Task} task - The task parameter is an object of type Task that represents the task to be
 * deleted from the tasks array.
 * @param {Task[]} tasks - The `tasks` parameter is an array of `Task` objects.
 * @returns an array of tasks after deleting the specified task from the original array of tasks.
 */
function deleteTask(task: Task, tasks: Task[]): Task[] {
  const index = tasks.findIndex((t) => t.title === task.title && t.description === task.description);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
  return tasks;
}

/**
 * The function modifies a task in an array of tasks based on its title and description.
 * @param {Task} taskToModify - This parameter is an object of type Task that represents the task that
 * needs to be modified.
 * @param {Task} taskModified - Task object that contains the modified properties of the task that
 * needs to be updated in the tasks array.
 * @param {Task[]} tasks - An array of Task objects.
 * @returns an array of tasks after modifying the task that matches the `taskToModify` parameter with
 * the `taskModified` parameter. If no matching task is found, the original `tasks` array is returned.
 */
function modifyTask(taskToModify: Task, taskModified: Task, tasks: Task[]): Task[] {
  const index = tasks.findIndex((t) => t.title === taskToModify.title && t.description === taskToModify.description);
  if (index !== -1) {
    tasks[index] = { ...taskModified };
  }
  return tasks;
}


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

/**
 * This function adds a new task to an array of tasks and notifies subscribers of the change.
 * @param {Task} task - Task is a data type or class that represents a task object. It likely has
 * properties such as a task name, description, due date, and status. The addTask method takes an
 * instance of the Task class as a parameter and adds it to an array of tasks. It also notifies any
 * subscribers to
 */
  addTask(task: Task) {
    this.tasks.push(task)
    this.taskSubj.next(this.tasks)
  }

/**
 * This function removes a task from an array of tasks and updates the subject with the new array.
 * @param {Task} task - Task object that needs to be removed from the tasks array.
 */
  removeTask(task: Task) {
    this.tasks = deleteTask(task, this.tasks);
    this.taskSubj.next(this.tasks);
  }

/**
 * This function edits a task and updates the list of tasks.
 * @param {Task} taskToModify - This parameter is an object of type Task that represents the task that
 * needs to be modified. It contains the current information about the task that needs to be updated.
 * @param {Task} taskModified - TaskModified is an object of type Task that represents the modified
 * version of the task that needs to be updated in the list of tasks. It contains the updated values
 * for the properties of the task such as the task name, description, due date, etc.
 */
  editTask(taskToModify: Task, taskModified: Task) {
    this.tasks = modifyTask(taskToModify, taskModified, this.tasks)
    this.taskSubj.next(this.tasks)
  }

/**
 * The function deletes all tasks and updates the task subject.
 */
  deleteAllTasks() {
    this.tasks = []
    this.taskSubj.next(this.tasks);
  }

/**
 * The function sets the status of all tasks to "completed" and updates the task subject.
 */
  completeAllTasks() {
    this.tasks = this.tasks.map(task => {
      task.status = Status.COMPLETED
      return task
    })
    this.taskSubj.next(this.tasks)
  }
}
