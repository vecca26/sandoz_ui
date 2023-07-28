import { Component, ElementRef, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../services';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-getjounery',
  templateUrl: './getjounery.component.html',
  styleUrls: ['./getjounery.component.css']
})

export class GetjouneryComponent implements OnInit {

  @ViewChild('slideshow') slideshow: any;
  @Pipe({ name: 'safe' })
  Holdid: any;
  flowtype: any;
  HoldData
  ContentData: any;
  test: any;
  counter
  localcounter;
  question: any;
  option: any;
  module: any;
  ModuleData: any;
  video: any;
  Test: any;
  Showbutton: any;
  checkQuestionType: any;
  radio: any;
  checkbox: any;
  num: any;
  TestID: any;
  TESTQUESTIONID: any;
  ProgramflowID: any;
  isTrue: boolean;
  ModuleId: any;
  Duration: any;
  currentTime: any;
  newvalues: any;
  completed: boolean;
  checkassigned: any;
  answerCount: any;
  ImagePre: any;
  submit: any;
  message: any;
  pdf: any
  CheckForPdf: number;
  UiData: any;
  BgColor: any;
  BgloginColor: any;
  selectedImageIndex: number = -1;
  showFlag: boolean;
  currentIndex: number;
  array: any;
  imageObject = [];
  sidebar: any;
  ResourceType: number;
  certificate
  ImageCertificate: any;
  webinar
  flowStatus: any;
  webinarscreen;
  webinartext
  HoldProfileData: any;
  journeyFlow: boolean;
  Resources: boolean;
  quizpoll: boolean;
  password: any;
  MeetingID: any;
  freetext: boolean;
  modulejouneryIndex;
  constructor(
    private userdataService: UserDataService,
    private route: ActivatedRoute,
    private router: Router,
    private domSanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.Holdid = this.route.snapshot.params['id'];
    this.flowtype = this.route.snapshot.params['flowtype'];
    this.ProgramflowID = this.route.snapshot.params['flowid'];
    this.checkassigned = this.route.snapshot.params['checkassigned'];
    this.message = this.route.snapshot.params['checkassigned'];
    this.modulejouneryIndex = this.route.snapshot.params['index'];
    this.ImagePre = false;
    this.submit = true;
    this.certificate = true;
    this.getJounery()
    this.showContent(this.Holdid, this.flowtype, this.ProgramflowID, this.checkassigned, this.message, this.modulejouneryIndex);
    this.windowScroll();
    this.GetDetail();
    this.sidebarJounery();
    this.getProfileDetails();
  }
  sidebarJounery() {
    this.userdataService.SideBarMenu().subscribe((data) => {
      this.sidebar = data;
    })
  }
  getJounery() {
    this.userdataService.GetJounery(true).subscribe((data) => {
      this.HoldData = data.Program_flow;
    })
  }

  GetDetail() {
    this.userdataService.GetDetails().subscribe((data) => {
      this.UiData = data.standards;
      this.BgColor = this.UiData.LOGIN_PAGE_BG_COLOR
      this.BgloginColor = this.UiData.LOGIN_BOX_COLOR


    })
  }
  getProfileDetails() {
    this.userdataService.profileDetails().subscribe((data) => {
      this.HoldProfileData = data.details;
    })
  }
  showContent(value1, value2, value3, value4, value5, value6) {
    this.modulejouneryIndex = value6;
    if (value4 == '0') {
      Swal.fire(value5)
    }
    else if (value4 == '1') {
      this.Holdid = value1;
      this.flowtype = value2;
      this.ProgramflowID = value3;
      this.userdataService.getModule(value1, value2).subscribe((data) => {
        this.ContentData = data;
        console.log(this.ContentData)
        if (this.ContentData.TEST_TYPE == 'PRETEST' || this.ContentData.TEST_TYPE == 'POSTTEST' || this.ContentData.TEST_TYPE == 'QUIZ' || this.ContentData.TEST_TYPE == 'POLL' || this.ContentData.TEST_TYPE == 'SURVEY') {
          this.test = true;
          this.Showbutton = true;
          this.answerCount = this.ContentData.TEST_COUNT;
          console.log(this.ContentData)
          if (this.answerCount > 0 && this.answerCount != this.ContentData.Test.length) {
            this.counter = this.answerCount
            this.localcounter = this.answerCount + 1
          }
          else if (this.answerCount == this.ContentData.Test.length) {
            this.counter = 0;
            this.localcounter = 1

          }
          else {
            this.counter = 0;
            this.localcounter = 1
          }

          this.module = false;
          this.video = false;
          this.pdf = false;
          this.certificate = false
          this.webinar = false;
          this.Test = this.ContentData.Test[this.counter].OPTIONS
          this.question = this.ContentData.Test[this.counter].QUESTIONS
          this.option = this.ContentData.Test[this.counter]
          this.checkQuestionType = this.ContentData.Test[this.counter].is_multiple_choice
          this.TESTQUESTIONID = this.ContentData.Test[this.counter].TEST_QUESTIONS_ID
          if (this.checkQuestionType == 1) {
            this.radio = true
            this.checkbox = false
            this.freetext = false
          }
          else if (this.checkQuestionType == 0) {
            this.checkbox = true
            this.radio = false
            this.freetext = false
          }
          else if (this.checkQuestionType == 2) {
            this.checkbox = false
            this.radio = false
            this.freetext = true
          }
        }
        else if (this.ContentData.MODULE_TYPE == 'IMAGE' || this.ContentData.RESOURCE_TYPE == 'IMAGE') {
          for (var i = 0; i < this.ContentData.Module_details.length; i++) {
            this.imageObject.push({ image: this.ContentData.Module_details[i].MODULE_URL })
          }
          // this.imageObject = this.array;
          console.log(this.imageObject);
          this.answerCount = this.ContentData.VIEWED_SLIDES

          if (this.answerCount > 0 && this.answerCount != this.ContentData.Module_details.length) {
            this.counter = this.answerCount
            this.localcounter = this.answerCount + 1
            this.ImagePre = true;
          }
          else if (this.answerCount == this.ContentData.Module_details.length) {
            this.counter = 0;
            this.localcounter = 1

          }
          else {
            this.counter = 0;
            this.localcounter = 1
          }
          if (this.ContentData.RESOURCE_TYPE == 'IMAGE') {
            this.ResourceType = 1
          }
          this.test = false;
          this.module = true;
          this.video = false;
          this.pdf = false;
          this.certificate = false
          this.webinar = false;
          this.Duration = 1;
          this.CheckForPdf = 0
          this.ModuleData = data.Module_details[this.counter].MODULE_URL
          this.ModuleId = this.ContentData.Module_details[this.counter].Module_Content_id

        }
        else if (this.ContentData.MODULE_TYPE == 'VIDEO' || this.ContentData.RESOURCE_TYPE == 'VIDEO') {
          this.answerCount = this.ContentData.VIEWED_SLIDES

          if (this.answerCount > 0 && this.answerCount != this.ContentData.Module_details.length) {
            this.counter = this.answerCount
            this.localcounter = this.answerCount + 1
            this.ImagePre = true;
          }
          else if (this.answerCount == this.ContentData.Module_details.length) {
            this.counter = 0;
            this.localcounter = 1

          }
          else {
            this.counter = 0;
            this.localcounter = 1
          }
          if (this.ContentData.RESOURCE_TYPE == 'VIDEO') {
            this.ResourceType = 1
          }
          this.video = true;
          this.module = false;
          this.test = false;
          this.pdf = false;
          this.certificate = false
          this.webinar = false;
          this.ModuleData = data.Module_details[this.counter].MODULE_URL
          this.ModuleId = this.ContentData.Module_details[this.counter].Module_Content_id
          this.CheckForPdf = 0
        }
        else if (this.ContentData.MODULE_TYPE == 'PDF' || this.ContentData.RESOURCE_TYPE == 'PDF') {
          this.video = false;
          this.module = false;
          this.test = false;
          this.ImagePre = false;
          this.pdf = true;
          this.certificate = false
          this.webinar = false;
          this.answerCount = this.ContentData.VIEWED_SLIDES

          if (this.answerCount > 0 && this.answerCount != this.ContentData.Module_details.length) {
            this.counter = this.answerCount
            this.localcounter = this.answerCount + 1
            this.ImagePre = true;
          }
          else if (this.answerCount == this.ContentData.Module_details.length) {
            this.counter = 0;
            this.localcounter = 1

          }
          else {
            this.counter = 0;
            this.localcounter = 1
          }
          if (this.ContentData.RESOURCE_TYPE == 'PDF') {
            this.ResourceType = 1
          }
          this.ModuleData = data.Module_details[this.counter].MODULE_URL
          this.ModuleData = this.domSanitizer.bypassSecurityTrustResourceUrl(this.ModuleData)
          this.ModuleId = this.ContentData.Module_details[this.counter].Module_Content_id
          this.CheckForPdf = 1
        }
        else if (this.ContentData.WEBINAR_TYPE == 'WEBINAR') {
          console.log(this.ContentData);
          this.video = false;
          this.module = false;
          this.test = false;
          this.ImagePre = false;
          this.pdf = false;
          this.test = false;
          this.certificate = false
          this.webinar = true;
          this.flowStatus = this.ContentData.FLOW_STATUS;
          this.password = this.ContentData.MEETING_PASSWORD;
          this.MeetingID = this.ContentData.MEETING_ID;
          if (this.flowStatus == 'Completed') {
            this.webinartext = true;
            this.webinarscreen = false;
          }
          else {
            this.webinartext = false;
            this.webinarscreen = true;
          }
        }
        else if (this.ContentData.TEST_TYPE == 'CERTIFICATE') {
          this.ImageCertificate = this.ContentData.THUMBNAIL
          this.userdataService.sendMsg(this.ImageCertificate);
          this.video = false;
          this.module = false;
          this.test = false;
          this.ImagePre = false;
          this.pdf = false;
          this.test = false;
          this.webinar = false;
          this.certificate = true;
        }

      })
    }
    this.windowScroll();
  }
  checkflow(value) {
    if (value == '0') {
      return 'notaasigned';
    }
    else if (value == '1') {
      return 'asigned';
    }
  }
  setCurrentTime(data) {
    this.Duration = data.target.currentTime;
  }

  prev() {
    if (this.counter == 0) {
      this.ImagePre = false;
    }
    else if (this.counter != 0) {
      this.counter = this.counter - 1
      this.localcounter = this.localcounter - 1;
    }

    if (this.CheckForPdf == 0) {
      this.ModuleData = this.ContentData.Module_details[this.counter].MODULE_URL
    }
    else if (this.CheckForPdf == 1) {
      this.ModuleData = this.ContentData.Module_details[this.counter].MODULE_URL
      this.ModuleData = this.domSanitizer.bypassSecurityTrustResourceUrl(this.ModuleData)
    }
  }
  next() {
    if (this.localcounter == this.ContentData.Module_details.length) {
      this.isTrue = true
      if (this.ResourceType == 1) {
        this.userdataService.Resourcetracking(this.Holdid, this.flowtype, this.isTrue, this.ModuleId, this.localcounter, this.ProgramflowID).subscribe((data) => {
          if (data) {
            Swal.fire({
              title: data.message,
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: `Yes`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.windowScrollUp();
                return;
              }
            })

          }

        })
      }
      else {
        this.userdataService.Moduletracking(this.Holdid, this.flowtype, this.isTrue, this.ModuleId, this.Duration, this.ProgramflowID).subscribe((data) => {
          if (data) {

            Swal.fire({
              title: data.message,
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: `Yes`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.getJounery();
                this.sidebarJounery();
                this.modulejouneryIndex = this.modulejouneryIndex + 1;
                console.log(this.HoldData[this.modulejouneryIndex])
                var value_0 = this.HoldData[this.modulejouneryIndex].CONTENT_ID;
                var value_1 = this.HoldData[this.modulejouneryIndex].CONTENT_TYPE;
                var value_2 = this.HoldData[this.modulejouneryIndex].PROGRAM_FLOW_ID;
                var value_3 = this.HoldData[this.modulejouneryIndex].isAccessable;
                var value_4 = this.HoldData[this.modulejouneryIndex].WARNING_MSG;
                this.showContent(value_0, value_1, value_2, value_3, value_4, this.modulejouneryIndex)
                this.windowScrollUp();
                return;
              }
            })

          }

        })
      }


    }
    else if (this.localcounter != this.ContentData.Module_details.length) {
      this.ImagePre = true;
      this.localcounter = this.localcounter + 1;
      this.counter = this.counter + 1;
      this.isTrue = false
      if (this.ResourceType == 1) {
        this.userdataService.Resourcetracking(this.Holdid, this.flowtype, this.isTrue, this.ModuleId, this.localcounter, this.ProgramflowID).subscribe((data) => {
          this.ModuleId = this.ContentData.Module_details[this.counter].Module_Content_id
          console.log(data);
        })
      }
      else {
        this.userdataService.Moduletracking(this.Holdid, this.flowtype, this.isTrue, this.ModuleId, this.Duration, this.ProgramflowID).subscribe((data) => {
          this.ModuleId = this.ContentData.Module_details[this.counter].Module_Content_id
          this.getJounery();
          this.sidebarJounery();
          console.log(data);
        })
      }

    }

    console.log(this.ContentData.Module_details.length);
    if (this.CheckForPdf == 0) {
      this.ModuleData = this.ContentData.Module_details[this.counter].MODULE_URL
    }
    else if (this.CheckForPdf == 1) {
      this.ModuleData = this.ContentData.Module_details[this.counter].MODULE_URL
      this.ModuleData = this.domSanitizer.bypassSecurityTrustResourceUrl(this.ModuleData)
    }

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

  showsubmit() {
    this.Showbutton = true;
  }

  nextSubmit(form: NgForm) {
    if (form.value.option == '') {
      Swal.fire('Please select option');
      return;
    }
    console.log(form);
    this.submit = true;
    if (this.localcounter != this.ContentData.Test.length) {
      this.counter = this.counter + 1;
      this.isTrue = false
      var value = form.value.option;
      var ANSWER = value.substr(2, value.length)
      var is_correct = value[0]
      console.log(this.Holdid, this.flowtype, ANSWER, is_correct, this.TESTQUESTIONID, this.ProgramflowID);
      this.userdataService.tracking(this.Holdid, this.flowtype, ANSWER, is_correct, this.TESTQUESTIONID, this.ProgramflowID, this.isTrue).subscribe((data) => {
        if (data) {
          this.getJounery();
          this.sidebarJounery();
          this.Test = this.ContentData.Test[this.counter].OPTIONS
          this.question = this.ContentData.Test[this.counter].QUESTIONS
          this.TestID = this.ContentData.Test[this.counter].TEST_ID
          this.checkQuestionType = this.ContentData.Test[this.counter].is_multiple_choice
          this.TESTQUESTIONID = this.ContentData.Test[this.counter].TEST_QUESTIONS_ID
          if (this.checkQuestionType == 1) {
            this.radio = true
            this.checkbox = false
            this.freetext = false
          }
          else if (this.checkQuestionType == 0) {
            this.checkbox = true
            this.radio = false
            this.freetext = false
          }
          else if (this.checkQuestionType == 2) {
            this.checkbox = false
            this.radio = false
            this.freetext = true
          }
        }

      })
    }



    else if (this.localcounter == this.ContentData.Test.length) {
      this.counter = this.counter + 1;
      this.isTrue = true
      var value = form.value.option;
      var ANSWER = value.substr(2, value.length)
      var is_correct = value[0]

      console.log(this.Holdid, this.flowtype, ANSWER, is_correct, this.TESTQUESTIONID, this.ProgramflowID);
      this.userdataService.tracking(this.Holdid, this.flowtype, ANSWER, is_correct, this.TESTQUESTIONID, this.ProgramflowID, this.isTrue).subscribe((data) => {
        if (data) {

          Swal.fire({
            title: data.message,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: `Yes`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.submit = false;
              this.getJounery();
              this.sidebarJounery();
              this.modulejouneryIndex = this.modulejouneryIndex + 1;
              console.log(this.HoldData[this.modulejouneryIndex])
              var value_0 = this.HoldData[this.modulejouneryIndex].CONTENT_ID;
              var value_1 = this.HoldData[this.modulejouneryIndex].CONTENT_TYPE;
              var value_2 = this.HoldData[this.modulejouneryIndex].PROGRAM_FLOW_ID;
              var value_3 = this.HoldData[this.modulejouneryIndex].isAccessable;
              var value_4 = this.HoldData[this.modulejouneryIndex].WARNING_MSG;
              this.showContent(value_0, value_1, value_2, value_3, value_4, this.modulejouneryIndex)
            }
          })


        }

      })

    }
    this.localcounter = this.localcounter + 1;
  }

  surveySubmit(form: NgForm) {
    if (form.value.option == '') {
      Swal.fire('Please select option');
      return;
    }
    console.log(form);
    this.submit = true;
    if (this.localcounter != this.ContentData.Test.length) {
      this.counter = this.counter + 1;
      this.isTrue = false
      var value = form.value.option;
      var ANSWER = form.value.option;
      var is_correct = '0'
      console.log(this.Holdid, this.flowtype, ANSWER, is_correct, this.TESTQUESTIONID, this.ProgramflowID);
      this.userdataService.tracking(this.Holdid, this.flowtype, ANSWER, is_correct, this.TESTQUESTIONID, this.ProgramflowID, this.isTrue).subscribe((data) => {
        console.log(data);
        if (data) {
          this.getJounery();
          this.sidebarJounery();
          this.Test = this.ContentData.Test[this.counter].OPTIONS
          this.question = this.ContentData.Test[this.counter].QUESTIONS
          this.TestID = this.ContentData.Test[this.counter].TEST_ID
          this.checkQuestionType = this.ContentData.Test[this.counter].is_multiple_choice
          this.TESTQUESTIONID = this.ContentData.Test[this.counter].TEST_QUESTIONS_ID
          if (this.checkQuestionType == 1) {
            this.radio = true
            this.checkbox = false
            this.freetext = false
          }
          else if (this.checkQuestionType == 0) {
            this.checkbox = true
            this.radio = false
            this.freetext = false
          }
          else if (this.checkQuestionType == 2) {
            this.checkbox = false
            this.radio = false
            this.freetext = true
          }
        }

      })
    }



    else if (this.localcounter == this.ContentData.Test.length) {
      this.counter = this.counter + 1;
      this.isTrue = true
      var value = form.value.option;
      var ANSWER = value.substr(2, value.length)
      var is_correct = '0'
      console.log(this.Holdid, this.flowtype, ANSWER, is_correct, this.TESTQUESTIONID, this.ProgramflowID);
      this.userdataService.tracking(this.Holdid, this.flowtype, ANSWER, is_correct, this.TESTQUESTIONID, this.ProgramflowID, this.isTrue).subscribe((data) => {
        if (data) {

          Swal.fire({
            title: data.message,
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: `Yes`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.submit = false;
              this.getJounery();
              this.sidebarJounery();
              this.modulejouneryIndex = this.modulejouneryIndex + 1;
              var value_0 = this.HoldData[this.modulejouneryIndex].CONTENT_ID;
              var value_1 = this.HoldData[this.modulejouneryIndex].CONTENT_TYPE;
              var value_2 = this.HoldData[this.modulejouneryIndex].PROGRAM_FLOW_ID;
              var value_3 = this.HoldData[this.modulejouneryIndex].isAccessable;
              var value_4 = this.HoldData[this.modulejouneryIndex].WARNING_MSG;
              this.showContent(value_0, value_1, value_2, value_3, value_4, this.modulejouneryIndex)
            }
          })


        }

      })

    }
    this.localcounter = this.localcounter + 1;
  }
  async nextSubmitCheck(form: NgForm) {
    if (form.value.option == '') {
      Swal.fire('Please select option');
      return;
    }
    this.submit = true;
    var checkedvalue: any = document.querySelectorAll('.box:checked');
    if (this.localcounter != this.ContentData.Test.length) {
      this.counter = this.counter + 1;
      this.num = checkedvalue,
        this.isTrue = false
      await this.num.forEach((cboxDetails) => {
        var value = cboxDetails.value;
        var ANSWER = value.substr(2, value.length)
        var is_correct = value[0]
        console.log(is_correct);
        this.userdataService.tracking(this.Holdid, this.flowtype, ANSWER, is_correct, this.TESTQUESTIONID, this.ProgramflowID, this.isTrue).subscribe((data) => {
          console.log(data);
          if (data) {
            this.getJounery();
            this.sidebarJounery();
            this.Test = this.ContentData.Test[this.counter].OPTIONS
            this.question = this.ContentData.Test[this.counter].QUESTIONS
            this.TestID = this.ContentData.Test[this.counter].TEST_ID
            this.checkQuestionType = this.ContentData.Test[this.counter].is_multiple_choice
            this.TESTQUESTIONID = this.ContentData.Test[this.counter].TEST_QUESTIONS_ID
            if (this.checkQuestionType == 1) {
              this.radio = true
              this.checkbox = false
              this.freetext = false
            }
            else if (this.checkQuestionType == 0) {
              this.checkbox = true
              this.radio = false
              this.freetext = false
            }
            else if (this.checkQuestionType == 2) {
              this.checkbox = false
              this.radio = false
              this.freetext = true
            }
          }

        })
      })
    }


    if (this.localcounter == this.ContentData.Test.length) {
      this.counter = this.counter + 1;
      this.num = checkedvalue,
        this.isTrue = true
      await this.num.forEach((cboxDetails) => {
        var value = cboxDetails.value;
        var ANSWER = value.substr(2, value.length)
        var is_correct = value[0]
        this.userdataService.tracking(this.Holdid, this.flowtype, ANSWER, is_correct, this.TESTQUESTIONID, this.ProgramflowID, this.isTrue).subscribe((data) => {
          console.log(data);
          if (data) {
            Swal.fire({
              title: data.message,
              showDenyButton: false,
              showCancelButton: false,
              confirmButtonText: `Yes`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.submit = false;
                this.getJounery();
                this.sidebarJounery();
                this.modulejouneryIndex = this.modulejouneryIndex + 1;
                var value_0 = this.HoldData[this.modulejouneryIndex].CONTENT_ID;
                var value_1 = this.HoldData[this.modulejouneryIndex].CONTENT_TYPE;
                var value_2 = this.HoldData[this.modulejouneryIndex].PROGRAM_FLOW_ID;
                var value_3 = this.HoldData[this.modulejouneryIndex].isAccessable;
                var value_4 = this.HoldData[this.modulejouneryIndex].WARNING_MSG;
                this.showContent(value_0, value_1, value_2, value_3, value_4, this.modulejouneryIndex)
                console.log(value_0, value_1, value_2, value_3, value_4, this.modulejouneryIndex)
              }
            })
          }

        })
      })

    }
    this.localcounter = this.localcounter + 1;

  }




  windowScroll() {
    window.scroll({
      top: 500,
      left: 0,
      behavior: 'smooth'
    });
  }

  windowScrollUp() {
    window.scroll({
      top: 20,
      left: 0,
      behavior: 'smooth'
    });
  }
  showLightbox(index) {
    this.selectedImageIndex = index;
    this.showFlag = true;
  }
  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1
  }
  showJourneyFlow() {
    this.journeyFlow = !this.journeyFlow;
    this.Resources = false;
    this.quizpoll = false;

  }
  resource() {
    this.journeyFlow = false;
    this.Resources = !this.Resources;
    this.quizpoll = false;
  }
  Quiz_Polls() {
    this.journeyFlow = false;
    this.Resources = false;
    this.quizpoll = !this.quizpoll;
  }
  redirect(ID, password) {
    window.location.href = "https://us04web.zoom.us/j/" + ID + "?pwd=" + password + "";
  }

}
