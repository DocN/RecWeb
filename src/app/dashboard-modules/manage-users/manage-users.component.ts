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


  //validation patterns
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  balancePattern = "^(0|[1-9][0-9]*)$";

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
  private authLevelList = [];
  private activeList = [];
  private filteredList = [];
  //filter
  private editFilter = 1;
  private filter: any = {};

  private selectedID = '0';
  private selected: any = {};
  private selectedUsername = '';
  private selectedUserID = '';
  private selectedFirstname = '';
  private selectedLastname = '';
  private selectedAuthLevel = '';
  private selectedActive = '';
  private changeInternalPW = 1;
  private changeInternalPWResponse = '';
  private changepasswordStatus = 0;

  //external user variables
  private externalCreateUser: any = {};
  private extFormErrors = 0;
  private extTempPin = '';

  private extUserTable: any = {};
  private extSelected: any = {};
  private resetDisplayPin = '';
  private resetPinStatus = 0;

  private hideDeleteFrame = '1';

  //ext filter
  private extFilter: any = {};
  private editExtFilter = 1;

  //registeredEvents
  private registeredEvents: any = {};

  //cancelreserv
  showCancelReservation: any = {};
  ngOnInit() {
    this.externalCreateUser.balance = 0;
    this.extUserTable.UID = [];
    this.extUserTable.email = [];
    this.extUserTable.firstname = [];
    this.extUserTable.lastname = [];
    this.extUserTable.balance = [];
    this.extUserTable.active = [];
    this.extUserTable.filtered = [];
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

  goCreateExternal() {
    this.subRoute = '1';
  }

  goEditExternal() {
    this.getExtUserTable();
    this.subRoute = '3';
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
    let data = {};
    this.http.post(this.jsonURL.getInternalUserTableURL(), data)
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
              this.userIDList.push(res[i].UID);
              this.usernameList.push(res[i].username);
              this.firstnameList.push(res[i].firstname);
              this.lastnameList.push(res[i].lastname);
              this.authLevelList.push(res[i].authLevel);
              this.activeList.push(res[i].active);
              this.filteredList.push(1);
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  selectInternalUser($event) {
    var currentID = $event["srcElement"]["id"];
    currentID = currentID.slice(8);
    console.log(currentID + "here");
    this.selectedID = currentID;
    this.subRoute = '4';
    this.route = '1';

    this.selected.username = this.usernameList[currentID];
    this.selected.userID = this.userIDList[currentID];
    this.selected.firstname = this.firstnameList[currentID];
    this.selected.lastname = this.lastnameList[currentID];
    this.selected.authLevel = this.authLevelList[currentID];
    this.selected.active = this.activeList[currentID];
  }
  
  selectRegisteredEvents($event) {
    var currentID = $event["srcElement"]["id"];
    currentID = currentID.slice(8);
    console.log(currentID + "here");
    this.selectedID = currentID;
    this.subRoute = '1';
    this.route = '3';

    this.extSelected.userID = this.extUserTable.UID[currentID];
    this.extSelected.email = this.extUserTable.email[currentID];
    this.extSelected.firstname = this.extUserTable.firstname[currentID];
    this.extSelected.lastname = this.extUserTable.lastname[currentID];
    this.extSelected.balance = this.extUserTable.balance[currentID];
    this.extSelected.active = this.extUserTable.active[currentID];
    this.getUserRegisteredEvents();
  }

  editAuthLevel($val) {
    console.log("here " + $val);
    this.selected.authLevel = $val;
  }  

  changeInternalPasswordBtn() {
    if(this.changeInternalPW == 0) {
      this.changeInternalPW = 1;
    }
    else {
      this.changeInternalPW = 0;
    }
  }

  changeUserInternalPassword() {
    if(this.changeInternalPW == 1) {
      if(!this.selected.newPassword || this.selected.newPassword.length < 5) {
        this.changeInternalPWResponse = "Invalid password, please enter a password with 5 characters or more";
        this.changepasswordStatus = 0;
        return;
      }
      //check if the password is the same
      if(this.selected.newRePassword == this.selected.newPassword) {
        var newepassword = crypto.MD5(this.selected.newPassword + this.selected.username).toString();
        let data = {'user': this.selected.username, 'userid': this.selected.userID, 'newepassword': newepassword};
        this.http.post(this.jsonURL.getChangeInternalUserPWURL(), data)
          .subscribe(
            (res) => {
              if(!res) {
                console.log("failed to make changes");
                return;
              }
              if(res.toString() != "") {
                if(res['valid'] == '1') {
                  this.changeInternalPWResponse = "Password Successfully Changed";
                  this.changepasswordStatus = 1;
                }
                else {
                  this.changeInternalPWResponse = "Password Change Failed";
                  this.changepasswordStatus = 0;
                }
              }
            },
            err => {
              console.log(err);
              //finish loading
            }
        );
      }
      else {
        this.changeInternalPWResponse = "The specified passwords do not match";
        this.changepasswordStatus = 0;
      }
    }
    else {
      
    }
  }

  editUserDetailsApply() {
    let data = {'username': this.selected.username, 'UID': this.selected.userID, 'authLevel': this.selected.authLevel, 'firstname' : this.selected.firstname, 'lastname' : this.selected.lastname};
    this.http.post(this.jsonURL.getApplyInternalUserChangesURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            return;
          }
          if(res.toString() != "") {
            if(res['valid'] == '1') {
              this.successMessageInternal = "Changes Successfully Applied!";
              this.subRoute = '5';
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  setCredit0() {
    this.externalCreateUser.balance = 0;
  }
  setCredit1() {
    this.externalCreateUser.balance = 10;
  }
  setCredit2() {
    this.externalCreateUser.balance = 12;
  }

  registerExternalUser() {
    //validate form
    this.validateExtForm();
    var randomPin = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    console.log(randomPin);
    this.extTempPin = randomPin;
    var activeAccount = 1;
    //no validation issues begin account creation
    if(this.extFormErrors == 0) {
      var newEpin = crypto.MD5(randomPin + this.externalCreateUser.email).toString();
      let data = {'email': this.externalCreateUser.email, 'ePin': newEpin, 'firstname': this.externalCreateUser.firstname, 'lastname': this.externalCreateUser.lastname,'active': activeAccount,  'balance': this.externalCreateUser.balance};
      this.http.post(this.jsonURL.getRegisterExternalUserURL(), data)
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
  }

  validateExtForm() {
    this.extFormErrors = 0;
    this.formErrors = [];
    if(!this.externalCreateUser.firstname ||this.externalCreateUser.firstname.length < 1) {
      this.formErrors.push("*Please enter a first name");
      this.extFormErrors = 1;
    }
    if(!this.externalCreateUser.lastname || this.externalCreateUser.lastname.length < 1) {
      this.formErrors.push("*Please enter a last name");
      this.extFormErrors = 1;
    }
    if(!this.externalCreateUser.email) {
      this.extFormErrors = 1;
    }
    if(!this.externalCreateUser.email || this.externalCreateUser.email.length < 5) {
      this.formErrors.push("*Please enter a valid email address");
      this.extFormErrors =1;
    }
  }


  /*

                this.userIDList.push(res[i].UID);
              this.usernameList.push(res[i].username);
              this.firstnameList.push(res[i].firstname);
              this.lastnameList.push(res[i].lastname);
              this.authLevelList.push(res[i].authLevel);
              this.activeList.push(res[i].active);
  */
  getExtUserTable() {
    this.extUserTable.UID = [];
    this.extUserTable.email = [];
    this.extUserTable.firstname = [];
    this.extUserTable.lastname = [];
    this.extUserTable.balance = [];
    this.extUserTable.active = [];

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
              this.extUserTable.UID.push(res[i].UID);
              this.extUserTable.email.push(res[i].email);
              this.extUserTable.firstname.push(res[i].firstname);
              this.extUserTable.lastname.push(res[i].lastname);
              this.extUserTable.balance.push(res[i].balance);
              this.extUserTable.active.push(res[i].active);
              this.extUserTable.filtered.push(1);
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  selectExtUser($event) {
    var currentID = $event["srcElement"]["id"];
    currentID = currentID.slice(8);
    console.log(currentID + "here");
    this.selectedID = currentID;
    this.subRoute = '4';
    this.route = '2';

    this.extSelected.userID = this.extUserTable.UID[currentID];
    this.extSelected.email = this.extUserTable.email[currentID];
    this.extSelected.firstname = this.extUserTable.firstname[currentID];
    this.extSelected.lastname = this.extUserTable.lastname[currentID];
    this.extSelected.balance = this.extUserTable.balance[currentID];
    this.extSelected.active = this.extUserTable.active[currentID];
  }

  resetCurrentExtUserPin() {
    var randomPin = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    this.resetDisplayPin = randomPin;
    this.resetPinStatus = 1;

    var newEpin = crypto.MD5(randomPin + this.extSelected.email).toString();

    let data = {'email': this.extSelected.email, 'userid': this.extSelected.userID, 'newepin': newEpin};
    this.http.post(this.jsonURL.getResetExtPinURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            console.log("failed to make changes");
            return;
          }
          if(res.toString() != "") {
            if(res['valid'] == '1') {
              this.changeInternalPWResponse = "Pin Successfully Changed";
              console.log(this.changeInternalPWResponse);
              this.changepasswordStatus = 1;
            }
            else {
              
              this.changeInternalPWResponse = "Pin Change Failed";
              console.log(this.changeInternalPWResponse);
              this.changepasswordStatus = 0;
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  setExtCredit0() {
    this.extSelected.balance = 0;
  }
  setExtCredit10() {
    this.extSelected.balance = 10;
  }
  setExtCredit20() {
    this.extSelected.balance = 20;
  }

  editUserExtDetailsApply() {
    let data = {'email': this.extSelected.email, 'userid': this.extSelected.userID, 'firstname' : this.extSelected.firstname, 'lastname' : this.extSelected.lastname, 'balance': this.extSelected.balance};
    this.http.post(this.jsonURL.getApplyAccountURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            return;
          }
          if(res.toString() != "") {
            if(res['valid'] == '1') {
              this.successMessageInternal = "Changes Successfully Applied!";
              this.subRoute = '5';
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  confirmDeleteExt() {
    if(this.hideDeleteFrame == '0') {
      this.hideDeleteFrame = '1';
    }
    else {
      this.hideDeleteFrame = '0';
    }
    
  }
  deleteExtAccount() {
    let data = {'email': this.extSelected.email, 'userid': this.extSelected.userID};
    this.http.post(this.jsonURL.getDeleteExtAccountURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            return;
          }
          if(res.toString() != "") {
            console.log(res);
            if(res['valid'] == '1') {
              this.successMessageInternal = "Account successfully deleted";
              this.subRoute = '5';
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  setEditFilter($val) {
    //selected filter values
    this.editFilter = $val;
    this.applyEditIntFilter();
  }

  applyEditIntFilter() {
    this.resetFilter();
    var filterOption = this.editFilter;
    var currentFilter = this.filter.value.toString().toLowerCase();
    for(let i =0; i < this.filteredList.length; i++) {
      //uid filter
      if(filterOption == 1) {
        var currentVal = this.userIDList[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.filteredList[i] = 0;
        }
      } 
      //username filter
      else if(filterOption == 2) {
        var currentVal = this.usernameList[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.filteredList[i] = 0;
        }
      }
      //firstname filter
      else if(filterOption == 3) {
        var currentVal = this.firstnameList[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.filteredList[i] = 0;
        }
      } 
      //lastname filter
      else if(filterOption == 4) {
        var currentVal = this.lastnameList[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.filteredList[i] = 0;
        }
      }
    }
  }
  
  resetFilter() {
    for(let i =0; i < this.filteredList.length; i++) {
      this.filteredList[i] = 1;
    }
  }

  setEditExtFilter($val) {
    //selected filter values
    this.editExtFilter = $val;
    this.applyEditExtFilter();
  }

  resetExtFilter() {
    for(let i =0; i < this.extUserTable.filtered.length; i++) {
      this.extUserTable.filtered[i] = 1;
    }
  }

  applyEditExtFilter() {
    this.resetExtFilter();
    var filterOption = this.editExtFilter;
    var currentFilter = this.extFilter.value.toString().toLowerCase();
    for(let i =0; i < this.extUserTable.filtered.length; i++) {
      //uid filter
      if(filterOption == 1) {
        var currentVal = this.extUserTable.UID[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.extUserTable.filtered[i] = 0;
        }
      } 
      //Email filter
      else if(filterOption == 2) {
        var currentVal = this.extUserTable.email[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.extUserTable.filtered[i] = 0;
        }
      }
      //First filter
      else if(filterOption == 3) {
        var currentVal = this.extUserTable.firstname[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.extUserTable.filtered[i] = 0;
        }
      } 
      //Last filter
      else if(filterOption == 4) {
        var currentVal = this.extUserTable.lastname[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.extUserTable.filtered[i] = 0;
        }
      }
      else if(filterOption == 5) {
        var currentVal = this.extUserTable.balance[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.extUserTable.filtered[i] = 0;
        }
      }
    }
  }

  getUserRegisteredEvents() {
    this.registeredEvents.eventID = [];
    this.registeredEvents.classID = [];
    this.registeredEvents.className = [];
    this.registeredEvents.eventDay = [];
    this.registeredEvents.showCancel = []; 

    let data = {'UID': this.extSelected.userID};
    this.http.post(this.jsonURL.getUserRegisteredEventsURL(), data)
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
              this.registeredEvents.eventID.push(res[i].eventID);
              this.registeredEvents.classID.push(res[i].classID);
              this.registeredEvents.className.push(res[i].className);
              this.registeredEvents.eventDay.push(res[i].eventDay);
              this.registeredEvents.showCancel.push(0);
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }
  showReservationCancelConfirm($i) {
    if(this.registeredEvents.showCancel[$i] == 1) {
      this.registeredEvents.showCancel[$i] = 0;
    }
    else {
      this.registeredEvents.showCancel[$i] = 1;
    }
  }

  cancelReservation($i) {
    var currentEvent = this.registeredEvents.eventID[$i];
    var currentUserID =this.extSelected.userID;
    let data = {'UID': currentUserID, 'eventID': currentEvent};
    this.http.post(this.jsonURL.getCancelReservationURL(), data)
    .subscribe(
      (res) => {
        if(!res) {
          return;
        }
        if(res.toString() != "") {
          console.log(res);
          this.successMessageInternal = res["message"];
          this.getUserRegisteredEvents();
        }
      },
      err => {
        console.log(err);
        //finish loading
      }
    );
  }

}
