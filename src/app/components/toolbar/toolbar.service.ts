import { Injectable } from '@angular/core';
import { StorageService } from '@services/storage.service';
import { DiagramComponent } from './diagram/diagram.component';
import { SettingComponent } from './setting/setting.component';
import { MatDialog } from '@angular/material/dialog';
import { ComputerComponent } from './computer/computer.component';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  public user: any;
  public title: string;
  public startTime: Date;
  public time: string;

  constructor(
    public _storage: StorageService,
    private _dialog: MatDialog
  ) {
    this.user = {};
    this.title = 'Hệ Thống Thao Trường Số';
    this.setTime();
  }

  public getName() {
    this.user = this._storage.get('user');
  }

  public setTime() {
    setInterval(() => {
      if (this.startTime) {
        this.time = this.getTime();
      }
    }, 1000);
  }

  private getTime() {
    const time = (new Date().valueOf() - this.startTime.valueOf()) / 1000;
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = Math.floor(time - hours * 3600 - minutes * 60);

    return (hours > 9 ? hours : '0' + hours)
      + ':' + (minutes > 9 ? minutes : '0' + minutes)
      + ':' + (seconds > 9 ? seconds : '0' + seconds);
  }

  public diagram() {
    this.open(
      DiagramComponent,
      {
        maxWidth: '70%',
        minHeight: '300px'
      },
      () => {}
    );
  }

  public computer() {
    this.open(
      ComputerComponent,
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
