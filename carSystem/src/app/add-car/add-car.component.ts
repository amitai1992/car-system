import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { Type } from '../carType';
import { CarService } from '../car.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  constructor(private carService: CarService) { }

  types: Type[]; // types of the viacles
  
  // the car that the user will add
  car: Car = {
    id: undefined,
    licencePlate: undefined,
    viacleType: undefined,
    fourOnFour: undefined,
    manufactoryYear: undefined,
    treatmentDate: undefined,
    editDate: undefined,
  }; 

  id: number; // maximum id of car
  employeeNums: number[]; // array of employeeNum from the database
  destroy$: Subject<boolean> = new Subject<boolean>();

  // get the types database from the server
  getCarTypes() {
    this.carService.getCarTypes().pipe(takeUntil(this.destroy$)).subscribe((types: Type[]) => {
      this.types = types;
    })
  }

  // get employeeNum [] from the server
  getEmployeeNum() {
    this.carService.getEmployeeNum().pipe(takeUntil(this.destroy$))
      .subscribe((employeeNums: number[]) => {
        this.employeeNums = employeeNums
      })
  }

  // get maximum carId from the srver, id = id + 1
  getCarId() {
    this.carService.getCarId().pipe(takeUntil(this.destroy$))
      .subscribe((id: string) => {
        this.id = Number(id) + 1;
        this.car.id = this.id;
        console.log(this.car.id);
        
        
      })
  }

  // click handler function for adding the car
  onClickSubmit(data) {
    console.log(data);

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.getCarTypes();
    this.getEmployeeNum();
    this.getCarId();
  }

}
