import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserAlt, faFolderOpen,faCheck, faHistory, faBell, faEnvelope, faSignOutAlt,faThList,faUserTie,faChartBar,faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { ManageImageService } from 'src/app/services/manage-image.service';
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
  faHandHoldingUsd = faHandHoldingUsd;
  faUserTie = faUserTie;
  faFolderOpen = faFolderOpen;
  faThList = faThList ;
  faHistory = faHistory;
  faEnvelope = faEnvelope;
  faBell = faBell;
  faSignOutAlt = faSignOutAlt;
  sessionUserType;
  showPartnerPart: boolean = false;
  showClientPart: boolean = false;
  userName:string;

  constructor(private imageServ: ManageImageService, private Uuid: UUIDService, private route: Router, private userServ: UserService) { }

  ngOnInit(): void {
    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);
    const userProfileData = {
      profileId: localStorage.getItem("userId"),
      email: localStorage.getItem("email")
    }

    // retrieve profile data 
 this.userServ.getOneProfileData(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
  (userProfileResponse: any) => {
    console.log("all user profile object is --------------------------");
    console.log(userProfileResponse.data);
    localStorage.setItem("sessionFirstName", userProfileResponse.data.firstName);
    localStorage.setItem("sessionLastName", userProfileResponse.data.lastName);

    this.userName = localStorage.getItem("sessionFirstName") + " "+ localStorage.getItem("sessionLastName");



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
  }

  signOut() {
    this.route.navigate(["/admin/login"]);
    localStorage.clear();
  }

  

}
