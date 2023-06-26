import { Component, OnInit, OnDestroy } from '@angular/core';
import { SideMenuService } from './shared/services/side-menu.service';
import { Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Coopang';
  isCollapsed: boolean
  isCollapsedSubscription: Subscription

  constructor(private sideMenuService: SideMenuService) { }

  ngOnInit(): void {
    this.isCollapsedSubscription = this.sideMenuService.getIsCollapsed().subscribe(
      (isCollapsed: boolean) => {
        this.isCollapsed = isCollapsed
      }
    )
  }

  collapseSideMenu() {
    this.sideMenuService.collapse()
  }

  ngOnDestroy(): void {
    this.isCollapsedSubscription.unsubscribe()
  }
}
