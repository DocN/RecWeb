import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

//bootstrap memes
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

//route imports
import {RouterModule, Routes} from '@angular/router';
import { LoginPortalComponent } from './login-portal/login-portal.component';
import { DashboardComponent } from './dashboard/dashboard.component';

//http crud
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

//sessions
import { SessionService } from './services/session.service';
import { LogoutComponent } from './logout/logout.component';
import { NavbarComponent } from './dashboard-modules/navbar/navbar.component';

const appRoutes:Routes = [
  {
    path: 'login',
    component: LoginPortalComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPortalComponent,
    DashboardComponent,
    LogoutComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true}),
    HttpClientModule,
    HttpModule, 
    FormsModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    SessionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
