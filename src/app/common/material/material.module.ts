import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialogModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatListModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatChipsModule,
  MatSidenavModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialCommonsModule {}
