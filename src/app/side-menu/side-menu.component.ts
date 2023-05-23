import { Component, OnInit } from '@angular/core';
import { SideMenuService } from '../shared/services/side-menu.service';
import { NavbarItem } from './navbar-item/navbar-item.model';
import { PokemonService } from '../shared/services/pokemon.service';
import { Pokemon } from '../shared/models/pokemon.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})

export class SideMenuComponent implements OnInit {
  readonly MENU_NAME = 'Coopang' // The name of the app in the side menu
  isCollapsed: boolean
  navbarItems: NavbarItem[]
  pokemon: Pokemon

  constructor(private sideMenuService: SideMenuService, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.sideMenuService.getIsCollapsed().subscribe(
      (isCollapsed: boolean) => {
        this.isCollapsed = isCollapsed
      }
    )
    this.pokemonService.getSelectedPokemon().subscribe(
      (pokemon: Pokemon) => {
        this.pokemon = pokemon
        if (this.pokemon) {
          this.navbarItems = this.sideMenuService.getNavbarItems()
          this.navbarItems[0].setUrl(['/pokemon', this.pokemon.id])
          this.navbarItems[1].setUrl(['/compare', this.pokemon.id, this.pokemon.id])
        }
      }
    )
  }

  isSelected(item: NavbarItem) {
    return this.sideMenuService.isSelected(item)
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed
  }
}
