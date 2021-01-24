import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faSignOutAlt, faFileAlt, faHourglassHalf, faMoneyBillWave, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ManageImageService } from 'src/app/services/manage-image.service';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  uuidValue: any;
  projectId;
  editedProjectObject;
  applyJobForm: FormGroup;
  showApplySuccessMessage: boolean = false;
  faFileAlt = faFileAlt;
  faHourglassHalf = faHourglassHalf;
  faMoneyBillWave = faMoneyBillWave;
  faArrowLeft = faArrowLeft;
  userImageBase;
  tags;
  helpfulLinks;
  constructor(private projectSev: ManageProjectService, private Uuid: UUIDService, private route: Router, private imageServ: ManageImageService) { }
  selectedProject;
  ngOnInit(): void {
    this.uuidValue = this.Uuid.generateUUID();
    // console.log("this.uuidvalue");
    // console.log(this.uuidValue);
    this.projectSev.selectedPoject.subscribe(
      (result) => {
        this.selectedProject = result;
        this.tags = result.projectTags;
        this.helpfulLinks = result.helpfulLinks;
        this.projectId = result._id;
      }
    )



    /* getting image for profile page for first time */

    const userProfileData = {
      profileId: localStorage.getItem("userId"),
      email: localStorage.getItem("email")
    }
    this.imageServ.retrieveImageFromServer(userProfileData,
      localStorage.getItem("sessionUserType"),
      this.uuidValue,
      localStorage.getItem("auth")

    ).subscribe(
      (userImageResponse: any) => {
        // console.log("user profile image exist");
        // console.log(userImageResponse);
        this.userImageBase = userImageResponse.data.body.data.image;
        localStorage.setItem("userImage", this.userImageBase);
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


    if (localStorage.getItem("userImage")) {
      this.userImageBase = localStorage.getItem("userImage");
      if (this.userImageBase == null) {
        this.userImageBase = "default";
      }
    }
    else {
      this.userImageBase = "default";
    }
    this.applyJobForm = new FormGroup({
      partnerId : new FormControl(localStorage.getItem("partnerId")),
      status : new FormControl("pending"),//inprogress

    })
  }

  applyForJob(){
    console.log("apply job form ========== ");
    console.log(this.applyJobForm.value);




    this.projectSev.editJob(this.applyJobForm.value, localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth"),this.projectId).subscribe(
      (editResponse)=>{
        console.log("project updated successfully");
        console.log(editResponse);
        this.showApplySuccessMessage = true;
        setTimeout(() => {
          this.route.navigate(['/profile']);
        }, 1500);
        
      },
      err=>{
        console.log("error in update project");
        
      }
    )

  }
  closeDialog(){
    this.showApplySuccessMessage = false;
  }

}
