import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavbarItem } from './navbar-item.model';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent {
  @Input() item: NavbarItem
  @Input() isCollapsed: boolean
  @Input() selected: boolean
  @Output() itemSelected = new EventEmitter<NavbarItem>()

  onSelectItem() {
    this.itemSelected.emit(this.item)
  }
}
