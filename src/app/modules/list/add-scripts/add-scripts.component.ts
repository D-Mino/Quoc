import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Model } from './add-scripts.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-scripts',
  templateUrl: './add-scripts.component.html',
  styleUrls: ['./add-scripts.component.scss']
})
export class AddScriptsComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public fields: FormlyFieldConfig[];
  public options: FormlyFormOptions;
  public model: any;
  public security: any;
  public attack: any;
  public data: any = {
    security: '<h2>Security</h2>',
    attack: '<h2>Attack</h2>'
  };
  public config: any;

  constructor() {
    this.config = {
      toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'blockQuote',
        'insertTable',
        'undo',
        'redo'
      ],
      heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
        ]
      }
    };
    this.attack = ClassicEditor;
    this.security = ClassicEditor;
  }

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

  show() {
    console.log(this.data);
  }
}
