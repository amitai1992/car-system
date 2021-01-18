import { Component, OnInit, OnDestroy } from '@angular/core';
import { viacleService } from '../car.service';
import { SystemService } from '../system.service'
import { Viacle } from '../car'
import { Type } from '../carType';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { ExportExcelService } from '../export-excel.service';


@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(
    private viacleService: viacleService,
    private systemService: SystemService,
    private router: Router, 
    private exportExcelService: ExportExcelService) { }

  cars: Viacle[] = []; // the list of the viacles
  types = {}; // key: value order types
  selectedTypes: Type[]; // Type array for the select tag
  destroy$: Subject<boolean> = new Subject<boolean>();
  searchProp = ["any", "licencePlate", "fourOnFour", "viacleType"]; // array of the search props
  selectedProp = "any"; // the selected property search, initilize to any at first
  searchValue = { // values of the search type
    licencePlate: "", // initilize to empty string
    fourOnFour: "4X4",
    viacleType: "motorcycle"
  }

  // this function use the get viacles function of systemService to get the viacle list from the server
  getCarsList() {
    this.systemService.getCars().pipe(takeUntil(this.destroy$)).subscribe((cars: any) => {
      cars.forEach(object => {
        let car = new Viacle(this.viacleService, object);
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

    });
  }

  // get list of the cars depending on the search, get the property chosen and the value of it
  getFilterCars(prop, value) {
    this.systemService.filterCarList(prop, value).pipe(takeUntil(this.destroy$))
      .subscribe((cars: any) => {
        this.cars = [];
        cars.forEach(object => {
          let car = new Viacle(this.viacleService, object);
          this.cars.push(car);
        });
      })
  }

  //delete car on click
  deleteCarHandler(car: Viacle): void {
    if (confirm("Are you sure you want to delete this car? ")) {
      this.cars = this.cars.filter(c => c.getId() !== car.getId());
      car.deleteCar();
    }
  }

  // go to the edit component
  editClickHandler(viacle: Viacle) {
    let data = viacle.buildObject();
    const navigationExtras: NavigationExtras = { state: data };
    this.router.navigate(['edit'], navigationExtras);
  }

  // search click function
  searchClickHandler() {
    let value: any = "";
    if (this.selectedProp === "viacleType") {
      for (const prop in this.types) {
        if (this.types[prop] === this.searchValue.viacleType) {
          value = prop;
          break;
        }
      }
    }
    else if (this.selectedProp === "fourOnFour") {
      value = true;
      this.searchValue.fourOnFour === "4X4" ? value = true : value = false;
    }
    else {
      value = "'" + this.searchValue.licencePlate + "'"; // the input for licence in a query is by''
    }
    this.getFilterCars(this.selectedProp, value); // search the viacles
  }

  // change the value of selected prop depending on type of search
  searchBy(prop: string) {
    if (prop === "any" && prop != this.selectedProp) {
      this.cars = [];
      this.getCarsList();
    }
    this.selectedProp = prop;
  }

 private createDataForExcel() {
    let data = [];
    this.cars.forEach(car => {
      let vehicleData = car.exportDataForList();
      data.push(vehicleData);
    });
    return data;
  }

  export() {
    let data = this.createDataForExcel();
    this.exportExcelService.exportExcel(data, 'vehicles');
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
