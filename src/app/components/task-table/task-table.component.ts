
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Sort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Task, Status } from 'src/app/models/model';
import { TaskService } from 'src/app/service/task.service';
import { compare } from 'src/app/utils/utils';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  standalone: true,
  imports: [MatTableModule, CommonModule, DatePipe, MatInputModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule]
})
export class TaskTableComponent implements OnInit {

  private taskService = inject(TaskService);

  displayedColumns: string[] = ['title', 'status', 'priority', 'date'];
  public dataTask: Task[] = []
  public loading = true;

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.dataTask = tasks
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
 * The function sets the status of all tasks in a dataTask array to "completed".
 */
  handleDoneTasks(){
      this.dataTask = this.dataTask.map( task => { 
      task.status = Status.COMPLETED 
      return task
    })    
  }

/**
 * The function "handleDeleteTasks" sets an empty array to the "dataTask" variable.
 */
  handleDeleteTasks(){
    this.dataTask = []
  }    
}

