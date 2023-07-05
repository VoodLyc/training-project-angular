import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from '../shared/services/pokemon.service';
import { PokemonPaginationItem } from '../shared/models/pokemon-pagination-item.model';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-compare-pokemon',
  templateUrl: './compare-pokemon.component.html',
  styleUrls: ['./compare-pokemon.component.css']
})
export class ComparePokemonComponent implements OnInit, OnDestroy {
  pokemonIds: string[]
  pokemons: PokemonPaginationItem[]
  ngUnsubscribe = new Subject<void>()

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonPagination().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (pokemons: any) => {
        this.pokemons = pokemons
      }
    )
    this.route.paramMap.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(
      (params: Params) => {
        this.pokemonIds = [params.get('id1'), params.get('id2')]
      }
    )
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next()
    this.ngUnsubscribe.complete()
  }
}
