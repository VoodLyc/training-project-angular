import { Component, Input, OnInit } from '@angular/core';
import { User } from './user.model';
import { SideMenuService } from 'src/app/shared/services/side-menu.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})


export class UserDetailsComponent implements OnInit {
  @Input() user: User
  isCollapsed: boolean

  constructor(private sideMenuService: SideMenuService) { }

  ngOnInit() {
    this.sideMenuService.getIsCollapsed().subscribe(
      (isCollapsed: boolean) => {
        this.isCollapsed = isCollapsed
      }
    )
  }
}