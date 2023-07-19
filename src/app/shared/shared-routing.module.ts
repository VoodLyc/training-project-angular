import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErrorPageComponent } from "../error-page/error-page.component";

const sharedRoutes: Routes = [
    { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } }
]

@NgModule({
    imports: [RouterModule.forChild(sharedRoutes)],
    exports: [RouterModule]
})

export class ShaerdRoutingModule {}