import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User('','');
  loading = false;
  error = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login() {
    this.loading = true;

    this.authenticationService.login(this.user.email, this.user.password)
      .subscribe(result => {
        if (result === true) {
          this.router.navigate(['/']);
        } else {
          this.error = 'Username or password incorrect';
          this.loading = false;
        }
      })
  }

  logout() {
    this.authenticationService.logout();
  }

}
