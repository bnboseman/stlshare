import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http, private response: Response) { }

  getUser(id) {
    return (this.http.get(`/api/user/${id}`)
      .map(user => {
        user.json();
      }));
  }

}
