import { EntityState } from "@ngrx/entity";
import { PaginatedPokemon, Pokemon } from "../../models/pokemon";

export interface PokemonState extends EntityState<Pokemon> {
    currentItem: Pokemon;
    isLoading: boolean;
    error?: string;
    sort: 'asc' | 'desc' | null;
    selectedUserId: number | null;
}