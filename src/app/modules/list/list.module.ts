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

@NgModule({
  imports: [
    ComponentsModule,
    MaterialCommonsModule,
    FormlyCommonsModule,
    CommonModule,
    FormsModule,
    ListRouter
  ],
  declarations: [
    ListComponent,
    AddIpComponent
  ],
  entryComponents: [AddIpComponent],
  providers: [ListService]
})
export class ListModule {}
