import { Injectable, EventEmitter } from '@angular/core';
import { PokemonImpl } from '../models/pokemon.model'
import { generateArrayRange } from '../../util';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.interface';
import { share } from 'rxjs/operators';

@Injectable()
export class PokemonService {
  
  pokemonChanged = new EventEmitter<number>()
  readonly BASE_URL = 'https://pokeapi.co/api/v2'
  readonly MAX_POKEMON_ID = 1008
  readonly MIN_POKEMON_ID = 1
  readonly NUMBER_OF_POKEMONS_UP = 1
  readonly NUMBER_OF_POKEMONS_DOWN = 2
  private pokemon$: Observable<PokemonImpl>
  private previewPokemonIndexes: number[]

  constructor(private http: HttpClient) { }

  fetchPokemon(pokemonId: number) {
    this.pokemon$ = this.http.get<Pokemon>(`${this.BASE_URL}/pokemon/${pokemonId}`)
      .pipe(
        map((pokemon) => new PokemonImpl(pokemon)),
        share()
      )
    this.previewPokemonIndexes = this.generatePokemonIndexesList(pokemonId)
  }

  getPreviewPokemon(pokemonId: number) : Observable<PokemonImpl> {
    return this.http.get<Pokemon>(`${this.BASE_URL}/pokemon/${pokemonId}`)
      .pipe(
        map((pokemon) => new PokemonImpl(pokemon))
      )
  }

  getPokemon(): Observable<PokemonImpl> {
    return this.pokemon$
  }

  getPreviewPokemonIdexes(): Number[] {
    return this.previewPokemonIndexes
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

  generatePokemonIndexesList(pokemonId): number[] {
    let limit = this.generatePokemonIndexRange(pokemonId)
    let pokemonIndexArray = generateArrayRange(limit.min, limit.max)
    let index = pokemonIndexArray.indexOf(pokemonId)
    pokemonIndexArray.splice(index, 1)
    return pokemonIndexArray
  }
}