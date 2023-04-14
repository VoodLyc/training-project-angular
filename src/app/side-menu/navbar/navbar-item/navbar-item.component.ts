import { Component, Input } from '@angular/core';
import { NavbarItem } from './navbar-item.model';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent {
  @Input() item: NavbarItem
  @Input() isCollapsed: boolean

  onClick() {
    //TODO
  }
}
