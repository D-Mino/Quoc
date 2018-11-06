import { Injectable } from '@angular/core';
import { ListService } from '../list.service';
import { EntryComponent } from '../../entry/entry.component';
import { MatDialog } from '@angular/material';

@Injectable()
export class DialogService {

  constructor(
    private _dialog: MatDialog,
    private _list: ListService,
  ) {}

  public openEntryDialog() {
    this.open(EntryComponent, {
      data: {
        isMaster: this._list.isMaster,
        nameList: this.nameList(this._list.logs),
        success: () => this._list.get()
      }
    }, (result) => {});
  }

  private open(component, options, success) {
    const dialogRef = this._dialog.open(component, Object.assign({
      width: '80%',
      maxWidth: '500px',
      autoFocus: false
    }, options));

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        success(result);
      }
    });
  }

  private UK(date) {
    const pattern = /^(\d{2}\/\d{2}\/\d{4})$/;
    if (!pattern.test(date)) {
      date = date.format('DD/MM/YYYY');
    }

    return date;
  }

  private nameList(list) {
    const result = [];
    list.forEach(item => {
      if (!result.includes(item.name)) {
        result.push(item.name);
      }
    });
    return result;
  }
}
