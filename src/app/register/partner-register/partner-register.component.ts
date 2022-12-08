import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../../services/upload-file.service';
import { UserService } from '../../services/user.service';
import { UUIDService } from '../../services/uuid.service';
import { faEye,faEyeSlash,faCheckCircle,faExclamationTriangle,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-partner-register',
  templateUrl: './partner-register.component.html',
  styleUrls: ['./partner-register.component.css']
})
export class PartnerRegisterComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;
  showLoader = true;
  faExclamationTriangle = faExclamationTriangle;
  showPasswordIcon:boolean = true;
  hidePasswordIcon:boolean = false;
  registerForm: FormGroup;
  showFormSubmit : boolean;
  showSuccessMessage:boolean;
  showFailMessage:boolean; 
  errorDetails:string;
  allCountries:any;
  notSelected=false;
  allCountriesCode;
  showOtherCode = false;
  countryCodeForOther = '';
  showOtherCountry = false;
  countryNameForOther = '';
  showMobileError = false;
  showEmailDuplicate = false;
  showGeneralError = false;
  showMobileDuplicateError = false;
  selectedCountryCode;
  userPattern;
  selectedCountryKey;
  constructor(private userServ: UserService, private Uuid: UUIDService,private uploadServ: UploadFileService){ }
  uuidValue:any;
  userType:string="partner";
  
  ngOnInit(): void {
    this.getCountries()
    this.getCountriesCode()
    this.showFormSubmit = true;
    this.showSuccessMessage = false;
    this.showFailMessage = false;
    this.uuidValue = this.Uuid.generateUUID();
    this.userPattern =  /^((\+?20)|0)?1[0125]\d{8}$/
    this.selectedCountryKey = '+996';
    console.log(this.uuidValue);
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]), 
      // userName: new FormControl(null, Validators.required),
      mobileNumber: new FormControl(null, Validators.required),
      countryCode: new FormControl(0, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      termsAndConditions: new FormControl(true,Validators.requiredTrue),
      writingAbility: new FormControl(null,Validators.required),
      searchingAbility: new FormControl(null,Validators.required),
      country: new FormControl('السعودية', Validators.required),
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
    this.showMobileError = false;
    this.showEmailDuplicate = false;
    this.showGeneralError = false;
    this.showMobileDuplicateError = false;
    if (this.showOtherCountry == false) {
      if (this.showOtherCode == false) {
        this.notSelected = false;
        if (this.registerForm.get("country").value == 0 || this.registerForm.get("country").value == '0') {
          // alert("اختار البلد")
          this.notSelected = true;
          document.getElementById("country").focus();
        }
        // else if (this.registerForm.get("countryCode").value == 0 || this.registerForm.get("countryCode").value == '0') {
        //   alert("أختر كود البلد")
        //   document.getElementById("countryCode1").focus();
        // }
        else {
          this.showLoader = true;
          console.log(this.registerForm.value);
          this.userServ.signUp(this.registerForm.value, this.userType, this.uuidValue).subscribe(
            (response: any) => {
              localStorage.clear();
              this.showFormSubmit = false;
              this.showFailMessage = false;
              this.showSuccessMessage = true;
              console.log("successfully registered ");
              console.log(response);
              this.showLoader = false;
              localStorage.setItem("newUserId", response.data._id);
              localStorage.setItem("sessionUserType", this.userType);
              localStorage.setItem("sessionUuidValue", this.uuidValue);
              localStorage.setItem("isRegistered", "true");
            },
            err => {
              console.log(err);
              this.showLoader = false;
              this.showFailMessage = true;
              if(err.error.code =='70'){
                this.showMobileError = true;
                
              }
              else if(err.error.code =='71'){
                this.showMobileDuplicateError = true;
                
              }
              else if(err.error.message =='This email is used'){
                this.showEmailDuplicate = true;
              }
              else{
                this.showGeneralError = true;
              }
             
              this.errorDetails = err.error.message;


            }
          )
        }

      }
      else {


        this.notSelected = false;
        if (this.registerForm.get("country").value == 0 || this.registerForm.get("country").value == '0') {
          // alert("اختار البلد")
          this.notSelected = true;
          document.getElementById("country").focus();
        }

        else {
          this.showLoader = true;
          if (this.countryCodeForOther == null || this.countryCodeForOther == '') {
            alert("أدخل كود البلد")
            document.getElementById("countryCode2").focus();
          }
          else {
            this.registerForm.get("countryCode").setValue(this.countryCodeForOther);
            console.log(this.registerForm.value);
            this.userServ.signUp(this.registerForm.value, this.userType, this.uuidValue).subscribe(
              (response: any) => {
                localStorage.clear();
                this.showFormSubmit = false;
                this.showFailMessage = false;
                this.showSuccessMessage = true;
                console.log("successfully registered ");
                console.log(response);
                this.showLoader = false;
                localStorage.setItem("newUserId", response.data._id);
                localStorage.setItem("sessionUserType", this.userType);
                localStorage.setItem("sessionUuidValue", this.uuidValue);
                localStorage.setItem("isRegistered", "true");
              },
              err => {
                console.log(err);
                this.showLoader = false;
                this.showFailMessage = true;
                if(err.error.code =='70'){
                  this.showMobileError = true;
                  
                }
                else if(err.error.message =='This email is used'){
                  this.showEmailDuplicate = true;
                }
                else{
                  this.showGeneralError = true;
                }
               
                this.errorDetails = err.error.message;
  
  
              }
            )
          }
        }


      }

    }
    else {





      if (this.showOtherCode == false) {
        this.notSelected = false;
        if (this.countryNameForOther == null || this.countryNameForOther == '') {
          // alert("اختار البلد")
          this.notSelected = true;
          document.getElementById("countryName").focus();
        }
        // else if (this.registerForm.get("countryCode").value == 0 || this.registerForm.get("countryCode").value == '0') {
        //   alert("أختر كود البلد")
        //   document.getElementById("countryCode1").focus();
        // }
        else {
          this.showLoader = true;
          this.registerForm.get("country").setValue(this.countryNameForOther)
          console.log(this.registerForm.value);
          this.userServ.signUp(this.registerForm.value, this.userType, this.uuidValue).subscribe(
            (response: any) => {
              localStorage.clear();
              this.showFormSubmit = false;
              this.showFailMessage = false;
              this.showSuccessMessage = true;
              console.log("successfully registered ");
              console.log(response);
              this.showLoader = false;
              localStorage.setItem("newUserId", response.data._id);
              localStorage.setItem("sessionUserType", this.userType);
              localStorage.setItem("sessionUuidValue", this.uuidValue);
              localStorage.setItem("isRegistered", "true");
            },
            err => {
              console.log(err);
              this.showLoader = false;
              this.showFailMessage = true;
              if(err.error.code =='70'){
                this.showMobileError = true;
                
              }
              else if(err.error.message =='This email is used'){
                this.showEmailDuplicate = true;
              }
              else{
                this.showGeneralError = true;
              }
             
              this.errorDetails = err.error.message;


            }
          )
        }

      }
      else {


        this.notSelected = false;
        if (this.countryNameForOther == null || this.countryNameForOther == '') {
          // alert("اختار البلد")
          this.notSelected = true;
          document.getElementById("countryName").focus();
        }

        else {
          this.showLoader = true;
          if (this.countryCodeForOther == null || this.countryCodeForOther == '') {
            alert("أدخل كود البلد")
            document.getElementById("countryCode2").focus();
          }
          else {
            this.registerForm.get("country").setValue(this.countryNameForOther)
            // this.registerForm.get("countryCode").setValue(this.countryCodeForOther);
            console.log(this.registerForm.value);
            this.userServ.signUp(this.registerForm.value, this.userType, this.uuidValue).subscribe(
              (response: any) => {
                localStorage.clear();
                this.showFormSubmit = false;
                this.showFailMessage = false;
                this.showSuccessMessage = true;
                console.log("successfully registered ");
                console.log(response);
                this.showLoader = false;
                localStorage.setItem("newUserId", response.data._id);
                localStorage.setItem("sessionUserType", this.userType);
                localStorage.setItem("sessionUuidValue", this.uuidValue);
                localStorage.setItem("isRegistered", "true");
              },
              err => {
                console.log(err);
                this.showLoader = false;
                this.showFailMessage = true;
                if(err.error.code =='70'){
                  this.showMobileError = true;
                  
                }
                else if(err.error.message =='This email is used'){
                  this.showEmailDuplicate = true;
                }
                else{
                  this.showGeneralError = true;
                }
               
                this.errorDetails = err.error.message;
  
  
              }
            )
          }
        }


      }

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
        this.showLoader = false;
        
      },
      err=>{
        console.log("error in get countries");
        console.log(err);
        this.showLoader = false;
        
      }
    )
  }

  getCountriesCode() {
    this.userServ.getCountriesCode().subscribe(
      (response: any) => {
        console.log("all countries code");
        console.log(response);
        this.allCountriesCode = response.data;

      },
      err => {
        console.log("error in get countries");

        console.log(err);

      }
    )
  }
  selectCode() {
    if (this.registerForm.get("countryCode").value == "Other") {
      this.showOtherCode = true;
    }
    else {
      this.showOtherCode = false;
    }
  }
  selectCountry() {
    // alert("hii")
  
    
    console.log(this.registerForm.get("country").value);
    for(const c of this.allCountries){
      if(this.registerForm.get("country").value == c.name){
        this.selectedCountryCode = c.countryCode;
        console.log("selected id == " + this.selectedCountryCode);
        this.registerForm.get("countryCode").setValue(this.selectedCountryCode)

        this.selectedCountryKey = c.countryKey;
        const beforeRegex = c.regex;
        // this.userPattern =  new RegExp(beforeRegex);
    
        this.userPattern = this.stringToRegex(beforeRegex);
        console.log(this.userPattern);
        
        
      }
      
    }

    console.log("-- " + this.selectedCountryKey);
    
    if ( this.selectedCountryKey == " ") {
      this.showOtherCountry = true;
    }
    else {
      this.showOtherCountry = false;
    }
    console.log("selected country");
    
  }
  preventNonNumericalInput(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
    //^[0-9]+$
    if (!charStr.match(/^[\.0-9]*$/))
      e.preventDefault();
  }


   stringToRegex(str) {
    const match = str.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/);
    return match ? 
      new RegExp(
        match[2],
        match[3]
          // Filter redundant flags, to avoid exceptions
          .split('')
          .filter((char, pos, flagArr) => flagArr.indexOf(char) === pos)
          .join('')
      ) 
      : new RegExp(str);
  }
}
