import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Stl } from './stl';
import { StlService } from '../stl.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stl-details',
  templateUrl: './stl-details.component.html',
  styleUrls: ['./stl-details.component.css']
})

export class StlDetailsComponent implements OnInit, OnDestroy {
  stl: any;
  private id: any;
  private sub: any

  constructor(private stlService: StlService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.stlService.getStl(this.id).subscribe(stl => {
      this.stl = stl;
    });
  }

  ngOnDestroy() {
    this.stl.unsubscribe();
  }
};
