import { Component, OnInit } from '@angular/core';
import * as crypto from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login-portal',
  templateUrl: './login-portal.component.html',
  styleUrls: ['./login-portal.component.scss']
})
export class LoginPortalComponent implements OnInit {

  constructor(private router:Router, private http: HttpClient, private session:SessionService) { }
  //credentials array
  private model: any = {};

  //auth url
  private loginurl = "http://159.89.138.93/bcitrec/login.php"
  
  ngOnInit() {
  }

  login() {
    var username = this.model.username;
    var epassword = crypto.MD5(this.model.password + username).toString();
    console.log(epassword);
    let data = {'username': username, 'epassword': epassword};
    this.http.post(this.loginurl, data)
      .subscribe(
        (res) => {
          if(res == null) {
            return;
          }
          if( res.toString() != "") {
              console.log(res["username"]);
              this.session.establishSession(res);
              this.router.navigate(['/dashboard']);
              console.log("success");
          }
          else {
            console.log("failed");
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

}
