import { Component, Inject } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseFormComponent } from '../base.form.component';

import { Employee } from './employee';
import { Country } from '../countries/country';
import { EmployeeService } from './employee.service';
import { ApiResult } from '../base.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent
  extends BaseFormComponent {

  // the view title
  title: string;

  // the form model
  form: FormGroup;

  // the city object to edit or create
  employee: Employee;

  // the city object id, as fetched from the active route:
  // It's NULL when we're adding a new city,
  // and not NULL when we're editing an existing one.
  id?: number;

  // the countries array for the select
  countries: Country[];

  // Activity Log (for debugging purposes)
  activityLog: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService) {
    super();
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      lat: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[-]?[0-9]+(\.[0-9]{1,4})?$/)
      ]),
      lon: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[-]?[0-9]+(\.[0-9]{1,4})?$/)
      ]),
      countryId: new FormControl('', Validators.required)
    }, null, this.isDupeEmp());

    // react to form changes
    this.form.valueChanges
      .subscribe(val => {
        if (!this.form.dirty) {
          this.log("Form Model has been loaded.");
        }
        else {
          this.log("Form was updated by the user.");
        }
      });

    // react to changes in the form.name control
    this.form.get("empname")!.valueChanges
      .subscribe(val => {
        if (!this.form.dirty) {
          this.log("Name has been loaded with initial values.");
        }
        else {
          this.log("Name was updated by the user.");
        }
      });

    this.loadData();
  }

  log(str: string) {
    this.activityLog += "["
      + new Date().toLocaleString()
      + "] " + str + "<br />";
  }

  loadData() {

    // load countries
    this.loadCountries();

    // retrieve the ID from the 'id'
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      // EDIT MODE

      // fetch the city from the server
      this.employeeService.get<Employee>(this.id).subscribe(result => {
        this.employee = result;
        this.title = "Edit - " + this.employee.empname;

        // update the form with the city value
        this.form.patchValue(this.employee);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE

      this.title = "Create a new Employee";
    }
  }

  loadCountries() {
    // fetch all the countries from the server
    this.employeeService.getCountries<ApiResult<Country>>(
      0,
      9999,
      "name",
      null,
      null,
      null,
    ).subscribe(result => {
      this.countries = result.data;
    }, error => console.error(error));
  }

  onSubmit() {

    var employee = (this.id) ? this.employee : <Employee>{};

    employee.empname = this.form.get("empname").value;
    //city.lat = +this.form.get("lat").value;
    //city.lon = +this.form.get("lon").value;
    employee.countryId = +this.form.get("countryId").value;

    if (this.id) {
      // EDIT mode
      this.employeeService
        .put<Employee>(employee)
        .subscribe(result => {

          console.log("Employee " + employee.id + " has been updated.");

          // go back to cities view
          this.router.navigate(['/employees']);
        }, error => console.error(error));
    }
    else {
      // ADD NEW mode
      this.employeeService
        .post<Employee>(employee)
        .subscribe(result => {

          console.log("Employee " + result.id + " has been created.");

          // go back to cities view
          this.router.navigate(['/employees']);
        }, error => console.error(error));
    }
  }

  isDupeEmp(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      var employee = <Employee>{};
      employee.id = (this.id) ? this.id : 0;
      employee.empname = this.form.get("empname").value;
      //city.lat = +this.form.get("lat").value;
      //city.lon = +this.form.get("lon").value;
      employee.countryId = +this.form.get("countryId").value;

      return this.employeeService.isDupeEmp(employee)
        .pipe(map(result => {
          return (result ? { isDupeCity: true } : null);
        }));
    }
  }
}
