import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model'
import { generateArrayRange } from '../../util';
import { HttpClient } from '@angular/common/http'
import { Observable, BehaviorSubject, from, of, forkJoin } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { PokemonPaginationItem } from '../models/pokemon-pagination-item.model';

@Injectable()
export class PokemonService {
  readonly BASE_URL = 'https://pokeapi.co/api/v2'
  readonly MAX_POKEMON_ID = 1010
  readonly MAX_POKEMON_ABILITIES_ID = 298
  readonly MIN_POKEMON_ID = 1
  readonly NUMBER_OF_POKEMONS_UP = 1
  readonly NUMBER_OF_POKEMONS_DOWN = 2
  private pokemonSubject = new BehaviorSubject<Pokemon>(null)
  private previewPokemonIndexes = new BehaviorSubject<number[]>([])
  private comparePokemonSubjectA = new BehaviorSubject<Pokemon>(null)
  private comparePokemonSubjectB = new BehaviorSubject<Pokemon>(null)
  private types: string[] = ['Normal', 'Fire', 'Water', 'Grass', 'Flying', 'Fighting', 'Poison', 'Electric', 'Ground', 'Rock', 'Psychic', 'Ice', 'Bug', 'Ghost', 'Steel', 'Dragon', 'Dark', 'Fairy']
  private localPokemons: Pokemon[] = []

  constructor(private http: HttpClient) {
    this.loadLocalPokemons()
    if (localStorage.getItem('selectedPokemon') === null) {
      this.fetchSelectedPokemon(25)
    }
    else {
      const id = +localStorage.getItem('selectedPokemon')
      this.fetchSelectedPokemon(id)
    }
  }

  fetchSelectedPokemon(pokemonId: number): void {
    this.getPokemon(pokemonId).subscribe(
      (pokemon: Pokemon) => {
        this.pokemonSubject.next(pokemon)
        localStorage.setItem('selectedPokemon', pokemon.id.toString())
      }
    )
    this.previewPokemonIndexes.next(this.generatePokemonIndexesList(pokemonId))
  }

  fetchComparePokemon(index: number, pokemonId: number): void {
    this.getPokemon(pokemonId).subscribe(
      (pokemon: Pokemon) => {
        this.getComparePokemonSubject(index).next(pokemon)
      }
    )
  }

  generatePokemonId(): number {
    return this.MAX_POKEMON_ID + this.localPokemons.length + 1
  }

  private isLocalPokemon(pokemonId: number): boolean {
    return pokemonId > this.MAX_POKEMON_ID
  }

  private getLocalPokemon(pokemonId: number): Pokemon {
    const id = pokemonId - (this.MAX_POKEMON_ID + 1)
    const pokemon = Object.assign(new Pokemon(), this.localPokemons[id])
    return pokemon
  }

  private getLocalPokemonObservable(pokemonId: number): Observable<Pokemon> {
    return of(this.getLocalPokemon(pokemonId)).pipe(
      delay(100)
    )
  }

  private loadLocalPokemons(): void {
    if (localStorage.getItem('pokemons') == null) {
      localStorage.setItem('pokemons', '[]')
    }
    this.localPokemons = JSON.parse(localStorage.getItem('pokemons'))
  }

  private getLocalPokemons(): Pokemon[] {
    return this.localPokemons
  }

  saveLocalPokemon(pokemon: Pokemon): void {
    this.localPokemons.push(pokemon)
    localStorage.setItem('pokemons', JSON.stringify(this.localPokemons))
  }

  getPokemonPagination(): Observable<PokemonPaginationItem[]> {
    const localPokemons$ = from([this.getLocalPokemons()]).pipe(
      map((pokemons: Pokemon[]) => {
        return pokemons.map((pokemon: Pokemon) => {
          return {
            name: pokemon.name,
            url: `${this.BASE_URL}/pokemon/${pokemon.id}/`
          }
        })
      })
    )
    const ApiPokemons$ = this.http.get<any>(`${this.BASE_URL}/pokemon/?limit=${this.MAX_POKEMON_ID}`)
    return forkJoin([ApiPokemons$, localPokemons$]).pipe(
      map(([apiPokemons, localPokemons]) => {
        return apiPokemons.results.concat(localPokemons)
      })
    )

  }

  getPokemonAbilities(): Observable<PokemonPaginationItem> {
    return this.http.get<any>(`${this.BASE_URL}/ability/?limit=${this.MAX_POKEMON_ABILITIES_ID}`)
  }

  getPokemon(pokemonId: number): Observable<Pokemon> {
    if (this.isLocalPokemon(pokemonId)) {
      return this.getLocalPokemonObservable(pokemonId)
    }
    else {
      return this.http.get<Pokemon>(`${this.BASE_URL}/pokemon/${pokemonId}/`)
        .pipe(
          map((pokemon: Pokemon) => Pokemon.PokemonJSON(pokemon))
        )
    }
  }

  getComparePokemon(index: number): Observable<Pokemon> {
    return this.getComparePokemonSubject(index).asObservable()
  }

  private getComparePokemonSubject(index: number): BehaviorSubject<Pokemon> {
    if (index === 0) {
      return this.comparePokemonSubjectA
    } else {
      return this.comparePokemonSubjectB
    }
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

  getTypes(): string[] {
    return this.types
  }

  getPreviewPokemonIdexes(): Observable<number[]> {
    return this.previewPokemonIndexes.asObservable()
  }

  private generatePokemonIndexRange(pokemonId: number) {
    let min = pokemonId - this.NUMBER_OF_POKEMONS_DOWN
    let max = pokemonId + this.NUMBER_OF_POKEMONS_UP

    if (min < this.MIN_POKEMON_ID) {
      min = this.MIN_POKEMON_ID
      max += this.NUMBER_OF_POKEMONS_DOWN - Math.abs(pokemonId - this.MIN_POKEMON_ID)
    }
    else if (max > this.MAX_POKEMON_ID + this.localPokemons.length) {
      max = this.MAX_POKEMON_ID + this.localPokemons.length
      min -= this.NUMBER_OF_POKEMONS_UP + Math.abs(pokemonId - (this.MAX_POKEMON_ID + this.localPokemons.length))
    }

    return { min, max }
  }

  private generatePokemonIndexesList(pokemonId: number): number[] {
    let limit = this.generatePokemonIndexRange(pokemonId)
    let pokemonIndexArray = generateArrayRange(limit.min, limit.max)
    let index = pokemonIndexArray.indexOf(pokemonId)
    pokemonIndexArray.splice(index, 1)
    return pokemonIndexArray
  }
}