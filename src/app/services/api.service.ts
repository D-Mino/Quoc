import { Injectable } from '@angular/core';
import { RequestOptions, Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { settings } from 'src/local';
import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isLoading = false;
  public url: string;
  public token: any;
  public user: any;

  constructor(public _http: Http, public _storage: StorageService, public _notify: NotificationService) {
    this.token = this._storage.get('token') || '';
    this.user = this._storage.get('user') || {};
    this.env();
  }

  public get(
    endpoint: string,
    queries: any = {},
    token: boolean = true
  ): Observable<any> {
    const headers = new Headers();

    if (token) {
      headers.append('Authorization', this.token);
    }

    const params: URLSearchParams = new URLSearchParams();

    for (const query in queries) {
      if (queries[query]) {
        params.set(query, queries[query]);
      }
    }

    const options = new RequestOptions({ headers: headers, params: params });

    this.showLoading();

    return this._http.get(this.setUrl(endpoint), options)
      .pipe(
        map((response: any) => {
          this.showLoading(false);
          return response;
        }),
        catchError((err => {
          this.showLoading(false);
          this._notify.error(err.json().error.ui);
          throw err;
        }))
      );
  }

  public post(
    endpoint: string,
    data: any,
    token: boolean = true
  ): Observable<any[]> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });

    if (token) {
      headers.append('Authorization', this.token);
    }

    const dataSet: URLSearchParams = new URLSearchParams();

    for (const key in data) {
      if (data[key]) {
        dataSet.set(key, data[key]);
      }
    }

    const options = new RequestOptions({ headers: headers });

    this.showLoading();

    return this._http.post(this.setUrl(endpoint), dataSet.toString(), options)
      .pipe(
        map((response: any) => {
          this.showLoading(false);
          return response.json();
        }),
        catchError((err => {
          this.showLoading(false);
          this._notify.error(err.json().error.ui);
          throw err;
        }))
      );
  }

  public put(endpoint: string, data: any): Observable<any[]> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Authorization: this.token
    });

    const dataSet: URLSearchParams = new URLSearchParams();

    for (const key in data) {
      if (data[key]) {
        dataSet.set(key, data[key]);
      }
    }

    const options = new RequestOptions({ headers: headers });

    this.showLoading();

    return this._http.put(this.setUrl(endpoint), dataSet.toString(), options)
      .pipe(
        map((response: any) => {
          this.showLoading(false);
          return response.json();
        }),
        catchError((err => {
          this.showLoading(false);
          this._notify.error(err.json().error.ui);
          throw err;
        }))
      );
  }

  public delete(endpoint: string, data: any = {}): Observable<any[]> {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Authorization: this.token
    });

    const options = new RequestOptions({
      headers: headers,
      params: data
    });

    this.showLoading();

    return this._http.delete(this.setUrl(endpoint), options)
      .pipe(
        map((response: any) => {
          this.showLoading(false);
          return response.json();
        }),
        catchError((err => {
          this.showLoading(false);
          this._notify.error(err.json().error.ui);
          throw err;
        }))
      );
  }

  private setUrl(endpoint: string) {
    if (endpoint.includes('http')) {
      return endpoint;
    }

    return this.url + endpoint;
  }

  private showLoading(load: boolean = true) {
    setTimeout(() => {
      this.isLoading = load;
    }, 0);
  }

  private env() {
    const hostname = window.location.hostname;
    this.url = settings.api.live;
    this.token = this._storage.get('token') || '';

    if (hostname === 'localhost') {
      this.url = settings.api.local;
    }
    if (hostname === 'test.cyberair.co') {
      this.url = settings.api.staging;
    }
  }
}
