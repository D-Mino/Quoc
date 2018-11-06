import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryComponent } from './entry.component';
import { EntryService } from './entry.service';
import { MaterialCommonsModule } from '../../common/material/material.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '@components/components.module';
import { FormlyCommonsModule } from '../../common/formly/formly.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormlyCommonsModule,
    MaterialCommonsModule,
    FormsModule
  ],
  exports: [EntryComponent],
  providers: [EntryService],
  declarations: [EntryComponent],
  entryComponents: [EntryComponent]
})
export class EntryModule {}
