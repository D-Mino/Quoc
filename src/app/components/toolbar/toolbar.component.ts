import { Component, OnInit } from '@angular/core';

import { ToolbarService } from './toolbar.service';
import { AuthService } from '@services/auth.service';
import { ListService } from '@modules/list/list.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(
    public _toolbar: ToolbarService,
    public _auth: AuthService,
    public _list: ListService
  ) {}

  ngOnInit() {
    this._toolbar.getName();
  }
}
