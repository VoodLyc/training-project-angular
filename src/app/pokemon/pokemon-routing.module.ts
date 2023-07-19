import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokemonComponent } from "./pokemon.component";
import { IsAuthGuard } from "../auth/auth.guard";
import { ComparePokemonComponent } from "./compare-pokemon/compare-pokemon.component";
import { CreatePokemonComponent } from "./create-pokemon/create-pokemon/create-pokemon.component";
import { ViewPokemonComponent } from "./view-pokemon/view-pokemon.component";

const pokemonRoutes: Routes = [
    { path: '', component: PokemonComponent, canActivate: [IsAuthGuard], children: [
        { path: 'view/:id', component: ViewPokemonComponent },
        { path: 'compare/:id1/:id2', component: ComparePokemonComponent },
        { path: 'create', component: CreatePokemonComponent }
    ] },
    { path: '**', redirectTo: '/not-found' }
]

@NgModule({
    imports: [RouterModule.forChild(pokemonRoutes)],
    exports: [RouterModule]
})
export class PokemonRoutingModule {}