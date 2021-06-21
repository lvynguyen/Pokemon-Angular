import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { auditTime, map, switchMap } from 'rxjs/operators';
import { PaginatorState } from 'src/app/core/models/pagination';
import { PaginatedPokemon, Pokemon } from 'src/app/core/models/pokemon';
import { PokemonService } from 'src/app/core/services/pokemon.service';
import { getPokemons } from 'src/app/core/store/pokemon/pokemon.actions';
import { isLoadingSelector, paginationInfoSelector, pokemonsSelector } from 'src/app/core/store/pokemon/pokemon.selector';

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
  paginatedPokemons$: Observable<PaginatedPokemon>;
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

    this.pokemonsList$ = this.store.select(pokemonsSelector);

    this.isLoading$ = this.store.select(isLoadingSelector);

    this.loadPokemons();

    this.paginatedPokemons$ = this.store.select(paginationInfoSelector)
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
    this.store.dispatch(getPokemons({limit, page}));
  }

}
