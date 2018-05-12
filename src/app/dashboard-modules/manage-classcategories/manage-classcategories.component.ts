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
  private categoryFilter: any={};

  //edit category table
  private editCategoryTable: any={};
  private categoryTypeFilter = 1;
  private editCategoryFilter: any={};

  //select category
  private selectedID;


  constructor(private http: HttpClient, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.route = 0;
    this.subRoute = 0;
    this.addClassCategory.hexColor = "#000000";
    this.getClassCategorytable();
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

  getClassCategorytable() {
    this.editCategoryTable.categoryID = [];
    this.editCategoryTable.categoryName = [];
    this.editCategoryTable.hexColor = [];
    this.editCategoryTable.filtered = [];
    let data = {};
    this.http.post(this.jsonURL.getClassCategoriesURL(), data)
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
              this.editCategoryTable.categoryID.push(res[i].categoryID);
              this.editCategoryTable.categoryName.push(res[i].categoryName);
              this.editCategoryTable.hexColor.push(res[i].hexColor);
              this.editCategoryTable.filtered.push(1);
            }
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

  setCategoryFilter($val) {
    //selected filter values
    this.categoryTypeFilter = $val;
    this.applyCategoryFilter();
  }

  resetCategoryFilter() {
    for(let i =0; i < this.editCategoryTable.filtered.length; i++) {
      this.editCategoryTable.filtered[i] = 1;
    }
  }

  applyCategoryFilter() {
    this.resetCategoryFilter();
    var filterOption = this.categoryTypeFilter;
    if(!this.editCategoryFilter.value) {
      return;
    }
    var currentFilter = this.editCategoryFilter.value.toString().toLowerCase();
    for(let i =0; i < this.editCategoryTable.filtered.length; i++) {
      //uid filter
      if(filterOption == 1) {
        if(!this.editCategoryTable.categoryID[i]) {
          return;
        }
        var currentVal = this.editCategoryTable.categoryID[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.editCategoryTable.filtered[i] = 0;
        }
      } 
      //First filter
      else if(filterOption == 2) {
        if(!this.editCategoryTable.categoryName[i]) {
          return;
        }
        var currentVal = this.editCategoryTable.categoryName[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.editCategoryTable.filtered[i] = 0;
        }
      } 
      //Last filter
      else if(filterOption == 3) {
        if(!this.editCategoryTable.hexColor[i]) {
          return;
        }
        var currentVal = this.editCategoryTable.hexColor[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.editCategoryTable.filtered[i] = 0;
        }
      }
    }
  }

  selectCategory($event) {
    var currentID = $event["srcElement"]["id"];
    currentID = currentID.slice(8);
    this.selectedID = currentID;
    this.route = '2';
    this.subRoute = '1';
    
    this.editCategoryTable.categoryID = this.editCategoryTable.categoryID[currentID];
    this.editCategoryTable.categoryName = this.editCategoryTable.categoryName[currentID];
    this.editCategoryTable.hexColor = this.editCategoryTable.hexColor[currentID];
  }

}
