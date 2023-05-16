import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PokemonPaginationItem } from 'src/app/shared/models/pokemon-pagination-item.model';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { ComparePokemonService } from 'src/app/shared/services/compare-pokemon.service';
import { capitalizeText } from 'src/app/util';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  @Input() pokemonId: string
  @Output() onPokemonChanged = new EventEmitter<{ oldId: string, newId: string }>()
  pokemons: PokemonPaginationItem[]
  selectedPokemon: PokemonPaginationItem
  pokemon: Pokemon

  constructor(private compareService: ComparePokemonService) { }

  ngOnInit() {
    this.compareService.getPokemons()
      .subscribe(
        (pokemons: any) => {
          this.pokemons = pokemons.results
        }
      )
    this.compareService.fetchPokemon(this.pokemonId)
      .subscribe(
        (pokemon: Pokemon) => {
          this.selectedPokemon = {name: pokemon.name, url: `https://pokeapi.co/api/v2/pokemon/${this.pokemonId}/`}
          this.pokemon = pokemon
        }
      )
  }

  onChange(event) {
    this.onPokemonChanged.emit({ oldId: this.pokemonId, newId: this.getId(event.value.url) })
  }

  getId(value: string) {
    let id = value.split('/')
    return id[id.length - 2]
  }

  getCapitalizedName(name: string) {
    return capitalizeText(name)
  }
}
