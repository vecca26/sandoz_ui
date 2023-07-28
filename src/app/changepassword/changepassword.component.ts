import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, UserDataService } from '../services';
import Swal from 'sweetalert2';
import { first } from 'rxjs';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  UiData: any;
  BgColor: any;
  BgloginColor: any;
  url: any;
  token: any;

  constructor(private userdataService: UserDataService,private authenticationService: AuthenticationService,
    private router: Router,private Activatedroute: ActivatedRoute,) {this.token = this.Activatedroute.snapshot.params['token']; }

  ngOnInit(): void {
    this.GetDetails();
  }
  GetDetails() {
    this.userdataService.GetDetails().subscribe((data) => {
      this.UiData = data.standards;
      this.BgColor = this.UiData.LOGIN_PAGE_BG_COLOR
      this.BgloginColor = this.UiData.LOGIN_BOX_COLOR
      this.url = this.UiData.login_screen;

    })
  }
  signIn(form: NgForm) {
    let password: string = form.value.Password;
    let confirm_password: string = form.value.confirmPassword;
    if (!form.valid) {
      return;
    }

    if (password == "") {
      Swal.fire("Please Enter The Password");
      return
    }
    if (confirm_password == "") {
      Swal.fire("Please Enter Confirm Password");
      return
    }
    if (password != confirm_password) {
      Swal.fire('Password and confirm password should match');
      return
    }
    console.log(this.token,password)
    this.authenticationService.changePassword(password,this.token).pipe(first())
      .subscribe(
        res => {
          console.log(res)
          if (res.message) {
            
            Swal.fire(res.message);
            this.router.navigate(['/login']);
          } 
        }
      )
  }
}
