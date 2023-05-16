import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable()
export class ComparePokemonService {
    readonly BASE_URL = 'https://pokeapi.co/api/v2'
    readonly POKEMONS_LIMIT = 1000
    readonly TYPE_A = 1
    readonly TYPE_B = 2
    private pokemons: Observable<any>

    constructor(private http: HttpClient) { }

    fetchPokemonPagination() {
        this.pokemons = this.http.get<any>(`${this.BASE_URL}/pokemon/?limit=${this.POKEMONS_LIMIT}`)
    }

    fetchPokemon(pokemonId: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(`${this.BASE_URL}/pokemon/${pokemonId}`)
          .pipe(
            map((pokemon: Pokemon) => new Pokemon(pokemon))
          )
      }

    getPokemons() {
        return this.pokemons
    }
}