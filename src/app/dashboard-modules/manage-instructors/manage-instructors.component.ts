import { Component, OnInit } from '@angular/core';
import { DashrouteService } from '../../services/dashroute.service';
import { HttpClient } from '@angular/common/http';
import { GetJsonService } from '../../services/get-json.service';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-manage-instructors',
  templateUrl: './manage-instructors.component.html',
  styleUrls: ['./manage-instructors.component.scss']
})
export class ManageInstructorsComponent implements OnInit {
  private route;
  private subRoute;
  private model: any = {};
  private currentImage;
  private stockImage = "../../../assets/images/avatars/girl.png";
  private validate = true;
  private formErrors = [];
  private successMessageInternal;
  private instructorTable: any = {};
  private editFilter;
  private instructFilter: any= {};
  private instructorSelected: any={};
  private selectedID;
  private hideDeleteFrame;
  
  constructor(private http: HttpClient, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.getInstructorTable();
    this.route = 1;
    this.subRoute = 0;
    this.currentImage = this.stockImage;
    this.editFilter = 1;
  }
  
  goCreateInstructor() {
    this.route = 2; 
    this.subRoute = 0;
  }

  goToEditInstructor() {
    this.route = 3;
    this.subRoute = 0;
  }

  uploadAnImage($event) {
    var file = $event.target.files[0];
    let formData = new FormData();
      formData.append('file', file);
    
    this.http.post(this.jsonURL.getUploadImageURL(), formData)
    .subscribe(
      (res) => {
        if(res.toString() != "") {
          console.log(res);
          if(res['result'] == true) {
            this.currentImage = res['url'];
          }
        }
      },
      err => {
        console.log(err);
        //finish loading
      }
    );
  }
  //
  registerInstructor() {
    this.validate = true;
    //validate names
    if(!this.model.firstname || this.model.firstname.length < 1) {
      this.formErrors.push("*Error - Invalid First Name");
      this.validate= false;
    }
    if(!this.model.lastname || this.model.lastname.length < 1) {
      this.formErrors.push("*Error - Invalid Last Name");
      this.validate= false;
    }
    if(!this.model.bioframe || this.model.bioframe.length < 1) {
      this.formErrors.push("*Error - Please Enter Instructor Bio");
      this.validate= false;
    }
    if(this.validate == true) {
      //uppercase first character
      this.formatNames();
      let data = {'firstname': this.model.firstname, 'lastname': this.model.lastname, 'photoURL': this.currentImage, 'bio': this.model.bioframe};
      this.http.post(this.jsonURL.getAddInstructorURL(), data)
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
  }

  formatNames() {
    this.model.firstname = this.model.firstname.toString().toLowerCase();
    this.model.lastname = this.model.lastname.toString().toLowerCase();

    this.model.firstname = this.capitalizeFirstLetter(this.model.firstname);
    this.model.lastname = this.capitalizeFirstLetter(this.model.lastname);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  goToDashboard() {
    this.dashroute.currentRoute = '/';
    this.dashroute.currentTitle = "Dashboard";
  }

  setEditFilter($val) {
    //selected filter values
    this.editFilter = $val;
    this.applyEditFilter();
  }
  
  resetExtFilter() {
    for(let i =0; i < this.instructorTable.filtered.length; i++) {
      this.instructorTable.filtered[i] = 1;
    }
  }

  applyEditFilter() {
    this.resetExtFilter();
    var filterOption = this.editFilter;
    if(!this.instructFilter.value) {
      return;
    }
    var currentFilter = this.instructFilter.value.toString().toLowerCase();
    for(let i =0; i < this.instructorTable.filtered.length; i++) {
      //uid filter
      if(filterOption == 1) {
        if(!this.instructorTable.instructorID[i]) {
          return;
        }
        var currentVal = this.instructorTable.instructorID[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.instructorTable.filtered[i] = 0;
        }
      } 
      //First filter
      else if(filterOption == 2) {
        if(!this.instructorTable.firstname[i]) {
          return;
        }
        var currentVal = this.instructorTable.firstname[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.instructorTable.filtered[i] = 0;
        }
      } 
      //Last filter
      else if(filterOption == 3) {
        if(!this.instructorTable.lastname[i]) {
          return;
        }
        var currentVal = this.instructorTable.lastname[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.instructorTable.filtered[i] = 0;
        }
      }
    }
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
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  selectInstructor($event) {
    var currentID = $event["srcElement"]["id"];
    currentID = currentID.slice(8);
    this.selectedID = currentID;
    this.subRoute = '1';
    this.route = '3';

    this.instructorSelected.instructorID = this.instructorTable.instructorID[currentID];
    console.log(this.instructorSelected.instructorID);
    this.instructorSelected.firstname = this.instructorTable.firstname[currentID];
    this.instructorSelected.lastname = this.instructorTable.lastname[currentID];
    this.instructorSelected.photourl = this.instructorTable.photourl[currentID];
    this.instructorSelected.bio = this.instructorTable.bio[currentID];
    this.instructorSelected.creationTime = this.instructorTable.creationTime[currentID];
    this.currentImage = this.instructorSelected.photourl;
  }

  confirmDeleteInstructor() {
    if(this.hideDeleteFrame == '0') {
      this.hideDeleteFrame = '1';
    }
    else {
      this.hideDeleteFrame = '0';
    }
  }

  deleteInstructor() {
    let data = {'instructorID': this.instructorSelected.instructorID};
    this.http.post(this.jsonURL.getDeleteInstructorURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            return;
          }
          if(res.toString() != "") {
            console.log();
            if(res['valid'] == '1') {
              this.successMessageInternal = "Account successfully deleted";
              this.subRoute = '2';
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  editInstructorApply() {
    let data = {'instructorID': this.instructorSelected.instructorID, 'firstname': this.instructorSelected.firstname, 'lastname': this.instructorSelected.lastname, 'photourl' : this.currentImage, 'bio': this.instructorSelected.bio};
    this.http.post(this.jsonURL.getUpdateInstructorURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            return;
          }
          if(res.toString() != "") {
            if(res['valid'] == '1') {
              this.successMessageInternal = "Changes Successfully Applied!";
              this.subRoute = '3';
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }
}
