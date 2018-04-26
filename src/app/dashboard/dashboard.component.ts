import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { GetJsonService } from '../services/get-json.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private active = '';
  private moduleNames: any[] = [];
  private moduleIcons: any[] = [];
  private moduleRoutes: any[] = [];

  //https://fontawesome.bootstrapcheatsheets.com
  
  constructor(private router:Router, private http: HttpClient, private session:SessionService, private jsonURL:GetJsonService) { 
    this.active = this.session.getActive();
    console.log(this.active);
    if(!this.active) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getModuleNav();
  }

  getModuleNav() {
    let data = {};
    this.http.post(this.jsonURL.getAdminModulesURL(), data)
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
            for(let i = 0; i< count; i++) {
              this.moduleNames.push(res[i].name);
              this.moduleIcons.push(res[i].icon);
              this.moduleRoutes.push(res[i].route);
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
