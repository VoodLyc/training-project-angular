import { Component, ViewChild } from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Coopang';
  @ViewChild(SideMenuComponent, { static: true }) child: SideMenuComponent

  collapseSideMenu() {
    this.child.collapse()
  }
}
