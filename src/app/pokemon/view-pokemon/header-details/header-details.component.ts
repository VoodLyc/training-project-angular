import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-header-details',
  templateUrl: './header-details.component.html',
  styleUrls: ['./header-details.component.css']
})
export class HeaderDetailsComponent implements OnInit, OnDestroy {
  pokemon: Pokemon
  pokemonSubscription: Subscription

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonSubscription = this.pokemonService.getSelectedPokemon().subscribe(
      (pokemon: Pokemon) => this.pokemon = pokemon
    )
  }

  ngOnDestroy(): void {
    this.pokemonSubscription.unsubscribe()
  }
}
