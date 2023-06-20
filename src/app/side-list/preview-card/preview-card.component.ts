import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.css']
})
export class PreviewCardComponent implements OnInit {
  @Input() pokemonId: number
  pokemon$: Observable<Pokemon>
  
  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemon$ = this.pokemonService.getPokemon(this.pokemonId)
  }

  onPokemonSelected() {
    this.pokemonService.fetchSelectedPokemon(this.pokemonId)
  }
}
