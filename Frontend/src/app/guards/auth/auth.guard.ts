import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanMatch, GuardResult, MaybeAsync } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticate();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticate();
  }
  
  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.authenticate();
  }

  private authenticate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/login");
      return false;
    } else {
      return true;
    }
  }
}