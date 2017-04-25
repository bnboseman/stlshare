import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StlService {

  constructor(private http: Http) { }

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
}
