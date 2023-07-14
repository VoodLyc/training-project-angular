import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideMenuService } from '../shared/services/side-menu.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit, OnDestroy {
  title = 'Coopang';
  isCollapsed: boolean
  isCollapsedSubscription: Subscription

  constructor(private sideMenuService: SideMenuService, private authService: AuthService) { }

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

  logOut() {
    this.authService.logOut()
  }

  ngOnDestroy(): void {
    this.isCollapsedSubscription.unsubscribe()
  }
}