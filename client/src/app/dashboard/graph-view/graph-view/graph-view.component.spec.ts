import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GraphViewComponent} from './graph-view.component';
import { ApiModule } from 'src/app/api/api.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConnectDialogComponent } from '../connect-dialog/connect-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MaterialModule } from 'src/app/material-module/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';

describe('GraphViewComponent', () => {
  let component: GraphViewComponent;
  let fixture: ComponentFixture<GraphViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphViewComponent],
      imports: [HttpClientTestingModule, HttpClientModule, ApiModule,
        MaterialModule, RouterTestingModule, JwtModule.forRoot({})]
    })
      .compileComponents();

      TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [ConnectDialogComponent],
        }
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
