import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Car } from './car';
import { Type } from './carType';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';

  //delete request from the server to delete a car in the database
  deleteCar(carNum: number): Observable<Car> {
    const deleteUrl = this.rootURL + '/delete?carNum=' + carNum;
    const res = this.http.delete<Car>(deleteUrl);
    return res;
  }

  getLicencePlate(plate: string, id:number): Observable<string> {
    const res = this.http.get<string>(this.rootURL + '/licencePlate?plate=' + plate + '&id=' + id);
    return res;
  }

  addCar(car): Observable<any> {
    const res = this.http.post<any>(this.rootURL + '/addCar', car);
    return res;
  }

  updateCar(car): Observable <any> {
    const res = this.http.post<any>(this.rootURL + '/updateCar', car);
    return res;
  }

}
