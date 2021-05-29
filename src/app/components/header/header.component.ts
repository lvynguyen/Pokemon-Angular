import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Generation } from 'src/app/models/generation';
import { Version } from 'src/app/models/version';
import { GameService } from 'src/app/services/game.service';
import { GenerationService } from 'src/app/services/generation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  generations: Generation[];
  versions: Version[];

  constructor(
    private gameService: GameService,
    private genarationService: GenerationService
  ) { }

  ngOnInit(): void {
    this.loadGameVersionsAndGenerations();
  }

  loadGameVersionsAndGenerations() {
    forkJoin([
      this.gameService.getVersions(),
      this.genarationService.getGenerations(),
    ]).subscribe((listResult: any[]) => {
      this.versions = listResult[0].results;
      this.generations = listResult[1].results;
    });
  }
}
