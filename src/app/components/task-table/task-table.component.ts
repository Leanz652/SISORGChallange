
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Sort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Task } from 'src/app/models/model';
import { TaskService } from 'src/app/service/task.service';
import { compare } from 'src/app/utils/utils';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  standalone: true,
  imports: [MatTableModule, CommonModule, DatePipe, MatInputModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule, MatDialogModule]
})
export class TaskTableComponent implements OnInit {

  private taskService = inject(TaskService);
  private dialog = inject(MatDialog)

  displayedColumns: string[] = ['title', 'status', 'priority', 'date', 'admin'];
  public dataTask: Task[] = []
  public loading = true;

  ngOnInit(): void {
    this.taskService.taskObs.subscribe({
      next: (tasks) => {
        this.dataTask = [...tasks]
        this.loading = false;
      },
      error: (err) => {
        //Handle error -- Not Required but is a must
      }
    })
  }

/**
 * The function sorts data based on the active sorting criteria and direction.
 * @param {Sort} sort - Sort is an object that contains information about how to sort the data. It has
 * two properties: "active" and "direction". "active" is a string that represents the column to sort
 * by, and "direction" is a string that represents the direction of the sort (either "asc" for
 * @returns The `sortData` function does not return anything. It sorts the `dataTask` array based on
 * the `sort` parameter and updates the value of `dataTask` in the component.
 */
  sortData(sort: Sort) {
    const data = this.dataTask.slice();
    if (!sort.active || sort.direction === '') {
      this.dataTask = data;
      return;
    }

    this.dataTask = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'priority':
          return compare(a.priority, b.priority, isAsc);
        case 'date':
          return compare(a.date, b.date, isAsc);
        default:
          return 0;
      }
    });
  }


/**
 * This function calls a method in the task service to mark all tasks as complete.
 */
  handleDoneTasks(){
    this.taskService.completeAllTasks();
  }


/**
 * This function calls a method to delete all tasks from a task service.
 */
  handleDeleteTasks(){
    this.taskService.deleteAllTasks();
  }    


/**
 * The function opens a dialog box using the DialogTaskComponent.
 */
  openDialog(): void {
    this.dialog.open(DialogTaskComponent);
  }

/**
 * The function opens a dialog box to edit a task.
 * @param {Task} task - Task is a data type or class that represents a task object. The `editTask`
 * method takes an instance of the `Task` class as a parameter. This method opens a dialog box using
 * the `MatDialog` service and passes the `task` object as data to the `DialogTaskComponent
 */
  editTask(task: Task){
    this.dialog.open(DialogTaskComponent, {data: task});
  }

  deleteTask(task: Task){
    this.taskService.removeTask(task)
  }

}

