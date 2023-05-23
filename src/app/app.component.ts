import { Component, OnInit } from '@angular/core';
import { PokemonService } from './shared/services/pokemon.service';
import { SideMenuService } from './shared/services/side-menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Coopang';
  previousId: string
  isCollapsed: boolean

  constructor(private pokemonService: PokemonService, private sideMenuService: SideMenuService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.pokemonService.fetchSelectedPokemon(25)
    this.previousId = '25'
    this.router.events
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
    this.sideMenuService.getIsCollapsed().subscribe(
      (isCollapsed: boolean) => {
        this.isCollapsed = isCollapsed
      }
    )
  }

  collapseSideMenu() {
    this.sideMenuService.collapse()
  }
}
