import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pokemonSubscription = this.pokemonService.getSelectedPokemon().subscribe(
      (pokemon: Pokemon) => this.pokemon = pokemon
    )

    this.route.paramMap
      .subscribe(
        (params: Params) => {
          const id = +params.get('id')
          if (id) {
            this.pokemonService.fetchSelectedPokemon(id)
          }
        }
      )
  }

  ngOnDestroy(): void {
    this.pokemonSubscription.unsubscribe()
  }
}
