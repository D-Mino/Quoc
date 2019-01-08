import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthService } from '@services/auth.service';

const routes: Routes = [
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  {
    path: 'list',
    loadChildren: './list/list.module#ListModule',
    canActivate: [AuthService]
  },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: '**', redirectTo: '/list', pathMatch: 'full' }
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
