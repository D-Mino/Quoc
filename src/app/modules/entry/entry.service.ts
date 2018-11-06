import { Injectable } from '@angular/core';
import { ApiService } from '@services/api.service';
import { StorageService } from '@services/storage.service';
import { NotificationService } from '@services/notification.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { EntryModel, entryFields } from './entry.model';
import { DialogComponent } from '@components/dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Injectable()
export class EntryService {
  public log: any;
  public form: FormGroup;
  public fields: FormlyFieldConfig[];
  public options: FormlyFormOptions;
  public model: any;
  private selection: string;

  constructor(
    private _api: ApiService,
    private _storage: StorageService,
    private _notify: NotificationService,
    private _dialog: MatDialog
  ) {
    this.form = new FormGroup({});
    this.fields = entryFields;
    this.options = {};
    this.model = {};
  }

  public init(nameList) {
    this.fields[2].templateOptions.data = nameList;
    this.selection = this._storage.get('selection') || 'Log';
    this.model = { selection: this.selection };

    const log = this._storage.get('log');
    if (log) {
      this.log = log;
      this.model.type = this.log.type;
      this.model.name = this.log.name;
      this.model.occurrence = this.log.occurrence;
      this.model.outcome = this.log.outcome;
      this.fields[0].templateOptions.disabled = true;
      this._api.token = this._storage.get('adminToken');
    } else {
      this.fields[0].templateOptions.disabled = false;
    }
  }

  public save(cb = () => {}) {
    const log = this._storage.get('log');

    if (log) {
      this._api
        .put(`${this.model.selection.toLowerCase()}/${this.log.id}`, this.model)
        .subscribe(() => this.success(cb, `${this.model.selection} saved successfully`));
    } else {
      this._api
        .post(this.model.selection.toLowerCase(), this.model)
        .subscribe(() => this.success(cb, `${this.model.selection} saved successfully`));
    }
  }

  public delete(cb = () => {}) {
    const log = this._storage.get('log');

    if (log) {
      const dialogRef = this._dialog.open(DialogComponent, {
        width: '350px',
        autoFocus: false
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this._api.delete('log/' + log.id).subscribe((res: any) => {
            if (res.success) {
              this.success(cb, `${this.model.selection} deleted successfully`);
            }
          });
        }
      });
    }
  }

  public destroy() {
    this._storage.remove('log');
    this._storage.remove('selection');
    this._storage.remove('adminToken');
    this._api.token = this._storage.get('token');
    this.form.reset();
  }

  private success(cb = () => {}, message?) {
    this._notify.success(message);
    cb();
  }
}
