import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class StlService {

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService) { }

  getAllStls() {
    return this.http.get('/api/stl')
      .map(stls => stls.json());
  }

  getStl(id) {
    return this.http.get('/api/stl/' + id)
      .map(stl => stl.json());
  }

  getTag(tag) {
    return this.http.get('/api/stl/tag/' + tag)
      .map(stls => stls.json());
  }

  addComment(id: string, comment: string) {
    const headers = new Headers({'Authorization': 'JWT ' + this.authenticationService.token});
    const options = new RequestOptions({headers: headers});
    const body = {
      text: comment
    };

    return this.http.post( `/api/stl/${id}/comment`, body, options)
      .map((response: Response) => response.json());
  }
}
