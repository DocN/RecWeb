import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { HttpClient } from '@angular/common/http';
import { GetJsonService } from '../../services/get-json.service';
import * as crypto from 'crypto-js';
import { DashrouteService } from '../../services/dashroute.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private fullname;
  constructor(private session:SessionService, private http: HttpClient, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.getFullName();
  }

  getFullName() {
    this.fullname = this.session.getFirstname() + " " + this.session.getLastname(); 
  }

  goToUsersettings() {
    this.dashroute.currentRoute = "/usersettings";
    this.dashroute.currentTitle = "User Settings";
  }

}
