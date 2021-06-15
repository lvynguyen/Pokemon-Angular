import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { forkJoin, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Pokemon } from "../../models/pokemon";
import { PokemonService } from "../../services/pokemon.service";
import * as PokemonActions from "./pokemon.actions";

@Injectable()
export class PokemonEffects {
    pokemons$ = createEffect(() => this.actions$.pipe(
        ofType(PokemonActions.getPokemons),
        tap((action: any) => action),
        switchMap(action => this.pokemonService.getPokemons(action.limit, 0)),
        switchMap(paginatedPokemons => 
             forkJoin(paginatedPokemons.results.map(paginatedPokemon => this.pokemonService.getPokemonDetail(paginatedPokemon.id)))
                .pipe(map(pokemonDetails => {
                    return paginatedPokemons.results.map((pokemon: Pokemon, index) => {
                        let additionalDetails = pokemonDetails[index];
                        return {
                            ...additionalDetails,
                            ...pokemon
                        }
                    });
                }))
        ),
        map(entities => PokemonActions.getPokemonsSuccess({ entities })),
        catchError(error => of(PokemonActions.getPokemonsFailure({ error })))
    )
    );

    constructor(
        private actions$: Actions,
        private pokemonService: PokemonService
    ) { }
}