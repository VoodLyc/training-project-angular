import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private pokemonService: PokemonService, private router: Router) {}

  ngOnInit() {
    this.pokemonService.getPokemon(this.pokemonId).subscribe(
      (pokemon: Pokemon) => this.pokemon = pokemon
    )
  }

  onPokemonSelected() {
    this.pokemonService.fetchSelectedPokemon(this.pokemonId)
  }
}
