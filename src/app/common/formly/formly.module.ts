import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { AutocompleteComponent } from './autocomplete.component';
import { MaterialCommonsModule } from '../material/material.module';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [{
        name: 'autocomplete',
        component: AutocompleteComponent,
        wrappers: ['form-field'],
      }],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ]
    }),
    FormlyMaterialModule,
    MaterialCommonsModule,
    FormlyMatDatepickerModule
  ],
  exports: [
    ReactiveFormsModule,
    FormlyModule,
    FormlyMaterialModule,
    AutocompleteComponent,
    FormlyMatDatepickerModule
  ],
  declarations: [
    AutocompleteComponent
  ]
})
export class FormlyCommonsModule { }
