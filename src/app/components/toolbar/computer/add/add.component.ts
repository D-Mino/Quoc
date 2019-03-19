import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Model } from './add.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    this.form.reset();
    this.model = {};
  }
}
