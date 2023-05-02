import { Component, ViewChild, OnInit } from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { PokemonImpl } from './shared/models/pokemon.model';
import { PokemonService } from './shared/services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Coopang';
  @ViewChild(SideMenuComponent, { static: true }) child: SideMenuComponent
  pokemon: PokemonImpl

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.fetchPokemon(22)
    this.pokemonService.pokemonChanged
      .subscribe(
        (pokemonId: number) => {
          this.pokemonService.fetchPokemon(pokemonId)
          console.log(pokemonId)
        }
      )
  }

  collapseSideMenu() {
    this.child.collapse()
  }
}
