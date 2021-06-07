import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';
import { auditTime, map, switchMap } from 'rxjs/operators';
import { PaginatorState } from 'src/app/core/models/pagination';
import { PaginatedPokemon, Pokemon } from 'src/app/core/models/pokemon';
import { PokemonService } from 'src/app/core/services/pokemon.service';

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
  displayPokemons: Pokemon[] = [];
  query$: Subscription;

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.query$ = this.query.valueChanges.pipe(
      auditTime(500),
      map(searchTerm => searchTerm.toLowerCase()),
    ).subscribe(lowerCaseSearchTerm => {
      const searchResults = this.paginatedPokemons.results.filter(pokemon => 
        pokemon.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      this.displayPokemons = searchResults;
    });
    this.loadPokemons();
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
    this.query.setValue('', {emitEvent: false});
    this.displayPokemons = [];
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
      this.displayPokemons = this.paginatedPokemons.results;
    });
  }

}
