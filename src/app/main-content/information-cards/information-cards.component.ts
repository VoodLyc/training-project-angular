import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-information-cards',
  templateUrl: './information-cards.component.html',
  styleUrls: ['./information-cards.component.css']
})
export class InformationCardsComponent implements OnInit, OnDestroy {
  pokemon: Pokemon
  pokemonSubscription: Subscription

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonSubscription = this.pokemonService.getSelectedPokemon().subscribe(
      (pokemon: Pokemon) => this.pokemon = pokemon
    )
  }

  ngOnDestroy(): void {
    this.pokemonSubscription.unsubscribe()
  }
}
