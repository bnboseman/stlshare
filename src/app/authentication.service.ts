import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';



@Injectable()
export class AuthenticationService {
  public token: string;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post('/authenticate', JSON.stringify({
      email: email,
      password: password
    }))
      .map((response: Response) => {
      const token = response.json() && response.json().token;
      if (token) {
        this.token = token;

        localStorage.setItem('currentUser',
          JSON.stringify({
            email: email,
            token: token
          })
        );
        return true;
      } else {
        return false;
      }
    });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }
}
