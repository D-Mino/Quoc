import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { StorageService } from './storage.service';

import { DialogComponent } from '@components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  public redirectUrl = '';

  constructor(
    private _router: Router,
    private _storage: StorageService,
    private _dialog: MatDialog
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    const token = this._storage.get('token') || '';

    if (token) {
      return true;
    }

    this.redirectUrl = url;
    this._router.navigate(['/login']);

    return false;
  }

  redirect(url: string = this.redirectUrl): void {
    this._router.navigateByUrl(url);
    return;
  }

  logout() {
    const dialogRef = this._dialog.open(DialogComponent, {
      width: '80%',
      maxWidth: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._storage.clear();
        this._router.navigateByUrl('/login');
      }
    });
  }
}
