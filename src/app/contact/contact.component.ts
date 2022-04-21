import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye,faEyeSlash,faCheckCircle,faExclamationTriangle,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
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
  }


  sendData() {
    this.sendSuccess = false;
    this.sendFail = false;
    this.showLoader = true;
    console.log(this.contactForm.value);

    this.userServ.contactAdmin(this.contactForm.value).subscribe(
      (response:any) => {
        this.showLoader = false;
        this.contactForm.reset()
        console.log(response);
        this.sendSuccess = true;
        
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
