import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model'
import { generateArrayRange } from '../../util';
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PokemonService {
  readonly BASE_URL = 'https://pokeapi.co/api/v2'
  readonly MAX_POKEMON_ID = 1008
  readonly MIN_POKEMON_ID = 1
  readonly NUMBER_OF_POKEMONS_UP = 1
  readonly NUMBER_OF_POKEMONS_DOWN = 2
  private pokemonSubject = new BehaviorSubject<Pokemon>(null)
  private previewPokemonIndexes = new BehaviorSubject<number[]>([])
  private pokemonPagination: Observable<any>

  constructor(private http: HttpClient) {
    this.fetchSelectedPokemon(25)
  }

  fetchSelectedPokemon(pokemonId: number): void {
    this.getPokemon(pokemonId).subscribe(
      (pokemon: Pokemon) => {
        this.pokemonSubject.next(pokemon)
      }
    )
    this.previewPokemonIndexes.next(this.generatePokemonIndexesList(pokemonId))
  }

  fetchPokemonPagination(): void {
    this.pokemonPagination = this.http.get<any>(`${this.BASE_URL}/pokemon/?limit=${this.MAX_POKEMON_ID}`)
  }

  getPokemon(pokemonId: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.BASE_URL}/pokemon/${pokemonId}/`)
      .pipe(
        map((pokemon: Pokemon) => new Pokemon(pokemon))
      )
  }

  getIdFromURL(value: string): string {
    let id = value.split('/')
    return id[id.length - 2]
  }

  getPokemonURL(pokemonId: number): string {
    return `${this.BASE_URL}/pokemon/${pokemonId}/`
  }

  getSelectedPokemon(): Observable<Pokemon> {
    return this.pokemonSubject.asObservable()
  }

  getPreviewPokemonIdexes(): Observable<number[]> {
    return this.previewPokemonIndexes.asObservable()
  }

  getPokemonPagination(): Observable<any> {
    return this.pokemonPagination
  }

  generatePokemonIndexRange(pokemonId: number) {
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

  generatePokemonIndexesList(pokemonId: number): number[] {
    let limit = this.generatePokemonIndexRange(pokemonId)
    let pokemonIndexArray = generateArrayRange(limit.min, limit.max)
    let index = pokemonIndexArray.indexOf(pokemonId)
    pokemonIndexArray.splice(index, 1)
    return pokemonIndexArray
  }
}