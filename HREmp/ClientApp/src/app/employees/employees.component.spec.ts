import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from '../angular-material.module';
import { of } from 'rxjs';

import { EmployeesComponent } from './employees.component';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { ApiResult } from '../base.service';

describe('EmployeesComponent', () => {
  let fixture: ComponentFixture<EmployeesComponent>;
  let component: EmployeesComponent;

  // async beforeEach(): TestBed initialization
  beforeEach(async(() => {

    // Create a mock cityService object with a mock 'getData' method
    let employeeService = jasmine.createSpyObj<EmployeeService>(
      'EmployeeService', ['getData']
    );

    // Configure the 'getData' spy method
    employeeService.getData.and.returnValue(
      // return an Observable with some test data
      of<ApiResult<Employee>>(<ApiResult<Employee>>{
        data: [
         
        ],
        totalCount: 1,
        pageIndex: 0,
        pageSize: 10
      }));

    TestBed.configureTestingModule({
      declarations: [EmployeesComponent],
      imports: [
        BrowserAnimationsModule,
        AngularMaterialModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: EmployeeService,
          useValue: employeeService
        }
      ]
    })
      .compileComponents();
  }));

  // synchronous beforeEach(): fixtures and components setup
  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;

    component.paginator = jasmine.createSpyObj(
      "MatPaginator", ["length", "pageIndex", "pageSize"]
    );

    fixture.detectChanges();
  });

  it('should display a "Cities" title', async(() => {
    let title = fixture.nativeElement
      .querySelector('h1');
    expect(title.textContent).toEqual('Cities');
  }));

  it('should contain a table with a list of one or more cities', async(() => {
    let table = fixture.nativeElement
      .querySelector('table.mat-table');
    let tableRows = table
      .querySelectorAll('tr.mat-row');
    expect(tableRows.length).toBeGreaterThan(0);
  }));
});
