import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

//bootstrap memes
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

//route imports
import {RouterModule, Routes} from '@angular/router';
import { LoginPortalComponent } from './login-portal/login-portal.component';

const appRoutes:Routes = [
  {
    path: 'login',
    component: LoginPortalComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPortalComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true}),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
