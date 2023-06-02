import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { Task, TaskForm } from "src/app/models/model";
import { MatNativeDateModule } from "@angular/material/core";
import { getPriority, getStatus } from "src/app/utils/utils";
import { TaskService } from "src/app/service/task.service";


const CREATION_SUCCESS = "Your task was added"
const EDIT_SUCCESS = "Your task was modified"

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.css'],
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule,
    CommonModule, MatDatepickerModule, MatSelectModule, MatNativeDateModule, MatSnackBarModule],
  standalone: true
})
export class DialogTaskComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task) {
  }

  private taskService = inject(TaskService)
  private snackBar = inject(MatSnackBar)

  getPriority = getPriority()
  getStatus = getStatus()

  form!: FormGroup<TaskForm>

  ngOnInit() {
    this.initForm()
  }

  addNewTask() {
    this.taskService.addTask(this.formToTask());
    this.openSnackBar(CREATION_SUCCESS);
    this.dialogRef.close();
  }

  editTask() {
    this.taskService.editTask(this.data, this.formToTask())
    this.openSnackBar(EDIT_SUCCESS);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'CLOSE', { duration: 1500 });
  }

  initForm() {
    this.form = new FormGroup<TaskForm>({
      date: new FormControl(this.data ? this.data.date : null, [Validators.required]),
      description: new FormControl(this.data ? this.data.description : null, [Validators.required]),
      priority: new FormControl(this.data ? this.data.priority : null, [Validators.required]),
      status: new FormControl(this.data ? this.data.status : null, [Validators.required]),
      title: new FormControl(this.data ? this.data.title : null, [Validators.required]),
    })
  }

  formToTask(): Task {
    return {
      date: this.form.value.date!,
      title: this.form.value.title!,
      description: this.form.value.title!,
      priority: this.form.value.priority!,
      status: this.form.value.status!
    }
  }
}


