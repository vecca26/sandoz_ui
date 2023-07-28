import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { GetjouneryComponent } from './getjounery/getjounery.component';
import { AuthGuard } from './gurad';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { MeetingComponent } from './meeting/meeting.component';
import { CertificateComponent } from './certificate/certificate.component';
const routes: Routes = [ 
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'mypage', component:  PageComponent, canActivate: [AuthGuard] },
  { path: 'certificate', component:  CertificateComponent, canActivate: [AuthGuard] },
  { path: 'meeting/:id/:password', component:  MeetingComponent, canActivate: [AuthGuard] },
  { path: 'showjounery/:id/:flowtype/:flowid/:checkassigned/:message/:index', component:  GetjouneryComponent, canActivate: [AuthGuard] },
  { path: 'change_password/:token', component:  ChangepasswordComponent},
];
export const AppRoutingModule = RouterModule.forRoot(routes);

