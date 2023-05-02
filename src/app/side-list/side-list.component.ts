import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements OnInit {
  previewPokemonIndices: Number[]

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.previewPokemonIndices = this.pokemonService.getPreviewPokemonIdexes()
  }
}
