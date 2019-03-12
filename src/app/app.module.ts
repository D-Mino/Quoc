import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatProgressBarModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { ModulesRouter } from './modules/modules.router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    ModulesRouter,
    ComponentsModule,
    MatMomentDateModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
