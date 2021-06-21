import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";
import { Pokemon } from "../../models/pokemon";
import * as PokemonActions from "./pokemon.actions"
import { PokemonState } from "./pokemon.state"

export const adapter: EntityAdapter<Pokemon> = createEntityAdapter<Pokemon>({
    selectId: selectPokemonId,
    sortComparer: sortByName,
});

export function selectPokemonId(a: Pokemon): string {
    //In this case this would be optional since primary key is id
    return a.id;
}

export function sortByName(a: Pokemon, b: Pokemon): number {
    return a.name.localeCompare(b.name);
}

const innitialState = adapter.getInitialState({
    currentItem: null,
    isLoading: false,
    error: '',
    selectedPokemonId: null,
    paginationInfo: null
})

export const pokemonFeatureKey = 'feature_pokemon';

export function pokemonReducer(state = innitialState, action: PokemonActions.PokemonActions) {
    switch (action.type) {
        case PokemonActions.PokemonActionsType.GET_ALL_REQUEST:
            return { ...state, isLoading: true };
        case PokemonActions.PokemonActionsType.GET_ALL_SUCCESS:
            return adapter.setAll(action.entities, { ...state, isLoading: false });
        case PokemonActions.PokemonActionsType.GET_ALL_FAILURE:
            return { ...state, isLoading: false, error: action.error };
        case PokemonActions.PokemonActionsType.GET_DETAIL_REQUEST:
            return { ...state, isLoading: true };
        case PokemonActions.PokemonActionsType.GET_DETAIL_SUCCESS:
            return { ...state, isLoading: false, currentItem: action.item };
        case PokemonActions.PokemonActionsType.GET_DETAIL_FAILURE:
            return { ...state, isLoading: false, error: action.error };
        case PokemonActions.PokemonActionsType.GET_PAGINATION_INFO:
            return { ...state, isLoading: true, paginationInfo: action.paginationInfo }
        default:
            return { ...state };
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();

export const selectAllPokemons = selectAll;