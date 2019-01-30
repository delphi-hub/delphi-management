import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailsComponent } from './instance-details.component';

describe('InstanceDetailsComponent', () => {
  let component: InstanceDetailsComponent;
  let fixture: ComponentFixture<InstanceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
