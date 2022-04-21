import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.css']
})
export class ContactDataComponent implements OnInit {
  adminRole;
  paymentActions;
  showLoader = false;
  uuidValue;
  allContactData;
  constructor(
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService
  ) { }

  ngOnInit(): void {
    this.adminRole = localStorage.getItem("adminRole");

    if(this.adminRole=='manager'){
      this.paymentActions = false;
    }
    else  if(this.adminRole=='supervisor'){
      this.paymentActions = false;
    }
    else{
      this.paymentActions = true;
    }
    this.showLoader = true;
    this.uuidValue = this.Uuid.generateUUID();
    this.getContactData();
  }


  
  getContactData() {
    this.userServ.getContactData("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("contact data");
        console.log(response);
        this.allContactData = response.data;
        this.showLoader = false;

      },
      err => {
        console.log(" no contact data");
        this.showLoader = false;
        console.log(err);

      }


    )

  }
 
}
