import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faSignOutAlt, faUserAlt, faTable, faLock, faArchive, faStar } from '@fortawesome/free-solid-svg-icons';
import { user } from '../Model/user';
import { ManageImageService } from '../services/manage-image.service';
import { UploadFileService } from '../services/upload-file.service';
import { UserService } from '../services/user.service';
import { UUIDService } from '../services/uuid.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uploadImageForm: FormGroup;
  editForm:FormGroup;
  resetPasswordForm:FormGroup;
  uuidValue: any;
  active = 1;
  faSignOutAlt = faSignOutAlt;
  faUserAlt = faUserAlt;
  faTable = faTable;
  faLock = faLock;
  faArchive = faArchive;
  faStar = faStar;
  userImageBase;
  userProfileData:user;
  showMessage = false;
  firstNameProfile;
  lastNameProfile;
  userTypeProfile;
  phoneNumberProfile;
  dobProfile;
  genderProfile;
  emailProfile;
  userNameProfile;
  dateOfCreateProfile;
  showEditSuccessMessage:boolean = false;
  showPasswordMatchError:boolean = false;
  showResetPasswordMessage:boolean = false;
  showUploadImageMessage:boolean = false;
  profileRating;
  ratingPersonId;
  ratingPerson;
  constructor(
    private route: Router,
    private imageServ: ManageImageService,
    private Uuid: UUIDService,
    private uploadServ: UploadFileService,
    private userServ:UserService
  ) { }

  ngOnInit(): void {
    // this.userImageBase = "default";




    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);


/* getting image for profile page for first time */

  const userProfileData = {
    profileId:localStorage.getItem("userId"),
    email:localStorage.getItem("email")
  }
this.imageServ.retrieveImageFromServer(userProfileData,
  localStorage.getItem("sessionUserType"),
  this.uuidValue,
  localStorage.getItem("auth")

  ).subscribe(
    (userImageResponse:any)=>{
      console.log("user profile image exist");
      console.log(userImageResponse);
      this.userImageBase = userImageResponse.data.body.data.image;
      localStorage.setItem("userImage",this.userImageBase);
      if(this.userImageBase==null){
        this.userImageBase = "default";
      }
      localStorage.setItem("userImage",this.userImageBase);
      
      
    },
    err=>{
      console.log("user profile image is not found"); 
      console.log(err);
      this.userImageBase = "default";
      localStorage.setItem("userImage",this.userImageBase);
      
    }
  )


    if(localStorage.getItem("userImage")){
      this.userImageBase = localStorage.getItem("userImage");
      if(this.userImageBase==null){
        this.userImageBase = "default";
      }
    }
    else{
      this.userImageBase = "default";
    }



    this.uploadImageForm = new FormGroup({
      image: new FormControl(null, Validators.required),
      profileId: new FormControl(localStorage.getItem("userId")),
      email: new FormControl(localStorage.getItem("email"))

    });

    // reset passwrd form
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(localStorage.getItem("email")),
      newPassword: new FormControl(null),
      reNewPassword:new FormControl(null)
    })
   
    // this.retrieveImage();


    // retrieve profile data 
    this.userServ.getOneProfileData(localStorage.getItem("userId"),localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth")).subscribe(
      (userProfileResponse:any)=>{
        console.log("all user profile object is --------------------------");
        console.log(userProfileResponse.data);
        // localStorage.setItem("sessionFirstName", userProfileResponse.data.firstName);
        //     localStorage.setItem("sessionLastName", userProfileResponse.data.lastName);
        this.userProfileData = userProfileResponse.data;
        this.firstNameProfile = userProfileResponse.data.firstName;
        this.lastNameProfile = userProfileResponse.data.lastName;
        this.userTypeProfile = userProfileResponse.data.customerType;
        this.phoneNumberProfile = userProfileResponse.data.mobileNumber;
        this.dobProfile = userProfileResponse.data.dob;
        this.genderProfile = userProfileResponse.data.gender;
        this.emailProfile = userProfileResponse.data.email; 
        this.userNameProfile = userProfileResponse.data.userName;
        this.dateOfCreateProfile = userProfileResponse.data.createdAt;
        this.editForm.get("firstName").setValue(this.userProfileData.firstName);
        this.editForm.get("lastName").setValue(this.userProfileData.lastName);
        this.editForm.get("country").setValue(this.userProfileData.country);
        this.editForm.get("email").setValue(this.userProfileData.email);
        this.editForm.get("mobileNumber").setValue(this.userProfileData.mobileNumber);
        this.editForm.get("customerType").setValue(this.userProfileData.customerType);
        this.editForm.get("dob").setValue(this.userProfileData.dob);
        this.editForm.get("gender").setValue(this.userProfileData.gender);
        
        
        
      }
    )
    this.editForm = new FormGroup({
      firstName:new FormControl(null),
      lastName:new FormControl(null),
      country:new FormControl(null),
      email:new FormControl(null),
      mobileNumber:new FormControl(null),
      customerType:new FormControl(null),
      dob:new FormControl(null),
      gender:new FormControl(null)


    })


    // get profile ratings
    //localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth")
    this.userServ.getRating(localStorage.getItem("userId"),localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth")).subscribe(
      (response:any)=>{
        console.log("rating object ==== ");
        console.log(response.data);
        this.profileRating = response.data;
        for (const oneRate of this.profileRating) {
          this.ratingPersonId = oneRate.profileId;
          console.log(this.ratingPersonId);
          this.getRaterProfile(this.ratingPersonId);

          
          
          
        }
        // this.ratingPersonId = response.data.rate;
        // console.log(this.ratingPersonId)
        // this.userServ.getOneProfileData(this.ratingPersonId,localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth")).subscribe(
        //   (response)=>{
        //     console.log(response)
        //   }
        // )
        
      },
      err=>{
        console.log("no rating found");
        
      }
    )


  }
  
getRaterProfile(profileID){
  console.log("----------- single profile id -------------- ");
  console.log(profileID);
  this.userServ.getOneProfileData(profileID,localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth")).subscribe(
    (response)=>{
      console.log(response)
    }
  )
}

  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {
        console.log(typeof (upData));
        this.uploadImageForm.controls['image'].setValue(upData);
      }
    )
  }



  // const userProfileData = {
  //   profileId:localStorage.getItem("userId"),
  //   email:localStorage.getItem("email")
  // }
  // this.imageServ.retrieveImageFromServer(userProfileData,
  //   localStorage.getItem("sessionUserType"),
  //   this.uuidValue,
  //   localStorage.getItem("auth")

  //   ).subscribe(
  //     (userImageResponse:any)=>{
  //       console.log("user profile image exist");
  //       console.log(userImageResponse);
  //       this.userImageBase = userImageResponse.data.body.data.image;


  //     },
  //     err=>{
  //       console.log("user profile image is not found");
  //       console.log(err);
  //       this.userImageBase = "default";

  //     }
  //   )

  signOut() {
    this.route.navigate(["/login"]);
    localStorage.clear();
  }
 
  uploadImage() {


    let formData = new FormData();
    formData.append('image', "sssss");
    formData.append('profileId', this.uploadImageForm.get("profileId").value);
    formData.append('email', this.uploadImageForm.get("email").value);
    console.log(this.uploadImageForm.value);
    this.imageServ.uploadImageToServer(
      this.uploadImageForm.value,
      localStorage.getItem("sessionUserType"),
      this.uuidValue,
      localStorage.getItem("auth")
    ).subscribe(
      (response: any) => {
        console.log("image uploaded successfully");
        console.log(response);
        // this.userImageBase = response.data.body.data.image;
        this.showUploadImageMessage = true;
        localStorage.setItem("userImage",response.data.image);
        // this.retrieveImage();
        this.ngOnInit();
        // this.headerObj.ngOnInit();
        this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/profile']);
      }); 


      },
      err => {
        console.log("error in upload");
        console.log(err);
        this.showUploadImageMessage = false;

      }
    )

  }
  // retrieveImage() {
  //   const userProfileData = {
  //     profileId: localStorage.getItem("userId"),
  //     email: localStorage.getItem("email")
  //   }
  //   this.imageServ.retrieveImageFromServer(userProfileData,
  //     localStorage.getItem("sessionUserType"),
  //     this.uuidValue,
  //     localStorage.getItem("auth")

  //   ).subscribe(
  //     (userImageResponse: any) => {
  //       console.log("user profile image exist");
  //       console.log(userImageResponse);
  //       if(this.userImageBase==null){
  //         this.userImageBase = "default";
  //         this.imageServ.profileImagePathShared.next("default");
  //       }
  //       else{
  //       this.imageServ.profileImagePathShared.next(userImageResponse.data.body.data.image);
  //       this.userImageBase = userImageResponse.data.body.data.image;
  //     }
        


  //     },
  //     err => {
  //       console.log("user profile image is not found");
  //       console.log(err);
  //       this.userImageBase = "default";

  //     }
  //   )
  // }
  // localStorage.getItem("userId"),localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth")
  // update profile method
  updateProfile(){
    console.log(this.editForm.value);
    this.userServ.updateUserProfile(this.editForm.value,localStorage.getItem("userId"),localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth")).subscribe(
      (updateResponse:any)=>{
        console.log("data updates successfully");
        console.log(updateResponse);
        this.showEditSuccessMessage = true;
        this.ngOnInit();
        
        
      },
      err=>{
        console.log("something went wrong in update method");
        console.log(err);
        
        
      }
    )
    
    
  }
  closeDialog(){
    this.showEditSuccessMessage = false;
    this.showUploadImageMessage = false;
    // this.ngOnInit();
  }
  resetPassword(){
    console.log(this.resetPasswordForm.value);
    if(this.resetPasswordForm.get("newPassword").value!=this.resetPasswordForm.get("reNewPassword").value){
      this.showPasswordMatchError = true;
      
    }
    else{
      this.showPasswordMatchError = false;
      this.userServ.resetPasswordInProfile(this.resetPasswordForm.value,localStorage.getItem("sessionUserType"),this.uuidValue).subscribe(
        (response)=>{
          console.log("password reseted successfully");
          console.log(response);
          this.showResetPasswordMessage = true;
          this.signOut();
          
          
        },
        err=>{
          console.log("something went wrong in reseting password");
          console.log(err);
          this.showResetPasswordMessage = false;
          
          
        }
      )
    }
    
  }

}
