import { Component, OnInit } from '@angular/core';
import { DashrouteService } from '../../services/dashroute.service';
import { HttpClient } from '@angular/common/http';
import { GetJsonService } from '../../services/get-json.service';
import * as crypto from 'crypto-js';


@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.scss']
})
export class ManageClassesComponent implements OnInit {
  private route;
  private subRoute;
  private addClass: any={};
  private instructorTable: any={};
  private classCategorytable: any={};
  private selectedInstructor;
  private currentImage;
  private currentInstructorName;
  private addBeginDate = new Date();
  private addEndDate = new Date();
  private addBeginTime = new Date();
  private addEndTime = new Date();
  private addClassImage = '../../../assets/images/gym.jpg';
  private successMessageInternal;
  private errorMessages = []; 
  private selectedCategory;

  //edit class table
  private editClassTable: any= {};
  private filter: any= {};
  private optionFilter;
  private selectedClass; 
  private selectedClassData: any= {};
  private changeInstructor;
  private changeClassCategory;
  private showSlots;
  private selectedReserveSlotTable: any = {};
  private reservedList = [];
  private changeReservedMessage;
  private changeReservedMessageBad;
  //validation patterns
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";


  constructor(private http: HttpClient, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.route = '1';
    this.subRoute = '0';
    this.selectedInstructor = 0;
    this.selectedCategory = 0;
    this.addClass.dayOfWeek = 1;
    this.getInstructorTable();
    this.getClassCategories();
    this.getEditClassTable();
    this.changeInstructor = 0;
    this.changeClassCategory = 0;
    this.showSlots = 0;
    this.optionFilter = 1;
  }

  goCreateClass() {
    this.route = '2';
    this.subRoute = '0';
  }

  goToDashboard() {
    this.dashroute.currentRoute = '/';
    this.dashroute.currentTitle = "Dashboard";
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
            this.selectedInstructor = 0;
            this.loadInstructor();
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  getClassCategories() {
    this.classCategorytable.categoryID = [];
    this.classCategorytable.categoryName = [];
    this.classCategorytable.hexColor = [];

    let data = {};
    this.http.post(this.jsonURL.getClassCategoriesURL(), data)
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
              this.classCategorytable.categoryID.push(res[i].categoryID);
              this.classCategorytable.categoryName.push(res[i].categoryName);
              this.classCategorytable.hexColor.push(res[i].hexColor);
            }
            this.selectedCategory = 0;
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  setClassInstructor($event) {
    this.selectedInstructor = $event;
    this.loadInstructor();
  }

  loadInstructor() {
    this.currentInstructorName = this.instructorTable.firstname[this.selectedInstructor] + ' ' + this.instructorTable.lastname[this.selectedInstructor];
    this.currentImage = this.instructorTable.photourl[this.selectedInstructor];
  }

  
  uploadAnImage($event) {
    var file = $event.target.files[0];
    let formData = new FormData();
      formData.append('file', file);
    
    this.http.post(this.jsonURL.getUploadClassImageURL(), formData)
    .subscribe(
      (res) => {
        if(res.toString() != "") {
          if(res['result'] == true) {
            this.addClassImage = res['url'];
          }
        }
      },
      err => {
        console.log(err);
        //finish loading
      }
    );
  }

  setDayOfWeek($val) {
    this.addClass.dayOfWeek = $val;
  }
  createClass() {
    this.convertToUnix();

    if(!this.validateAddClassForm()) {
      return;
    }
    let data = {'categoryID': this.classCategorytable.categoryID[this.selectedCategory], 'instructorID': this.instructorTable.instructorID[this.selectedInstructor], 'className': this.addClass.className, 'classLocation': this.addClass.classLocation, 'reservedSlots': this.addClass.reservedSlot, 'availableSlots': this.addClass.maxSlot, 'beginDate': this.addClass.UnixBeginDate, 'endDate': this.addClass.UnixEndDate, 'beginHour': this.addBeginTime.getHours(), 'beginMin': this.addBeginTime.getMinutes(), 
    'endHour': this.addEndTime.getHours(), 'endMin': this.addEndTime.getMinutes(), 'dayOfWeek': this.addClass.dayOfWeek, 'classDescription': this.addClass.classDescription, 'classImageURL': this.addClassImage};
    console.log(data);
    this.http.post(this.jsonURL.getAddClassURL(), data)
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

  printTester() {
    //unix time
    //console.log((this.addBeginDate.getTime()/1000));
    console.log(this.addBeginTime.getHours());
    console.log(this.addBeginTime.getMinutes());
  }

  convertToUnix() {
    this.addClass.UnixBeginDate = Math.round(this.addBeginDate.getTime()/1000);
    this.addClass.UnixEndDate = Math.round(this.addEndDate.getTime()/1000);
  }

  validateAddClassForm() {
    this.errorMessages = [];
    var validate = true;
    if(!this.addClass.className || this.addClass.className.length < 1) {
      this.errorMessages.push("*Please enter a class name");
      validate = false;
    }
    if(!this.addClass.classLocation || this.addClass.classLocation.length < 1) {
      this.errorMessages.push("*Please enter a class location");
      validate = false;
    }
    if(!this.addClass.reservedSlot) {
      this.errorMessages.push("*No reserved slots specified");
      validate = false;
    }
    else {
      if(this.addClass.reservedSlot < 0) {
        this.errorMessages.push("*Please enter a valid number of reserved slots");
        validate = false;
      }
    }
    if(!this.addClass.maxSlot) {
      this.errorMessages.push("*Please enter valid maximum number of slots");
      validate = false;
    }
    else {
      if(this.addClass.maxSlot < 0) {
        this.errorMessages.push("*Please enter a valid maximum number of slots");
        validate = false;
      }
      else if(this.addClass.maxSlot < this.addClass.reservedSlot) {
        this.errorMessages.push("*Please enter a maximum number of slots greater than the number of reserved slots");
        validate = false;
      }
    }
    if(!this.addClass.classDescription || this.addClass.classDescription.length < 0) {
      this.errorMessages.push("*Please enter a class description");
      validate = false;
    }
    if(this.compareClassTime() == false) {
      this.errorMessages.push("*Class start time can not be equal to or earlier than class end time!");
      validate = false;
    }
    if(this.compareDates() == false) {
      this.errorMessages.push("*Class begin date can not be earlier than class end date!");
      validate = false;
    }
    return validate;
  }

  compareClassTime() {
    var beginHours = this.addBeginTime.getHours();
    var beginMins = this.addBeginTime.getMinutes();

    var endHours = this.addEndTime.getHours();
    var endMins = this.addEndTime.getMinutes();
    if(beginHours > endHours) {
      return false;
    }
    else if(beginHours == endHours) {
      if(beginMins >= endMins) {
        return false;
      }
    }
    return true;
  }

  compareDates() {
    if(this.addBeginDate.getTime() > this.addEndDate.getTime()) {
      return false;
    }
    return true;
  }

  setClassCategory($event) {
    this.selectedCategory = $event;
  }

  goToEditClasses() {
    this.route = 3;
    this.subRoute = 0;
  }

  getEditClassTable() {
    this.editClassTable.classID = [];
    this.editClassTable.className = [];
    this.editClassTable.classLocation = [];
    this.editClassTable.instructorID = [];
    this.editClassTable.categoryID = [];
    this.editClassTable.reservedSlots = [];
    this.editClassTable.availableSlots = [];
    this.editClassTable.beginDate = [];
    this.editClassTable.endDate = [];
    this.editClassTable.beginHour = [];
    this.editClassTable.beginMin = [];
    this.editClassTable.endHour = [];
    this.editClassTable.endMin = [];
    this.editClassTable.dayOfWeek = [];
    this.editClassTable.classDescription = [];
    this.editClassTable.classImageURL = [];
    this.editClassTable.categoryName = [];
    this.editClassTable.hexColor = [];
    this.editClassTable.firstname = [];
    this.editClassTable.lastname = [];
    this.editClassTable.photoURL = [];
    this.editClassTable.filtered = [];
    let data = {};
    this.http.post(this.jsonURL.getClassTableURL(), data)
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
              this.editClassTable.classID.push(res[i].classID);
              this.editClassTable.className.push(res[i].className);
              this.editClassTable.classLocation.push(res[i].classLocation);
              this.editClassTable.instructorID.push(res[i].instructorID);
              this.editClassTable.categoryID.push(res[i].categoryID);
              this.editClassTable.reservedSlots.push(res[i].reservedSlots);
              this.editClassTable.availableSlots.push(res[i].availableSlots);
              this.editClassTable.beginDate.push(res[i].beginDate);
              this.editClassTable.endDate.push(res[i].endDate);
              this.editClassTable.beginHour.push(res[i].beginHour);
              this.editClassTable.beginMin.push(res[i].beginMin);
              this.editClassTable.endHour.push(res[i].endHour);
              this.editClassTable.endMin.push(res[i].endMin);
              this.editClassTable.dayOfWeek.push(res[i].dayOfWeek);
              this.editClassTable.classDescription.push(res[i].classDescription);
              this.editClassTable.classImageURL.push(res[i].classImageURL);
              this.editClassTable.categoryName.push(res[i].categoryName);
              this.editClassTable.hexColor.push(res[i].hexColor);
              this.editClassTable.firstname.push(res[i].firstname);
              this.editClassTable.lastname.push(res[i].lastname);
              this.editClassTable.photoURL.push(res[i].photoURL);
              this.editClassTable.filtered.push(1);
            }
            this.selectedInstructor = 0;
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  resetFilter() {
    for(let i =0; i < this.editClassTable.filtered.length; i++) {
      this.editClassTable.filtered[i] = 1;
    }
  }

  setOptionFilter($val) {
    //selected filter values
    this.optionFilter = $val;
    this.applyClassFilter();
  }

  applyClassFilter() {
    this.resetFilter();
    var filterOption = this.optionFilter;
    var currentFilter = this.filter.value.toString().toLowerCase();
    for(let i =0; i < this.editClassTable.filtered.length; i++) {
      //classid filter
      if(filterOption == 1) {
        var currentVal = this.editClassTable.classID[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.editClassTable.filtered[i] = 0;
        }
      } 
      //className filter
      else if(filterOption == 2) {
        var currentVal = this.editClassTable.className[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.editClassTable.filtered[i] = 0;
        }
      }
      //class Location filter
      else if(filterOption == 3) {
        var currentVal = this.editClassTable.classLocation[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.editClassTable.filtered[i] = 0;
        }
      } 
      //Instructor name filter
      else if(filterOption == 4) {
        var currentVal = this.editClassTable.firstname[i].toString().toLowerCase() +  this.editClassTable.lastname[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.editClassTable.filtered[i] = 0;
        }
      }
      //category name filter
      else if(filterOption == 5) {
        var currentVal = this.editClassTable.categoryName[i].toString().toLowerCase();
        if(currentVal.indexOf(currentFilter) == -1) {
          this.editClassTable.filtered[i] = 0;
        }
      }
    }
  }
  
  selectClass($event) {
    var currentID = $event["srcElement"]["id"];
    currentID = currentID.slice(8);
    this.selectedClass = currentID;
    this.subRoute = '1';
    this.route = '3';

    this.selectedClassData.classID = this.editClassTable.classID[currentID];
    this.selectedClassData.className = this.editClassTable.className[currentID];
    this.selectedClassData.classLocation = this.editClassTable.classLocation[currentID];
    this.selectedClassData.instructorID = this.editClassTable.instructorID[currentID];
    this.selectedClassData.categoryID = this.editClassTable.categoryID[currentID];
    this.selectedClassData.reservedSlots = this.editClassTable.reservedSlots[currentID];
    this.selectedClassData.reservedSlotIterator = []; 
    for(let i =0; i < this.selectedClassData.reservedSlots; i++) {
      this.selectedClassData.reservedSlotIterator.push('1');
    }
    this.selectedClassData.availableSlots = this.editClassTable.availableSlots[currentID];
    this.selectedClassData.beginDate = this.editClassTable.beginDate[currentID];
    this.selectedClassData.endDate = this.editClassTable.endDate[currentID];
    this.selectedClassData.beginHour = this.editClassTable.beginHour[currentID];
    this.selectedClassData.beginMin = this.editClassTable.beginMin[currentID];
    this.selectedClassData.endHour = this.editClassTable.endHour[currentID];
    this.selectedClassData.endMin = this.editClassTable.endMin[currentID];
    this.selectedClassData.dayOfWeek = this.editClassTable.dayOfWeek[currentID];
    this.selectedClassData.classDescription = this.editClassTable.classDescription[currentID];
    this.selectedClassData.classImageURL = this.editClassTable.classImageURL[currentID];
    this.selectedClassData.categoryName = this.editClassTable.categoryName[currentID];
    this.selectedClassData.hexColor = this.editClassTable.hexColor[currentID];
    this.selectedClassData.firstname = this.editClassTable.firstname[currentID];
    this.selectedClassData.lastname = this.editClassTable.lastname[currentID];
    this.selectedClassData.photoURL = this.editClassTable.photoURL[currentID];
    this.loadReservedSlots();
  }

  loadReservedSlots() {
    this.selectedReserveSlotTable.email = [];
    this.selectedReserveSlotTable.slotNumber = [];
    let data = {'classID': this.selectedClassData.classID};
    this.http.post(this.jsonURL.getReservedSlotURL(), data)
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
              this.selectedReserveSlotTable.email.push(res[i].email);
              this.selectedReserveSlotTable.slotNumber.push(res[i].slotNumber);
            }
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  applyReservedSlotChange($event) {
    var currentID = $event["srcElement"]["id"];
    currentID = currentID.slice(5);
    console.log(currentID);
    var newEmail = this.selectedReserveSlotTable.email[currentID];
    //validate email input
    if(newEmail.toString().search(this.emailPattern) == -1) {
      this.changeReservedMessageBad = "*Invalid Email address!";
      return;
    }
    else {
      this.changeReservedMessageBad = "";
    }
    var currentSlot = this.selectedReserveSlotTable.slotNumber[currentID];
    let data = {'classID': this.selectedClassData.classID, 'email': newEmail, 'slotNumber': currentSlot};
    this.http.post(this.jsonURL.getUpdateReservedSlotURL(), data)
      .subscribe(
        (res) => {
          if(!res) {
            return;
          }
          if(res.toString() != "") {
            console.log(res["message"]);
            this.changeReservedMessage = res["message"];
          }
        },
        err => {
          console.log(err);
          //finish loading
        }
    );
  }

  enableChangeInstructor() {
    if(this.changeInstructor == 0) {
      this.changeInstructor = 1;
    }
    else {
      this.changeInstructor = 0;
    }
  }

  enableChangeClassCategory() {
    if(this.changeClassCategory == 0) {
      this.changeClassCategory = 1;
    }
    else {
      this.changeClassCategory = 0;
    }
  }

  enableShowSlots() {
    if(this.showSlots == 0) {
      this.showSlots = 1;
    }
    else {
      this.showSlots = 0;
    }
  }

  switchToEvents() {
    this.route = 3;
    this.subRoute = 3;
  }
}
