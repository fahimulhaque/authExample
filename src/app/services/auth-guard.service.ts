import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService , private router: Router) { }

  canActivate(route , state: RouterStateSnapshot ): boolean {
    console.log('Auth Guard called');
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }});

    return false;
  }
}