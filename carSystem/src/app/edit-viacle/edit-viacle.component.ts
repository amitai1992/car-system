import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../car';
import { CarService } from '../car.service';
import { Type } from '../carType';
import { SystemService } from '../system.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-viacle',
  templateUrl: './edit-viacle.component.html',
  styleUrls: ['./edit-viacle.component.css']
})
export class EditViacleComponent implements OnInit {
  viacle: Car;
  licencePlatePattern = "\\d\\d-\\d\\d\\d-\\d\\d";
  types: Type[]; // types of the viacles
  employeeNums: number[]; // array of employeeNum from the database
  destroy$: Subject<boolean> = new Subject<boolean>();
  today = new Date().toISOString().slice(0, 10) // today date
  data: any; // data to display on the screen

  constructor(private router: Router, private carService: CarService, private systemService: SystemService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as any;
    this.viacle = new Car(this.carService, state);
    this.data = this.viacle.buildObject();

  }

  // get the types database from the server
  getCarTypes() {
    this.systemService.getCarTypes().pipe(takeUntil(this.destroy$)).subscribe((types: Type[]) => {
      this.types = types;
    });
  }

  // get employeeNum [] from the server
  getEmployeeNum() {
    this.systemService.getEmployeeNum().pipe(takeUntil(this.destroy$))
      .subscribe((employeeNums: number[]) => {
        this.employeeNums = employeeNums;
      })
  }

  onClickSave() {
    this.viacle.updateCar();
  }

  ngOnInit(): void {
    this.getCarTypes();
    this.getEmployeeNum();
  }

}
