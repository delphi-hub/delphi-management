import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule} from '@angular/material/dialog';

import { DeletedialogComponent } from './deletedialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


describe('DeletedialogComponent', () => {
  let component: DeletedialogComponent;
  let fixture: ComponentFixture<DeletedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedialogComponent ],
      imports: [MatDialogModule],
      providers: [{
      provide: MatDialogRef,
      useValue: {}
      }, {
      provide: MAT_DIALOG_DATA,
      useValue: {} // Add any data you wish to test if it is passed/used correctly
  }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
