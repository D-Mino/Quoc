import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialCommonsModule } from '../common/material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, CommonModule, MaterialCommonsModule],
  exports: [CommonModule, DialogComponent, ToolbarComponent],
  declarations: [DialogComponent, ToolbarComponent ],
  entryComponents: [DialogComponent ]
})
export class ComponentsModule {}
