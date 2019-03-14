import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-script-diagram',
  templateUrl: './script-diagram.component.html',
  styleUrls: ['./script-diagram.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScriptDiagramComponent implements OnInit {
  public script: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.script = {
      name: this.data.name || '',
      security: this.data.security || '<h2>Security</h2>',
      attack: this.data.attack || '<h2>Attack</h2>'
    };
  }

}
