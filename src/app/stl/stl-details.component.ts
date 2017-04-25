import { Component, Input } from '@angular/core';
import { Stl } from './stl';

@Component({
  selector: 'app-stl-details',
  templateUrl: './stl-details.component.html',
  styleUrls: ['./stl-details.component.css']
})

export class StlDetailsComponent {
  @Input() stl: Stl;
  constructor() { }
};
