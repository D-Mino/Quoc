import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthService } from '@services/auth.service';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  {
    path: 'list-single',
    loadChildren: './list/list.module#ListModule',
    canActivate: [AuthService]
  },
  {
    path: 'list-multiple',
    loadChildren: './list-multiple/list.module#ListModule',
    canActivate: [AuthService]
  },
  { path: '', redirectTo: '/list-single', pathMatch: 'full' },
  { path: '**', redirectTo: '/list-single', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class ModulesRouter {}
