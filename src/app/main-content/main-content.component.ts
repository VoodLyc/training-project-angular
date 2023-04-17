import { Component, EventEmitter, Output, Input } from '@angular/core';
import { capitalizeText } from '../util';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  @Output() sideMenuCollapsed = new EventEmitter()
  flipArrow: boolean
  @Input() pokemon
  
  collapseSideMenu() {
    this.sideMenuCollapsed.emit()
    this.flipArrow = !this.flipArrow
  }

  formatPokemonName() {
    if(this.pokemon) {
      return capitalizeText(this.pokemon.name) + ' ' + capitalizeText(this.pokemon.types[0].type.name)
    }
  }

  getPokemonFrontImage() {
    if(this.pokemon) {
      return this.pokemon.sprites.front_default
    }
  }

  getPokemonBackImage() {
    if(this.pokemon) {
      return this.pokemon.sprites.back_default
    }
  }
}
