import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent implements OnInit, OnDestroy {
  previewPokemonIndices: number[]
  previewIndicesSubscription: Subscription

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.previewIndicesSubscription = this.pokemonService.getPreviewPokemonIdexes()
      .subscribe(
        (pokemonIndexes: number[]) => this.previewPokemonIndices = pokemonIndexes
      )
  }

  ngOnDestroy(): void {
    this.previewIndicesSubscription.unsubscribe()
  }
}