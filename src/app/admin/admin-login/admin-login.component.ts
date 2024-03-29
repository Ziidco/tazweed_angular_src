import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash, faExclamationTriangle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  faEye = faEye;
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
  
showLoader = false;

  constructor(private route: Router, private userServ: UserService, private Uuid: UUIDService) { }

  ngOnInit(): void {
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
     login(userType:string){
       this.showFailed = false;
      // console.log("user login type is ==== " + userType);
      
      
      // console.log(this.loginForm.value);
    

      this.showLoader = true;
        // console.log("user is login random");
        this.userServ.signIn(this.loginForm.value,userType,this.uuidValue).subscribe(
          (response:any)=>{
            this.showLoader = false;
            console.log("login response is");
            console.log(response);
            localStorage.setItem("auth",response.data.token);
            localStorage.setItem("sessionUserType",userType);
           
           
            localStorage.setItem("userId",response.data.profileId);
            localStorage.setItem("email",response.data.email);
            this.route.navigate(["dashboard"]); 
            
            if(response.data.role){
              if(response.data.role=="manager"){
                localStorage.setItem("adminRole",'manager');

              }
              else if(response.data.role=="supervisor"){
                localStorage.setItem("adminRole",'supervisor');

              }
            }
            else{
              localStorage.setItem("adminRole",'admin');
            }
            
            
          },
          err=>{
            console.log("error in getting project configuration");
            console.log(err);
    
            if(err.status==401){
              alert("انتهى وقت الجلسة.. فضلا أعد تسجيل الدخول")
              localStorage.clear()
              this.route.navigate(["/login"]);
            }
    
            // if(err.error.mesaage=="Token is expired, Please try to sign in first"){
            //   alert("انتهى وقت الجلسة.. فضلا أعد تسجيل الدخول")
            //   // localStorage.clear()
            //   // this.route.navigate(["/login"]);
            // }
          }
        )
        
        
      
      
    }
  
    showPassword(id){
      document.getElementById(id).setAttribute("type","text");
      this.showPasswordIcon = false;
      this.hidePasswordIcon = true;
    }
    hidePassword(id){
      document.getElementById(id).setAttribute("type","password");
      this.showPasswordIcon = true;
      this.hidePasswordIcon = false;
    }
}


