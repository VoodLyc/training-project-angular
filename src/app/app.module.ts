import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { UserDetailsComponent } from './side-menu/user-details/user-details.component';
import { NavbarItemComponent } from './side-menu/navbar-item/navbar-item.component';
import { SideListComponent } from './side-list/side-list.component';
import { CardComponent } from './shared/components/card/card.component';
import { HeaderDetailsComponent } from './view-pokemon/header-details/header-details.component';
import { PreviewCardComponent } from './side-list/preview-card/preview-card.component';
import { PokemonService } from './shared/services/pokemon.service';
import { InformationCardsComponent } from './view-pokemon/information-cards/information-cards.component';
import { ComparePokemonComponent } from './compare-pokemon/compare-pokemon.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AppRoutingModule } from './app-routing.module';
import { SideMenuService } from './shared/services/side-menu.service';
import { CompareComponent } from './compare-pokemon/compare/compare.component';
import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';
import { TitlePipe } from './shared/pipes/title.pipe';
import { TypeDirective } from './shared/directives/type.directive';
import { PrintValidationErrorComponent } from './shared/components/print-validation-error/print-validation-error.component';
import { BoldPipe } from './shared/pipes/bold.pipe';
import { AuthComponent } from './auth/auth.component';
import { ViewPokemonComponent } from './view-pokemon/view-pokemon.component';
import { PokemonComponent } from './pokemon/pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    UserDetailsComponent,
    NavbarItemComponent,
    SideListComponent,
    CardComponent,
    HeaderDetailsComponent,
    PreviewCardComponent,
    InformationCardsComponent,
    ComparePokemonComponent,
    ErrorPageComponent,
    CompareComponent,
    CreatePokemonComponent,
    TitlePipe,
    TypeDirective,
    PrintValidationErrorComponent,
    BoldPipe,
    AuthComponent,
    ViewPokemonComponent,
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule,
    ReactiveFormsModule,
    MultiSelectModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      maxOpened: 3,
      autoDismiss: true
    })
  ],
  providers: [PokemonService, SideMenuService],
  bootstrap: [AppComponent]
})
export class AppModule { }
