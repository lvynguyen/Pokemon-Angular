import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
    },
    {
      path: 'pokemons',
      loadChildren: () => import('./components/pokemon/pokemon.module').then(m => m.PokemonModule)
    },
    {
      path: '**',
      redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }