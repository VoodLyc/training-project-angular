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
import { CardComponent } from './main-content/card/card.component';
import { HeaderDetailsComponent } from './main-content/header-details/header-details.component';

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
    HeaderDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
