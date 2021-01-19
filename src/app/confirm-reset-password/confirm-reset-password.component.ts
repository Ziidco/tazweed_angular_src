import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UUIDService } from '../services/uuid.service';

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.css']
})
export class ConfirmResetPasswordComponent implements OnInit {
  userTypeInUrl: string;
  mailInUrl:string;
  showEditSuccessMessage:boolean = false;
  showPasswordMatchError:boolean = false;
  showResetPasswordMessage:boolean = false;
  resetPasswordForm:FormGroup;
  uuidValue: any;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private Uuid: UUIDService,
    private userServ:UserService
    ) { }
  confirmResetPasswordUserType;
  ngOnInit(): void {
    console.log("user type ==== " + this.userTypeInUrl); 
    this.router.queryParams.subscribe(params => {
      this.userTypeInUrl = params['customerType'];
      this.mailInUrl = params['email'];
    });
    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);

    // reset passwrd form
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(this.mailInUrl),
      newPassword: new FormControl(null),
      reNewPassword:new FormControl(null)
    })
  }


  closeDialog(){
    this.showEditSuccessMessage = false;
    // this.ngOnInit();
  }

  resetPassword(){
    console.log(this.resetPasswordForm.value);
    if(this.resetPasswordForm.get("newPassword").value!=this.resetPasswordForm.get("reNewPassword").value){
      this.showPasswordMatchError = true;
      
    }
    else{
      this.showPasswordMatchError = false;
      this.userServ.resetPasswordInProfile(this.resetPasswordForm.value,this.userTypeInUrl,this.uuidValue).subscribe(
        (response)=>{
          console.log("password reseted successfully");
          console.log(response);
          this.showResetPasswordMessage = true;
          setTimeout(() => {
            this.route.navigate(["/login"])
          }, 1500);
          
          
          
        },
        err=>{
          console.log("something went wrong in reseting password");
          console.log(err);
          this.showResetPasswordMessage = false;
          
          
        }
      )
    }
    
  }

}
