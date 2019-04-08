import { Injectable } from '@angular/core';
import { Fillup } from '../models/fillup';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FillupService {

  private baseUrl = 'http://localhost:8083/';
  private url = this.baseUrl + 'api/fillups';

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get<Fillup[]>(this.url).pipe(
      catchError((err: any) => {
        console.error('FillupService.getAll(): Error');
        console.error(err);
        return throwError('Error in Fillup Service.getAll()');
      })
    );
  }

  public searchDate(min: number, max: number) {
    return this.http.get<Fillup[]>(this.url + '/date/' + min + '/' + max).pipe(
      catchError((err: any) => {
        console.error('FillupService.getAll(): Error');
        console.error(err);
        return throwError('Error in Fillup Service.getAll()');
      })
    );
  }

  public searchPrice(min: number, max: number) {
    return this.http.get<Fillup[]>(this.url + '/price/' + min + '/' + max).pipe(
      catchError((err: any) => {
        console.error('FillupService.getAll(): Error');
        console.error(err);
        return throwError('Error in Fillup Service.getAll()');
      })
    );
  }

  public searchOdometer(min: number, max: number) {
    return this.http.get<Fillup[]>(this.url + '/odometer/' + min + '/' + max).pipe(
      catchError((err: any) => {
        console.error('FillupService.getAll(): Error');
        console.error(err);
        return throwError('Error in Fillup Service.getAll()');
      })
    );
  }

  public create(fillup: Fillup) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    };
    return this.http.post<Fillup>(this.url, fillup, httpOptions).pipe(
      catchError((err: any) => {
        console.error('fillup.service.create(): Error');
        console.error(err);
        return throwError('Error in fillup.service.create()');
      })
    );
  }

  public delete(id: number) {
    return this.http.delete(this.url + '/' + id);
    catchError((err: any) => {
        console.error('fillup.service.destroy(): Error');
        console.error(err);
        return throwError('Error fillup.service.destroy()');
      })
  }

  public update(fillup: Fillup) {
    const httpOptions = { headers: {'Content-type': 'application/json'}};
    return this.http.put<Fillup>(this.url + '/' + fillup.id, fillup, httpOptions).pipe(
      catchError((err: any) => {
        console.error('fillup.service.update(): Error');
        console.error(err);
        return throwError('Error in fillup.service.update()');
      })
    );
  }
}
