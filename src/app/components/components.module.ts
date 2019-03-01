import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialCommonsModule } from '../common/material/material.module';
import { RouterModule } from '@angular/router';
import { DiagramComponent } from './toolbar/diagram/diagram.component';
import { SettingComponent } from './toolbar/setting/setting.component';

@NgModule({
  imports: [RouterModule, CommonModule, MaterialCommonsModule],
  exports: [CommonModule, DialogComponent, ToolbarComponent],
  declarations: [
    DialogComponent,
    ToolbarComponent,
    DiagramComponent,
    SettingComponent
  ],
  entryComponents: [
    DialogComponent,
    DiagramComponent,
    SettingComponent
  ]
})
export class ComponentsModule {}
