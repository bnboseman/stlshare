import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { StlService } from './stl.service';
import { AuthenticationService } from './authentication.service';

import { AppComponent } from './app.component';
import { StlListComponent } from './stl/stl-list.component';
import { StlDetailsComponent } from './stl/stl-details.component';
import { StlListTagsComponent } from './stl/stl-list-tags.component';
import { LoginComponent } from './login/login.component';
import { StlUploadComponent } from './stl/stl-upload.component';

const ROUTES = [

  {
    path: '',
    component: StlListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'stl/:id',
    component: StlDetailsComponent
  },
  {
    path: 'stl/new',
    component: StlUploadComponent
  },
  {
    path: 'tags/:tag',
    component: StlListTagsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StlListComponent,
    StlDetailsComponent,
    StlListTagsComponent,
    LoginComponent,
    StlUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [StlService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
