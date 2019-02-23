import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ListService } from './list.service';

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

  constructor(public _list: ListService) {
    this.selectable = true;
    this.removable = true;
    this.addOnBlur = false;
  }

  ngOnInit() {
    this._list.init();
  }

  ngOnDestroy() {}
}
