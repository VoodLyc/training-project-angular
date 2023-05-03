import { Component, OnInit } from '@angular/core';
import { PokemonImpl } from 'src/app/shared/models/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-header-details',
  templateUrl: './header-details.component.html',
  styleUrls: ['./header-details.component.css']
})
export class HeaderDetailsComponent implements OnInit{
  pokemon: PokemonImpl

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemon().subscribe(
      (pokemon: PokemonImpl) => this.pokemon = pokemon
    )
  }


}
