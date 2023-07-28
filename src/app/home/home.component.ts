import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { UserDataService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  UiData
  bannerImage: any;
  BgColor: any;
  holdData: any;
  constructor(private userdataService: UserDataService, private router: Router) { }

  ngOnInit(): void {
    this.GetDetails();
  }
  GetDetails() {
    this.userdataService.GetDetails().subscribe((data) => {
      this.UiData = data.standards;
      this.bannerImage = this.UiData.banner_image
      this.UiData = data.standards;
      this.BgColor = this.UiData.LOGIN_PAGE_BG_COLOR
    })

    this.userdataService.getCard('HOMEPAGE').subscribe((data) => {
      this.holdData = data.pageDetails
      console.log(this.holdData)

    })
  }

}
