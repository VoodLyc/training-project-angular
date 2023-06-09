import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ComparePokemonComponent } from './compare-pokemon/compare-pokemon.component';
import { CreatePokemonComponent } from './create-pokemon/create-pokemon.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'pokemon/25', pathMatch: 'full' },
    { path: 'pokemon/:id', component: MainContentComponent },
    { path: 'compare/:id1/:id2', component: ComparePokemonComponent },
    { path: 'create', component: CreatePokemonComponent },
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