import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserDataService } from '../services';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  HoldData
  @ViewChild('myVideo') myVideo: ElementRef;
  UiData: any;
  BgColor: any;
  BgloginColor: any;
  is_journeyFlow: boolean
  main:boolean
  profile:boolean
  dashboard:boolean
  Progress:boolean
  HoldProfileData: any;
  editprofile:any
  fileToUpload: File;
  url: string;
  onloads: boolean;
  default: boolean;
  name: any;
  email: any;
  phone: any;
  city: any;
  gender: any;
  Status: any;
  dashboardDetails: any;
  constructor(private userdataService: UserDataService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.GetDetails();
    this.main = true
  }
  GetDetails() {
    this.userdataService.GetDetails().subscribe((data) => {
      this.UiData = data.standards;
      this.BgColor = this.UiData.LOGIN_PAGE_BG_COLOR
      this.BgloginColor = this.UiData.LOGIN_BOX_COLOR
    })
  }

  getProfileDetails() {
    this.userdataService.profileDetails().subscribe((data) => {
      this.HoldProfileData = data.details;
      console.log(this.HoldProfileData.PROFILE_PIC);
      
    })
  }

 
  edit(){
    this.editprofile = true;
    this.profile = false
    this.default = true;
    
  }
  ShowProfile() {
    this.editprofile = false;
    this.main = false
    this.profile = true
    this.dashboard = false
    this.Progress = false
    this.getProfileDetails()
  }
  ShowDashboard() {
    this.editprofile = false;
    this.main = false
    this.dashboard = true
    this.profile = false
    this.Progress = false
    this.userdataService.dashboard().pipe(first()).subscribe( res => {
      this.dashboardDetails = res.course_counts
      console.log(this.dashboardDetails);
      
     })
  }

  ShowProgress() {
    this.editprofile = false;
    this.main = false
    this.profile = false
    this.dashboard = false
    this.Progress = true
    this.userdataService.  GetCurrentStatus().pipe(first()).subscribe( res => {
      this.Status = res.course_counts
      console.log(this.Status);
      
     })
  }
  ShowJounery(){
    this.main = true
    this.profile = false
    this.dashboard = false
    this.Progress = false
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if (this.fileToUpload.type != 'image/png' && this.fileToUpload.type != 'image/jpeg' && this.fileToUpload.type != 'image/jpg') {
      Swal.fire("You can only upload JPG,PNG,JPEG Type image as your profile picture")
      return;
    }
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);

  if(this.url != ''){
    this.onloads = true;
    this.default = false;
  }
}
save(form: NgForm){
  this.name =  form.value.name;
  this.email =  form.value.email;
  this.phone =  form.value.phone;
  this.city =  form.value.city;
  this.gender =  form.value.gender;
  var letters = /^[a-z][a-z\s\.]*$/i;
  if (form.value.name.match(letters)) { }
  else {
    Swal.fire('Please Enter Vaild User Name');
    return;
  }
  var phone = /^\d{10}$/
  if (form.value.phone.match(phone)) { }
  else {
    Swal.fire('Please enter vaild phone number');
    return;
  }
  var countryName = /^[A-Za-z]+$/;
  if (form.value.city.match(countryName)) { }
  else {
    Swal.fire('Please Enter Vaild Country Name');
    return;
  }
  this.userdataService.profileupdate(this.name,this.email,this.phone, this.city,this.gender,this.fileToUpload)
  .pipe(first())
  .subscribe(
    res => {
      Swal.fire({
        title: res.message,
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: `Yes`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.getProfileDetails()
          this.editprofile = false;
          this.profile = true
          return;
        }
      })
      
    })
  
}
}
