import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-list',
  templateUrl: './side-list.component.html',
  styleUrls: ['./side-list.component.css']
})
export class SideListComponent {
  @Input() pokemon
  @Input() previewPokemonIndices: Number[]
  @Output() previewPokemon = new EventEmitter<{ index: number }>()

  onClickPreviewPokemon(index) {
    this.previewPokemon.emit({ index: index })
  }
}
