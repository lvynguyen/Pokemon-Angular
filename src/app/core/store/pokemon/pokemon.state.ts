import { PaginatedPokemon, Pokemon } from "../../models/pokemon";

export interface PokemonState {
    items: [];
    currentItem: Pokemon;
    isLoading: boolean;
    error?: string;
    sort: 'asc' | 'desc' | null;
}