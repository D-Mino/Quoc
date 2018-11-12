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

      this.removeFullScreen('');
      this.computers.push({
        name: result.name,
        ip: result.ip,
        host: result.host,
        api: this.getUrl(result.ip, result.host),
        fullScreen: true,
        success: false,
        connecting: true
      });

      this.connect(this.computers[this.computers.length - 1]);
    });
  }

  public connect(pc) {
    this._api.get(`http://${pc.ip}:${pc.host}/`).subscribe(response => {
      this.loadByKey(pc);
    }, err => pc.connecting = false);
  }

  public loadByKey(pc) {
    this._api.post(`http://${pc.ip}:${pc.host}/loadByKey`, {
      key: 'anonymous'
    }).subscribe(response => {
      this.saveByKey(pc);
    }, err => pc.connecting = false);
  }

  public saveByKey(pc) {
    this._api.post(`http://${pc.ip}:${pc.host}/saveByKey`, this.options()).subscribe(response => {
      pc.success = true;
    }, err => pc.connecting = false);
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
    const url = `http://${ip}:${host}/vnc`;
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

  private options() {
    return {
      'key': 'anonymous',
      'data': {
        'features': {
          'vnc': true,
          'rdp': true,
          'ft': true
        },
        'newWindow': false,
        'defaultConnType': 'none',
        'tabVisible': true,
        'screenSharing': {
          'resolution': 'remote',
          'bpp': '16',
          'imageQuality': '1',
          'controlMode': true,
          'wscompression': true,
          'relativeTouch': true,
          'touchDragDelay': '75',
          'dragDist': '32'
        },
        'remoteDesktop': {
          'resolution': '1920x1200',
          'bpp': '16',
          'imageQuality': '3',
          'veautoscaling': false,
          'enableTouchRedirection': false,
          'enableRemoteFx': false,
          'vedesktopbackground': false,
          'vemnuwndanimation': false,
          'vevisualstyles': true,
          'vefontsmoothing': false,
          'veshowwndcontent': false,
          'vedesktopcomposition': false,
          'unicodekeyb': true,
          'console': false,
          'keyboardLayout': '1033',
          'disableNLA': false,
          'wscompression': true,
          'relativeTouch': true,
          'dragDist': '32',
          'touchDragDelay': '75',
          'askForCredentials': true,
          'username': '',
          'userpwd': '',
          'prnenabled': false,
          'prnsetasdefault': false,
          'prnname': 'Printer',
          'prnOptions': ['Printer'],
          'prndriver': 'HP Color LaserJet 8500 PS',
          'prndriverOptions': [
            'HP Color LaserJet 8500 PS',
            'HP Color LaserJet 2800 Series PS',
            'HP Color LaserJet 2700 PS Class Driver',
            'Microsoft XPS Document Writer V4'
          ],
          'rsenabled': false,
          'rsquality': '1',
          'startprogram': '0',
          'appargs': '',
          'program': '',
          'directory': '',
          'showOnStart': false
        },
        'fileTransfer': {
          'askForCredentials': true,
          'username': '',
          'userpwd': ''
        },
        'connectionType': 'vnc'
      }
    };
  }
}
