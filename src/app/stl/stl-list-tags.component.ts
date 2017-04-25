import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StlService } from '../stl.service';
import { StlDetailsComponent } from './stl-details.component';

@Component({
  selector: 'app-stl-list',
  templateUrl: './stl-list.component.html',
  styleUrls: ['./stl-list.component.css']
})
export class StlListTagsComponent implements OnInit, OnDestroy {
  stls: any = [];
  private tag: any;
  private sub: any

  constructor(private stlService: StlService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.sub  = this.route.params.subscribe(params => {
      this.tag = params['tag'];
    });
    console.log(this.tag);
    this.stlService.getTag(this.tag).subscribe(stls => {
      console.log(stls);
      this.stls = stls;
    });
  }

  ngOnDestroy() {
    this.tag.unsubscribe();
  }
}
