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
  MatFormFieldModule
  } from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';

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
    MatGridListModule,
    MatSelectModule,
    MatToolbarModule
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
    MatGridListModule,
    MatSelectModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
