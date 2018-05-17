import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { GetJsonService } from '../../services/get-json.service';
import { DashrouteService } from '../../services/dashroute.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-maindash',
  templateUrl: './maindash.component.html',
  styleUrls: ['./maindash.component.scss']
})
export class MaindashComponent implements OnInit {

  private summary: any= {};
  private newUser: any= {};
  private mondayUnix;
  private sundayUnix;

  constructor(private router:Router, private http: HttpClient, private session:SessionService, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.getSummaryNumbers();
    this.getDashNewUsers();
    this.getWeek();
  }

  getSummaryNumbers() {
    let data = {};
    this.http.post(this.jsonURL.getSummaryDashURL(), data)
      .subscribe(
        (res) => {
          if(res == null) {
            return;
          }
          if(res.toString() != "") {
            console.log(res);
            this.summary.numberOfExtUsers= res['numberOfExtUsers'];
            this.summary.numberOfEvents= res['numberOfEvents'];
            this.summary.numberOfReviews = res['numberOfReviews'];
            this.summary.numberOfInstructors = res['numberOfInstructors'];
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  getDashNewUsers() {
    this.newUser.UID = [];
    this.newUser.email = [];
    this.newUser.firstName = [];
    this.newUser.lastName = [];
    let data = {};
    this.http.post(this.jsonURL.getNewUsersDashURL(), data)
      .subscribe(
        (res) => {
          if(res == null) {
            return;
          }
          if(res.toString() != "") {
            var count = 0;
            while(res[count] != null) {
              count = count +1;
            }
            
            for(let i =0; i < count; i++) {
              this.newUser.UID.push(res[i].UID);
              this.newUser.email.push(res[i].email);
              this.newUser.firstName.push(res[i].firstName);
              this.newUser.lastName.push(res[i].lastName);
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  getWeek() {
    var curr = new Date;
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
    this.mondayUnix = Math.round(firstday.getTime()/1000);
    this.mondayUnix = this.mondayUnix + 25200;
    this.sundayUnix = Math.round(lastday.getTime()/1000);
    this.sundayUnix = this.sundayUnix + 25200;
    console.log(this.mondayUnix + " " + this.sundayUnix);
  }
}
