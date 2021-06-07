import * as PokemonActions from "./pokemon.actions"
import { PokemonState } from "./pokemon.state"

const innitialState: PokemonState = {
    items : [],
    currentItem : null,
    isLoading : false,
    error : '',
    sort : null
}

export const pokemonFeatureKey = 'feature_pokemon';

export function pokemonReducer(state: PokemonState = innitialState, action: PokemonActions.PokemonActions) {
    switch (action.type) {
        case PokemonActions.PokemonActionsType.GET_ALL_REQUEST:
            return { ...state, isLoading: true };
        case PokemonActions.PokemonActionsType.GET_ALL_SUCCESS:
            return { ...state, isLoading: false, items: action.items };
        case PokemonActions.PokemonActionsType.GET_ALL_FAILURE:
            return { ...state, isLoading: false, error: action.error };
        case PokemonActions.PokemonActionsType.GET_DETAIL_REQUEST:
            return { ...state, isLoading: true };
        case PokemonActions.PokemonActionsType.GET_DETAIL_SUCCESS:
            return { ...state, isLoading: false, currentItem: action.item };
        case PokemonActions.PokemonActionsType.GET_DETAIL_FAILURE:
            return { ...state, isLoading: false, error: action.error };
        default:
            return {...state};
    }
}