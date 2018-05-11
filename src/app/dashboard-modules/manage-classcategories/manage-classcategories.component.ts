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
  constructor(private http: HttpClient, private jsonURL:GetJsonService, private dashroute:DashrouteService) { }

  ngOnInit() {
    this.route = 0;
    this.subRoute = 0;
  }

}
