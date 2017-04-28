import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { StlService } from './stl.service';
import { AuthenticationService } from './authentication.service';
import { StlListComponent } from './stl/stl-list.component';
import { StlDetailsComponent } from './stl/stl-details.component';
import { StlListTagsComponent } from './stl/stl-list-tags.component';

const ROUTES = [

  {
    path: '',
    component: StlListComponent
  },
  {
    path: 'stl/:id',
    component: StlDetailsComponent
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
    StlListTagsComponent
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
