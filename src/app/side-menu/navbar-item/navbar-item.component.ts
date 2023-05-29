import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { NavbarItem } from './navbar-item.model';
import { SideMenuService } from 'src/app/shared/services/side-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent implements OnInit, OnDestroy {
  @Input() item: NavbarItem
  isCollapsed: boolean
  isCollapsedSubscription: Subscription
  @Input() selected: boolean
  @Output() itemSelected = new EventEmitter<NavbarItem>()

  constructor(private sideMenuService: SideMenuService) { }

  ngOnInit(): void {
    this.isCollapsedSubscription = this.sideMenuService.getIsCollapsed().subscribe(
      (isCollapsed: boolean) => {
        this.isCollapsed = isCollapsed
      }
    )
  }

  onSelectItem() {
    this.sideMenuService.setSelectedItem(this.item)
  }

  ngOnDestroy(): void {
    this.isCollapsedSubscription.unsubscribe()
  }
}
