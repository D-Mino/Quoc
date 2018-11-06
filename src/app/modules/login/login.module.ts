import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRouter } from './login.router';
import { LoginService } from './login.service';
import { FormlyCommonsModule } from '../../common/formly/formly.module';
import { MaterialCommonsModule } from '../../common/material/material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormlyCommonsModule,
    MaterialCommonsModule,
    LoginRouter
  ],
  providers: [LoginService],
  declarations: [LoginComponent]
})
export class LoginModule {}
