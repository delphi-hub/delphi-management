import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAllComponent } from './table-all.component';

describe('TableAllComponent', () => {
  let component: TableAllComponent;
  let fixture: ComponentFixture<TableAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
