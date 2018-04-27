import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetJsonService } from '../../services/get-json.service';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  constructor(private http: HttpClient, private jsonURL:GetJsonService) { }
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

  ngOnInit() {
  }

  goToInternal() {
    this.route = '1';
    this.subRoute = '0';
  }

  goCreateInternal() {
    this.subRoute = '1';
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
    var epassword = crypto.MD5(this.intpassword + this.intusername).toString();
    let data = {'username': this.intusername, 'epassword': epassword, 'authlevel': this.intaccessLevel, 'firstname': this.intfirstname, 'lastname': this.intlastname,'active': this.intactive};
    this.http.post(this.jsonURL.getInternalUserCreateURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            console.log("failed to register");
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
  
  initInternalData() {
    this.intusername = this.model.intusername;
    this.intpassword = this.model.intpassword;
    this.intfirstname = this.model.intfirstname;
    this.intlastname = this.model.intlastname;
    console.log(this.intaccessLevel);
  }

}
