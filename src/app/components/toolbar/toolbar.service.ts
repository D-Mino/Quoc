import { Injectable } from '@angular/core';

import { StorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  public user: any;
  public title: string;
  constructor(public _storage: StorageService) {
    this.user = {};
    this.title = 'Hệ Thống Thao Trường Số';
  }

  public getName() {
    this.user = this._storage.get('user');
  }
}
