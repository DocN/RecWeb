import { Component, OnInit } from '@angular/core';
import { DashrouteService } from '../../services/dashroute.service';
import { HttpClient } from '@angular/common/http';
import { GetJsonService } from '../../services/get-json.service';
import * as crypto from 'crypto-js';


@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.scss']
})
export class ViewReviewsComponent implements OnInit {

  private route;
  private subRoute;
  private reviewDataTable: any= {};

  constructor(private http: HttpClient, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.route = 1;
    this.subRoute = 0;
    this.loadReviewData();
  }

  loadReviewData() {
    this.reviewDataTable.reviewID = [];
    this.reviewDataTable.instructorID = [];
    this.reviewDataTable.classID = [];
    this.reviewDataTable.reviewText = [];
    this.reviewDataTable.starRating = [];
    this.reviewDataTable.starRatingDisplay = [];
    this.reviewDataTable.timeStamp = [];
    this.reviewDataTable.firstname = [];
    this.reviewDataTable.lastname = [];
    this.reviewDataTable.className = [];

    let data = {};
    this.http.post(this.jsonURL.getReviewTableURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            return;
          }
          if(res.toString() != "") {
            var count = 0;
            while(res[count] != null) {
              count = count +1;
            }
            for(let i =0; i < count; i++) {
              this.reviewDataTable.reviewID.push(res[i].reviewID);
              this.reviewDataTable.instructorID.push(res[i].instructorID);
              this.reviewDataTable.classID.push(res[i].classID);
              this.reviewDataTable.reviewText.push(res[i].reviewText);
              this.reviewDataTable.starRating.push(res[i].starRating);
              this.reviewDataTable.starRatingDisplay.push(this.constructorStar(res[i].starRating));
              this.reviewDataTable.timeStamp.push(res[i].timeStamp);
              this.reviewDataTable.firstname.push(res[i].firstname);
              this.reviewDataTable.lastname.push(res[i].lastname);
              this.reviewDataTable.className.push(res[i].className);
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
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
