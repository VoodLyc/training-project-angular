import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserPreview } from './user.model';
import { SideMenuService } from 'src/app/shared/services/side-menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})


export class UserDetailsComponent implements OnInit, OnDestroy {
  @Input() user: UserPreview
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

  ngOnDestroy(): void {
    this.isCollapsedSubscription.unsubscribe()
  }
}