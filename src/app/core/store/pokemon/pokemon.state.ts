import { EntityState } from "@ngrx/entity";
import { PaginatedPokemon, Pokemon } from "../../models/pokemon";

export interface PokemonState extends EntityState<Pokemon> {
    currentItem: Pokemon;
    isLoading: boolean;
    error?: string;
    selectedUserId: number | null;
    paginationInfo: PaginatedPokemon;
}