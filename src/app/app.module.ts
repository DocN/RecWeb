import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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

//Json Service
import { GetJsonService } from './services/get-json.service';
import { ManageUsersComponent } from './dashboard-modules/manage-users/manage-users.component';
import { DashrouteService } from './services/dashroute.service';
import { ManageInstructorsComponent } from './dashboard-modules/manage-instructors/manage-instructors.component';
import { ManageClassesComponent } from './dashboard-modules/manage-classes/manage-classes.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ManageClasscategoriesComponent } from './dashboard-modules/manage-classcategories/manage-classcategories.component';

//color picker
import { ColorPickerModule } from 'ngx-color-picker';

//material angular
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ViewReviewsComponent } from './dashboard-modules/view-reviews/view-reviews.component';
import { MaindashComponent } from './dashboard-modules/maindash/maindash.component';
import { UsersettingsComponent } from './dashboard-modules/usersettings/usersettings.component';
import { ViewscheduleComponent } from './dashboard-modules/viewschedule/viewschedule.component';

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
    ManageUsersComponent,
    ManageInstructorsComponent,
    ManageClassesComponent,
    ManageClasscategoriesComponent,
    ViewReviewsComponent,
    MaindashComponent,
    UsersettingsComponent,
    ViewscheduleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true}),
    HttpClientModule,
    HttpModule, 
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ColorPickerModule,
    MatAutocompleteModule,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    SessionService,
    GetJsonService,
    DashrouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
