import { Component, OnInit } from '@angular/core';
import { Viacle } from '../car';
import { Type } from '../carType';
import { viacleService } from '../car.service';
import { SystemService } from '../system.service'
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  constructor(private carService: viacleService, private systemService: SystemService) { }

  types: Type[]; // types of the viacles


  licencePlatePattern = "\\d\\d-\\d\\d\\d-\\d\\d"; // patten for the licencePlate
  employeeNums: number[]; // array of employeeNum from the database
  destroy$: Subject<boolean> = new Subject<boolean>();
  today = new Date().toISOString().slice(0, 10) // today date in a dd-mm/yy format
  id: number; // id for the new car

  // get the types database from the server
  getCarTypes() {
    this.systemService.getCarTypes().pipe(takeUntil(this.destroy$)).subscribe((types: Type[]) => {
      this.types = types;
    })
  }

  // get employeeNum [] from the server
  getEmployeeNum() {
    this.systemService.getEmployeeNum().pipe(takeUntil(this.destroy$))
      .subscribe((employeeNums: number[]) => {
        this.employeeNums = employeeNums
      })
  }

  // get the max id of a car in the database
  getMaxId() {
    this.systemService.getCarId().pipe(takeUntil(this.destroy$))
      .subscribe((id: string) => {
        this.id = parseInt(id) + 1; // id of the new viacle will be the new max id
      })
  }


  // edit and fill missing detailes before creating a new viacle elemet
  private fillCarDetailes(data) {
    data["id"] = this.id;
    data["editDate"] = this.today;
    data.viacleType = parseInt(data.viacleType);
    data.fourOnFour = parseInt(data.fourOnFour);
    data.deliveredToEmployee === "none" ? data.deliveredToEmployee = null :
      data.deliveredToEmployee = parseInt(data.deliveredToEmployee);
    if (data.comments === undefined) data.comments = null;
  }

  // check if the licence plate alredy exist in database, if it is return true els return false
  private addVicacleAfterCheck(data) {
    this.fillCarDetailes(data);
    let viacle = new Viacle(this.carService, data);
    viacle.addCarToDataBase(); // add the viacle to database
    this.id += 1;
  }


  // click handler function for adding the car
  onClickSubmit(data) {
    this.addVicacleAfterCheck(data)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.getCarTypes();
    this.getEmployeeNum();
    this.getMaxId();
  }

}
