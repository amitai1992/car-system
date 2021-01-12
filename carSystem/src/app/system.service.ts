import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Car } from './car';
import { Type } from './carType';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  //http request function at url '/api/cars' for car list
  getCars(): Observable<Car[]> {
    const res = this.http.get<Car[]>(this.rootURL + '/cars');
    return res;
  }

  //get types of the car from the server
  getCarTypes(): Observable<Type[]> {
    const res = this.http.get<Type[]>(this.rootURL + '/types');
    return res;
  }

  // get imployee number from the server
  getEmployeeNum(): Observable<number[]> {
    const res = this.http.get<number[]>(this.rootURL + '/employee');
    return res;
  }

  // get /api.carId service
  getCarId(): Observable<string> {
    const res = this.http.get<string>(this.rootURL + '/carId');
    return res;
  }

  filterCarList(type:string, value): Observable<Car[]> {
    const res = this.http.get<Car[]>(this.rootURL + '/filter?type=' + type + '&value=' + value);
    return res;
  }
}
