import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserDataService } from '../services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  url
  UiData: any;
  BgColor: any;
  BgloginColor: any;
  login: any
  forgot: any
  constructor(private authenticationService: AuthenticationService, private router: Router, private userdataService: UserDataService) { }

  ngOnInit(): void {
    this.login = true
    this.forgot = false
    this.GetDetails();
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }
  GetDetails() {
    this.userdataService.GetDetails().subscribe((data) => {
      this.UiData = data.standards;
      this.BgColor = this.UiData.LOGIN_PAGE_BG_COLOR
      this.BgloginColor = this.UiData.LOGIN_BOX_COLOR
      this.url = this.UiData.login_screen;

    })
  }
  showpassword() {
    this.login = false
    this.forgot = true
  }
  showlogin() {
    this.login = true
    this.forgot = false
  }

  forgotPassword(form: NgForm) {
    let email: string = form.value.Email;
    if (email == "") {
      Swal.fire('Please Enter Email Address');
      return;
    }
    this.authenticationService.forgotPassword(email).pipe(first())
      .subscribe(
        res => {
          console.log(res)
          Swal.fire(res.message);

        })
  }
  signIn(form: NgForm) {
    let email: string = form.value.Email;
    let password: string = form.value.Password;

    if (!form.valid) {
      return;
    }
    if (email == "") {
      Swal.fire('Please Enter Email Address');
      return;
    }
    if (password == "") {
      Swal.fire('Please Enter Password');
      return;
    }
    this.authenticationService.login(email, password).pipe(first())
      .subscribe(
        user => {
          if (user) {
            this.router.navigate(['/home']);
          }
        }
        , error => {
          if (error.status == 401 || error.status == 400) {
            Swal.fire('Please enter the valid credentials')
          }
        })
  }
}
