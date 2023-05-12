import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { BehaviorSubject, Observable, map } from "rxjs";

@Injectable()
export class ComparePokemonService {
    readonly BASE_URL = 'https://pokeapi.co/api/v2'
    readonly POKEMONS_LIMIT = 150
    private pokemons: Observable<any>
    private pokemonA = new BehaviorSubject<Pokemon>(null)
    private pokemonB = new BehaviorSubject<Pokemon>(null)

    constructor(private http: HttpClient) { }

    // fetchPokemons() {
    //     this.http.get<any>(`${this.BASE_URL}/pokemon/?limit=${this.POKEMONS_LIMIT}`)
    //         .pipe(
    //             map((pokemons) => pokemons.results.map((pokemon) => {
    //                 this.fetchPokemon(pokemon.url)
    //                     .subscribe(
    //                         (pokemon: Pokemon) => console.log(pokemon)
    //                     )
    //             }))
    //         )
    //         .subscribe(
    //             (pokemons: Pokemon[]) => {
    //                 this.pokemons.next(pokemons)
    //             }
    //         )
    // }

    fetchPokemonPagination() {
        this.pokemons = this.http.get<any>(`${this.BASE_URL}/pokemon/?limit=${this.POKEMONS_LIMIT}`)
    }

    fetchPokemon(url: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(url)
            .pipe(
                map((pokemon: Pokemon) => new Pokemon(pokemon))
            )
    }

    // getPokemons(): Observable<Pokemon[]> {
    //     return this.pokemons.asObservable()
    // }
}