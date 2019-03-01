import { Injectable } from '@angular/core';
import { ApiService } from '@services/api.service';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Router } from '@angular/router';

import { StorageService } from '@services/storage.service';
import { NotificationService } from '@services/notification.service';
import { AuthService } from '@services/auth.service';

import { loginFields } from './login.model';

@Injectable()
export class LoginService {
  private redirectUrl: string;
  public form: FormGroup;
  public model: any;
  public fields: FormlyFieldConfig[];
  public loading: boolean;
  public welcome: boolean;

  constructor(
    public _api: ApiService,
    public _auth: AuthService,
    public _storage: StorageService,
    public _notify: NotificationService,
    public _router: Router
  ) {
    this.redirectUrl = this._auth.redirectUrl || '';
    this.loading = false;
    this.welcome = true;
  }

  public init() {
    this.form = new FormGroup({});
    this.fields = loginFields;
    this.model = {};
    this.form.reset();
  }

  public login() {
    this.loading = true;
    this._api
      .post('auth/login', this.model)
      .subscribe((response: any) => {
        this.loading = false;
        this._storage.set('token', response.token);
        this._storage.set('user', response.data);
        this._api.token = response.token;
        this._api.user = response.data;
        this._router.navigateByUrl('/list-multiple');
      }, () => this.loading = false);
  }

  public nextToLogin() {
    this.welcome = false;
  }
}
