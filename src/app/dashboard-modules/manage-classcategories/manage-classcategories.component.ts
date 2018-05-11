import { Component, OnInit } from '@angular/core';
import { DashrouteService } from '../../services/dashroute.service';
import { HttpClient } from '@angular/common/http';
import { GetJsonService } from '../../services/get-json.service';
import * as crypto from 'crypto-js';


@Component({
  selector: 'app-manage-classcategories',
  templateUrl: './manage-classcategories.component.html',
  styleUrls: ['./manage-classcategories.component.scss']
})
export class ManageClasscategoriesComponent implements OnInit {
  private route;
  private subRoute;
  private addClassCategory:any={};
  private successMessageInternal;
  private formErrors;

  constructor(private http: HttpClient, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.route = 0;
    this.subRoute = 0;
    this.addClassCategory.hexColor = "#000000";
  }

  goCreateCategory() {
    this.route = 1;
    this.subRoute = 0;
  }

  goEditClassCategory() {
    this.route = 2;
    this.subRoute = 0;
  }

  goToDashboard() {
    this.dashroute.currentRoute = '/';
    this.dashroute.currentTitle = "Dashboard";
  }
  

  onChangeColor($event) {
    this.addClassCategory.hexColor = $event;
  }
  createCategoryButton() {
    if(this.validateCreateCategoryForm() == false) {
      return;
    }

    let data = {'categoryName': this.addClassCategory.cCategoryName, 'hexColor': this.addClassCategory.hexColor};
    this.http.post(this.jsonURL.getCreateClassCategoryURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            console.log("failed to create class category");
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

  validateCreateCategoryForm() {
    this.formErrors = [];
    var validate = true;
    //validate category name
    if(!this.addClassCategory.cCategoryName || this.addClassCategory.cCategoryName.length < 1) {
      this.formErrors.push("* Please enter a Class Category Name");
      validate = false;
    }
    return validate;
  }

}
