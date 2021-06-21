import { state } from "@angular/animations";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as pokemonsReducer from "./pokemon.reducer";
import { PokemonState } from "./pokemon.state";

export const getPokemonState = createFeatureSelector<PokemonState>(pokemonsReducer.pokemonFeatureKey);

export const pokemonsSelector = createSelector(
    getPokemonState,
    pokemonsReducer.selectAll
);

export const isLoadingSelector = createSelector(
    getPokemonState,
    state => state.isLoading
);

export const paginationInfoSelector = createSelector(
    getPokemonState,
    state => state.paginationInfo
)

