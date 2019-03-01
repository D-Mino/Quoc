import { Injectable } from '@angular/core';

import { StorageService } from '@services/storage.service';
import { DiagramComponent } from './diagram/diagram.component';
import { SettingComponent } from './setting/setting.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  public user: any;
  public title: string;
  constructor(public _storage: StorageService, private _dialog: MatDialog) {
    this.user = {};
    this.title = 'Hệ Thống Thao Trường Số';
  }

  public getName() {
    this.user = this._storage.get('user');
  }

  public diagram() {
    this.open(
      DiagramComponent,
      {
        maxWidth: '70%'
      },
      () => {}
    );
  }

  public install() {
    this.open(
      SettingComponent,
      {
        maxWidth: '70%'
      },
      () => {}
    );
  }

  private open(component, options, success) {
    const dialogRef = this._dialog.open(
      component,
      Object.assign(
        {
          width: '80%',
          maxWidth: '500px',
          autoFocus: false
        },
        options
      )
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        success(result);
      }
    });
  }
}
