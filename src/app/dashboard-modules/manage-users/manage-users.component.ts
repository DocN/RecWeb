import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetJsonService } from '../../services/get-json.service';
import * as crypto from 'crypto-js';
import { DashrouteService } from '../../services/dashroute.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  constructor(private http: HttpClient, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }
  private route = '0';
  private subRoute = '0';

  //internal add account vars
  private intusername = '';
  private intpassword = '';
  private intrepassword = '';
  private intfirstname = '';
  private intlastname = '';
  private intaccessLevel = '1';
  private intactive = '1';
  private model: any = {};

  //internal user form validation
  private formErrors = [];
  private validform = 0;
  private validusername = '';
  private successMessageInternal = '';

  //edit user data
  private userIDList = [];
  private usernameList = [];
  private firstnameList = [];
  private lastnameList = [];

  ngOnInit() {
  }

  goToInternal() {
    this.route = '1';
    this.subRoute = '0';
  }

  goCreateInternal() {
    this.subRoute = '1';
  }

  goEditInternal() {
    this.getInternalUserTable();
    this.subRoute = '3';
  }

  goToExternal() {
    this.route = '2';
    this.subRoute = '0';
  }
  
  setInterSelectorAccessLevel($val) {
    this.intaccessLevel = $val;
    console.log(this.intaccessLevel);
  }

  registerInternalAccount() {
    this.initInternalData();
    this.validateInternalUsername();
    this.validateData();
    if(this.validform == 0) {
      return;
    }
    var epassword = crypto.MD5(this.intpassword + this.intusername).toString();
    let data = {'username': this.intusername, 'epassword': epassword, 'authlevel': this.intaccessLevel, 'firstname': this.intfirstname, 'lastname': this.intlastname,'active': this.intactive};
    this.http.post(this.jsonURL.getInternalUserCreateURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            console.log("failed to register");
            return;
          }
          if(res.toString() != "") {
            console.log(res["message"]);
            this.successMessageInternal = res["message"];
            this.subRoute = '2';
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }
  
  initInternalData() {
    this.intusername = this.model.intusername;
    this.intpassword = this.model.intpassword;
    this.intrepassword = this.model.intrepassword;
    this.intfirstname = this.model.intfirstname;
    if(this.intfirstname) {
      this.intfirstname = this.capitalizeFirstLetter(this.intfirstname);
    }
    
    this.intlastname = this.model.intlastname;
    if(this.intlastname) {
      this.intlastname = this.capitalizeFirstLetter(this.intlastname);
    }
    //console.log(this.intaccessLevel);
  }

  validateInternalUsername() {
    let data = {'user': this.model.intusername};
    this.http.post(this.jsonURL.getvaldiateUsernameURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            console.log("failed to validate");
            return;
          }
          if(res.toString() != "") {
            if(res['valid'] == 0) {
              this.validusername = "*Username is already taken";
            }
            else {
              this.validusername = '';
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  validateData() {
    var valid = true;
    this.formErrors = [];
    //this.formErrors
    if((!this.intusername) || this.intusername.length < 5) {
      this.formErrors.push("*Please enter a username of 5 characters or more");
      valid = false;
    }
    if((!this.intpassword) || this.intpassword.length < 5) {
      this.formErrors.push("*Please enter a password of 5 characters or more");
    }
    if(this.intpassword != this.intrepassword) {
      this.formErrors.push("*The specified passwords do not match.");
      valid = false;
    }
    if((!this.intfirstname) || this.intfirstname.length < 1) {
      this.formErrors.push("*Please enter a valid first name");
      valid = false;
    }
    if((!this.intlastname) || this.intlastname.length < 1) {
      this.formErrors.push("*Please enter a valid last name");
      valid = false;
    }
    if((this.validusername == '*Username is already taken')) {
      console.log("here");
      valid = false;
    }
    if(valid == true) {
      this.validform = 1;
    }
    else {
      this.validform = 0;
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  goToDashboard() {
    this.dashroute.currentRoute = '/';
    this.dashroute.currentTitle = "Dashboard";
  }

  getInternalUserTable() {
    let data = {'user': this.model.intusername};
    this.http.post(this.jsonURL.getInternalUserTableURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            return;
          }
          if(res.toString() != "") {
            console.log(res);
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }
}
