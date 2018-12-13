import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from '@services/api.service';
import { StorageService } from '@services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddIpComponent } from './add-ip/add-ip.component';
import { DialogComponent } from '@components/dialog/dialog.component';
import { NotificationService } from '@services/notification.service';
import { DiagramComponent } from './diagram/diagram.component';
import { SettingComponent } from './setting/setting.component';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public computers: any[];
  public scripts: any[];
  public selectedScript: any;

  constructor(
    private _api: ApiService,
    private _storage: StorageService,
    private _notify: NotificationService,
    private _dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.selectedScript = {};
    this.computers = [];
    this.scripts = [
      {
        id: 1,
        title: 'Kịch bản 1',
        computers: []
      },
      {
        id: 2,
        title: 'Kịch bản 2',
        computers: []
      },
      {
        id: 3,
        title: 'Kịch bản 3',
        computers: []
      }
    ];
  }

  public init() {
    this.computers = [];
    this._api.get('getip/user/' + this._api.user.id).subscribe(response => {
      this.computers = response.data;
      this.computers.forEach(pc => {
        this.connect(pc);
      });
    });
  }

  public addIP() {
    this.open(AddIpComponent, {}, result => {
      if (this.computers.findIndex(c => c.ip === result.ip) !== -1) {
        return this._notify.error('The IP address already exists');
      }

      this.removeFullScreen('');
      this._api.post('addIP', {
        name: result.name,
        ip: result.ip,
        port: result.port,
        protocol: 'http',
        user_id: this._api.user.id
      }).subscribe(response => {
        this.computers.push({
          name: result.name,
          ip: result.ip,
          port: result.port,
          api: this.getUrl(result.ip, result.port),
          fullScreen: true,
          success: false,
          connecting: true,
          disconnect: false,
          home: false,
          vnc: false
        });
        this.connect(this.computers[this.computers.length - 1]);
      }, err => this._notify.error(err.name));
    });
  }

  public connect(pc) {
    this._api.get(`http://${pc.ip}:${pc.port}/`).subscribe(
      response => {
        pc.success = true;
      },
      err => (pc.connecting = false)
    );
  }

  public reconnect(pc) {
    pc.success = false;
    pc.connecting = true;
    pc.disconnect = false;
    this._api.get(`http://${pc.ip}:${pc.port}/`).subscribe(
      response => {
        pc.success = true;
      },
      err => (pc.connecting = false)
    );
  }

  public disconnect(pc) {
    pc.success = false;
    pc.connecting = false;
    (pc.disconnect = true), (pc.home = false);
    pc.vnc = false;
  }

  public load(pc) {
    setTimeout(
      () => {
        if (!pc.home) {
          pc.home = true;
        } else {
          pc.vnc = true;
        }
      },
      pc.home ? 1000 : 0
    );
  }

  public delete(pc) {
    this.open(DialogComponent, {}, result => {
      this._api.delete('getip/delete/' + pc.id).subscribe(response => {
        this.computers = this.computers.filter(c => c.ip !== pc.ip);
      });
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

  private getUrl(ip, host) {
    const url = `http://${ip}:${host}/`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
