import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule, MatIconModule } from '@angular/material';

import { InfoCenterComponent } from './info-center.component';

describe('InfoCenterComponent', () => {
  let component: InfoCenterComponent;
  let fixture: ComponentFixture<InfoCenterComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
      declarations: [ InfoCenterComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
      ]

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCenterComponent);
    component = fixture.componentInstance;
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
