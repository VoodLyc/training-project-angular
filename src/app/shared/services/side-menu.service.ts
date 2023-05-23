import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { NavbarItem } from "src/app/side-menu/navbar-item/navbar-item.model";

@Injectable()
export class SideMenuService {
    private isCollapsed = new BehaviorSubject<boolean>(false)
    navbarItems: NavbarItem[] = [new NavbarItem('POKEMON', 'bx bx-stats'), new NavbarItem('COMPARISON', 'bx bx-carousel'), new NavbarItem('HOME', 'bx bx-grid-alt'), new NavbarItem('FISH STORE', 'bx bx-cart-alt'), new NavbarItem('SAVED ITEMS', 'bx bx-bookmark-minus'), new NavbarItem('NOTIFICATIONS', 'bx bx-bell'), new NavbarItem('SETTINGS', 'bx bx-cog'), new NavbarItem('HELP', 'bx bx-help-circle')]
    private selectedItem: NavbarItem = this.navbarItems[0]

    getIsCollapsed(): Observable<boolean> {
        return this.isCollapsed.asObservable()
    }

    collapse() {
        this.isCollapsed.next(!this.isCollapsed.value)
    }

    setSelectedItem(item: NavbarItem) {
        this.selectedItem = item
    }

    isSelected(item: NavbarItem): boolean {
        let selected = false
        if (item.label === this.selectedItem.label) {
            selected = true
        }
        return selected
    }

    getNavbarItems(): NavbarItem[] {
        return this.navbarItems
    }
}