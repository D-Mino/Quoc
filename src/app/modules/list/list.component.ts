import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ListService } from './list.service';
import { DialogService } from './dialog/dialog-service.service';

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

  constructor(
    public _list: ListService,
    public _dialog: DialogService
  ) {
    this.selectable = true;
    this.removable = true;
    this.addOnBlur = false;
    this.computers = [
      { name: 'May 01', ip: '192.168.1.8' },
      { name: 'May 02', ip: '192.168.1.9' },
      { name: 'May 03', ip: '192.168.1.10' }
    ];
  }

  ngOnInit() {
    this._list.init(this);
  }

  public addLog() {
    this._list.addLog();
    this._dialog.openEntryDialog();
  }

  ngOnDestroy() {
    this._list.words = [];
    this._list.sortOptions = {};
  }
}
