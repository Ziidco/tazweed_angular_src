import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { faEye, faEyeSlash, faExclamationTriangle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UUIDService } from '../services/uuid.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faEye = faEye;
  showLoader = false;
  faEyeSlash = faEyeSlash;
  faExclamationTriangle = faExclamationTriangle;
  faEdit = faEdit;
  showPasswordIcon: boolean = true;
  hidePasswordIcon: boolean = false;
  loginForm: FormGroup;
  uuidValue: any;
  failedLogin;
  showFailed = false;
  registerNewLine: boolean = true;
  sessionUserStatus;
  activeTabType = "client";
  constructor(private route: Router, private userServ: UserService, private Uuid: UUIDService,private activRoute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log("-----------------------------");
    
    this.activRoute.queryParams.subscribe(params => {
      this.activeTabType = params['customerType'];
      console.log("tab active will be to " + this.activeTabType);
      
    });
    if (localStorage.getItem("isRegistered")) {
      this.registerNewLine = false;
    }
    else {
      this.registerNewLine = true;
    }
    this.uuidValue = this.Uuid.generateUUID();
    // console.log("this.uuidvalue");
    // console.log(this.uuidValue);
    this.loginForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(8)]),
      "rememberMe": new FormControl(false)
    });
  }


  // login method start
  login(userType: string) {
    this.showLoader = true;
    if (localStorage.getItem("sessionUserType")) {
      this.userServ.signIn(this.loginForm.value, userType, this.uuidValue).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("login method 111111");
          console.log(response);
          localStorage.setItem("auth", response.data.token);
          localStorage.setItem("sessionUserType", userType);
          localStorage.setItem("userId", response.data.profileId);
          this.getUserData(response.data.profileId);
          // localStorage.setItem("sessionUserStatus", this.sessionUserStatus);

          // this.route.navigate(["addProject"]);  
          if (userType === 'partner') {
            localStorage.setItem("partnerId", response.data.profileId);
            this.route.navigate(["allProjects"]);
          }
          else {
            localStorage.setItem("clientId", response.data.profileId);
            // this.route.navigate(["addProject"]);  
            this.route.navigate(["myProjects"]);
          }

          localStorage.setItem("email", response.data.email);
          // localStorage.setItem("sessionUserStatus",response.data.status);



        },
        err => {
          this.showLoader = false;
          this.showFailed = true;
          this.failedLogin = err;

        }
      )


    }
    else {
      this.showLoader = true;
      this.userServ.signIn(this.loginForm.value, userType, this.uuidValue).subscribe(
        (response: any) => {
          console.log("login method 222222");
          localStorage.setItem("userId", response.data.profileId);
          this.showLoader = false;
          localStorage.setItem("auth", response.data.token);
          localStorage.setItem("sessionUserType", userType);
          this.getUserData(response.data.profileId);
          

          


          if (userType === 'partner') {
            localStorage.setItem("partnerId", response.data.profileId);
            this.route.navigate(["allProjects"]);
          }
          else {
            localStorage.setItem("clientId", response.data.profileId);
            // this.route.navigate(["addProject"]); 
            this.route.navigate(["myProjects"]);
          }

          localStorage.setItem("email", response.data.email);




        },
        err => {
          this.showLoader = false;
          this.showFailed = true;
          this.failedLogin = err;

        }
      )


    }

  }

  showPassword(id) {
    document.getElementById(id).setAttribute("type", "text");
    this.showPasswordIcon = false;
    this.hidePasswordIcon = true;
  }
  hidePassword(id) {
    document.getElementById(id).setAttribute("type", "password");
    this.showPasswordIcon = true;
    this.hidePasswordIcon = false;
  }
  // logOut(){
  //   this.route.navigate(["login"]);
  //   localStorage.clear();
  // }

  resetPassword(userType) {
    console.log("you will reset password for user of type " + userType);
    localStorage.setItem("resetPasswordUserType", userType);
    this.route.navigate(["/resetPassword"]);

  }

  getUserData(profileId) {
    this.userServ.getOneProfileData(profileId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("user profile data is ============");
        // console.log(response);
        this.sessionUserStatus = response.data.status;
        console.log(this.sessionUserStatus);
        if(this.sessionUserStatus == "active"){
          this.userServ.activeAccount.next(true);
          // localStorage.setItem("userAccountStatusInStorage",this.sessionUserStatus);
        }
        else{
          this.userServ.activeAccount.next(false);
          // localStorage.setItem("userAccountStatusInStorage",this.sessionUserStatus);
        }
        
        
        localStorage.setItem("sessionUserStatus", this.sessionUserStatus);
        

      },
      err => {
        console.log(err);

      }
    )
  }

}
