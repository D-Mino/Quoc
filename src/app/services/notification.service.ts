import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  public success(msg: string) {
    this._snackBar.open(msg, 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'left',
      panelClass: 'is-success'
    });
  }

  public error(msg: string) {
    const error = `${msg}`;

    this._snackBar.open(error, 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'left',
      panelClass: 'is-error'
    });
  }
}
