import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ClientPolicyGuard } from './client-policy.guard';
import { ConfirmResetPasswordComponent } from './confirm-reset-password/confirm-reset-password.component';
import { ImageComponent } from './image/image.component';
import { HomeComponent } from './landingPage/home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AcceptPartnerComponent } from './projects/accept-partner/accept-partner.component';
import { AddProjectFailComponent } from './projects/add-project-fail/add-project-fail.component';
import { AddProjectSuccessComponent } from './projects/add-project-success/add-project-success.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { AllProjectsComponent } from './projects/all-projects/all-projects.component';
import { ManageMyProjectComponent } from './projects/manage-my-project/manage-my-project.component';
import { MyProjectsComponent } from './projects/my-projects/my-projects.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectThanksComponent } from './projects/project-thanks/project-thanks.component';
import { AdminRegisterComponent } from './register/admin-register/admin-register.component';
import { ClientRegisterComponent } from './register/client-register/client-register.component';
import { PartnerRegisterComponent } from './register/partner-register/partner-register.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AfterLoginHeaderComponent } from './Shared/after-login-header/after-login-header.component';
import { UserPrivilageGuard } from './user-privilage.guard';

const routes: Routes = [
  
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"clientRegister",component:ClientRegisterComponent},
  {path:"partnerRegister",component:PartnerRegisterComponent},
  {path:"adminRegister",component:AdminRegisterComponent},
  {path:"addProject",component:AddProjectComponent,canActivate:[AuthGuard,ClientPolicyGuard]},
  {path:"profile",component:ProfileComponent,canActivate:[AuthGuard]},
  {path:"allProjects",component:AllProjectsComponent,canActivate:[AuthGuard,UserPrivilageGuard]},
  {path:"uploadImage",component:ImageComponent},
  {path:"resetPassword",component:ResetPasswordComponent},
  {path:"myProjects",component:MyProjectsComponent},
  {path:"confirmResetPasswod",component:ConfirmResetPasswordComponent},
  {path:"afterLoginHeader",component:AfterLoginHeaderComponent},
  {path:"updateProject/:id",component:ManageMyProjectComponent},
  {path:"projectSetails/:id",component:ProjectDetailsComponent},
  {path:"acceptPartner/:id",component:AcceptPartnerComponent},
  {path:"successAddedProject",component:AddProjectSuccessComponent},
  {path:"failAddedProject",component:AddProjectFailComponent},
  {path:"admin/login",component:AdminLoginComponent},
  {path:"dashboard",component:DashboardComponent},
  {path:"finishingProjectMessage",component:ProjectThanksComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
