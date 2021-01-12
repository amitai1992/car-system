import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Viacle } from './car';
import { Type } from './carType';

@Injectable({
  providedIn: 'root'
})
// system service use for api requests directly from the components
export class SystemService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  //http request function at url '/api/cars' for car list
  getCars(): Observable<Viacle[]> {
    const res = this.http.get<Viacle[]>(this.rootURL + '/cars');
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

  // select query acording the user search in entry component 
  filterCarList(type:string, value): Observable<Viacle[]> {
    const res = this.http.get<Viacle[]>(this.rootURL + '/filter?type=' + type + '&value=' + value);
    return res;
  }
}
