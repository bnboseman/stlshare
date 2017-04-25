import { Component, OnInit } from '@angular/core';
import { StlService } from '../stl.service';
import { StlDetailsComponent } from './stl-details.component';

@Component({
  selector: 'stl-list',
  templateUrl: './stl-list.component.html',
  styleUrls: ['./stl-list.component.css']
})
export class StlListComponent implements OnInit {
  stls: any = [];

  constructor(private stlService: StlService) { }

  ngOnInit() {
    this.stlService.getAllStls().subscribe(stls => {
      this.stls = stls;
    });
  }

}
