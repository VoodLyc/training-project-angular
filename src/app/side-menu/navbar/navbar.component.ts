import { Component, Input } from '@angular/core';
import { NavbarItem } from './navbar-item/navbar-item.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navbarItems: NavbarItem[] = [ new NavbarItem('HOME', 'bx bx-grid-alt'), new NavbarItem('FISH STORE', 'bx bx-cart-alt'), 
  new NavbarItem('SAVED ITEMS', 'bx bx-bookmark-minus'), new NavbarItem('NOTIFICATIONS', 'bx bx-bell'), new NavbarItem('SETTINGS', 'bx bx-cog'),
  new NavbarItem('HELP', 'bx bx-help-circle')]
  @Input() isCollapsed: boolean
}
