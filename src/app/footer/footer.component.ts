import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  UiData: any;
  BgColor: any;
  BgloginColor: any;

  constructor( private userdataService: UserDataService) { }

  ngOnInit(): void {
    this.GetDetails();
  }
  GetDetails() {
    this.userdataService.GetDetails().subscribe((data) => {
      this.UiData = data.standards;
      this.BgColor = this.UiData.LOGIN_PAGE_BG_COLOR
      this.BgloginColor = this.UiData.LOGIN_BOX_COLOR

    })
  }
}
