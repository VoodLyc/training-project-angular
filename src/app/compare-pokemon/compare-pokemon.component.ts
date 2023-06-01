import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from '../shared/services/pokemon.service';
import { PokemonPaginationItem } from '../shared/models/pokemon-pagination-item.model';

@Component({
  selector: 'app-compare-pokemon',
  templateUrl: './compare-pokemon.component.html',
  styleUrls: ['./compare-pokemon.component.css']
})
export class ComparePokemonComponent implements OnInit {
  pokemonIds: string[]
  pokemons: PokemonPaginationItem[]

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pokemonService.getPokemonPagination()
      .subscribe(
        (pokemons: any) => {
          this.pokemons = pokemons.results
        }
      )
    this.route.paramMap
      .subscribe(
        (params: Params) => {
          this.pokemonIds = [params.get('id1'), params.get('id2')]
        }
      )
  }
}
