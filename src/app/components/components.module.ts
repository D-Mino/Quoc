import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialCommonsModule } from '../common/material/material.module';
import { RouterModule } from '@angular/router';
import { DiagramComponent } from './toolbar/diagram/diagram.component';
import { SettingComponent } from './toolbar/setting/setting.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ComputerComponent } from './toolbar/computer/computer.component';
import { AddComponent } from './toolbar/computer/add/add.component';
import { FormlyCommonsModule } from '@common/formly/formly.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialCommonsModule,
    FormlyCommonsModule,
    CommonModule,
    FormsModule,
  ],
  exports: [CommonModule, DialogComponent, ToolbarComponent, SafeHtmlPipe],
  declarations: [
    DialogComponent,
    ToolbarComponent,
    DiagramComponent,
    SettingComponent,
    ComputerComponent,
    SafeHtmlPipe,
    AddComponent
  ],
  entryComponents: [
    DialogComponent,
    DiagramComponent,
    SettingComponent,
    ComputerComponent,
    AddComponent
  ]
})
export class ComponentsModule {}
