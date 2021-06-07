import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Generation } from 'src/app/core/models/generation';
import { Version } from 'src/app/core/models/version';
import { GameService } from 'src/app/core/services/game.service';
import { GenerationService } from 'src/app/core/services/generation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  generations: Generation[];
  versions: Version[];

  constructor(
    private router: Router,
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
