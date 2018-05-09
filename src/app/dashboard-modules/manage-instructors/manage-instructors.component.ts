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

  constructor(private http: HttpClient, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.route = 1;
    this.subRoute = 0;
    this.currentImage = this.stockImage;
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

  getInstructorTable() {
    this.instructorTable.UID = [];
    this.instructorTable.firstname = [];
    this.instructorTable.lastname = [];
    this.instructorTable.photourl = [];
    this.instructorTable.bio = [];
    this.instructorTable.creationTime = [];

    let data = {};
    this.http.post(this.jsonURL.getExtUsersTableURL(), data)
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
              this.instructorTable.UID.push(res[i].UID);
              this.instructorTable.firstname.push(res[i].firstname);
              this.instructorTable.lastname.push(res[i].lastname);
              this.instructorTable.photourl.push(res[i].photourl);
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


}
