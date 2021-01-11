import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarService } from '../car.service';
import {SystemService} from '../system.service'
import { Car } from '../car'
import { Type } from '../carType';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(private carService: CarService, private systemService: SystemService) { }

  cars: Car[] = [];
  types = {}; // key: value order types
  selectedTypes: Type[]; // Type array for the select tag
  destroy$: Subject<boolean> = new Subject<boolean>();
  
  // this function use the get cars function of carService to get the car list from the server
  getCarsList() {
    this.systemService.getCars().pipe(takeUntil(this.destroy$)).subscribe((cars: any) => {
      cars.forEach(object => {
        let car = new Car(this.carService,object);
        this.cars.push(car);
      });
    });
  }

  // get types from the server and order the types in a key:value order
  getCarTypes() {
    this.systemService.getCarTypes().pipe(takeUntil(this.destroy$)).subscribe((types: Type[]) => {
      this.selectedTypes = types;
      types.forEach(type => {
        this.types[type.typeNum] = type.typeName;
      })

    })
  }

  //delete car on click
  deleteCarHandler(car: Car): void {
    if (confirm("Are you sure you want to delete this car? ")) {
      this.cars = this.cars.filter(c => c.getId() !== car.getId());
      car.deleteCar();
    }
  }

 

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.getCarsList();
    this.getCarTypes();



  }

}
