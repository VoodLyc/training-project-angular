import { Component, ViewChild, OnInit } from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { getPokemon } from './pokemonService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Coopang';
  @ViewChild(SideMenuComponent, { static: true }) child: SideMenuComponent
  pokemon
  readonly MAX_POKEMON_ID = 1008
  readonly MIN_POKEMON_ID = 1
  readonly NUMBER_OF_POKEMONS_UP = 1
  readonly NUMBER_OF_POKEMONS_DOWN = 2
  previewPokemonIndices: Number[]

  ngOnInit() {
    this.fetchPokemon(22)
  }

  fetchPokemon(pokemonId) {
    getPokemon(pokemonId)
      .then((pokemonData) => {
        this.pokemon = pokemonData
        this.previewPokemonIndices = this.getPokemonIndicesList(this.pokemon.id)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  collapseSideMenu() {
    this.child.collapse()
  }

  generatePokemonIndexRange(pokemonId) {
    let min = pokemonId - this.NUMBER_OF_POKEMONS_DOWN
    let max = pokemonId + this.NUMBER_OF_POKEMONS_UP

    if (min < this.MIN_POKEMON_ID) {
      min = this.MIN_POKEMON_ID
      max += this.NUMBER_OF_POKEMONS_DOWN - Math.abs(pokemonId - this.MIN_POKEMON_ID)
    }
    else if (max > this.MAX_POKEMON_ID) {
      max = this.MAX_POKEMON_ID
      min -= this.NUMBER_OF_POKEMONS_UP + Math.abs(pokemonId - this.MAX_POKEMON_ID)
    }

    return { min, max }
  }

  generateArrayRange(start, end) {
    // Creates an array of numbers from min to max
    return Array.from(Array(end - start + 1).keys()).map(x => x + start)
  }

  getPokemonIndicesList(pokemonId): Number[] {
    let limit = this.generatePokemonIndexRange(pokemonId)
    let pokemonIndexArray = this.generateArrayRange(limit.min, limit.max)
    let index = pokemonIndexArray.indexOf(pokemonId)
    pokemonIndexArray.splice(index, 1)
    return pokemonIndexArray
  }

  updatePokemon(index) {
    this.fetchPokemon(index.index)
  }
}
