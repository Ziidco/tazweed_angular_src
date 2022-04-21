import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye,faEyeSlash,faCheckCircle,faExclamationTriangle,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-contact-inner',
  templateUrl: './contact-inner.component.html',
  styleUrls: ['./contact-inner.component.css']
})
export class ContactInnerComponent implements OnInit {
  contactForm: FormGroup;
  faEye = faEye;
  faExclamationCircle = faExclamationCircle;
  faEyeSlash = faEyeSlash;
  faCheckCircle = faCheckCircle;
  faExclamationTriangle = faExclamationTriangle;
  showLoader = false;
  sendSuccess = false;
  sendFail = false;
  constructor(private userServ:UserService) { }
 
  ngOnInit(): void {

    this.contactForm = new FormGroup({
      name: new FormControl(null, [Validators.required,this.noWhitespaceValidator]),
      email: new FormControl(null, [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),this.noWhitespaceValidator]),
      mobile: new FormControl(null),
      title: new FormControl(null, [Validators.required,this.noWhitespaceValidator]),
      message: new FormControl(null, [Validators.required,this.noWhitespaceValidator]),
    });

    this.contactForm.get("name").setValue(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))
    this.contactForm.get("email").setValue(localStorage.getItem("email"))


    
  }


  
  sendData() {
    this.sendSuccess = false;
    this.sendFail = false;
    this.showLoader = true;
    console.log(this.contactForm.value);

    this.userServ.contactAdmin(this.contactForm.value).subscribe(
      (response:any) => {
        this.showLoader = false;
        // this.contactForm.reset()
        // this.contactForm.get("mobile").setValue(null)
        // this.contactForm.get("message").setValue(null)
        
        console.log(response);
        this.sendSuccess = true;
        setTimeout(() => {
          this.ngOnInit()
          this.sendSuccess = false;
        }, 1500);
        
        
      },
      err => {
        this.sendFail = true;
        console.log(err);  
        this.showLoader = false;
       

      }
    )




  }


  logValue(event, formControlName) {
    const value = event.target.value;

    if (value.includes("<scri")) {
      alert("Enter Valid Input");
      this.contactForm.get(formControlName).setValue("");
    }
    else {

    }
  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
}
