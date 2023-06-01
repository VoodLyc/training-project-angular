import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { UserDetailsComponent } from './side-menu/user-details/user-details.component';
import { NavbarItemComponent } from './side-menu/navbar-item/navbar-item.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SideListComponent } from './side-list/side-list.component';
import { CardComponent } from './shared/components/card/card.component';
import { HeaderDetailsComponent } from './main-content/header-details/header-details.component';
import { PreviewCardComponent } from './side-list/preview-card/preview-card.component';
import { PokemonService } from './shared/services/pokemon.service';
import { InformationCardsComponent } from './main-content/information-cards/information-cards.component';
import { ComparePokemonComponent } from './compare-pokemon/compare-pokemon.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { SideMenuService } from './shared/services/side-menu.service';
import { CompareComponent } from './compare-pokemon/compare/compare.component';
import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    UserDetailsComponent,
    NavbarItemComponent,
    MainContentComponent,
    SideListComponent,
    CardComponent,
    HeaderDetailsComponent,
    PreviewCardComponent,
    InformationCardsComponent,
    ComparePokemonComponent,
    ErrorPageComponent,
    CompareComponent,
    CreatePokemonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule
  ],
  providers: [PokemonService, SideMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
