import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faEnvelope, faArrowLeft,faFileDownload,faAddressCard,faUserAlt,faMobileAlt,faFlag,faVenusMars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accept-partner',
  templateUrl: './accept-partner.component.html', 
  styleUrls: ['./accept-partner.component.css']
})
export class AcceptPartnerComponent implements OnInit {
  faEnvelope = faEnvelope;
  faArrowLeft = faArrowLeft;
  faFileDownload = faFileDownload;
  faAddressCard = faAddressCard;
  faMobileAlt = faMobileAlt;
  faUserAlt = faUserAlt;
  faFlag = faFlag;
  faVenusMars = faVenusMars;
  currentRate = 0;
  showApplyBoxFail = false;
  showApplyBoxSuccess = false;
  addRatingForm: FormGroup;
  uuidValue: any;
  selectedProject;
  projectId;
  partnerId;
  partnerName;
  partnerDialogObject;
  acceptJobForm: FormGroup;
  rejectJobForm: FormGroup;
  deliverJobForm: FormGroup;
  clientAddCommentForm: FormGroup;
  finishProjectFrom:FormGroup;
  rejectProjectForm: FormGroup;
  showRejectForm: boolean = false;
  showFinishBoxSuccess = false;
  showProjectPartnerMessage:boolean = false;
  loggedUserType;
  commentForJob;
  showdeliverBox = false;
  constructor(private projectSev: ManageProjectService, private Uuid: UUIDService, private route: Router, private userServ: UserService) { }

  ngOnInit(): void {
    this.loggedUserType = localStorage.getItem("sessionUserType");
    this.acceptJobForm = new FormGroup({
      clinetId: new FormControl(localStorage.getItem("clientId")),
      status: new FormControl("inprogress")

    })
    this.rejectJobForm = new FormGroup({
      clinetId: new FormControl(localStorage.getItem("clientId")),
      partnerId: new FormControl(null),
      status: new FormControl("rejected"),
      rejectionReason: new FormControl(null,Validators.required)

    })
    this.deliverJobForm = new FormGroup({
      status: new FormControl("reviewing"),
      document: new FormControl(null)

    })
    this.finishProjectFrom = new FormGroup({
      status: new FormControl("completed")
    })

    this.rejectProjectForm = new FormGroup({
      status: new FormControl("rejected")
    })

    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);
    this.projectSev.selectedPoject.subscribe(
      (result) => {
        this.selectedProject = result;
        this.projectId = result._id;
        // this.getComments();
        this.partnerId = result.partnerId;
      }
    )
    this.getComments();
    this.addRatingForm = new FormGroup({
      profileId: new FormControl(this.partnerId),
      firstName: new FormControl(localStorage.getItem("sessionFirstName")),
      lastName: new FormControl(localStorage.getItem("sessionLastName")),
      rate: new FormControl(null),
      comment: new FormControl(null)
    })



    this.clientAddCommentForm = new FormGroup({
      jobId: new FormControl(this.projectId),
      message: new FormGroup({
        profileId: new FormControl(localStorage.getItem("userId")),
        firstName: new FormControl(localStorage.getItem("sessionFirstName")),
        lastName: new FormControl(localStorage.getItem("sessionLastName")),
        content: new FormControl(null)
      })

    })

  }


  logStepValue(status: string) {
    if (status == 'active') {
      this.showApplyBoxFail = true;
      this.showApplyBoxSuccess = false;
    }
    else {

      this.userServ.getOneProfileData(this.partnerId, "partner", this.uuidValue, localStorage.getItem("auth")).subscribe(
        (response: any) => {
          this.partnerName = response.data.userName;
          console.log("partner profile data ====== ");
          console.log(response.data);
          this.partnerDialogObject = response.data;


        }
      )
      this.showApplyBoxFail = false;
      this.showApplyBoxSuccess = true;




    }

  }
  acceptPartner() {
    console.log(this.acceptJobForm.value)
    this.projectSev.editJob(this.acceptJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        console.log("تم قبول الكاتب");
        console.log(response)
        this.route.navigate(['/myProjects']);

      },
      err => {
        console.log("something went wrong");
        console.log(err);


      }
    )

  }

  rejectPartner() {
    console.log(this.rejectJobForm.value);

    this.projectSev.editJob(this.rejectJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        console.log("تم رفض الكاتب");
        console.log(response)
        this.route.navigate(['/myProjects']);

      },
      err => {
        console.log("something went wrong");
        console.log(err);
      }
    )

  }
  showReject() {
    this.showRejectForm = true;
  }
  addRate() {
    console.log(this.addRatingForm.value)
    this.userServ.addRating(this.addRatingForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response) => {
        console.log("rate added successfully");
        console.log(response);


      }
    )

  }

  addComment() {
    console.log("comment object ==== ");
    console.log(this.clientAddCommentForm.value);


    this.userServ.addComment(this.clientAddCommentForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response) => {
        console.log("comment added successfully");
        console.log(response);
        this.ngOnInit()

      },
      err => {
        console.log("something went wrong");
        console.log(err);


      }
    )


  }
  getComments() {
    this.userServ.getComment(this.projectId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("comments for job ==== ");
        console.log(response.data.body.data[0].message);
        this.commentForJob = response.data.body.data[0].message;


      },
      err => {
        console.log("no comments exist for this project");
        console.log(err);


      }
    )

  }



  // getComments() {
  //   this.userServ.getComment("60032edbda8fea565543daaa","client","185acb4b-38e0-4afc-a025-c8794c8a43a3","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1ZmY2NWU0OGNlNzRkNTNkOTg1MzMwZmEiLCJpYXQiOjE2MTA4NDY5MTIuMTU0LCJzdWIiOiJ0YXp3ZWVkfDc3IiwiZXhwIjoxNjEwOTMzMzEyLjE1NH0.VTCdXVMMuAVAbzbSm9CJLRtP7iYS08_yo-rQllmJW0E").subscribe(
  //     (response: any) => {
  //       console.log("comments for job ==== ");
  //       console.log(response);
  //       this.commentForJob = response;


  //     },
  //     err => {
  //       console.log("no comments exist for this project");
  //       console.log(err);


  //     }
  //   )

  // }


  deliverProjectForClient() {
    this.showdeliverBox = true;
  }
  deliverJob() {
    console.log(this.deliverJobForm.value);


    this.projectSev.editJob(this.deliverJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        console.log("تم نسليم المشروع");
        console.log(response)
        this.route.navigate(['/myProjects']);

      },
      err => {
        console.log("something went wrong");
        console.log(err);


      }
    )

  }


  completeProject(){
    console.log(this.finishProjectFrom.value);


    this.projectSev.editJob(this.finishProjectFrom.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        console.log("تم نسليم المشروع");
        console.log(response)
        this.route.navigate(['/finishingProjectMessage']);

      },
      err => {
        console.log("something went wrong");
        console.log(err);


      }
    )

    

  }

  rejectProject(){
    console.log(this.rejectProjectForm.value);
    this.projectSev.editJob(this.rejectProjectForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        console.log("تم نسليم المشروع");
        console.log(response)
        this.route.navigate(['/myProjects']);

      },
      err => {
        console.log("something went wrong");
        console.log(err);


      }
    )
    

  }

  showReviewBox(){
    this.showFinishBoxSuccess = true;
  }

  Export2Doc(element, filename = ''){
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body style='direction:rtl'>";
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById(element).innerHTML+postHtml;

    var blob = new Blob(['\ufeff', html],{
        type: 'application/msword'
    });

    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)

    filename = filename?filename+'.doc': 'document.doc';

    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        downloadLink.href = url;

        downloadLink.download = filename;

        downloadLink.click();
    }

    document.body.removeChild(downloadLink);


}

closeDialog(){
  this.showProjectPartnerMessage = false;
}


}
