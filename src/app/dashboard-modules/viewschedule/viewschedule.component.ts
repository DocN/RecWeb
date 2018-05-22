import { Component, OnInit } from '@angular/core';
import { DashrouteService } from '../../services/dashroute.service';
import { HttpClient } from '@angular/common/http';
import { GetJsonService } from '../../services/get-json.service';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-viewschedule',
  templateUrl: './viewschedule.component.html',
  styleUrls: ['./viewschedule.component.scss']
})
export class ViewscheduleComponent implements OnInit {
  private dashEvent: any= {};
  private currentWeek: any= {};

  constructor(private http: HttpClient, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.getDashWeeklyEvents();
  }

  getDashWeeklyEvents() {
    this.dashEvent.eventID = [];
    this.dashEvent.classID = [];
    this.dashEvent.eventDay = [];
    this.dashEvent.className = [];
    this.dashEvent.classLocation = [];
    this.dashEvent.dayOfWeek = [];
    this.dashEvent.beginHour = [];
    this.dashEvent.beginMin = [];
    this.dashEvent.endHour = [];
    this.dashEvent.endMin = [];

    this.currentWeek.monday = [];
    this.currentWeek.monday.className = [];
    this.currentWeek.monday.time = [];
    this.currentWeek.monday.location = [];
    this.currentWeek.tuesday = [];
    this.currentWeek.tuesday.className = [];
    this.currentWeek.tuesday.time = [];
    this.currentWeek.tuesday.location = [];
    this.currentWeek.wednesday = [];
    this.currentWeek.wednesday.className = [];
    this.currentWeek.wednesday.time = [];
    this.currentWeek.wednesday.location = [];
    this.currentWeek.thursday = [];
    this.currentWeek.thursday.className = [];
    this.currentWeek.thursday.time = [];
    this.currentWeek.thursday.location = [];
    this.currentWeek.friday = [];
    this.currentWeek.friday.className = [];
    this.currentWeek.friday.time = [];
    this.currentWeek.friday.location = [];
    this.currentWeek.saturday = [];
    this.currentWeek.saturday.className = [];
    this.currentWeek.saturday.time = [];
    this.currentWeek.saturday.location = [];
    this.currentWeek.sunday = [];
    this.currentWeek.sunday.className = [];
    this.currentWeek.sunday.time = [];
    this.currentWeek.sunday.location = [];

    let data = {};
    this.http.post(this.jsonURL.getscheduleURL(), data)
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
              this.dashEvent.dayOfWeek.push(res[i].dayOfWeek);
              this.dashEvent.beginHour.push(res[i].beginHour);
              this.dashEvent.beginMin.push(res[i].beginMin);
              this.dashEvent.endHour.push(res[i].endHour);
              this.dashEvent.endMin.push(res[i].endMin);
            }
            this.createWeeklyCal();
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  createWeeklyCal() {
    for(let i =0; i <this.dashEvent.classLocation.length; i++) {
      if(this.dashEvent.dayOfWeek[i] == 1) {
        this.currentWeek.monday.className.push(this.dashEvent.className[i]);
        this.currentWeek.monday.location.push(this.dashEvent.classLocation[i]);
        this.currentWeek.monday.time.push(this.dashEvent.beginHour[i] + ":" + this.dashEvent.beginMin[i] + "-" + this.dashEvent.endHour[i] + ":" + this.dashEvent.endMin[i]);
      }
      else if(this.dashEvent.dayOfWeek[i] == 2) {
        if(this.dashEvent.className[i]) {
          this.currentWeek.tuesday.className.push(this.dashEvent.className[i]);
          this.currentWeek.tuesday.location.push(this.dashEvent.classLocation[i]);
          this.currentWeek.tuesday.time.push(this.dashEvent.beginHour[i] + ":" + this.dashEvent.beginMin[i] + "-" + this.dashEvent.endHour[i] + ":" + this.dashEvent.endMin[i]);
        }
      }
      else if(this.dashEvent.dayOfWeek[i] == 3) {
        if(this.dashEvent.className[i]) {
          this.currentWeek.wednesday.className.push(this.dashEvent.className[i]);
          this.currentWeek.wednesday.location.push(this.dashEvent.classLocation[i]);
          this.currentWeek.wednesday.time.push(this.dashEvent.beginHour[i] + ":" + this.dashEvent.beginMin[i] + "-" + this.dashEvent.endHour[i] + ":" + this.dashEvent.endMin[i]);
        }
      }
      else if(this.dashEvent.dayOfWeek[i] == 4) {
        if(this.dashEvent.className[i]) {
          this.currentWeek.thursday.className.push(this.dashEvent.className[i]);
          this.currentWeek.thursday.location.push(this.dashEvent.classLocation[i]);
          this.currentWeek.thursday.time.push(this.dashEvent.beginHour[i] + ":" + this.dashEvent.beginMin[i] + "-" + this.dashEvent.endHour[i] + ":" + this.dashEvent.endMin[i]);
        }
      }
      else if(this.dashEvent.dayOfWeek[i] == 5) {
        if(this.dashEvent.className[i]) {
          this.currentWeek.friday.className.push(this.dashEvent.className[i]);
          this.currentWeek.friday.location.push(this.dashEvent.classLocation[i]);
          this.currentWeek.friday.time.push(this.dashEvent.beginHour[i] + ":" + this.dashEvent.beginMin[i] + "-" + this.dashEvent.endHour[i] + ":" + this.dashEvent.endMin[i]);
        }
      }
      else if(this.dashEvent.dayOfWeek[i] == 6) {
        if(this.dashEvent.className[i]) {
          this.currentWeek.saturday.className.push(this.dashEvent.className[i]);
          this.currentWeek.saturday.location.push(this.dashEvent.classLocation[i]);
          this.currentWeek.saturday.time.push(this.dashEvent.beginHour[i] + ":" + this.dashEvent.beginMin[i] + "-" + this.dashEvent.endHour[i] + ":" + this.dashEvent.endMin[i]);
        }
      }
      else if(this.dashEvent.dayOfWeek[i] == 7) {
        if(this.dashEvent.className[i]) {
          this.currentWeek.sunday.className.push(this.dashEvent.className[i]);
          this.currentWeek.sunday.location.push(this.dashEvent.classLocation[i]);
          this.currentWeek.sunday.time.push(this.dashEvent.beginHour[i] + ":" + this.dashEvent.beginMin[i] + "-" + this.dashEvent.endHour[i] + ":" + this.dashEvent.endMin[i]);
        }
      }
    }
    
  }
}
