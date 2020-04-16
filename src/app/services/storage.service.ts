import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: any):Observable<boolean> {
    return new Observable((observe) => {
      try{
        localStorage.setItem(key, JSON.stringify(value));
        observe.next(true);
      } catch(err) {
        observe.next(false);
      }
      observe.complete();
    });
  }

  getItem(key: string): Observable<any> {
    return new Observable((observe) => {
      try{
        let storeValue = localStorage.getItem(key);
        if(storeValue != null) {
          storeValue = JSON.parse(storeValue);
        }
        observe.next(storeValue);
      } catch(err) {
        observe.error(err);
      }
      observe.complete();
    })
  }

}
