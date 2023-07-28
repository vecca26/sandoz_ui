import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserDataService } from '../services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  HoldData: any;

  constructor(private authenticationService: AuthenticationService, private router: Router, private userdataService: UserDataService) { }

  ngOnInit(): void {
    this.GetDetails();
  }
  GetDetails() {
    this.userdataService.GetDetails().subscribe((data) => {
      this.HoldData = data;
      console.log(this.HoldData)
    })
  }


  logout() {
    Swal.fire({
      title: 'Do you want to logout?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
      } else if (result.isDenied) {

      }
    })
  }
}
