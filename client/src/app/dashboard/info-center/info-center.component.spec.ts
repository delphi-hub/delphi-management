import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatSortModule, MatTableModule, MatIconModule } from '@angular/material';

import { InfoCenterComponent } from './info-center.component';
import {SocketService} from '../../api/api/socket.service';

describe('InfoCenterComponent', () => {
  let component: InfoCenterComponent;
  let fixture: ComponentFixture<InfoCenterComponent>;
 // let socketMock: SocketService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCenterComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
      ],
      providers: [
        SocketService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should compile', () => {
    socketMock = TestBed.get(SocketService);
    expect(component).toBeTruthy();
  });*/
});
