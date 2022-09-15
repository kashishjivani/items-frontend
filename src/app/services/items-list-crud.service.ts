import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Items } from '../models/items';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root',
})
export class ItemsListCrudService {
  private url = 'http://localhost:3000/items';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private http: HttpClient
  ) {}
  fetchAll(): Observable<Items[]> {
    return this.http.get<Items[]>(this.url, { responseType: 'json' }).pipe(
      tap(() => console.log('fetched items')),
      catchError(this.errorHandlerService.handleError<Items[]>('fetchAll', []))
    );
  }

  post(name: string, active: boolean, price: number): Observable<any> {
    console.log(name, active, price);
    return this.http
      .post(this.url, { name, active, price }, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>('post')));
  }

  update( id: number, name: string, active: boolean, price: number): Observable<any> {
    return this.http
      .put(this.url, {id, name, active, price}, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>('update')));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/items/${id}`;
    return this.http
      .delete<Items>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>('delete')));
  }
}
