import { Component, Input, OnInit } from '@angular/core';
import { capitalizeText } from 'src/app/util';
import { getPokemon } from 'src/app/pokemonService';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.css']
})
export class PreviewCardComponent implements OnInit {
  @Input() pokemonId
  pokemon
  
  ngOnInit(): void {
    this.fetchPokemon(this.pokemonId)
  }

  fetchPokemon(pokemonId) {
    getPokemon(pokemonId)
      .then((pokemonData) => {
        this.pokemon = pokemonData
      })
      .catch((e) => {
        console.log(e)
      })
  }

  getPokemonImg() {
    if(this.pokemon) {
      return this.pokemon.sprites.front_default
    }
  }

  formatPokemonName() {
    if(this.pokemon) {
      return capitalizeText(this.pokemon.name)
    }
  }
}
