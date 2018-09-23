import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By} from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule, MatInputModule} from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule} from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import { MatDialogModule} from '@angular/material/dialog';

import { TableAllComponent } from './table-all.component';


describe('TableAllComponent', () => {
  let component: TableAllComponent;
  let fixture: ComponentFixture<TableAllComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAllComponent ],
      imports: [BrowserModule, BrowserAnimationsModule, MatTableModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatDialogModule],
      providers: [{
      provide: MatDialogRef,
      useValue: {}
      }, {
      provide: MAT_DIALOG_DATA,
      useValue: {} // Add any data you wish to test if it is passed/used correctly
      },
      {
      provide: MatTableDataSource,
      useValue: {} // Add any data you wish to test if it is passed/used correctly
  }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAllComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check for openDialog function call', async(() => {
  spyOn(component, 'openDialog');

  let button = fixture.debugElement.nativeElement.querySelector('button');
  button.click();

  fixture.whenStable().then(() => {
    expect(component.openDialog).toHaveBeenCalled();
  })
}));

it('should check for apply filter keyup event', () => {
    spyOn(component, 'applyFilter');
    fixture.detectChanges();
    let input = debugElement.query(By.css('#filter_data');
    let inputElement = input.nativeElement;
    inputElement.dispatchEvent(new Event('keyup'));
    
    expect(component.applyFilter).toHaveBeenCalled();
  });
});
