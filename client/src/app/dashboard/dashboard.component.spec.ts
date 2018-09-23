import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterOutlet } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard.component';

class MockRouter { public navigate() {}; }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, HeaderComponent],
      providers: [{provide: Router, useClass: MockRouter },
            RouterOutlet],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
