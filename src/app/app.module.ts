import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './Shared/header/header.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { LoginComponent } from './login/login.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './landingPage/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientRegisterComponent } from './register/client-register/client-register.component';
import { PartnerRegisterComponent } from './register/partner-register/partner-register.component';
import { AdminRegisterComponent } from './register/admin-register/admin-register.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { AllProjectsComponent } from './projects/all-projects/all-projects.component';
import { ProfileComponent } from './profile/profile.component';
import { AfterLoginHeaderComponent } from './Shared/after-login-header/after-login-header.component'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ImageComponent } from './image/image.component';
import { AuthGuard } from './auth.guard';
import { FilterPipe } from './filter.pipe';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmResetPasswordComponent } from './confirm-reset-password/confirm-reset-password.component';
import { MyProjectsComponent } from './projects/my-projects/my-projects.component';
import { MatStepperModule } from '@angular/material/stepper';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { ManageMyProjectComponent } from './projects/manage-my-project/manage-my-project.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { AcceptPartnerComponent } from './projects/accept-partner/accept-partner.component';
import { AddProjectSuccessComponent } from './projects/add-project-success/add-project-success.component';
import { AddProjectFailComponent } from './projects/add-project-fail/add-project-fail.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProjectThanksComponent } from './projects/project-thanks/project-thanks.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { FAQComponent } from './faq/faq.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ClientRegisterComponent,
    PartnerRegisterComponent,
    AdminRegisterComponent,
    AddProjectComponent,
    AllProjectsComponent,
    ProfileComponent,
    AfterLoginHeaderComponent,
    ImageComponent,
    FilterPipe,
    ResetPasswordComponent,
    ConfirmResetPasswordComponent,
    MyProjectsComponent,
    ManageMyProjectComponent,
    ProjectDetailsComponent,
    AcceptPartnerComponent,
    AddProjectSuccessComponent,
    AddProjectFailComponent,
    AdminLoginComponent,
    DashboardComponent,
    ProjectThanksComponent,
    MessageDetailsComponent,
    FAQComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    TabsModule,
    NgxTagsInputModule,
    ProgressbarModule,
    NoopAnimationsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
