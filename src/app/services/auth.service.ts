import {
  Http
} from '@angular/http';
import {
  Injectable
} from '@angular/core';
import {
  tap
} from 'rxjs/operators';
import {
  JwtHelperService
} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http) {}

  login(credentials) {
    return this.http.post('/api/authenticate',
      JSON.stringify(credentials)).pipe(
      tap(response => {
        if (response.json() && response.json().token) {
          localStorage.setItem('token', response.json().token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {

    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    const expirationDate = jwtHelper.getTokenExpirationDate(token);
    const isExpired = jwtHelper.isTokenExpired(token);


    // isExpired will return true as no key is present in token for expire. , So returning true.
    // TODO add expiration time in JWT token
    return true;
  }

  currentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    return new JwtHelperService().decodeToken(token);
  }
}
