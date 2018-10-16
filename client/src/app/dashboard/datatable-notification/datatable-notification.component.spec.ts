
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableNotificationComponent } from './datatable-notification.component';

describe('DatatableNotificationComponent', () => {
  let component: DatatableNotificationComponent;
  let fixture: ComponentFixture<DatatableNotificationComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableNotificationComponent ]
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
