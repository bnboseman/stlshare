import { Component, OnInit } from '@angular/core';
import { StlService } from '../stl.service';

@Component({
  selector: 'app-stl',
  templateUrl: './stl.component.html',
  styleUrls: ['./stl.component.css']
})
export class StlComponent implements OnInit {
  stls: any = [];

  constructor(private stlService: StlService) { }

  ngOnInit() {
    this.stlService.getAllStls().subscribe(stls => {
      this.stls = stls;
    });
  }

}
