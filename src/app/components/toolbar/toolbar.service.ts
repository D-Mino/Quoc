import { Injectable } from '@angular/core';

import { StorageService } from '@services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  public title: string;
  constructor(public _storage: StorageService) {}

  public getName() {
    this.title = this._storage.get('name');
  }
}
