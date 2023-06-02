import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Task } from 'src/app/models/model';

/* This is a TypeScript class for a task table admin panel component that takes in a task as an input
and emits edit and delete events as outputs. */
@Component({
  selector: 'app-task-table-admin-panel[task]',
  templateUrl: './task-table-admin-panel.component.html',
  styleUrls: ['./task-table-admin-panel.component.css'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule]
})
export class TaskTableAdminPanelComponent {


  @Input() task!: Task
  @Output() edit = new EventEmitter<Task>()
  @Output() delete = new EventEmitter<Task>()

  editTask(){
    this.edit.emit(this.task)
  }

  deleteTask(){
    this.delete.emit(this.task)
  }
}
