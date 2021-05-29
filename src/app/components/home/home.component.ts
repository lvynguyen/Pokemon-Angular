import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PaginatedPokemon, Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit {
  private readonly pokemonHomeLimit = 8;
  pokemonsList: Pokemon[];

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.loadPokemons();
  }
  
  loadPokemons() {
    this.pokemonService.getPokemons(this.pokemonHomeLimit).pipe(switchMap((res: PaginatedPokemon) => {
      this.pokemonsList = res.results;
      return forkJoin(res.results.map((pokemon: Pokemon) => this.pokemonService.getPokemonDetail(pokemon.id)));
    })).subscribe((listPokemonsDetails) => {
      this.pokemonsList = this.pokemonsList.map((pokemon: Pokemon, index) => {
        let additionalDetails = listPokemonsDetails[index];
        return {
          ...additionalDetails,
          ...pokemon
        }
      });
    });
  }

  slideRangeChange(event) {
    console.log(event);
  }

}
