import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { PokemonModule } from "../pages/pokemon/pokemon.module";
import { PokemonEffects } from "./store/pokemon/pokemon.effects";
import { pokemonFeatureKey, pokemonReducer } from "./store/pokemon/pokemon.reducer";

@NgModule({
    imports:[
        StoreModule.forFeature(pokemonFeatureKey, pokemonReducer),
        EffectsModule.forFeature([PokemonEffects]),
        PokemonModule
    ],
    declarations:[]
})

export class CoreModule {}