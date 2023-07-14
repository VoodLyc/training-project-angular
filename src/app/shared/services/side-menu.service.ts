import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { NavbarItem } from "src/app/side-menu/navbar-item/navbar-item.model";

@Injectable({
    providedIn: 'root'
})
export class SideMenuService {
    private isCollapsed = new BehaviorSubject<boolean>(false)
    navbarItems: NavbarItem[] = [new NavbarItem('HOME', 'bx bx-grid-alt'), new NavbarItem('COMPARISON', 'bx bx-carousel'), new NavbarItem('CREATE', 'bx bx-stats', ['create'])]

    getIsCollapsed(): Observable<boolean> {
        return this.isCollapsed.asObservable()
    }

    collapse() {
        this.isCollapsed.next(!this.isCollapsed.value)
    }

    getNavbarItems(): NavbarItem[] {
        return this.navbarItems
    } 
}