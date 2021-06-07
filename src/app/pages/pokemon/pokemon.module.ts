import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { PaginatorModule } from "../../components/paginator/paginator.module";
import { PokemonDetailComponent } from "./pokemon-detail/pokemon-detail.component";
import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";

const routes: Routes = [
    {
        path: '',
        component: PokemonListComponent
    },
    {
        path: 'detail/:id',
        component: PokemonDetailComponent
    }
];

@NgModule({
    declarations: [
        PokemonListComponent,
        PokemonDetailComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        PaginatorModule
    ]
})

export class PokemonModule { }