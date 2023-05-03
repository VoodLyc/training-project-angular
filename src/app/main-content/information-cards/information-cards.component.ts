import { Component } from '@angular/core';
import { PokemonImpl } from 'src/app/shared/models/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-information-cards',
  templateUrl: './information-cards.component.html',
  styleUrls: ['./information-cards.component.css']
})
export class InformationCardsComponent {

  pokemon: PokemonImpl

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemon().subscribe(
      (pokemon: PokemonImpl) => this.pokemon = pokemon
    )
  }
}
