import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ListService } from './list.service';
import { DialogService } from './dialog/dialog-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public selectable: boolean;
  public removable: boolean;
  public addOnBlur: boolean;
  public computers: any[];
  public isSelected: string;

  constructor(
    public _list: ListService,
    public _dialog: DialogService,
    private sanitizer: DomSanitizer
  ) {
    this.selectable = true;
    this.removable = true;
    this.addOnBlur = false;
    this.computers = [
      { name: 'May 01', ip: '192.168.2.180', host: '8080' },
      { name: 'May 01', ip: '192.168.1.8', host: '8080' },
      { name: 'May 02', ip: '192.168.1.9', host: '8080' },
      { name: 'May 03', ip: '192.168.1.10', host: '8080' }
    ];
  }

  ngOnInit() {
    this._list.init(this);
  }

  updateVideoUrl(pc: any) {
    const url = `http://${pc.ip}:${pc.host}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy() {
    this._list.destroy();
  }
}
