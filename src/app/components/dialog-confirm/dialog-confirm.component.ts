import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-confirm',
    templateUrl: './dialog-confirm.component.html',
    styleUrls: ['./dialog-confirm.component.css'],
    imports: [MatDialogModule, MatButtonModule, CommonModule],
    standalone: true
})
export class DialogConfirmComponent {

    message: string = "Are you sure you want to delete?"
    confirmButtonText = "Yes"
    cancelButtonText = "Cancel"
    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<DialogConfirmComponent>) {
        if (data) {
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }

}
