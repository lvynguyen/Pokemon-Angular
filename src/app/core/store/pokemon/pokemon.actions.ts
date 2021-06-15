import { ActionType, createAction, props } from "@ngrx/store";
import { PaginatedPokemon, Pokemon } from "../../models/pokemon";

export enum PokemonActionsType {
    GET_ALL_REQUEST = '@Pokemon/GetAll',
    GET_ALL_SUCCESS = '@Pokemon/GetAllSuccess',
    GET_ALL_FAILURE = '@Pokemon/GetAllFailure',
    GET_DETAIL_REQUEST = '@Pokemon/GetDetail',
    GET_DETAIL_SUCCESS = '@Pokemon/GetDetailSuccess',
    GET_DETAIL_FAILURE = '@Pokemon/GetDetailFailure',
    SORT_BY_NAME = '@Pokemon/SortByName'
};

export const getPokemons = createAction(PokemonActionsType.GET_ALL_REQUEST, props<{ limit: number, page?: number }>());
export const getPokemonsSuccess = createAction(PokemonActionsType.GET_ALL_SUCCESS, props<{ entities: any }>());
export const getPokemonsFailure = createAction(PokemonActionsType.GET_ALL_FAILURE, props<{ error?: string }>());
export const getPokemonDetail = createAction(PokemonActionsType.GET_DETAIL_REQUEST, props<{ id: number }>());
export const getPokemonDetailSuccess = createAction(PokemonActionsType.GET_DETAIL_SUCCESS, props<{ item: Pokemon }>());
export const getPokemonDetailFailure = createAction(PokemonActionsType.GET_DETAIL_FAILURE, props<{ error?: string }>());

// export class getPokemonsAction implements Action {
//   readonly type = PokemonActionsType.GET_ALL_REQUEST;
//   constructor(public payload: number) {} // fake payload
// }

export type PokemonActions =
    | ActionType<typeof getPokemons>
    | ActionType<typeof getPokemonsSuccess>
    | ActionType<typeof getPokemonsFailure>
    | ActionType<typeof getPokemonDetail>
    | ActionType<typeof getPokemonDetailSuccess>
    | ActionType<typeof getPokemonDetailFailure>
