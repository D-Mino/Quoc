import { Injectable } from '@angular/core';
import {
  MatTableDataSource,
  MatPaginator,
  MatChipInputEvent
} from '@angular/material';
import { ApiService } from '@services/api.service';
import { StorageService } from '@services/storage.service';
import { ToolbarService } from '@components/toolbar/toolbar.service';
import { SortService } from '@services/sort.service';

export interface Log {
  id: string;
  name: string;
  logged_time: string;
  occurrence: string;
  outcome: string;
}

@Injectable()
export class ListService {
  public isMaster: boolean;
  public words: any[];
  public role = '';
  public logs: Log[] = [];
  public date = { from: '', to: '' };
  public dataSource: MatTableDataSource<Log>;
  public paginator: MatPaginator;
  public displayedColumns: string[] = [];
  public sortOptions: any;

  constructor(
    private _api: ApiService,
    private _storage: StorageService,
    private _toolbar: ToolbarService,
    private _sort: SortService
  ) {
    this.sortOptions = {};
    this.words = [];
    this.role = this._storage.get('role');

    this.logs = [
      {
        id: '',
        name: '',
        occurrence: '',
        outcome: '',
        logged_time: ''
      }
    ];

    this.dataSource = new MatTableDataSource(this.logs);
  }

  init(contr) {
    this.isMaster = false;
    this.displayedColumns = [
      'id',
      'type',
      'name',
      'date',
      'time',
      'occurrence',
      'outcome'
    ];
    this.paginator = contr.paginator;
    this.dataSource.paginator = contr.paginator;
    this.get();
  }

  public get() {
    this._sort.current = null;
    this._api.get('log').subscribe((response: any) => {
      if (
        response.name === 'Master' &&
        !this.displayedColumns.includes('job')
      ) {
        this.displayedColumns.splice(2, 0, 'job');
        this.isMaster = true;
      }

      if (this.sortOptions.key) {
        response.list = this.rememberSort(response.list, this.sortOptions);
      }
      this.logs = response.list || [];
      this._toolbar.title = response.name;
      this._storage.set('title', this._toolbar.title);
      this.setTable(response.list);
      this.removeWord('');
    });
  }

  public sort(key: string, type: string = 'string') {
    this.sortOptions = {
      key: key,
      type: type,
      isEsc: key === this.sortOptions.key ? !this.sortOptions.isEsc : true
    };
    this.dataSource.data = this._sort.init(this.dataSource.data, key, type);
  }

  public switchAccount(password, success) {
    this._api
      .post('admin', { password: password })
      .subscribe((response: any) => {
        if (response.success) {
          this._storage.set('adminToken', response.token);
          success();
        }
      });
  }

  public applySearch(event: MatChipInputEvent) {
    if (!event.value.trim()) {
      return;
    }

    this.words.push(event.value);
    this.dataSource.filter = event.value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    if (event.input) {
      event.input.value = '';
    }
  }

  public removeWord(word) {
    this.words = this.words.filter(w => w !== word);
    if (this.words.length) {
      this.words.forEach(w => (this.dataSource.filter = w.toLowerCase()));
    } else {
      this.dataSource.filter = ''.trim().toLowerCase();
    }
  }

  public selectLog(row) {
    this.role = 'admin';
    this._storage.set('role', 'admin');
    this._storage.set('log', row);
    this._storage.set('selection', 'Log');
  }

  public addLog() {
    this._storage.remove('log');
  }

  private setTable(list) {
    this.dataSource = new MatTableDataSource(list || []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = data => {
      let show = false;
      Object.keys(data).forEach(key => {
        this.words.forEach(word => {
          word = word.toLowerCase();
          if (!show && data[key]) {
            const val = data[key].toString().toLowerCase();
            if (val.includes(word) && !show) {
              show = true;
            }
          }
        });
      });
      return show;
    };
  }

  private rememberSort(list, options) {
    const data = this._sort.init(list, options.key, options.type);

    if (!options.isEsc) {
     return data.reverse();
    }

    return data;
  }
}
