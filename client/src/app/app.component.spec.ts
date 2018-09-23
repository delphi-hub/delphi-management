import { TestBed, async } from '@angular/core/testing';
import { Router, RouterOutlet } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

class MockRouter { public navigate() {}; }

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{provide: Router, useClass: MockRouter },
            RouterOutlet],
      imports: [ RouterTestingModule ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
