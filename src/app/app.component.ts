import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from './shared/services/pokemon.service';
import { SideMenuService } from './shared/services/side-menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Coopang';
  previousId: string
  isCollapsed: boolean
  isCollapsedSubscription: Subscription
  routeSubscription: Subscription

  constructor(private pokemonService: PokemonService, private sideMenuService: SideMenuService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.previousId = '25'
    this.routeSubscription = this.router.events
      .pipe(
        map(() => this.activatedRoute.firstChild),
        filter((route) => route?.outlet === 'primary')
      )
      .subscribe((route) => {
        const id = route?.snapshot.paramMap.get('id');
        if (id && id !== this.previousId) {
          this.previousId = id
          this.pokemonService.fetchSelectedPokemon(Number(id))
        }
      })
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
    this.routeSubscription.unsubscribe()
  }
}
