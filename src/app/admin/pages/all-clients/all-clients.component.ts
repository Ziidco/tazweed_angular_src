import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTimes, faCheck, faToggleOn, faToggleOff, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.css']
})
export class AllClientsComponent implements OnInit {

  faTimes = faTimes;
  faCheck = faCheck;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faTrashAlt = faTrashAlt;
  faCommentDots = faCommentDots;
  faHandHoldingUsd = faHandHoldingUsd;
  uuidValue: any;
  showLoader = false;
  showActiveConfirmMessage = false;
  itemToEdit;
  allClients;
  showDeactiveConfirmMessage = false;
  showMessageDialog = false;
  messageReceiverName;
  messageReceiverNames = [];
  messageReceiver;
  sendMessageSpecificUserForm: FormGroup;
  sendMessageForCategoryForm: FormGroup;
  messageObject;
  showsendSuccess = false;
  showsendFail = false;
  adminRole;
  takeActionsPrivilage = false;
  deleteUserMode = false;
  deleteSuccess = false;
  deleteFail = false;
  userToDelete;

  addBalanceMode = false;
  clientToSendCredit;
  addbalanceForm: FormGroup;
  showCreditError = false;
  showSendOtpSuccess = false;
  showSendOtpFail = false;
  sendCreditMode = false;
  sendCreditSuccess = false;
  sendCreditFail = false;
  showCreditErrorLimit = false;
  constructor(
    private userServ: UserService,
    private Uuid: UUIDService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.adminRole = localStorage.getItem("adminRole");
    if (this.adminRole == 'manager') {
      this.takeActionsPrivilage = true;
    }
    else if (this.adminRole == 'supervisor') {
      this.takeActionsPrivilage = false;
    }
    else {
      this.takeActionsPrivilage = true;
    }
    this.showLoader = true;
    this.uuidValue = this.Uuid.generateUUID();

    this.sendMessageSpecificUserForm = new FormGroup({
      profileId: new FormControl(null),
      message: new FormControl(null),
      from: new FormControl(localStorage.getItem("userId")),
      fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))
    })


    this.addbalanceForm = new FormGroup({
      adminId: new FormControl(localStorage.getItem("userId")),
      profileId: new FormControl(this.clientToSendCredit),
      otp: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.maxLength(4)])
    })

    this.getAllClients();
  }

  getAllClients() {
    this.userServ.getAllClients("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("all clients object ---------------------- ");

        // console.log(response.data);
        this.allClients = response.data;
        this.showLoader = false;

      },
      err => {
        console.log(err);
        this.showLoader = false;

      }
    )
  }

  closeActiveDialog() {
    this.showActiveConfirmMessage = false;
  }


  showActive(user) {
    this.showActiveConfirmMessage = true;
    this.itemToEdit = user;
  }


  activateAccount(profileId) {
    this.showLoader = true;
    this.userServ.updateProfileByAdmin(profileId, { "status": "active" }, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        this.showLoader = false;
        console.log(Response);
        setTimeout(() => {
          this.showActiveConfirmMessage = false;
        }, 1500);

        this.ngOnInit();

      },
      err => {
        this.showLoader = false;
        console.log(err);
        this.showActiveConfirmMessage = false;

      }
    )
  }

  deActivateAccount(profileId) {
    // console.log("wait for response");
    this.showLoader = true;
    this.userServ.updateProfileByAdmin(profileId, { "status": "deactivate" }, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        console.log(Response);
        this.showLoader = false;
        setTimeout(() => {
          this.showDeactiveConfirmMessage = false;
        }, 1500);

        this.ngOnInit();

      },
      err => {
        this.showLoader = false;
        console.log(err);
        this.showDeactiveConfirmMessage = false;

      }
    )
  }

  closeDeactiveDialog() {
    this.showDeactiveConfirmMessage = false;
  }

  showDeactive(user) {
    this.showDeactiveConfirmMessage = true;
    this.itemToEdit = user;

  }


  sendMeaasge(receiver) {
    this.showMessageDialog = true;
    this.messageReceiver = receiver;

  }
  closeMessageDialog() {
    this.showMessageDialog = false;

  }


  sendMeaage() {
    // fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))
    this.sendMessageSpecificUserForm.get("fromName").setValue(
      localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName")
    )
    this.sendMessageSpecificUserForm.get("profileId").setValue(this.messageReceiver._id);
    console.log(this.sendMessageSpecificUserForm.value);
    this.showLoader = true;
    this.userServ.sendMessageToUser(this.sendMessageSpecificUserForm.value, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log('message sent');
        console.log(response);
        this.showLoader = false;
        this.showsendSuccess = true;
        this.showsendFail = false;
        setTimeout(() => {
          this.showsendSuccess = false;
          this.ngOnInit();

        }, 1500);
      },
      err => {
        console.log(err);
        this.showsendSuccess = false;
        this.showsendFail = true;
        this.showLoader = false;

      }
    )
  }

  previewProfileData(user) {
    this.userServ.selectedUser.next(user)
    this.route.navigate(["/dashboard/previewProfileDataInAdmin/" + user._id]);

  }




  showDeleteUserDialog(user) {
    this.userToDelete = user;
    this.deleteUserMode = true;
  }

  deleteUserProfile() {
    this.showLoader = true;
    this.deleteSuccess = false;
    this.deleteFail = false;
    this.userServ.deleteUserProfile(this.userToDelete._id, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.showLoader = false;
        console.log("client profile deleted ")
        this.deleteSuccess = true;
        setTimeout(() => {
          this.deleteUserMode = false;
        }, 1500);
        this.getAllClients()
      },
      err => {
        this.showLoader = false;
        console.log("error in delete client");
        this.deleteFail = true;
        console.log(err);

      }
    )
  }

  closeDeleteUserDialog() {
    this.deleteUserMode = false;
  }


  generateOtp() {



    this.showLoader = true;
    this.showSendOtpSuccess = false;
    this.showSendOtpFail = false;
    const data = {
      adminId: localStorage.getItem("userId")
    }

    // console.log(data);
    this.userServ.generateOtp(data, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.showSendOtpSuccess = true;

      },
      err => {

        this.showLoader = false;
        console.log(err);
        this.showSendOtpFail = true;

      }
    )
  }


  //


  closeAddBalanceDialog() {
    this.sendCreditSuccess = false;
    this.sendCreditFail = false;
    this.addbalanceForm.get("amount").setValue(0)
    this.addBalanceMode = false;
    this.clientToSendCredit = null;
    this.showSendOtpSuccess = false;
    this.showSendOtpFail = false;

  }


  openAddBalanceDialog(profileID) {
    this.sendCreditSuccess = false;
    this.sendCreditFail = false;
    this.addbalanceForm.get("profileId").setValue(profileID)
    this.addBalanceMode = true;
    this.sendCreditMode = true;
    this.clientToSendCredit = profileID;

  }

  preventNonNumericalInput(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
  }
  addCreditBalance() {
    this.showSendOtpSuccess = false;
    this.showSendOtpFail = false;
    this.sendCreditSuccess = false;
    this.sendCreditFail = false;
    this.showCreditError = false;
    this.showCreditErrorLimit = false;
    this.showLoader = true;
    if (this.addbalanceForm.get("amount").value > 9999) {
      // alert("من فضلك الرصيد لايزيد عن 4 خانات")
      this.showLoader = false;
      this.showCreditError = true;
      this.addbalanceForm.get("amount").setValue(0)
    }
    else if (this.addbalanceForm.get("amount").value < 6) {
      this.showCreditErrorLimit = true;
      this.addbalanceForm.get("amount").setValue(0)
      this.showLoader = false;
    }
    else if (this.addbalanceForm.get("amount").value < 0) {
      alert("من فضلك أضف رصيد ")
      this.addbalanceForm.get("amount").setValue(0)
      this.showLoader = false;
    }

    else {



      console.log(this.addbalanceForm.value);


      this.userServ.addBalanceToClientByAdmin(this.addbalanceForm.value, 'admin', this.uuidValue, localStorage.getItem("auth")).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("successfully");
          console.log(response);

          this.sendCreditMode = false;
          this.sendCreditSuccess = true;

          setTimeout(() => {
            this.addBalanceMode = false;
            
          }, 1000);





        },
        err => {
          this.showLoader = false;
          this.sendCreditFail = true;
          console.log("something went wrong");
          console.log(err);


        }
      )



    }

  }

  logValue(event, formControlName) {
    const value = event.target.value;

    if (value.includes("<scri")) {
      alert("Enter Valid Input");
      this.addbalanceForm.get(formControlName).setValue("");
    }
    else {

    }
  }



}
