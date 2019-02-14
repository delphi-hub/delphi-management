import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule,
  MatTooltipModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule
  ],
  exports: [
    CommonModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule
  ]
})
export class MaterialModule { }
