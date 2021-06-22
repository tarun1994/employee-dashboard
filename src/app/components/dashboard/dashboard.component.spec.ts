import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpService } from 'src/app/services/http.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: HttpService;
  const res = [{
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496"
      }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets"
    }
  }]
  beforeEach(fakeAsync( () => {
     TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports:[ BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        MatDialogModule,
        NoopAnimationsModule,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatSortModule],
      providers: [HttpService, HttpClient, { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.get(HttpService);
    spyOn(service,'get').and.returnValue(of(res));
    component.empData=res;
    fixture.detectChanges();
    tick();
    flush();
    discardPeriodicTasks();
  }));

 afterEach(fakeAsync(() => {
  tick();
  flush();
  discardPeriodicTasks();
 }))
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should delete',()=>{
    component.onDelete(res);
    expect(component.deleteStatus).toEqual(true);
  })
  it('should restore',()=>{
    component.onRestore(res);
    expect(component.empData.length).toEqual(2);
  })
  xit('should edit',()=>{
    component.onEdit(res);
    expect(component.empData.length).toEqual(1);
  })
});
