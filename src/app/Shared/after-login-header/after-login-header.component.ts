import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { faUserAlt, faFolderOpen, faHistory, faBell, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ManageImageService } from 'src/app/services/manage-image.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-after-login-header',
  templateUrl: './after-login-header.component.html',
  styleUrls: ['./after-login-header.component.css']
})
export class AfterLoginHeaderComponent implements OnInit { 
  uuidValue: any;
  userImageBase;
  public isCollapsed = true;
  constructor(private imageServ: ManageImageService, private Uuid: UUIDService, private route: Router, private userServ: UserService) { }
  faUserAlt = faUserAlt;
  faFolderOpen = faFolderOpen;
  faHistory = faHistory;
  faEnvelope = faEnvelope;
  faBell = faBell;
  faSignOutAlt = faSignOutAlt;
  sessionUserType;
  showPartnerPart: boolean = false;
  showClientPart: boolean = false;
  userName:string;
  ngOnInit(): void {


   
    this.sessionUserType = localStorage.getItem("sessionUserType");
    if (this.sessionUserType == "partner") {
      this.showPartnerPart = true;
      this.showClientPart = false;
    }
    else {
      this.showPartnerPart = false;//showPartnerPart showClientPart
      this.showClientPart = true;
    }
    this.uuidValue = this.Uuid.generateUUID();
    // console.log("this.uuidvalue");
    // console.log(this.uuidValue);
    const userProfileData = {
      profileId: localStorage.getItem("userId"),
      email: localStorage.getItem("email")
    }
 // retrieve profile data 
 this.userServ.getOneProfileData(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
  (userProfileResponse: any) => {
    // console.log("all user profile object is --------------------------");
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
    // this.imageServ.profileImagePathShared.subscribe(
    //   (response)=>{
    //     console.log("user profile image exist");
    //       console.log(response);
    //       this.userImageBase = response;

    //   },
    //   err=>{
    //     console.log("error in get profile image from service");
    //     this.userImageBase = "default";

    //   }
    // )


  }
  signOut() {
    this.route.navigate(["/login"]);
    localStorage.clear();
  }

}
