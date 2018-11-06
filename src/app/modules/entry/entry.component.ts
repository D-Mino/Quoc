import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { EntryService } from './entry.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit, OnDestroy {
  log: boolean;
  constructor(
    public _entry: EntryService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _storage: StorageService
  ) {
    this.log = this._storage.get('log') ? true : false;
  }

  ngOnInit() {
    this._entry.init(this.data.nameList);
  }

  ngOnDestroy() {
    this._entry.destroy();
  }
}
