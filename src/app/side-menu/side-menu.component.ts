import { Component } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})

export class SideMenuComponent {
  readonly MENU_NAME = 'Coopang' // The name of the app in the side menu
  isCollapsed: boolean = false

  collapse() {
    this.isCollapsed = !this.isCollapsed
  }
}
