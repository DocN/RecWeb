import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetJsonService } from '../../services/get-json.service';
import * as crypto from 'crypto-js';
import { DashrouteService } from '../../services/dashroute.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.scss']
})
export class UsersettingsComponent implements OnInit {
  private currentUserSettings: any = {};
  private passwordReport = "";

  constructor(private session:SessionService, private http: HttpClient, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.currentUserSettings.settingUsername = this.session.getUsername();
    this.currentUserSettings.settingFirstname = this.session.getFirstname();
    this.currentUserSettings.settingLastname = this.session.getLastname();
  }

  verifyPassword() {
    if(this.currentUserSettings.newPassword == this.currentUserSettings.reNewPassword) {
      this.passwordReport = "";
      return;
    }
    this.passwordReport = "*Invalid password combination, please try again";
  }

  changePassword() {
    var validate = true;
    if(!this.currentUserSettings.oldPassword || this.currentUserSettings.oldPassword.length < 1) {
      validate = false;
    }
    if(!this.currentUserSettings.newPassword || this.currentUserSettings.newPassword.length < 1) {
      validate = false;
    }
    if(!this.currentUserSettings.reNewPassword || this.currentUserSettings.reNewPassword.length < 1) {
      validate = false;
    }
    if(validate == true) {
      var epassword = crypto.MD5(this.currentUserSettings.newPassword  + this.currentUserSettings.settingUsername).toString();
      console.log(epassword);
      console.log(this.session.getUid());
      var oldEpassword = crypto.MD5(this.currentUserSettings.oldPassword  + this.currentUserSettings.settingUsername).toString();
      console.log(oldEpassword);
      let data = {'userid': this.session.getUid(),'user': this.session.getUsername(), 'newpassword': epassword, 'oldpassword': oldEpassword};
      this.http.post(this.jsonURL.getUserSettingPasswordURL(), data)
        .subscribe(
          (res) => {
            if(!res) {
              console.log("failed to register");
              return;
            }
            if(res.toString() != "") {
              console.log(res["message"]);
            }
          },
          err => {
            console.log(err);
            //finish loading
          }
      );
    }
  }
}
