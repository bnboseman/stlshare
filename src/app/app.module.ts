import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { StlService } from './stl.service';
import { StlListComponent } from './stl/stl-list.component';
import { StlDetailsComponent } from './stl/stl-details.component';
import { StlListTagsComponent } from './stl/stl-list-tags.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'stl',
    pathMatch: 'full'
  },
  {
    path: 'stl',
    component: StlListComponent
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
  providers: [StlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
