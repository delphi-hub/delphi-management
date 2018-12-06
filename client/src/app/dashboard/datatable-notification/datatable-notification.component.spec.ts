import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatatableNotificationComponent } from './datatable-notification.component';
import {MatIconModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { MatTableModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


describe('DatatableNotificationComponent', () => {
  let component: DatatableNotificationComponent;
  let fixture: ComponentFixture<DatatableNotificationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableNotificationComponent ],
      imports: [ MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, BrowserAnimationsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DatatableNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
