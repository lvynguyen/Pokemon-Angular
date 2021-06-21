import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { forkJoin, of } from "rxjs";
import { auditTime, catchError, map, switchMap, tap } from "rxjs/operators";
import { Pokemon } from "../../models/pokemon";
import { PokemonService } from "../../services/pokemon.service";
import * as PokemonActions from "./pokemon.actions";

@Injectable()
export class PokemonEffects {
    pokemons$ = createEffect(() => this.actions$.pipe(
        ofType(PokemonActions.getPokemons),
        tap((action: any) => action),
        switchMap(action => this.pokemonService.getPokemons(action.limit, action.page).pipe(
            tap(paginatedPokemons => {
                let paginationInfo = { ...paginatedPokemons };
                delete (paginationInfo.results);
                this.store.dispatch(PokemonActions.getPaginationInfo({ paginationInfo }));
                return paginatedPokemons
            }))),
        switchMap(paginatedPokemons => {
            return forkJoin(paginatedPokemons.results.map(paginatedPokemon => this.pokemonService.getPokemonDetail(paginatedPokemon.id)))
                .pipe(map(pokemonDetails => {
                    return paginatedPokemons.results.map((pokemon: Pokemon, index) => {
                        let additionalDetails = pokemonDetails[index];
                        return {
                            ...additionalDetails,
                            ...pokemon
                        }
                    });
                }))
        }
        ),
        auditTime(500),
        map(entities => PokemonActions.getPokemonsSuccess({ entities })),
        catchError(error => of(PokemonActions.getPokemonsFailure({ error })))
    )
    );

    constructor(
        private actions$: Actions,
        private pokemonService: PokemonService,
        private store: Store
    ) { }
}