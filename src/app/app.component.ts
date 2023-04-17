import { Component, ViewChild, OnInit } from '@angular/core';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { getPokemon } from './pokemonService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Coopang';
  @ViewChild(SideMenuComponent, { static: true }) child: SideMenuComponent
  pokemon = []

  ngOnInit() {
    this.fetchPokemon(22)
  }

  fetchPokemon(pokemonId) {
    getPokemon(pokemonId)
      .then((pokemonData) => {
        this.pokemon = pokemonData
        console.log(this.pokemon)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  collapseSideMenu() {
    this.child.collapse()
  }
}
