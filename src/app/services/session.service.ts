import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  private currentSession;
  private uid;
  private username;
  private authLevel;
  private firstname;
  private lastname;
  private active;
  private logintime;


  constructor() { 
    this.reloadSession();
  }

  establishSession(data) {
    this.currentSession = data;
    this.uid = this.currentSession["uid"];
    this.username = this.currentSession["username"];
    this.authLevel = this.currentSession["authLevel"];
    console.log(this.authLevel);
    this.firstname = this.currentSession["firstname"];
    this.lastname = this.currentSession["lastname"];
    this.active = this.currentSession["active"];
    localStorage.setItem('activeSession', JSON.stringify(this.currentSession));
  }

  //reload session from local machine
  reloadSession() {
    var savedSession = localStorage.getItem('activeSession');
    if(savedSession) {
      var jSavedSession = JSON.parse(savedSession);
      this.establishSession(jSavedSession);
    }
  }
  
  logout() {
    this.uid = '';
    this.username = '';
    this.authLevel = '100';
    this.firstname = '';
    this.lastname = '';
    this.active = '';
    localStorage.removeItem('activeSession');
  }
  
  getUid() {
    return this.uid;
  }
  getUsername() {
    return this.username;
  }
  getAuthLevel() {
    return this.authLevel;
  }
  getFirstname() {
    return this.firstname;
  }
  getLastname() {
    return this.lastname;
  }
  getActive() {
    return this.active;
  }

}
