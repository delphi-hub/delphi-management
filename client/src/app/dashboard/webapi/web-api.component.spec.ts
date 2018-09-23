import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatTableModule, MatInputModule} from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule} from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { TableAllComponent } from '../table-all/table-all.component';
import { WebApiComponent } from './web-api.component';
import { ApiService} from '../../api';

describe('WebApiComponent', () => {
  let component: WebApiComponent;
  let fixture: ComponentFixture<WebApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebApiComponent, TableAllComponent ],
      imports: [HttpClientTestingModule,  HttpClientModule, BrowserAnimationsModule, MatTableModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatIconModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it(`should create`, async(inject([HttpTestingController, ApiService],
    (httpClient: HttpTestingController, apiService: ApiService) => {
      expect(apiService).toBeTruthy();
  })));
});
