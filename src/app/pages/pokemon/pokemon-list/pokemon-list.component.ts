import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { auditTime, map, switchMap } from 'rxjs/operators';
import { PaginatorState } from 'src/app/core/models/pagination';
import { PaginatedPokemon, Pokemon } from 'src/app/core/models/pokemon';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { getPokemons } from 'src/app/core/store/pokemon/pokemon.actions';
import { isLoadingSelector, pokemonsSelector } from 'src/app/core/store/pokemon/pokemon.selector';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  providers: [PokemonService]
})
export class PokemonListComponent implements OnInit, OnDestroy {

  pageSizes = [10, 20, 50, 100];
  paginatorState = {
    page: 1,
    pageCount: 0,
    rows: 20,
  } as PaginatorState;
  query = new FormControl('');
  paginatedPokemons: PaginatedPokemon;
  pokemons$: Pokemon[] = [];
  query$: Subscription;
  pokemonsList$: Observable<any>;
  isLoading$: Observable<any>;

  constructor(
    private pokemonService: PokemonService,
    private store: Store
  ) { }

  ngOnInit(): void {
    // this.query$ = this.query.valueChanges.pipe(
    //   auditTime(500),
    //   map(searchTerm => searchTerm.toLowerCase()),
    // ).subscribe(lowerCaseSearchTerm => {
    //   const searchResults = this.paginatedPokemons.results.filter(pokemon => 
    //     pokemon.name.toLowerCase().includes(lowerCaseSearchTerm)
    //   );
    //   this.pokemons$ = searchResults;
    // });

    const { rows: limit, page } = this.paginatorState;
    this.store.dispatch(getPokemons({limit, page}));

    this.pokemonsList$ = this.store.select(pokemonsSelector);

    this.isLoading$ = this.store.select(isLoadingSelector);


    // this.loadPokemons();
  }

  ngOnDestroy() {
    if (this.query$) {
      this.query$.unsubscribe();
    }
  }

  onPageChanged(paginatorState: PaginatorState) {
    this.paginatorState = paginatorState;
    this.loadPokemons();
  }

  loadPokemons() {
    const { rows: limit, page } = this.paginatorState;
    this.query.setValue('', { emitEvent: false });
    // this.displayPokemons = [];
    this.pokemonService.getPokemons(limit, page).pipe(switchMap((res: PaginatedPokemon) => {
      this.paginatedPokemons = res;
      return forkJoin(res.results.map((pokemon: Pokemon) => this.pokemonService.getPokemonDetail(pokemon.id)));
    })).subscribe((listPokemonsDetails) => {
      this.paginatedPokemons.results = this.paginatedPokemons.results.map((pokemon: Pokemon, index) => {
        let additionalDetails = listPokemonsDetails[index];
        return {
          ...additionalDetails,
          ...pokemon
        }
      });
      // this.displayPokemons = this.paginatedPokemons.results;
    });
  }

}
