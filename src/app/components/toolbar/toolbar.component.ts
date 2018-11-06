import { Component, OnInit } from '@angular/core';

import { ToolbarService } from './toolbar.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(public toolbar: ToolbarService, public auth: AuthService) {}

  ngOnInit() {}
}
