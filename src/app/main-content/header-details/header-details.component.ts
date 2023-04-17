import { Component, Input } from '@angular/core';
import { capitalizeText } from 'src/app/util';

@Component({
  selector: 'app-header-details',
  templateUrl: './header-details.component.html',
  styleUrls: ['./header-details.component.css']
})
export class HeaderDetailsComponent {
  @Input() pokemon

  formatPokemonName() {
    if(this.pokemon) {
      return capitalizeText(this.pokemon.name)
    }
  }

  formatPokemonType() {
    if(this.pokemon) {
      return this.pokemon.types[0].type.name.toUpperCase()
    }
  }

  formatPokemonAbility() {
    if(this.pokemon) {
      return capitalizeText(this.pokemon.abilities[0].ability.name)
    }
  }

  formatReviews() {
    if(this.pokemon) {
      return this.pokemon.base_experience + ' Reviews'
    }
  }
}
