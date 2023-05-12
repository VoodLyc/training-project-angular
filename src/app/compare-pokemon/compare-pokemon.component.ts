import { Component, OnInit } from '@angular/core';
import { ComparePokemonService } from '../shared/services/compare-pokemon.service';
import { Pokemon } from '../shared/models/pokemon.model';

@Component({
  selector: 'app-compare-pokemon',
  templateUrl: './compare-pokemon.component.html',
  styleUrls: ['./compare-pokemon.component.css'],
  providers: [ComparePokemonService]
})
export class ComparePokemonComponent implements OnInit {
  pokemons: Pokemon[]

  constructor(private comparePokemonService: ComparePokemonService) { }

  ngOnInit() {
    this.comparePokemonService.fetchPokemonPagination()
    // this.comparePokemonService.getPokemons().subscribe(
    //   (pokemons: Pokemon[]) => {
    //     this.pokemons = pokemons
    //     console.log(pokemons)
    //   }
    // )
  }
}
