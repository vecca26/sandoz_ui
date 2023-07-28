import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { UserDataService } from '../services';
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;


  constructor(private userdataService: UserDataService) { }

  ngOnInit(): void {
    this.userdataService.receivedMsg().subscribe(
      (data) => { this.loadCertificate(data) }
    )
  }

  loadCertificate(data) {
    setTimeout(() => {
      console.log(data);
      var name = 'DR John'
      var canvas2 = document.getElementById('myCanvas2') as HTMLCanvasElement;
      var context = canvas2.getContext('2d');
      var imageObj = new Image();
      imageObj.src = 'https://sandoz-lms.s3.ap-south-1.amazonaws.com/Images/Image20230123181324.jpg';
      imageObj.onload = function () {
        context.drawImage(imageObj, 100, 50);
        context.font = "bolder 24px Calibri";
        context.fillText(name, 500, 375);
      };
    }, 1000);
  }

  downloadImage() {
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'Your_course_completion_certificate.png';
      this.downloadLink.nativeElement.click();
    });
  }
}
