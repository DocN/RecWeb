import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private active = '';
  constructor(private session:SessionService) { 
    this.active = this.session.getActive();
  }

  ngOnInit() {
  }

}
