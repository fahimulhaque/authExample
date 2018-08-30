import { Injectable } from '@angular/core';
import { Http , RequestOptions , Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

constructor(private http: Http) {
  }

  getOrders() {
    const headers = new Headers();
    const token = localStorage.getItem('token');
    headers.append('Authorization' , 'Bearer ' + token);

    const options = new RequestOptions({headers: headers});

    return this.http.get('/api/orders', options);
  }
}
