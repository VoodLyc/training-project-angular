import { Component, OnInit } from '@angular/core';
import { SideMenuService } from '../shared/services/side-menu.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})

export class SideMenuComponent implements OnInit {
  readonly MENU_NAME = 'Coopang' // The name of the app in the side menu
  isCollapsed: boolean

  constructor(private sideMenuService: SideMenuService) { }

  ngOnInit() {
    this.sideMenuService.getIsCollapsed().subscribe(
      (isCollapsed: boolean) => {
        this.isCollapsed = isCollapsed
      }
    )
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed
  }
}
