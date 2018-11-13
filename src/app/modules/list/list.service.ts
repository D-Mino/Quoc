import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from '@services/api.service';
import { StorageService } from '@services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddIpComponent } from './add-ip/add-ip.component';
import { DialogComponent } from '@components/dialog/dialog.component';
import { NotificationService } from '@services/notification.service';
import { DiagramComponent } from './diagram/diagram.component';

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

  public init() {
    this.computers = [
      {
        name: 'Quoc Tran',
        ip: '192.168.1.3',
        host: '8080',
        api: this.getUrl('192.168.1.3', '8080'),
        fullScreen: false,
        success: false,
        connecting: true,
        disconnect: false,
        home: false,
        vnc: false
      },
      {
        name: 'Truong vuong',
        ip: '192.168.1.4',
        host: '8080',
        api: this.getUrl('192.168.1.4', '8080'),
        fullScreen: false,
        success: false,
        connecting: true,
        disconnect: false,
        home: false,
        vnc: false
      },
      {
        name: 'Bao Loc',
        ip: '192.168.1.5',
        host: '8080',
        api: this.getUrl('192.168.1.4', '8080'),
        fullScreen: false,
        success: false,
        connecting: true,
        disconnect: false,
        home: false,
        vnc: false
      },
      {
        name: 'Computer 09',
        ip: '192.168.1.6',
        host: '8080',
        api: this.getUrl('192.168.1.4', '8080'),
        fullScreen: false,
        success: false,
        connecting: true,
        disconnect: false,
        home: false,
        vnc: false
      }
    ];

    this.computers.forEach(pc => {
      this.connect(pc);
    });
  }

  public addIP() {
    this.open(AddIpComponent, {}, (result) => {
      if (this.computers.findIndex(c => c.ip === result.ip) !== -1) {
        return this._notify.error('The IP address already exists');
      }

      this.removeFullScreen('');
      this.computers.push({
        name: result.name,
        ip: result.ip,
        host: result.host,
        api: this.getUrl(result.ip, result.host),
        fullScreen: true,
        success: false,
        connecting: true,
        disconnect: false,
        home: false,
        vnc: false
      });

      this.connect(this.computers[this.computers.length - 1]);
    });
  }

  public connect(pc) {
    this._api.get(`http://${pc.ip}:${pc.host}/`).subscribe(response => {
      pc.success = true;
    }, err => pc.connecting = false);
  }

  public reconnect(pc) {
    pc.success = false;
    pc.connecting = true;
    pc.disconnect = false;
    this._api.get(`http://${pc.ip}:${pc.host}/`).subscribe(response => {
      pc.success = true;
    }, err => pc.connecting = false);
  }

  public disconnect(pc) {
    pc.success = false;
    pc.connecting = false;
    pc.disconnect = true,
    pc.home = false;
    pc.vnc = false;
  }

  public load(pc) {
    setTimeout(() => {
      if (!pc.home) {
        pc.home = true;
      } else {
        pc.vnc = true;
      }
    }, pc.home ? 1000 : 0);
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

  public diagram() {
    this.open(DiagramComponent, {
      maxWidth: '70%',
    }, () => {});
  }

  private getUrl(ip, host) {
    const url = `http://${ip}:${host}/`;
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
