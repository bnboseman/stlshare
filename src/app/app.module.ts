import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { StlComponent } from './stl/stl.component';

import { StlService } from './stl.service';
import { StlDetailComponent } from './stl-detail/stl-detail.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'stl',
    pathMatch: 'full'
  },
  {
    path: 'stl',
    component: StlComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StlComponent,
    StlDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [StlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
