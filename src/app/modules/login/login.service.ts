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

  constructor(
    public _api: ApiService,
    public _auth: AuthService,
    public _storage: StorageService,
    public _notify: NotificationService,
    public _router: Router
  ) {
    this.redirectUrl = this._auth.redirectUrl || '';
  }

  public init() {
    this.form = new FormGroup({});
    this.fields = loginFields;
    this.model = {};
    this.form.reset();
  }

  public login() {
    this._storage.set('name', this.model.username);
    this._router.navigateByUrl('/list');
    // this._api
    //   .post('auth', {
    //     password: this.model['password']
    //   })
    //   .subscribe((response: any) => {
    //     this._storage.set('token', response.token);
    //     this._storage.set('role', 'staff');
    //     this._api.token = response.token;
    //     this._router.navigateByUrl(
    //       this.redirectUrl ? this.redirectUrl : '/list'
    //     );
    //   });
  }
}