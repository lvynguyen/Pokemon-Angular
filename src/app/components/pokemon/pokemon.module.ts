import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaginatorModule } from "../paginator/paginator.module";
import { PokemonDetailComponent } from "./pokemon-detail/pokemon-detail.component";
import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";
import { PokemonRoutingModule } from "./pokemon.routing.module";

@NgModule({
    declarations: [
        PokemonListComponent,
        PokemonDetailComponent
    ],
    imports: [
        CommonModule,
        PokemonRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        PaginatorModule
    ]
})

export class PokemonModule { }