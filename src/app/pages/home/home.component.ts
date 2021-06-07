import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon';
import { AppState } from 'src/app/core/store/app.state';
import { getPokemons } from 'src/app/core/store/pokemon/pokemon.actions';
import { pokemonsSelector } from 'src/app/core/store/pokemon/pokemon.selector';
import { PokemonState } from 'src/app/core/store/pokemon/pokemon.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit {
  private readonly pokemonHomeLimit = 10;
  pokemonsList$: Observable<any>;

  constructor(
    private store: Store<PokemonState>
  ) { }

  ngOnInit(): void {
    //dispatch action
    this.store.dispatch(getPokemons());

    this.pokemonsList$ = this.store.select(
      pokemonsSelector
    )
  }

  // loadPokemons() {
  //   this.pokemonService.getPokemons(this.pokemonHomeLimit).pipe(
  //     switchMap((res: PaginatedPokemon) => {
  //     this.pokemonsList = res.results;
  //     return forkJoin(res.results.map((pokemon: Pokemon) => this.pokemonService.getPokemonDetail(pokemon.id)));
  //   })).subscribe((listPokemonsDetails) => {
  //     this.pokemonsList = this.pokemonsList.map((pokemon: Pokemon, index) => {
  //       let additionalDetails = listPokemonsDetails[index];
  //       return {
  //         ...additionalDetails,
  //         ...pokemon
  //       }
  //     });
  //   });
  // }
}
