import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
import {faTimes, faCheck,faToggleOn,faToggleOff,faEye} from '@fortawesome/free-solid-svg-icons';
import {faCommentDots,faTrashAlt } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-balance-requests',
  templateUrl: './balance-requests.component.html',
  styleUrls: ['./balance-requests.component.css']
})
export class BalanceRequestsComponent implements OnInit {
  faTimes = faTimes;
  faCheck = faCheck;
  faEye = faEye;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faTrashAlt = faTrashAlt;
  faCommentDots = faCommentDots;
  adminRole;
  paymentActions;
  showLoader = false;
  uuidValue;
  allBalanceData;
  acceptMode = false;
  balanceToAccept;
  acceptSuccess = false;
  acceptFail = false;

  rejectMode = false;
  balanceToreject;
  rejectSuccess = false;
  rejectFail = false;
  rejectReason = null;
detailsMode = false;
balanceToDetails;
allAccountDetails;
  constructor(
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService
  ) { }

  ngOnInit(): void {
    this.adminRole = localStorage.getItem("adminRole");

    if (this.adminRole == 'manager') {
      this.paymentActions = false;
    }
    else if (this.adminRole == 'supervisor') {
      this.paymentActions = false;
    }
    else {
      this.paymentActions = true;
    }
    this.showLoader = true;
    this.uuidValue = this.Uuid.generateUUID();
    this.getBalanceRequests();
  }



  getBalanceRequests() {
    this.userServ.getAskingForBalanceRequests("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("balance data");
        console.log(response);
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


  openAcceptDialog(balance) {
    this.balanceToAccept = balance;
    this.acceptMode = true;
    this.acceptSuccess = false;
    this.acceptFail = false;
    console.log(this.balanceToAccept);
    

  }

  closeAcceptDialog() {
    this.balanceToAccept = null;
    this.acceptMode = false;
    this.acceptSuccess = false;
    this.acceptFail = false;

  }

  acceptBalanceRequest() {
    this.showLoader = true;
    const body = {
      status: "accepted",
    }
    console.log(body);
    
    this.userServ.updateAskingForBalance(body, this.balanceToAccept._id, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("balance data");
        this.showLoader = false;
        this.closeAcceptDialog()
        this.getBalanceRequests();

      },
      err => {
        this.showLoader = false;
        console.log(err);

      }


    )

  }


  payForPartner(partnerId) {
    // console.log(partnerId);
    
    this.showLoader = true;
    this.userServ.updateUnpaidBalance({ "status": "paid" }, partnerId, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        this.showLoader = false;
        console.log(Response);
        this.closeAcceptDialog()
        this.getBalanceRequests();
        setTimeout(() => {
          this.ngOnInit();

        }, 1500);

      },
      err => {
        this.showLoader = false;
        console.log(err);

      }
    )
  }

  openRejectDialog(balance) {
    this.rejectReason = null;
    this.balanceToreject = balance;
    this.rejectMode = true;
    this.rejectSuccess = false;
    this.rejectFail = false;

  }

  closeRejectDialog() {
    this.rejectReason = null;
    this.balanceToreject = null;
    this.rejectMode = false;
    this.rejectSuccess = false;
    this.rejectFail = false;

  }


  rejectBalanceRequest() {
    this.showLoader = true;
    const body = {
      status: "rejected",
      rejectedReason: this.rejectReason
    }
    console.log(body);
    
    this.userServ.updateAskingForBalance(body, this.balanceToreject._id, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.closeRejectDialog()
        this.getBalanceRequests();

      },
      err => {
        this.showLoader = false;
        console.log(err);

      }


    )

  }


  logValue2(event) {
    const value = (event.target.value).toLowerCase();

    if (value.includes("<scri")) {
      alert("Enter Valid Input");
      this.rejectReason = null
    }
    else {

    }
  }
  openDetailsDialog(Balance){
    this.showLoader = true;
    this.detailsMode = true;
    this.balanceToDetails = Balance;
    this.showLoader = false;


    this.userServ.getBalancetempleteDetails(this.balanceToDetails._id,"admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("balance details");
        console.log(response);
        this.showLoader = false;

      },
      err => {
        console.log(" no balance details");
        this.showLoader = false;
        console.log(err);

      }


    )

  }
  closeDetailsDialog(){
    this.detailsMode = false;
    this.balanceToDetails = null;

  }

  openPartnerAccounts(){
    localStorage.setItem("accFirstName",this.balanceToDetails?.profileId?.firstName)
    localStorage.setItem("accLastName",this.balanceToDetails?.profileId?.lastName)
    
    this.route.navigate(['/dashboard/partnerAccounts/' + this.balanceToDetails?.profileId?._id])
  }

  // this.route.navigate(["/dashboard/previewProfileDataInAdmin/" + user._id]);
  //[routerLink]="'/dashboard/partnerAccounts/' + balanceToDetails?.profileId?._id"

}
