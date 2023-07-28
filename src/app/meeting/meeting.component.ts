import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../services';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  Holdid: any;
  constructor(private userdataService: UserDataService, private router: Router,private route: ActivatedRoute,) { }
  ngOnInit(): void {
    this.Holdid = this.route.snapshot.params['id'];
  }
  async ngAfterContentInit(): Promise<any> {
    const { ZoomMtg } = await import('@zoomus/websdk')
    ZoomMtg.setZoomJSLib('https://source.zoom.us/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();

    let payload = {
      meetingNumber: '75219681243',
      passWord: 'R3VPNC',
      sdkKey: 'd9ak8hyW8XmD8lykrx9MY2QS7lYWgLwDYqzN',
      sdkSecret: 't0jrmpyT1EkCH1m5VHuVeEHxI9HUteVteliw',
      userName: 'lms',
      userEmail: 'vivekanand.n@digiaplus.com',
      role: '0',
      leaveUrl: ''
    };
    ZoomMtg.generateSDKSignature({
      meetingNumber: payload.meetingNumber,
      role: payload.role,
      sdkKey: payload.sdkKey,
      sdkSecret: payload.sdkSecret,
      success: function (signature: any) {
        ZoomMtg.init({
          leaveUrl: payload.leaveUrl,
          success: function (data: any) {
            ZoomMtg.join({
              meetingNumber: payload.meetingNumber,
              passWord: payload.passWord,
              sdkKey: payload.sdkKey,
              userName: payload.userName,
              userEmail: payload.userEmail,
              signature: signature.result,
              tk: '',
              success: function (data: any) {
                console.log(data)
              },
              error: function (error: any) {
                console.log(error);

              }
            })
          },
          error: function (error: any) {
            console.log(error);

          }
        })
      },
      error: function (error: any) {
        console.log(error)
      }
    })
  }
}



