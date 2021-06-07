import { createFeatureSelector, createSelector } from "@ngrx/store";
import { pokemonFeatureKey } from "./pokemon.reducer";
import { PokemonState } from "./pokemon.state";

const getPokemonState = createFeatureSelector<PokemonState>(pokemonFeatureKey);

export const pokemonsSelector = createSelector(
    getPokemonState,
    state => state.items
)

export const isLoadingSelector = createSelector(
    getPokemonState,
    state => state.isLoading
);

