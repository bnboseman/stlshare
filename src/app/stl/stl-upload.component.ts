import { Component, OnInit } from '@angular/core';
import {StlService } from '../stl.service';
import { Stl } from './stl';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-stl-upload',
  templateUrl: 'stl-upload.component.html',
  styleUrls: ['stl-upload.component.css']
})

export class StlUploadComponent implements OnInit {
  public stl: Stl;
  public uploader: FileUploader = new FileUploader({url: '/api/stl'});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  constructor(private stlService: StlService) { }
  ngOnInit() {
    this.stl = new Stl;
  }

  uploadStl() {

  }

}