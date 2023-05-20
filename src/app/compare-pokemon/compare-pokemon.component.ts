import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokemonService } from '../shared/services/pokemon.service';

@Component({
  selector: 'app-compare-pokemon',
  templateUrl: './compare-pokemon.component.html',
  styleUrls: ['./compare-pokemon.component.css']
})
export class ComparePokemonComponent implements OnInit {
  pokemonIds: string[]

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.pokemonService.fetchPokemonPagination()
    this.route.params
      .subscribe(
        (params: Params) => {
          this.pokemonIds = [params['id1'], params['id2']]
        }
      )
  }
}
