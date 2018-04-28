import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private fullname;
  constructor(private session:SessionService) { }

  ngOnInit() {
    this.getFullName();
  }

  getFullName() {
    this.fullname = this.session.getFirstname() + " " + this.session.getLastname(); 
  }

}
