import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtInterceptor } from './tokens';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { FooterComponent } from './footer/footer.component';
import { GetjouneryComponent } from './getjounery/getjounery.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MeetingComponent } from './meeting/meeting.component';
import { JouneryComponent } from './jounery/jounery.component';
import { CertificateComponent } from './certificate/certificate.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    PageComponent,
    FooterComponent,
    GetjouneryComponent,
    ChangepasswordComponent,
    SidebarComponent,
    MeetingComponent,
    JouneryComponent,
    CertificateComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SlideshowModule,
    NgImageFullscreenViewModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
