import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserAlt, faTimes, faFolderOpen, faCheck, faHistory, faBell, faEnvelope, faSignOutAlt, faThList, faUserTie, faChartBar, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { ManageImageService } from 'src/app/services/manage-image.service';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  uuidValue: any;
  userImageBase;
  faUserAlt = faUserAlt;
  faCheck = faCheck;
  faChartBar = faChartBar;
  faTimes = faTimes;
  faHandHoldingUsd = faHandHoldingUsd;
  faUserTie = faUserTie;
  faFolderOpen = faFolderOpen;
  faThList = faThList;
  faHistory = faHistory;
  faEnvelope = faEnvelope;
  faEnvelope2 = faEnvelope;
  faBell = faBell;
  faSignOutAlt = faSignOutAlt;
  sessionUserType;
  showPartnerPart: boolean = false;
  showClientPart: boolean = false;
  userName: string;
  adminStatistics: any;
  allPrtners;
  allClients;
  showActiveConfirmMessage = false;
  showDeactiveConfirmMessage = false;
  showMessageDialog = false;
  showsendSuccess = false;
  showsendFail = false;
  itemToEdit: any;
  messageReceiver: any;
  sendMessageSpecificUserForm: FormGroup;
  sendMessageForCategoryForm: FormGroup;
  messageObject: any;
  unpaidBalance: any;
  showPayDialog = false;
  itemToPay: any;
  showPaySuccess = false;
  showPayFail = false;
  showsendAllSuccess = false;
  showsendAllFail = false;
  messageReceiverName;
  messageReceiverNames = [];
  allJobsAdmin:any;
  expiredJobs: any;


  constructor(
    private imageServ: ManageImageService,
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService,
    private projectServ: ManageProjectService
  ) { }

  ngOnInit(): void {
    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);
    const userProfileData = {
      profileId: localStorage.getItem("userId"),
      email: localStorage.getItem("email")
    }

    this.sendMessageSpecificUserForm = new FormGroup({
      profileId: new FormControl(null),
      message: new FormControl(null),
      from: new FormControl(localStorage.getItem("userId")),
      fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))
    })


    this.sendMessageForCategoryForm = new FormGroup({
      for: new FormControl("partner"),
      message: new FormControl(null),
      from: new FormControl(localStorage.getItem("userId")),
      fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))

    })
    // retrieve profile data 
    this.userServ.getOneProfileData(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (userProfileResponse: any) => {
        console.log("all user profile object is --------------------------");
        console.log(userProfileResponse.data);
        localStorage.setItem("sessionFirstName", userProfileResponse.data.firstName);
        localStorage.setItem("sessionLastName", userProfileResponse.data.lastName);

        this.userName = localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName");



      }
    )
    this.imageServ.retrieveImageFromServer(userProfileData,
      localStorage.getItem("sessionUserType"),
      this.uuidValue,
      localStorage.getItem("auth")

    ).subscribe(
      (userImageResponse: any) => {
        console.log("user profile image exist");
        console.log(userImageResponse);
        this.userImageBase = userImageResponse.data.body.data.image;
        if (this.userImageBase == null) {
          this.userImageBase = "default";
        }
        localStorage.setItem("userImage", this.userImageBase);


      },
      err => {
        console.log("user profile image is not found");
        console.log(err);
        this.userImageBase = "default";
        localStorage.setItem("userImage", this.userImageBase);

      }
    )

    this.userServ.getStatistics("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log(response);
        this.adminStatistics = response.data;

      },
      err => {
        console.log(err);

      }
    )
    this.getAllPartners();
    this.getAllClients();
    this.getAllAdminMessages();
    this.getUnpaidBalance();
    this.getAllJobs();
    this.getExpiredJobs();
  }

  signOut() {
    this.route.navigate(["/admin/login"]);
    localStorage.clear();
  }

  getAllPartners() {
    this.userServ.getAllPartners("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("all partners object ---------------------- ");

        console.log(response.data);
        this.allPrtners = response.data;

      },
      err => {
        console.log(err);

      }
    )
  }

  getAllClients() {
    this.userServ.getAllClients("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("all clients object ---------------------- ");

        console.log(response.data);
        this.allClients = response.data;

      },
      err => {
        console.log(err);

      }
    )
  }
  showPayDialoge(balance) {
    this.showPayDialog = true;
    this.itemToPay = balance;
    // console.log(balance._id.partnerId);

  }
  closeActiveDialog() {
    this.showActiveConfirmMessage = false;
  }
  closePayDialog() {
    this.showPayDialog = false;
  }
  closeDeactiveDialog() {
    this.showDeactiveConfirmMessage = false;
  }
  showActive(user) {
    this.showActiveConfirmMessage = true;
    this.itemToEdit = user;
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

  activateAccount(profileId) {
    this.userServ.updateProfileByAdmin(profileId, { "status": "active" }, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        console.log(Response);
        this.showActiveConfirmMessage = false;
        this.ngOnInit();

      },
      err => {
        console.log(err);
        this.showActiveConfirmMessage = false;

      }
    )
  }

  deActivateAccount(profileId) {
    this.userServ.updateProfileByAdmin(profileId, { "status": "pending" }, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        console.log(Response);
        this.showDeactiveConfirmMessage = false;
        this.ngOnInit();

      },
      err => {
        console.log(err);
        this.showDeactiveConfirmMessage = false;

      }
    )
  }

  sendMeaage() {
    // fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))
    this.sendMessageSpecificUserForm.get("fromName").setValue(
      localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName")
    )
    this.sendMessageSpecificUserForm.get("profileId").setValue(this.messageReceiver._id);
    console.log(this.sendMessageSpecificUserForm.value);
    this.userServ.sendMessageToUser(this.sendMessageSpecificUserForm.value, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log('message sent');
        console.log(response);

        this.showsendSuccess = true;
        this.showsendFail = false;
      },
      err => {
        console.log(err);
        this.showsendSuccess = false;
        this.showsendFail = true;

      }
    )
  }

  // send message for category

  sendMeaageForCategory() {
    this.sendMessageForCategoryForm.get("fromName").setValue(
      localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName")
    )
    console.log(this.sendMessageForCategoryForm.value);
    this.userServ.sendMessageToCategory(this.sendMessageForCategoryForm.value, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log('message sent for category');
        console.log(response);
        this.showsendAllSuccess = true;
        // this.ngOnInit;
      },
      err => {
        console.log(err);
        this.showsendAllFail = true;


      }
    )
  }

  getAllAdminMessages() {
    this.userServ.getAllAdminMessages("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("all messages response");
        console.log(response.data);
        this.messageObject = response.data;
        // console.log(this.messageObject.profileId);
        for (const singleMessage of this.messageObject) {
          // console.log("single profile for message is ====");

          console.log(singleMessage.profileId);
          this.userServ.getOneProfileData(singleMessage.profileId, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
            (response: any) => {

              console.log(response);
              this.messageReceiverName = response.data.firstName + " " + response.data.lastName;
              console.log("message receiver profile response");
              console.log(this.messageReceiverName);
              this.messageReceiverNames.push(this.messageReceiverName);



            }
          )

        }




      },
      err => {
        console.log(" no messages");
        console.log(err);

      }


    )

  }


  getUnpaidBalance() {
    this.userServ.getUnpaidBalance("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("unpaid balance response");
        console.log(response);
        this.unpaidBalance = response.data;


      },
      err => {
        console.log(" no unpaid balance");
        console.log(err);

      }


    )

  }


  payForPartner(partnerId) {
    this.userServ.updateUnpaidBalance({ "status": "paid" }, partnerId, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        console.log(Response);
        this.showPaySuccess = true;
        // setTimeout(() => {
        //   this.showPayDialog = false;
        // this.ngOnInit();
        // }, 2000);


      },
      err => {
        console.log(err);
        this.showPaySuccess = false;
        this.showPayFail = true;

      }
    )
  }

  getExpiredJobs() {
    this.userServ.getExpiredJobs("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("expired jobs object ---------------------- ");

        console.log(response.data);
        // this.allClients = response.data;

      },
      err => {
        console.log(err);

      }
    )
  }

  // get all jobs

  getAllJobs() {
    
    this.projectServ.getAllProjectsForAdmin("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("all admin jobs object ---------------------- ");

        console.log(response.data);
        this.allJobsAdmin = response.data;
        // this.allClients = response.data;

      },
      err => {
        console.log(err);

      }
    )
  }



}
