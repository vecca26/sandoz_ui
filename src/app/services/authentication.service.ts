import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model';
const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + window.btoa(email + ':' + password) });
    let options = { headers: headers };

    return this.http.post<User>(API_URL + 'webinar/login', { basic: 'basic' }, options)
      .pipe(map(user => {
        if (user.message == 'Login Successful') {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }

      }
      )
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  forgotPassword(email: string) {
    return this.http.post<User>(API_URL + `webinar/forget-password`, { EMAIL: email });
  }
  changePassword(password: String, Token: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Token });
    let options = { headers: headers };
    return this.http.put<User>(API_URL + `webinar/change-password`, { PASSWORD: password }, options)
      .pipe(map(user => {
        return user;
      }));

  }
}
