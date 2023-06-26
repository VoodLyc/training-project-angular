import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from '../shared/services/pokemon.service';
import { PokemonPaginationItem } from '../shared/models/pokemon-pagination-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compare-pokemon',
  templateUrl: './compare-pokemon.component.html',
  styleUrls: ['./compare-pokemon.component.css']
})
export class ComparePokemonComponent implements OnInit, OnDestroy {
  pokemonIds: string[]
  pokemons: PokemonPaginationItem[]
  paginationSubscription: Subscription
  routeSubscription: Subscription

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.paginationSubscription = this.pokemonService.getPokemonPagination()
      .subscribe(
        (pokemons: any) => {
          this.pokemons = pokemons
        }
      )
    this.routeSubscription = this.route.paramMap
      .subscribe(
        (params: Params) => {
          this.pokemonIds = [params.get('id1'), params.get('id2')]
        }
      )
  }

  ngOnDestroy(): void {
    this.paginationSubscription.unsubscribe()
    this.routeSubscription.unsubscribe()
  }
}
