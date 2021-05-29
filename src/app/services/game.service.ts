import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedVersion } from '../models/version';
import { HttpService } from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly apiUrl = environment.apiRoot;

  constructor(private httpService: HttpService) { }

  getVersions() {
    return this.httpService.get(this.apiUrl + '/version').pipe(
      map((paginatedVersion: PaginatedVersion) => {
        return {
          ... paginatedVersion,
          results: paginatedVersion.results.map(version => ({
            ...version,
            id: version.url
              .split('/')
              .filter(Boolean)
              .pop()
          }))
        }
      })
    );
  }
}
