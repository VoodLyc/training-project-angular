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
    return capitalizeText(this.pokemon.name)
  }

  formatPokemonType() {
    return this.pokemon.types[0].type.name.toUpperCase()
  }

  formatPokemonAbility() {
    return capitalizeText(this.pokemon.abilities[0].ability.name)
  }

  formatReviews() {
    return this.pokemon.base_experience + ' Reviews'
  }
}
