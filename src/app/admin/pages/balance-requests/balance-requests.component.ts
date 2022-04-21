import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';


@Component({
  selector: 'app-balance-requests',
  templateUrl: './balance-requests.component.html',
  styleUrls: ['./balance-requests.component.css']
})
export class BalanceRequestsComponent implements OnInit {
  adminRole;
  paymentActions;
  showLoader = false;
  uuidValue;
  allBalanceData;
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
    this.getBalanceRequests();
  }


  
  getBalanceRequests() {
    this.userServ.getAskingForBalanceRequests("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("balance data");
        // console.log(response);
        this.allBalanceData = response.data;
        this.showLoader = false;

      },
      err => {
        console.log(" no balance data");
        this.showLoader = false;
        console.log(err);

      }


    )

  }
}
