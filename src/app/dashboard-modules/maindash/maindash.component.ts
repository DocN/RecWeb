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

  private dashEvent: any= {};

  private dashReview: any= {};

  constructor(private router:Router, private http: HttpClient, private session:SessionService, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.getSummaryNumbers();
    this.getDashNewUsers();
    this.getWeek();
    this.getDashWeeklyEvents();
    this.getDashReview();
  }

  getSummaryNumbers() {
    let data = {};
    this.http.post(this.jsonURL.getSummaryDashURL(), data)
      .subscribe(
        (res) => {
          if(res == null) {
            console.log("here asdsad");
            return;
          }
          if(res.toString() != "") {
            console.log("here");
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

  getDashWeeklyEvents() {
    this.dashEvent.eventID = [];
    this.dashEvent.classID = [];
    this.dashEvent.eventDay = [];
    this.dashEvent.className = [];
    this.dashEvent.classLocation = [];
    let data = {};
    this.http.post(this.jsonURL.getDashEventsURL(), data)
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
              this.dashEvent.eventID.push(res[i].UID);
              this.dashEvent.classID.push(res[i].email);
              this.dashEvent.eventDay.push(res[i].eventDay);
              this.dashEvent.className.push(res[i].className);
              this.dashEvent.classLocation.push(res[i].classLocation);
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  

  getDashReview() {
    this.dashReview.className = [];
    this.dashReview.firstname = [];
    this.dashReview.lastname = [];
    this.dashReview.reviewText = [];
    this.dashReview.starRating = [];
    this.dashReview.starRatingDisplay = [];

    let data = {};
    this.http.post(this.jsonURL.getDashReviewsURL(), data)
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
              this.dashReview.className.push(res[i].className);
              this.dashReview.firstname.push(res[i].firstname);
              this.dashReview.lastname.push(res[i].lastname);
              this.dashReview.reviewText.push(res[i].reviewText);
              this.dashReview.starRating.push(res[i].starRating);
              this.dashReview.starRatingDisplay.push(this.constructorStar(res[i].starRating));
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

  constructorStar($rating) {
    console.log($rating);
    // Get the value
    var val = parseFloat($rating);
    // Turn value into number/100
    var size = val/5*100;
    console.log(size);
    return size + '%';
  }

}
