import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
class AuthGuard {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<boolean | UrlTree>  {
        return this.authService.getUser().pipe(
            take(1),
            map(user => {
                const isAuth = !!user
                if (isAuth) {
                    return true
                }
                return this.router.createUrlTree(['auth'])
            })
        )
    }
}

export const IsAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, router: RouterStateSnapshot): Observable<boolean | UrlTree> => {
    return inject(AuthGuard).canActivate(route, router)
}