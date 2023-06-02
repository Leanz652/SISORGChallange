
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Sort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Priority, Status, Task } from 'src/app/models/model';
import { TaskService } from 'src/app/service/task.service';
import { compare, getPriority, getStatus } from 'src/app/utils/utils';
import { DialogTaskComponent } from '../dialog-task/dialog-task.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { TaskTableAdminPanelComponent } from '../task-table-admin-panel/task-table-admin-panel.component';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonToggleModule, TaskTableAdminPanelComponent,  FormsModule, CommonModule, DatePipe, MatInputModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule, MatDialogModule]
})
export class TaskTableComponent implements OnInit {

  private taskService = inject(TaskService);
  private dialog = inject(MatDialog)

  getPriority = getPriority()
  getStatus = getStatus()

  displayedColumns: string[] = ['title', 'status', 'priority', 'date', 'admin'];
  public dataTask: Task[] = []
  private unfilteredTask: Task[] = []
  public loading = true;
  public priorityFilters: Priority[] = [];
  public statusFilters: Status[] = [];

  ngOnInit(): void {
    this.taskService.taskObs.subscribe({
      next: (tasks) => {
        this.dataTask = [...tasks]
        this.unfilteredTask = [...tasks]
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
  handleDoneTasks() {
    this.taskService.completeAllTasks();
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
  editTask(task: Task) {
    this.dialog.open(DialogTaskComponent, { data: task });
  }

  deleteTask(task: Task) {
    this.validateDelete(() => {
      this.taskService.removeTask(task);
    });
  }

  /**
 * This function opens a confirmation dialog and deletes all tasks if the user confirms.
 */
  handleDeleteTasks() {
    this.validateDelete(() => {
      this.taskService.deleteAllTasks();
    });
  }

  /**
   * This function opens a confirmation dialog and executes a given action if the user confirms the
   * deletion.
   * @param action - A function that will be executed if the user confirms the deletion in the dialog
   * box.
   */
  validateDelete(action: () => void) {
    const dialogRef = this.dialog.open(DialogConfirmComponent);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        action();
      }
    });
  }

/**
 * This function filters tasks based on their status and priority.
 * @param {MatButtonToggleChange}  - The  parameter is of type MatButtonToggleChange, which
 * is an event emitted by a Material Design button toggle component when its value changes.
 */
  filter(_$event: MatButtonToggleChange) {
    const filteredTasks: Task[] = this.unfilteredTask.filter(task => {
      if (this.statusFilters.length === 0 && this.priorityFilters.length === 0) {
        return true;
      }
      if (this.statusFilters.length === 0) {
        return this.priorityFilters.includes(task.priority);
      } else if (this.priorityFilters.length === 0) {
        return this.statusFilters.includes(task.status);
      } else {
        return this.statusFilters.includes(task.status) && this.priorityFilters.includes(task.priority);
      }
    });
    this.dataTask = filteredTasks
  }
}

