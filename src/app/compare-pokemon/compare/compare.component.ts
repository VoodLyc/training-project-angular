import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonPaginationItem } from 'src/app/shared/models/pokemon-pagination-item.model';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { ComparePokemonService } from 'src/app/shared/services/compare-pokemon.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  @Input() pokemonId: string
  @Output() onPokemonChanged = new EventEmitter<{ oldId: string, newId: string }>()
  pokemons: PokemonPaginationItem[]
  selectedPokemon
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
          this.selectedPokemon = `https://pokeapi.co/api/v2/pokemon/${this.pokemonId}/`
          this.pokemon = pokemon
        }
      )
  }

  onChange(event) {
    this.onPokemonChanged.emit({ oldId: this.pokemonId, newId: this.getId(event.value) })
  }

  getId(value: string) {
    let id = value.split('/')
    return id[id.length - 2]
  }
}
