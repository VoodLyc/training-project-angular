import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'pokemon/view/25', pathMatch: 'full' },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(module => module.AuhtModule) },
    { path: 'pokemon', loadChildren: () => import('./pokemon/pokemon.module').then(module => module.PokemonModule) },
    { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
    { path: '**', redirectTo: '/not-found' },

]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}