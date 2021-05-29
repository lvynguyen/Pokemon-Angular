import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokemonDetailComponent } from "./pokemon-detail/pokemon-detail.component";
import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";

const routes: Routes = [
    {
        path: '',
        component: PokemonListComponent
    },
    {
      path: 'details/:id',
      component: PokemonDetailComponent
    },
    {
      path: '**',
      redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PokemonRoutingModule { }