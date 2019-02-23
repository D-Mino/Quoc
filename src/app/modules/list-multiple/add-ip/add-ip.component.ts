import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Model } from './add-ip.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-ip',
  templateUrl: './add-ip.component.html',
  styleUrls: ['./add-ip.component.scss']
})
export class AddIpComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public fields: FormlyFieldConfig[];
  public options: FormlyFormOptions;
  public model: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = new FormGroup({});
    this.fields = Model;
    this.fields[0].templateOptions.options = this.data.scripts;
    console.log(this.data);
    this.options = {};
    this.model = { script_id: this.data.selected.id };
  }

  ngOnDestroy() {
    this.form.reset();
    this.model = {};
  }
}
