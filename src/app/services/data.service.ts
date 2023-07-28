import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model';
import { environment } from '../../environments/environment.prod';

const API_URL = environment.API_URL;
@Injectable({ providedIn: 'root' })
export class UserDataService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  GetDetails(){
    return this.http.get<any>(API_URL + 'webinar/standards', {})
  }
  RegisterEvent() {
    return this.http.post<any>(API_URL + 'events/allevent-register', {})
  }
  AllEventDeatisl() {
    return this.http.get<any>(API_URL + 'events/list', {})

  }
  changePassword(confirmpassword: any, password: string) {
    return this.http.post<any>(API_URL + 'anonymous/change-password', { confrimPassword: confirmpassword, password: password })
  }
  submitRatings(rating: any, comments: any, user_id: any) {
    return this.http.post<any>(API_URL + 'anonymous/review', { rating: rating, comments: comments, user_id: user_id })

  }
  attendence(eventId: any) {
    return this.http.post<any>(API_URL + 'events/update-attendace', { eventId:eventId })
  }

 analytics() {
    return this.http.get<any>(API_URL + 'events/analytics', {})
  }
  GetJounery(status:any){
    return this.http.get<any>(API_URL + 'webinar/flow?journeyFlow='+status+'',{})
  }
  getModule(id:number,flowType:string){
    return this.http.get<any>(API_URL + 'webinar/contents?flowType='+flowType+'&id='+id+'', {})
  }
   tracking(id:any,flowType:any,answer:any,correct:any,questionId:any,programflowId:any,is_last:any){
    return this.http.post<any>(API_URL + 'webinar/track?flowType='+flowType+'&id='+id+'', {is_last:is_last,TEST_QUESTION_ID:questionId,ANSWER:answer,CORRECT_ANSWER:correct,FLOW_ID:programflowId})
  }

  Moduletracking(id:any,flowType:any,islast:any,moduleId:any,DURATION:any,FLOW_ID:any){
    return this.http.post<any>(API_URL + 'webinar/track?flowType='+flowType+'&id='+id+'', {is_last:islast,MODULE_CONTENT_ID:moduleId,DURATION:DURATION,FLOW_ID:FLOW_ID})
  }
  Resourcetracking(id:any,flowType:any,islast:any,moduleId:any,DURATION:any,FLOW_ID:any){
    return this.http.post<any>(API_URL + 'webinar/track?flowType='+flowType+'&id='+id+'', {is_last:islast,MODULE_CONTENT_ID:moduleId,VIEW_COUNT:DURATION,FLOW_ID:FLOW_ID})
  }
  profileDetails() {
    return this.http.get<any>(API_URL + 'details', {})
  }
  profileupdate(name:string,email:any,phone:any,city:string,gender:string,profile_pic:File){
    let input = new FormData();
    input.append("NAME", name);
    input.append("EMAIL",email );
    input.append("PHONE", phone);
    input.append("CITY", city);
    input.append("GENDER", gender);
    input.append("profile_pic", profile_pic);
    return this.http.put<any>(API_URL+'update-doc',input) 
  }
  GetCurrentStatus() {
    return this.http.get<any>(API_URL + 'home-page', {})
  }
  dashboard(){
    return this.http.get<any>(API_URL + 'dashboard', {})
  }
  SideBarMenu() {
    return this.http.get<any>(API_URL + 'journey-group', {})
  }
  getCard(details){
    return this.http.get<any>(API_URL + '/page-details?CARD_TYPE='+details+'', {})
  }
  subject = new Subject();
  sendMsg(msg: string) {
    this.subject.next(msg);
  }

  receivedMsg(): Observable <any> {
    return this.subject.asObservable();
  }
}
