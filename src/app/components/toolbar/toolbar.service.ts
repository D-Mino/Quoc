import { Injectable } from '@angular/core';

import { StorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  public user: any;
  constructor(public _storage: StorageService) {
    this.user = {};
  }

  public getName() {
    this.user = this._storage.get('user');
  }
}
