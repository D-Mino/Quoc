import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Model } from './add-scripts.model';

@Component({
  selector: 'app-add-scripts',
  templateUrl: './add-scripts.component.html',
  styleUrls: ['./add-scripts.component.scss']
})
export class AddScriptsComponent implements OnInit {

  public form: FormGroup;
  public fields: FormlyFieldConfig[];
  public options: FormlyFormOptions;
  public model: any;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = Model;
    this.options = {};
    this.model = {};
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.form.reset();
    this.model = {};
  }
}
