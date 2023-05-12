import { Injectable, EventEmitter } from '@angular/core';
import { Pokemon } from '../models/pokemon.model'
import { generateArrayRange } from '../../util';
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PokemonService {
  pokemonChanged = new EventEmitter<number>()
  readonly BASE_URL = 'https://pokeapi.co/api/v2'
  readonly MAX_POKEMON_ID = 1008
  readonly MIN_POKEMON_ID = 1
  readonly NUMBER_OF_POKEMONS_UP = 1
  readonly NUMBER_OF_POKEMONS_DOWN = 2
  private pokemonSubject = new BehaviorSubject<Pokemon>(null)
  private previewPokemonIndexes = new BehaviorSubject<number[]>([])

  constructor(private http: HttpClient) { }

  fetchPokemon(pokemonId: number) {
    this.http.get<Pokemon>(`${this.BASE_URL}/pokemon/${pokemonId}`).subscribe(
      (pokemon: Pokemon) => {
        this.pokemonSubject.next(new Pokemon(pokemon))
      }
    )
    this.previewPokemonIndexes.next(this.generatePokemonIndexesList(pokemonId))
  }

  getPreviewPokemon(pokemonId: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.BASE_URL}/pokemon/${pokemonId}`)
      .pipe(
        map((pokemon: Pokemon) => new Pokemon(pokemon))
      )
  }

  getPokemon(): Observable<Pokemon> {
    return this.pokemonSubject.asObservable()
  }

  getPreviewPokemonIdexes(): Observable<number[]> {
    return this.previewPokemonIndexes.asObservable()
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