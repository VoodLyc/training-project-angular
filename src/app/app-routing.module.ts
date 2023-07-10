import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ComparePokemonComponent } from './compare-pokemon/compare-pokemon.component';
import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { AuthComponent } from './auth/auth.component';
import { ViewPokemonComponent } from './view-pokemon/view-pokemon.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'pokemon', component: PokemonComponent, children: [
        { path: 'view/:id', component: ViewPokemonComponent },
        { path: 'compare/:id1/:id2', component: ComparePokemonComponent },
        { path: 'create', component: CreatePokemonComponent }, 
    ] },
    { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
    { path: '**', redirectTo: '/not-found' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}