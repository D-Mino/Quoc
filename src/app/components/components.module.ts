import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialCommonsModule } from '../common/material/material.module';
import { RouterModule } from '@angular/router';
import { DiagramComponent } from './toolbar/diagram/diagram.component';
import { SettingComponent } from './toolbar/setting/setting.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';

@NgModule({
  imports: [RouterModule, CommonModule, MaterialCommonsModule],
  exports: [CommonModule, DialogComponent, ToolbarComponent, SafeHtmlPipe],
  declarations: [
    DialogComponent,
    ToolbarComponent,
    DiagramComponent,
    SettingComponent,
    SafeHtmlPipe
  ],
  entryComponents: [
    DialogComponent,
    DiagramComponent,
    SettingComponent
  ]
})
export class ComponentsModule {}
