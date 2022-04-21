import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../../services/upload-file.service';
import { UserService } from '../../services/user.service';
import { UUIDService } from '../../services/uuid.service';
import { faEye,faEyeSlash,faCheckCircle,faExclamationTriangle,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

 
@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit { 
  faEye = faEye;
  faExclamationCircle = faExclamationCircle;
  faEyeSlash = faEyeSlash;
  faCheckCircle = faCheckCircle;
  faExclamationTriangle = faExclamationTriangle;
  showLoader = false;
  showPasswordIcon:boolean = true;
  hidePasswordIcon:boolean = false;
  registerForm: FormGroup;
  showFormSubmit : boolean;
  showSuccessMessage:boolean;
  showFailMessage:boolean;
  errorDetails:string;
  allCountries:any;
  notSelected=false;
  constructor(private userServ: UserService, private Uuid: UUIDService,private uploadServ: UploadFileService){ }
  uuidValue:any;
  userType:string="client";
  ngOnInit(): void {
    this.getCountries()
    this.showFormSubmit = true;
    this.showSuccessMessage = false;
    this.showFailMessage = false;
    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      termsAndConditions: new FormControl(true,Validators.requiredTrue),
      country: new FormControl(0,Validators.required),
      companyName: new FormControl(null)
    });
  }
  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {
        console.log(typeof (upData));
        this.registerForm.controls['attach'].setValue(upData); 
      }
    )
  }
  register() {
    this.notSelected = false;
    if(this.registerForm.get("country").value==0 || this.registerForm.get("country").value=='0' ){
      // alert("اختار البلد")
      this.notSelected = true;
      document.getElementById("country").focus();
    }
    else{
    this.showLoader = true;
    console.log(this.registerForm.value); 
    this.userServ.signUp(this.registerForm.value, this.userType, this.uuidValue).subscribe(
      (response:any) => {
        localStorage.clear();
        this.showFormSubmit = false;
        this.showFailMessage = false;
        this.showSuccessMessage = true;
        console.log("successfully registered ");
        console.log(response);
        this.showLoader = false;
        localStorage.setItem("newUserId",response.data._id);
        localStorage.setItem("sessionUserType",this.userType);
        localStorage.setItem("sessionUuidValue",this.uuidValue);
        localStorage.setItem("isRegistered","true");
      },
      err => {
        console.log(err);  
        this.showLoader = false;
        this.showFailMessage = true;
        this.errorDetails =  err.error.message;
       

      }
    )
    }
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

  getCountries(){
    this.userServ.getCountriesPublic().subscribe(
      (response:any)=>{
        console.log("all countries");
        console.log(response);
        this.allCountries = response.data;
        
      },
      err=>{
        console.log("error in get countries");
        
        console.log(err);
        
      }
    )
  }
}
