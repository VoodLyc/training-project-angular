import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { NavbarComponent } from './side-menu/navbar/navbar.component';
import { UserDetailsComponent } from './side-menu/user-details/user-details.component';
import { NavbarItemComponent } from './side-menu/navbar/navbar-item/navbar-item.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SideListComponent } from './side-list/side-list.component';
import { CardComponent } from './shared/components/card/card.component';
import { HeaderDetailsComponent } from './main-content/header-details/header-details.component';
import { PreviewCardComponent } from './side-list/preview-card/preview-card.component';
import { PokemonService } from './shared/services/pokemon.service';
import { InformationCardsComponent } from './main-content/information-cards/information-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    NavbarComponent,
    UserDetailsComponent,
    NavbarItemComponent,
    MainContentComponent,
    SideListComponent,
    CardComponent,
    HeaderDetailsComponent,
    PreviewCardComponent,
    InformationCardsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
