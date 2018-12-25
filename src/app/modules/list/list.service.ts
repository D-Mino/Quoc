import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ApiService } from '@services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddIpComponent } from './add-ip/add-ip.component';
import { DialogComponent } from '@components/dialog/dialog.component';
import { NotificationService } from '@services/notification.service';
import { DiagramComponent } from './diagram/diagram.component';
import { SettingComponent } from './setting/setting.component';
import { AddScriptsComponent } from './add-scripts/add-scripts.component';
@Injectable({
  providedIn: 'root'
})
export class ListService {
  public computers: any[];
  public scripts: any[];
  public selectedScript: any;
  public selectedComputer: any;

  constructor(
    private _api: ApiService,
    private _notify: NotificationService,
    private _dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.computers = [];
    this.scripts = [];
    this.selectedScript = {};
    this.selectedComputer = {};
  }

  public init() {
    this.computers = [];
    this._api.get('script/all').subscribe(response => {
      this.scripts = response.data;
      this.selectedScript = this.scripts[0];
      this.selectScript(this.selectedScript);
    });
  }

  public selectScript(script) {
    this.selectedScript = script;
    this.computers = script.ip_address.map(pc => {
      return Object.assign({}, pc, {
        api: this.getUrl(pc.ip, pc.port),
        fullScreen: false,
        success: false,
        connecting: false,
        disconnect: true,
        home: false,
        vnc: false
      });
    });

    this.selectComputer(this.computers[0]);
  }

  public selectComputer(pc) {
    this.selectedComputer = pc || {};
    this.connect(this.selectedComputer);
  }

  public addIP() {
    this.open(AddIpComponent, {
      data: {
        scripts: this.scripts.map(sc => {
          return { value: sc.id, label: sc.name };
        }),
        selected: this.selectedScript
      }
    }, result => {
      if (this.computers.find(c => c.ip === result.ip)) {
        return this._notify.error('The IP address already exists');
      }

      this._api.post('addIP', {
        script_id: result.script_id,
        name: result.name,
        ip: result.ip,
        port: result.port,
        protocol: 'http',
      }).subscribe((response: any) => {
        this.selectedScript['ip_address'].push(
          {
            id: response.data.id,
            script_id: result.script_id,
            name: result.name,
            ip: result.ip,
            port: result.port,
            protocol: 'http',
          }
        );
        this.computers.push({
          id: response.data.id,
          script_id: result.script_id,
          name: result.name,
          ip: result.ip,
          port: result.port,
          api: this.getUrl(result.ip, result.port),
          fullScreen: false,
          success: false,
          connecting: false,
          disconnect: true,
          home: false,
          vnc: false
        });
        this.connect(this.computers[this.computers.length - 1]);
      }, err => this._notify.error(err.name));
    });
  }

  public addscripts() {
    this.open(AddScriptsComponent, {}, result => {
      if (this.computers.find(c => c.ip === result.ip)) {
        return this._notify.error('The IP address already exists');
      }
      this._api.post('script/create', {
        name: result.name,
        description: result.description
      }).subscribe((response: any) => {
        this.scripts.push({
          id: response.data.id,
          name: result.name,
          description: result.description,
          ip_address: []
        });
      }, err => this._notify.error(err.name));
    });
  }

  public connect(pc) {
    this._api.get(`http://${pc.ip}:${pc.port}/`).subscribe(
      () => {
        pc.success = true;
      },
      () => pc.connecting = false
    );
  }

  public reconnect(pc) {
    pc.success = false;
    pc.connecting = true;
    pc.disconnect = false;
    this._api.get(`http://${pc.ip}:${pc.port}/`).subscribe(
      () => {
        pc.success = true;
      },
      () => pc.connecting = false
    );
  }

  public disconnect(pc) {
    pc.success = false;
    pc.connecting = false;
    pc.disconnect = true;
    pc.home = false;
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
        if (pc.id === this.selectedComputer.id) {
          this.selectedComputer = this.computers[0];
        }
      });
    });
  }


  public deleteScript(script) {
    this.open(DialogComponent, {}, result => {
      this._api.delete('script/' + script.id).subscribe(response => {
        this.scripts = this.scripts.filter(c => c.id !== script.id);
        if (script.id === this.selectedScript.id) {
          this.selectedScript = this.scripts[0];
          this.selectScript(this.selectedScript);
        }
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
