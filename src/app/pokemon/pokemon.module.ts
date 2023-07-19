import { NgModule } from "@angular/core";

import { ComparePokemonComponent } from "./compare-pokemon/compare-pokemon.component";
import { CompareComponent } from "./compare-pokemon/compare/compare.component";
import { CreatePokemonComponent } from "./create-pokemon/create-pokemon/create-pokemon.component";
import { ViewPokemonComponent } from "./view-pokemon/view-pokemon.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { HeaderDetailsComponent } from "./view-pokemon/header-details/header-details.component";
import { InformationCardsComponent } from "./view-pokemon/information-cards/information-cards.component";
import { PokemonComponent } from "./pokemon.component";
import { PokemonRoutingModule } from "./pokemon-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";

@NgModule({
    declarations: [
        PokemonComponent,
        ComparePokemonComponent,
        CompareComponent,
        CreatePokemonComponent,
        ViewPokemonComponent,
        HeaderDetailsComponent,
        InformationCardsComponent,
    ],
    imports: [
        RouterModule, 
        SharedModule,
        PokemonRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        DropdownModule,
        MultiSelectModule,
    ],
    exports: [
        PokemonComponent,
        ComparePokemonComponent,
        CompareComponent,
        CreatePokemonComponent,
        ViewPokemonComponent,
        HeaderDetailsComponent,
        InformationCardsComponent,
    ]
})
export class PokemonModule {}