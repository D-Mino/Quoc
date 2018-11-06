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

  constructor(
    private _api: ApiService,
    private _storage: StorageService,
    private _toolbar: ToolbarService,
    private _sort: SortService
  ) { }

  public init(contr) {}

  public destroy() {}
}
