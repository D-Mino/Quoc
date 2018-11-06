import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  public isReverse: boolean;
  public current: string;

  constructor() { }

  public init(list: Array<any>, key: string, type: string) {
    if (this.current === key) {
      return list.reverse();
    } else {
      this.current = key;
    }

    switch (type) {
      case 'string':
        return this.order(list, key);
      case 'number':
        return this.orderIndex(list, key);
      default:
        return list;
    }
  }

  private orderIndex(list: Array<any>, key: string): Array<any> {
    return list.sort((a, b) => parseInt(a[key], 10) - parseInt(b[key], 10));
  }

  private order(list: Array<any>, key: any): Array<any> {
    return list.sort((a, b) => {
      return a[key].toLowerCase() >= b[key].toLowerCase() ? 1 : -1;
    });
  }
}
