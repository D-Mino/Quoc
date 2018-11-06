import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from '@services/api.service';
import { StorageService } from '@services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddIpComponent } from './add-ip/add-ip.component';
import { DialogComponent } from '@components/dialog/dialog.component';
import { NotificationService } from '@services/notification.service';

export interface Log {
  id: string;
  name: string;
  logged_time: string;
  occurrence: string;
  outcome: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListService {

  public computers: any[];

  constructor(
    private _api: ApiService,
    private _storage: StorageService,
    private _notify: NotificationService,
    private _dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  public init(contr) {
    this.computers = [];
  }

  public destroy() {}

  public addIP() {
    this.open(AddIpComponent, {}, (result) => {
      if (this.computers.findIndex(c => c.ip === result.ip) !== -1) {
        return this._notify.error('The IP address already exists');
      }

      this.computers.push({
        name: result.name,
        ip: result.ip,
        host: result.host,
        api: this.getUrl(result.ip, result.host),
        fullScreen: false
      });

      this.removeFullScreen('');
    });
  }

  public delete(ip) {
    this.open(DialogComponent, {}, (result) => {
      this.computers = this.computers.filter(c => c.ip !== ip);
    });
  }

  public removeFullScreen(ip) {
    this.computers = this.computers.map(c => {
      if (c.ip !== ip) {
        c.fullScreen = false;
      }

      return c;
    });
  }

  public isFull() {
    return this.computers.findIndex(c => c.fullScreen) !== -1;
  }

  private getUrl(ip, host) {
    const url = `http://${ip}:${host}/vnc/`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
}
