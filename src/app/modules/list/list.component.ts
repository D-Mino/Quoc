import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public isFullScreen: boolean;

  constructor(public _list: ListService) {
    this.isFullScreen = false;
  }

  ngOnInit() {
    this._list.init();
  }

  ngOnDestroy() {}
}
