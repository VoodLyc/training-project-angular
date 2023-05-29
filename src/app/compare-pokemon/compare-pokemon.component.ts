import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from '../shared/services/pokemon.service';

@Component({
  selector: 'app-compare-pokemon',
  templateUrl: './compare-pokemon.component.html',
  styleUrls: ['./compare-pokemon.component.css']
})
export class ComparePokemonComponent implements OnInit, OnDestroy {
  pokemonIds: string[]

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pokemonService.fetchPokemonPagination()
    this.route.paramMap
      .subscribe(
        (params: Params) => {
          this.pokemonIds = [params.get('id1'), params.get('id2')]
        }
      )
  }

  ngOnDestroy(): void {
    console.log('Destoy')
  }
}
