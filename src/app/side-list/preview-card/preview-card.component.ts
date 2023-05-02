import { Component, Input, OnInit } from '@angular/core';
import { PokemonImpl } from 'src/app/shared/models/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.css']
})
export class PreviewCardComponent implements OnInit {
  @Input() pokemonId
  pokemon: PokemonImpl
  
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPreviewPokemon(this.pokemonId).subscribe(
      (pokemon: PokemonImpl) => this.pokemon = pokemon
    )
  }

  onPokemonSelected() {
    this.pokemonService.pokemonChanged.emit(this.pokemonId)
  }
}
