import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { Status, Task, TaskForm } from "src/app/models/model";
import { MatNativeDateModule } from "@angular/material/core";
import { Priority } from '../../models/model';
import { enumValues } from "src/app/utils/utils";
import { TaskService } from "src/app/service/task.service";


const CREATION_SUCCESS = "Your task was added"

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css'],
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule,
    CommonModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatGridListModule, MatSnackBarModule],
  standalone: true
})
export class DialogTaskComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
  }

  private taskService = inject(TaskService)
  private snackBar = inject(MatSnackBar)

  form = new FormGroup<TaskForm>({
    date: new FormControl(null, [Validators.required]),
    description: new FormControl('', [Validators.required]),
    priority: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    title: new FormControl('', [Validators.required]),
  })

  ngOnInit() {
  }

  getPriority = enumValues(Priority)
  getStatus = enumValues(Status)

  save() {

    const newTask: Task = {
      date: this.form.value.date!,
      title: this.form.value.title!,
      description: this.form.value.title!,
      priority: this.form.value.priority!,
      status: this.form.value.status!
    }

    this.taskService.addTask(newTask);

    this.openSnackBar(CREATION_SUCCESS, "CLOSE");

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 1500 });
  }
}


