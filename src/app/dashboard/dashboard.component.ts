import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private active = '';
  //https://fontawesome.bootstrapcheatsheets.com/
  constructor(private router:Router, private session:SessionService) { 
    this.active = this.session.getActive();
    console.log(this.active);
    if(!this.active) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
