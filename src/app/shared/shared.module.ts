import { NgModule } from "@angular/core";

import { CardComponent } from "./components/card/card.component";
import { PrintValidationErrorComponent } from "./components/print-validation-error/print-validation-error.component";
import { SideListComponent } from "./components/side-list/side-list.component";
import { PreviewCardComponent } from "./components/side-list/preview-card/preview-card.component";
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { TypeDirective } from "./directives/type.directive";
import { BoldPipe } from "./pipes/bold.pipe";
import { TitlePipe } from "./pipes/title.pipe";
import { NavbarItemComponent } from "./components/side-menu/navbar-item/navbar-item.component";
import { UserDetailsComponent } from "./components/side-menu/user-details/user-details.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        CardComponent,
        PrintValidationErrorComponent,
        SideListComponent,
        PreviewCardComponent,
        SideMenuComponent,
        NavbarItemComponent,
        UserDetailsComponent,
        TypeDirective,
        BoldPipe,
        TitlePipe
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        CardComponent,
        PrintValidationErrorComponent,
        SideListComponent,
        PreviewCardComponent,
        SideMenuComponent,
        NavbarItemComponent,
        UserDetailsComponent,
        TypeDirective,
        BoldPipe,
        TitlePipe,
        CommonModule
    ]
})
export class SharedModule { }