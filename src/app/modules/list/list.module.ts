import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '@components/components.module';
import { MaterialCommonsModule } from '../../common/material/material.module';
import { ListRouter } from './list.router';
import { ListService } from './list.service';
import { ListComponent } from './list.component';
import { FormlyCommonsModule } from '../../common/formly/formly.module';
import { AddIpComponent } from './add-ip/add-ip.component';
import { AddScriptsComponent } from './add-scripts/add-scripts.component';
import { ScriptDiagramComponent } from './script-diagram/script-diagram.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AddContentComponent } from './add-content/add-content.component';
@NgModule({
  imports: [
    ComponentsModule,
    MaterialCommonsModule,
    FormlyCommonsModule,
    CommonModule,
    FormsModule,
    ListRouter,
    CKEditorModule
  ],
  declarations: [
    ListComponent,
    AddIpComponent,
    AddScriptsComponent,
    ScriptDiagramComponent,
    AddContentComponent
  ],
  entryComponents: [
    AddIpComponent,
    AddScriptsComponent,
    ScriptDiagramComponent,
    AddContentComponent
  ],
  providers: [ListService]
})
export class ListModule {}
