import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokemonPaginationItem } from 'src/app/shared/models/pokemon-pagination-item.model';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit, OnDestroy {
  @Input() pokemonId: number
  @Input() index: number
  @Input() pokemons: PokemonPaginationItem[]
  selectedPokemon: PokemonPaginationItem
  pokemon: Pokemon
  pokemonSubscription: Subscription

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.fetchComparePokemon(this.index, this.pokemonId)
    this.pokemonSubscription = this.pokemonService.getComparePokemon(this.index).subscribe(
      (pokemon: Pokemon) => {
        this.pokemon = pokemon
        if (pokemon) {
          this.resetSelectedPokemon(pokemon.name)
        }
      }
    )
  }

  onChangePokemon(event) {
    const pokemonId = this.pokemonService.getIdFromURL(event.value.url)
    this.pokemonId = +pokemonId
    this.pokemonService.fetchComparePokemon(this.index, +pokemonId)
  }

  resetSelectedPokemon(name: string) {
    this.selectedPokemon = { name: name, url: this.pokemonService.getPokemonURL(this.pokemonId) }
  }

  ngOnDestroy(): void {
    this.pokemonSubscription.unsubscribe()
  }
}
