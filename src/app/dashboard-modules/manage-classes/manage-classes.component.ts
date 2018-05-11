import { Component, OnInit } from '@angular/core';
import { DashrouteService } from '../../services/dashroute.service';
import { HttpClient } from '@angular/common/http';
import { GetJsonService } from '../../services/get-json.service';
import * as crypto from 'crypto-js';


@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.scss']
})
export class ManageClassesComponent implements OnInit {
  private route;
  private subRoute;
  private addClass: any={};
  private instructorTable: any={};
  private selectedInstructor;
  private currentImage;
  private currentInstructorName;
  private addBeginDate = new Date();
  private addEndDate = new Date();
  private addBeginTime = new Date();
  private addEndTime = new Date();
  private addClassImage = '../../../assets/images/gym.jpg';
  private successMessageInternal;
  private errorMessages = [];

  constructor(private http: HttpClient, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.route = '1';
    this.subRoute = '0';
    this.selectedInstructor = 0;
    this.addClass.dayOfWeek = 1;
    this.getInstructorTable();

    this.addClass.beginDate = new Date();
  }

  goCreateClass() {
    this.route = '2';
    this.subRoute = '0';
  }

  getInstructorTable() {
    this.instructorTable.instructorID = [];
    this.instructorTable.firstname = [];
    this.instructorTable.lastname = [];
    this.instructorTable.photourl = [];
    this.instructorTable.bio = [];
    this.instructorTable.creationTime = [];
    this.instructorTable.filtered = [];

    let data = {};
    this.http.post(this.jsonURL.getInstructorTableURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            return;
          }
          if(res.toString() != "") {
            console.log(res);
            var count = 0;
            while(res[count] != null) {
              count = count +1;
            }
            for(let i =0; i < count; i++) {
              this.instructorTable.instructorID.push(res[i].instructorID);
              this.instructorTable.firstname.push(res[i].firstname);
              this.instructorTable.lastname.push(res[i].lastname);
              this.instructorTable.photourl.push(res[i].photoURL);
              this.instructorTable.bio.push(res[i].bio);
              this.instructorTable.creationTime.push(res[i].creationTime);
              this.instructorTable.filtered.push(1);
            }
            this.selectedInstructor = 0;
            this.loadInstructor();
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  setClassInstructor($event) {
    this.selectedInstructor = $event;
    this.loadInstructor();
  }

  loadInstructor() {
    this.currentInstructorName = this.instructorTable.firstname[this.selectedInstructor] + ' ' + this.instructorTable.lastname[this.selectedInstructor];
    this.currentImage = this.instructorTable.photourl[this.selectedInstructor];
  }

  
  uploadAnImage($event) {
    var file = $event.target.files[0];
    let formData = new FormData();
      formData.append('file', file);
    
    this.http.post(this.jsonURL.getUploadClassImageURL(), formData)
    .subscribe(
      (res) => {
        if(res.toString() != "") {
          console.log(res);
          if(res['result'] == true) {
            this.addClassImage = res['url'];
          }
        }
      },
      err => {
        console.log(err);
        //finish loading
      }
    );
  }

  setDayOfWeek($val) {
    this.addClass.dayOfWeek = $val;
  }
  createClass() {
    this.convertToUnix();

    if(!this.validateAddClassForm()) {
      return;
    }
    let data = {'instructorID': this.instructorTable.instructorID[this.selectedInstructor], 'className': this.addClass.className, 'classLocation': this.addClass.classLocation, 'reservedSlots': this.addClass.reservedSlot, 'availableSlots': this.addClass.maxSlot, 'beginDate': this.addClass.UnixBeginDate, 'endDate': this.addClass.UnixEndDate, 'beginHour': this.addBeginTime.getHours(), 'beginMin': this.addBeginTime.getMinutes(), 
    'endHour': this.addEndTime.getHours(), 'endMin': this.addEndTime.getMinutes(), 'dayOfWeek': this.addClass.dayOfWeek, 'classDescription': this.addClass.classDescription, 'classImageURL': this.addClassImage};
    this.http.post(this.jsonURL.getAddClassURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            console.log("failed to register");
            return;
          }
          if(res.toString() != "") {
            console.log(res["message"]);
            this.successMessageInternal = res["message"];
            this.subRoute = '1';
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  printTester() {
    //unix time
    //console.log((this.addBeginDate.getTime()/1000));
    console.log(this.addBeginTime.getHours());
    console.log(this.addBeginTime.getMinutes());
  }

  convertToUnix() {
    this.addClass.UnixBeginDate = this.addBeginDate.getTime()/1000;
    this.addClass.UnixEndDate = this.addEndDate.getTime()/1000;
  }

  validateAddClassForm() {
    this.errorMessages = [];
    var validate = true;
    if(!this.addClass.className || this.addClass.className.length < 1) {
      this.errorMessages.push("*Please enter a class name");
      validate = false;
    }
    if(!this.addClass.classLocation || this.addClass.classLocation.length < 1) {
      this.errorMessages.push("*Please enter a class location");
      validate = false;
    }
    if(!this.addClass.reservedSlot) {
      this.errorMessages.push("*No reserved slots specified");
      validate = false;
    }
    else {
      if(this.addClass.reservedSlot < 0) {
        this.errorMessages.push("*Please enter a valid number of reserved slots");
        validate = false;
      }
    }
    if(!this.addClass.maxSlot) {
      this.errorMessages.push("*Please enter valid maximum number of slots");
      validate = false;
    }
    else {
      if(this.addClass.maxSlot < 0) {
        this.errorMessages.push("*Please enter a valid maximum number of slots");
        validate = false;
      }
      else if(this.addClass.maxSlot < this.addClass.reservedSlot) {
        this.errorMessages.push("*Please enter a maximum number of slots greater than the number of reserved slots");
        validate = false;
      }
    }
    if(!this.addClass.classDescription || this.addClass.classDescription.length < 0) {
      this.errorMessages.push("*Please enter a class description");
      validate = false;
    }
    if(this.compareClassTime() == false) {
      this.errorMessages.push("*Class start time can not be equal to or earlier than class end time!");
      validate = false;
    }
    if(this.compareDates() == false) {
      this.errorMessages.push("*Class begin date can not be earlier than class end date!");
      validate = false;
    }
    return validate;
  }

  compareClassTime() {
    var beginHours = this.addBeginTime.getHours();
    var beginMins = this.addBeginTime.getMinutes();

    var endHours = this.addEndTime.getHours();
    var endMins = this.addEndTime.getMinutes();
    if(beginHours > endHours) {
      return false;
    }
    else if(beginHours == endHours) {
      if(beginMins >= endMins) {
        return false;
      }
    }
    return true;
  }

  compareDates() {
    if(this.addBeginDate.getTime() > this.addEndDate.getTime()) {
      return false;
    }
    return true;
  }
}