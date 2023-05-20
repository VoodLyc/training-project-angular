import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.css']
})
export class PreviewCardComponent implements OnInit {
  @Input() pokemonId: number
  pokemon: Pokemon
  
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemon(this.pokemonId).subscribe(
      (pokemon: Pokemon) => this.pokemon = pokemon
    )
  }

  onPokemonSelected() {
    this.pokemonService.fetchSelectedPokemon(this.pokemonId)
  }
}
