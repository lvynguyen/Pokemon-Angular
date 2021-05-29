import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedGenration } from '../models/generation';
import { HttpService } from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class GenerationService {
  private readonly apiUrl = environment.apiRoot;

  constructor(private httpService: HttpService) { }

  getGenerations() {
    return this.httpService.get(this.apiUrl + '/generation').pipe(
        map((paginatedGeneration: PaginatedGenration) => {
          return {
            ... paginatedGeneration,
            results: paginatedGeneration.results.map(generation => ({
              ...generation,
              id: generation.url
                .split('/')
                .filter(Boolean)
                .pop()
            }))
          }
        })
    );
  }
}
