import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements OnInit {
  previewPokemonIndices: number[]

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPreviewPokemonIdexes()
      .subscribe(
        (pokemonIndexes: number[]) => this.previewPokemonIndices = pokemonIndexes
      )
  }
}
