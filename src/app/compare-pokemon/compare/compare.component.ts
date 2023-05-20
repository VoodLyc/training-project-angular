import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonPaginationItem } from 'src/app/shared/models/pokemon-pagination-item.model';
import { Pokemon } from 'src/app/shared/models/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { capitalizeText } from 'src/app/util';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  @Input() pokemonId: number
  @Input() index: number
  pokemons: PokemonPaginationItem[]
  selectedPokemon: PokemonPaginationItem
  pokemon: Pokemon

  constructor(private pokemonService: PokemonService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pokemonService.getPokemonPagination()
      .subscribe(
        (pokemons: any) => {
          this.pokemons = pokemons.results
        }
      )
    this.pokemonService.getPokemon(this.pokemonId)
      .subscribe(
        (pokemon: Pokemon) => {
          this.pokemon = pokemon
          this.resetPokemonSelected(pokemon.name)
        }
      )
  }

  onChange(event) {
    const currentParams = { ...this.route.snapshot.params }

    if (this.index === 0) {
      currentParams['id1'] = this.getIdFromURL(event.value.url)
    } else {
      currentParams['id2'] = this.getIdFromURL(event.value.url)
    }

    this.router.navigate(['/compare', currentParams.id1, currentParams.id2])
    this.resetPokemonSelected(this.pokemon.name)
  }

  resetPokemonSelected(name: string) {
    this.selectedPokemon = { name: name, url: `https://pokeapi.co/api/v2/pokemon/${this.pokemonId}/` }
  }

  getIdFromURL(value: string) {
    let id = value.split('/')
    return id[id.length - 2]
  }

  getCapitalizedName(name: string) {
    return capitalizeText(name)
  }
}
