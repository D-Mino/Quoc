import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/material';

@Component({
  selector: 'app-formly-autocomplete-type',
  template: `
    <input matInput
      [matAutocomplete]="auto"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="to.placeholder">
    <mat-autocomplete #auto="matAutocomplete">
      <mat-option *ngFor="let value of list" [value]="value">
        {{ value }}
      </mat-option>
    </mat-autocomplete>
  `,
})
export class AutocompleteComponent extends FieldType implements OnInit {
  public list: any[];

  ngOnInit() {
    super.ngOnInit();
    this.list = this.to.data.slice(0, 10) || [];
    this.formControl.valueChanges.subscribe(value => {
      if (value) {
        this.list = this.to.data
          .filter(item => item.toString().toLowerCase().includes(value.toString().toLowerCase()))
          .slice(0, 10);
      } else {
        this.list = this.to.data.slice(0, 10);
      }
    });
  }
}
