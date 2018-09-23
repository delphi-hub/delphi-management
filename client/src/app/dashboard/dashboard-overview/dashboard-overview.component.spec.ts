import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Instance} from "../../api";
import { HttpClientModule } from '@angular/common/http';
import { StatusCardComponent } from '../status-card/status-card.component';
import { DashboardCardComponent } from '../dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { DashboardOverviewComponent } from './dashboard-overview.component';

describe('DashboardOverviewComponent', () => {
  let component: DashboardOverviewComponent;
  let fixture: ComponentFixture<DashboardOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOverviewComponent, DashboardCardComponent, StatusCardComponent ],
      imports: [RouterModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
