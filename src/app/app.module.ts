import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { StlService } from './stl.service';
import { StlListComponent } from './stl/stl-list.component';
import { StlDetailsComponent } from './stl/stl-details.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'stl',
    pathMatch: 'full'
  },
  {
    path: 'stl',
    component: StlListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StlListComponent,
    StlDetailsComponent
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
