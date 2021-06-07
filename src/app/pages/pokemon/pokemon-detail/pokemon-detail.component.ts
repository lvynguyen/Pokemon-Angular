import { Component, Input, OnInit } from '@angular/core';
import { SimplifiedPokemon } from 'src/app/core/models/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  @Input() pokemon: SimplifiedPokemon;

  constructor() { }

  ngOnInit(): void {
  }

}
