
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableNotifComponent } from './datatable-notif.component';

describe('DatatableNotifComponent', () => {
  let component: DatatableNotifComponent;
  let fixture: ComponentFixture<DatatableNotifComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableNotifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
