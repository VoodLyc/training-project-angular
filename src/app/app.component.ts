import { Component, OnInit } from '@angular/core';
import { Pokemon } from './shared/models/pokemon.model';
import { PokemonService } from './shared/services/pokemon.service';
import { SideMenuService } from './shared/services/side-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Coopang';
  pokemon: Pokemon
  isCollapsed: boolean

  constructor(private pokemonService: PokemonService, private sideMenuService: SideMenuService) { }

  ngOnInit() {
    this.pokemonService.fetchPokemon(22)
    this.pokemonService.pokemonChanged
      .subscribe(
        (pokemonId: number) => {
          this.pokemonService.fetchPokemon(pokemonId)
        }
      )
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
