import { Component, OnInit } from '@angular/core';
import { ComparePokemonService } from '../shared/services/compare-pokemon.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-compare-pokemon',
  templateUrl: './compare-pokemon.component.html',
  styleUrls: ['./compare-pokemon.component.css'],
  providers: [ComparePokemonService]
})
export class ComparePokemonComponent implements OnInit {
  pokemonIds: string[]

  constructor(private comparePokemonService: ComparePokemonService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.comparePokemonService.fetchPokemonPagination()
    this.route.params
      .subscribe(
        (params: Params) => {
          this.pokemonIds = [params['id1'], params['id2']]
        }
      )
  }

  onPokemonChanged(ids: {oldId: string, newId: string}) {
    this.updateIds(ids)
    this.router.navigate(['/compare', this.pokemonIds[0], this.pokemonIds[1]])
  }

  updateIds(ids: {oldId: string, newId: string}) {
    if(this.pokemonIds[0] === ids.oldId) {
      this.pokemonIds[0] = ids.newId
    }
    else if(this.pokemonIds[1] === ids.oldId) {
      this.pokemonIds[1] = ids.newId
    }
  }
}
