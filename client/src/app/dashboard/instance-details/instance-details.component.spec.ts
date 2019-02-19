import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material-module/material.module';
import { InstanceDetailsComponent } from './instance-details.component';

describe('InstanceDetailsComponent', () => {
  let component: InstanceDetailsComponent;
  let fixture: ComponentFixture<InstanceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceDetailsComponent ],
      imports: [BrowserAnimationsModule, MaterialModule]
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
