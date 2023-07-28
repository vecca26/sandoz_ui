import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../services';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  HoldData: any;
  UiData: any;
  BgColor: any;
  BgloginColor: any;
  HoldProfileData: any;
  journeyFlow:any
  Resources:any;
  quizpoll:any;
  constructor(private userdataService: UserDataService,private router: Router) { }

  ngOnInit(): void {
    this.GetDetails();
    this.getSideBar();
    this.getProfileDetails();
    this.journeyFlow = false;
    this.Resources = false;
    this.quizpoll = false;
  }
  // getJounery() {
  //   this.userdataService.GetJounery(false).subscribe((data) => {
  //     this.HoldData = data.Program_flow;
  //   })
  // }
  getSideBar() {
    this.userdataService.SideBarMenu().subscribe((data) => {
      this.HoldData = data;
    })
  }
  GetDetails() {
    this.userdataService.GetDetails().subscribe((data) => {
      this.UiData = data.standards;
      this.BgColor = this.UiData.LOGIN_PAGE_BG_COLOR
      this.BgloginColor = this.UiData.LOGIN_BOX_COLOR

    })
  }
  Module(value1, value2, value3, value4, value5,value6) {
    if (value3 == '0') {
      Swal.fire(value5)
    }
    else if (value3 == '1') {
      console.log(value3)
      this.router.navigate(['/showjounery/' + value2, value1, value4, value3, value5,value6 + '']);
    }
  }
  getProfileDetails() {
    this.userdataService.profileDetails().subscribe((data) => {
      this.HoldProfileData = data.details;
    })
  }
  showJourneyFlow(){
    this.journeyFlow = ! this.journeyFlow;
    this.Resources = false;
    this.quizpoll = false;

  }
  resource(){
    this.journeyFlow = false;
    this.Resources = ! this.Resources;
    this.quizpoll = false;
  }
  Quiz_Polls(){
    this.journeyFlow = false;
    this.Resources = false;
    this.quizpoll = !this.quizpoll;
  }
}
