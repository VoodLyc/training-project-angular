import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-header-details',
  templateUrl: './header-details.component.html',
  styleUrls: ['./header-details.component.css']
})
export class HeaderDetailsComponent implements OnInit{
  pokemon: Pokemon

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getSelectedPokemon().subscribe(
      (pokemon: Pokemon) => this.pokemon = pokemon
    )
  }


}
