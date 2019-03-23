import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material-module/material.module';
import { InstanceDetailsComponent } from './instance-details.component';
import { GraphViewModule } from '../graph-view/graph-view.module';
import { InfoCenterComponent } from '../info-center/info-center.component';
import { TableAllComponent } from '../table-all/table-all.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/api/api/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InfoCenterDataSource } from '../info-center/info-center-datasource';

describe('InstanceDetailsComponent', () => {
  let component: InstanceDetailsComponent;
  let fixture: ComponentFixture<InstanceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceDetailsComponent, InfoCenterComponent, TableAllComponent],
      imports: [BrowserAnimationsModule, MaterialModule, GraphViewModule, RouterTestingModule, HttpClientTestingModule],
      providers: [ApiService]
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
