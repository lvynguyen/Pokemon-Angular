import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedPokemon, PokemonDetail, SimplifiedPokemon } from '../models/pokemon';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly apiURl = environment.apiRoot + '/pokemon';

  constructor(private httpService: HttpService) { }

  getPokemons(limit = 20, offset = 0): Observable<PaginatedPokemon> {
    return this.httpService.get<PaginatedPokemon>(this.apiURl, {
        params: { limit, offset }
      })
      .pipe(
        map((paginatedPokemon: PaginatedPokemon) => {
          return {
            ...paginatedPokemon,
            results: paginatedPokemon.results.map(pokemon => ({
              ...pokemon,
              id: pokemon.url
                .split('/')
                .filter(Boolean)
                .pop()
            }))
          };
        })
      );
  }

  getPokemonDetail(id: string): Observable<SimplifiedPokemon> {
    return this.httpService.get<PokemonDetail>(`${this.apiURl}/${id}`)
      .pipe(
        map((pokemon: PokemonDetail) => this.getSimplifiedPokemon(pokemon))
      );
  }

  private getSimplifiedPokemon(pokemon: PokemonDetail | null): SimplifiedPokemon {
    return {
      id: pokemon?.id,
      name: pokemon?.name || '',
      ability: pokemon?.abilities?.find((ability) => !ability.is_hidden)?.ability?.name || '',
      hiddenAbility: pokemon?.abilities?.find((ability) => ability.is_hidden)?.ability?.name || '',
      image: pokemon?.sprites?.other?.['official-artwork']?.front_default || '',
      stats: pokemon?.stats || [],
      type: pokemon?.types[0].type?.name || '',
    };
  }
  
}
