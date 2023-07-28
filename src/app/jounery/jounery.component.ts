import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserDataService } from '../services';
@Component({
  selector: 'app-jounery',
  templateUrl: './jounery.component.html',
  styleUrls: ['./jounery.component.css']
})
export class JouneryComponent implements OnInit {
  HoldData: any;
  UiData: any;
  BgColor: any;

  constructor(private userdataService: UserDataService, private router: Router) { }

  ngOnInit(): void {
    this.getJounery();
    this. GetDetails();
  }
  GetDetails() {
    this.userdataService.GetDetails().subscribe((data) => {
      this.UiData = data.standards;
      this.BgColor = this.UiData.LOGIN_PAGE_BG_COLOR
    })
  }
  getJounery() {
    this.userdataService.GetJounery(true).subscribe((data) => {
      this.HoldData = data.Program_flow;
      console.log(this.HoldData)
    })
  }

  status(value, value1) {
    if (value == 'ASSIGNED' && value1 == '1') {
      return 'active';
    }
    else if (value == 'ASSIGNED' && value1 == '0') {
      return 'Not';
    }
    else if (value == 'INPROGRESS' && value1 == '1') {
      return 'Inprogress';
    }
    else if (value == 'COMPLETED') {
      return 'completed';
    }
  }

  checkflow(value) {
    if (value == '0') {
      return 'aasigned';
    }
    else if (value == '1') {
      return 'notaasigned';
    }
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
}
