import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InforCenterComponent } from './infor-center.component';

describe('InforCenterComponent', () => {
  let component: InforCenterComponent;
  let fixture: ComponentFixture<InforCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InforCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InforCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
