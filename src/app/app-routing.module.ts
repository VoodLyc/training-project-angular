import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'pokemon/view/25', pathMatch: 'full' },
    { path: 'auth', component: AuthComponent },
    { path: 'pokemon', loadChildren: () => import('./pokemon/pokemon.module').then(module => module.PokemonModule) }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}