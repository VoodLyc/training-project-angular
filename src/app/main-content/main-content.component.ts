import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonService } from '../shared/services/pokemon.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  @Output() sideMenuCollapsed = new EventEmitter()
  flipArrow: boolean

  collapseSideMenu() {
    this.sideMenuCollapsed.emit()
    this.flipArrow = !this.flipArrow
  }
}
