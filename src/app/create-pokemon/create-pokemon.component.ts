import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';
import { PokemonPaginationItem } from '../shared/models/pokemon-pagination-item.model';
import { capitalizeText } from '../util';

@Component({
  selector: 'app-create-pokemon',
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.css']
})
export class CreatePokemonComponent implements OnInit {
  types: string[]
  abilities: PokemonPaginationItem[]
  selectedType = 'Normal'
  selectedAbility: PokemonPaginationItem

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.types = this.pokemonService.getTypes()
    this.pokemonService.getPokemonAbilities().subscribe(
      (abilities: any) => {
        this.abilities = abilities.results
      }
    )
  }

  onChangeAbility(event) {
    console.log(event)
  }

  getCapitalizedName(text: string) {
    return capitalizeText(text)
  }
}
