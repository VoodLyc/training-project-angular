import { Component, OnInit, OnDestroy } from '@angular/core';
import { SideMenuService } from '../shared/services/side-menu.service';
import { NavbarItem } from './navbar-item/navbar-item.model';
import { PokemonService } from '../shared/services/pokemon.service';
import { Pokemon } from '../shared/models/pokemon.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})

export class SideMenuComponent implements OnInit, OnDestroy {
  readonly MENU_NAME = 'Coopang' // The name of the app in the side menu
  isCollapsed: boolean
  isCollapsedSubscription: Subscription
  navbarItems: NavbarItem[]
  pokemon: Pokemon
  pokemonSubscription: Subscription

  constructor(private sideMenuService: SideMenuService, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.navbarItems = this.sideMenuService.getNavbarItems()
    this.isCollapsedSubscription = this.sideMenuService.getIsCollapsed().subscribe(
      (isCollapsed: boolean) => {
        this.isCollapsed = isCollapsed
      }
    )
    this.pokemonSubscription = this.pokemonService.getSelectedPokemon().subscribe(
      (pokemon: Pokemon) => {
        this.pokemon = pokemon
        if (this.pokemon) {
          this.navbarItems[0].setUrl(['view', this.pokemon.id])
          this.navbarItems[1].setUrl(['compare', this.pokemon.id, this.pokemon.id])
        }
      }
    )
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed
  }

  ngOnDestroy(): void {
    this.isCollapsedSubscription.unsubscribe()
    this.pokemonSubscription.unsubscribe()
  }
}
