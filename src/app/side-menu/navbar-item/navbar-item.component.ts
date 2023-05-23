import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavbarItem } from './navbar-item.model';
import { SideMenuService } from 'src/app/shared/services/side-menu.service';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent implements OnInit {
  @Input() item: NavbarItem
  isCollapsed: boolean
  @Input() selected: boolean
  @Output() itemSelected = new EventEmitter<NavbarItem>()

  constructor(private sideMenuService: SideMenuService) { }

  ngOnInit() {
    this.sideMenuService.getIsCollapsed().subscribe(
      (isCollapsed: boolean) => {
        this.isCollapsed = isCollapsed
      }
    )
  }

  onSelectItem() {
    this.sideMenuService.setSelectedItem(this.item)
  }
}
