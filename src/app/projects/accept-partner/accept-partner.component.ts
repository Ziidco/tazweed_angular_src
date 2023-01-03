import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faEnvelope,faTimesCircle,faChevronLeft,faClock,faFilePdf,faFileExcel,faFileImage,faCube,faFileWord,faCalendar,faWrench, faGrinStars, faTimes, faCheck, faExclamationTriangle, faHourglassHalf, faMoneyBillWave, faFileAlt, faChevronDown, faExclamationCircle, faChevronUp, faArrowLeft, faFileDownload, faAddressCard, faUserAlt, faMobileAlt, faFlag, faVenusMars, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { project } from 'src/app/Model/project';
import { Document, Packer, Paragraph, TextRun } from "docx";
// import { saveAs } from "file-saver/FileSaver"; 
import { asBlob } from 'html-docx-js-typescript'
// if you want to save the docx file, you need import 'file-saver'
import { saveAs } from 'file-saver'
@Component({
  selector: 'app-accept-partner',
  templateUrl: './accept-partner.component.html',
  styleUrls: ['./accept-partner.component.css']
})
export class AcceptPartnerComponent implements OnInit {
  showUserData = false;
  showWhthdrawDlg = false;
  idToShow;
  public isCollapsed = true;
  faEnvelope = faEnvelope;
  faCube = faCube;
  faCalendar = faCalendar;
  faTwitter = faTwitter;
  faClock = faClock;
  faChevronUp = faChevronUp;
  faWrench = faWrench;
  faArrowLeft = faArrowLeft;
  faChevronLeft = faChevronLeft;
  cancelJobMessageP = false;
  faGrinStars = faGrinStars;
  faExclamationTriangle = faExclamationTriangle;
  faExclamationCircle = faExclamationCircle;
  showCanceljobConfirm = false;
  faTimes = faTimes;
  faCheck = faCheck;
  faFileAlt = faFileAlt;
  faMoneyBillWave = faMoneyBillWave;
  faChevronDown = faChevronDown;
  faHourglassHalf = faHourglassHalf;
  faFileDownload = faFileDownload;
  faAddressCard = faAddressCard;
  faMobileAlt = faMobileAlt;
  faUserAlt = faUserAlt;
  faFlag = faFlag;
  faTimesCircle = faTimesCircle;

  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  faFileWord = faFileWord;
  faFileImage = faFileImage;
  tags;
  cancelJobMessage = false;
  withdrowJobMessage = false;
  faVenusMars = faVenusMars;
  faFolderOpen = faFolderOpen;
  currentRate = 0;
  showApplyBoxFail = false;
  showApplyBoxSuccess = false;
  addRatingForPartnerForm: FormGroup;
  addRatingForClientForm: FormGroup;
  uuidValue: any;
  selectedProject;
  projectId;
  partnerId;
  partnerName;
  partnerDialogObject;
  acceptJobForm: FormGroup;
  rejectJobForm: FormGroup;
  deliverJobForm: FormGroup;
  cancelJobForm: FormGroup;
  withdrawJobForm: FormGroup;
  clientAddCommentForm: FormGroup;
  finishProjectFrom: FormGroup;
  rejectProjectForm: FormGroup;
  rejectEditingProjectForm: FormGroup;
  showRejectForm: boolean = false;
  showFinishBoxSuccess = false;
  deliverJobSuccess = false;
  showProjectPartnerMessage: boolean = false;
  partnerNumOfCompletedJobs;
  partnerNumOfRejectedJobs;
  partnerRatingAverage;
  loggedUserType;
  commentForJob;
  showdeliverBox = false;
  showRequetsEditsForm = false;
  showLoader = false;
  helpfulLinks;
  clientId;
  showRateFail = false;
  showRateSuccess = false;
  showMessages = true;
  content = '';
  projectIdShoot;
  projectDocument;
  projectTitle;
  status;
  actionErrorMessage = false;
  projectDataNotExist = false;
  userNameInAdminDialog;
  showDeadLine = false;
  userNumOfCompletedJobsInAdminDialog;
  userNumOfRejectedJobsInAdminDialog;
  userRatingAverageInAdminDialog;
  showPartnerName = false;
  allPurposals;
  math = Math;
  cancelpurposalMode = false;
  purposaltocanel;
  cancelSuccess = false;
  cancelFail = false;
  showRatingDialog = false;
  showFinishRatingDialog = false;
  allJobRatings;
  singlerating;
  showPartnerRatingDialog = false;
  remainingDays;
  remainingHours;
localTime; 
localTimeConverted:any;
allUploads;
docFile;
showDelivery = true;
betweenVirtual;
countDownDateVirtual;
noDetailsexist = false;
  constructor(private projectSev: ManageProjectService, private Uuid: UUIDService, private route: Router, private userServ: UserService, private actroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.docFile = new Document({
      sections: [{
          properties: {},
          children: [
              new Paragraph({
                  children: [
                      new TextRun("Hello World"),
                    
                      new TextRun({
                          text: "\tGithub is the best",
                          bold: true,
                      }),
                  ],
              }),
          ],
      }],
  });
this.getTime()
this.showLoader = true;
    // console.log("project id is === ");
    // console.log(this.actroute.snapshot.params["id"]);
    this.projectIdShoot = this.actroute.snapshot.params["id"];
    this.projectId = this.projectIdShoot;
    this.loggedUserType = localStorage.getItem("sessionUserType");
    this.acceptJobForm = new FormGroup({
      clinetId: new FormControl(localStorage.getItem("clientId")),
      status: new FormControl("inprogress"),
      partnerId: new FormControl(null)

    })
    this.rejectJobForm = new FormGroup({
      clinetId: new FormControl(localStorage.getItem("clientId")),
      partnerId: new FormControl(null),
      status: new FormControl("rejected"),
      rejectionReason: new FormControl(null, Validators.required)

    })
    this.rejectEditingProjectForm = new FormGroup({
      clinetId: new FormControl(localStorage.getItem("clientId")),
      status: new FormControl("rejected"),
      rejectionReason: new FormControl(null, Validators.required)

    })


    this.deliverJobForm = new FormGroup({
      status: new FormControl("reviewing"),
      document: new FormControl(null)

    })

    this.cancelJobForm = new FormGroup({
      status: new FormControl("canceled"),

    })
    this.withdrawJobForm = new FormGroup({
      status: new FormControl("withdrawn"),

    })
    this.finishProjectFrom = new FormGroup({
      status: new FormControl("completed")
    })

    this.rejectProjectForm = new FormGroup({
      status: new FormControl("rejected")
    })

    this.uuidValue = this.Uuid.generateUUID();
    // this.projectSev.selectedPoject.subscribe(
    //   (result) => {
    //     this.selectedProject = result;
    //     this.projectId = result._id;
    //     this.partnerId = result.partnerId;
    //     this.clientId = result.clientId;
    //     this.tags = result.projectTags;
    //     this.helpfulLinks = result.helpfulLinks;
    //   }
    // )
    // console.log("this.projectIdShoot");
    // console.log(this.projectIdShoot);

    this.getProjectData(this.projectIdShoot);
    this.getProjectActivityLog(this.projectIdShoot);
    this.getAllPurposals()
    this.getComments();

    this.getjobUploads()
    this.addRatingForPartnerForm = new FormGroup({
      profileId: new FormControl(this.clientId),
      firstName: new FormControl(localStorage.getItem("sessionFirstName")),
      lastName: new FormControl(localStorage.getItem("sessionLastName")),
      rate: new FormControl(null, Validators.required),
      comment: new FormControl(null, Validators.required),
      jobId: new FormControl(this.projectId)
    })

    this.addRatingForClientForm = new FormGroup({
      profileId: new FormControl(this.partnerId),
      firstName: new FormControl(localStorage.getItem("sessionFirstName")),
      lastName: new FormControl(localStorage.getItem("sessionLastName")),
      rate: new FormControl(null, Validators.required),
      comment: new FormControl(null, Validators.required),
      jobId: new FormControl(this.projectId)
    })






    this.clientAddCommentForm = new FormGroup({
      jobId: new FormControl(this.projectId),
      message: new FormGroup({
        profileId: new FormControl(localStorage.getItem("userId")),
        firstName: new FormControl(localStorage.getItem("sessionFirstName")),
        lastName: new FormControl(localStorage.getItem("sessionLastName")),
        content: new FormControl(null,Validators.required)
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
          // console.log("partner for this project data ====== ");
          // console.log(response.data);
          this.partnerDialogObject = response.data;


        }
      )
      this.showApplyBoxFail = false;
      this.showApplyBoxSuccess = true;




    }

  }

  showPartnerData() {
    // console.log("this.partnerId");
    // console.log(this.partnerId);




    this.userServ.getOneProfileData(this.partnerId, "partner", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.partnerName = response.data.userName;
        // console.log("partner for this project data ====== ");
        // console.log(response.data);
        this.partnerDialogObject = response.data;
        this.partnerNumOfCompletedJobs = response.data.numOfCompletedJobs;
        this.partnerNumOfRejectedJobs = response.data.numOfRejectedJobs;
        this.partnerRatingAverage = response.data.ratingAverage;



      },
      err => {
        console.log(err);

      }
    )







  }
  acceptPartner(partnerId) {
    this.showLoader = true;
    this.acceptJobForm.get("partnerId").setValue(partnerId);
    this.actionErrorMessage = false;
    // console.log(this.acceptJobForm.value)


    this.projectSev.editJob(this.acceptJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        this.showLoader = false;
        // console.log("تم قبول الكاتب");
        // console.log(response)
        this.route.navigate(['/myProjects']);

      },
      err => {
        console.log("something went wrong");
        this.showLoader = false;
        console.log(err);
        this.actionErrorMessage = true;


      }
    )

  }

  rejectPartner() {
    this.showLoader = true;
    // console.log(this.rejectJobForm.value);
    this.actionErrorMessage = false;
    this.projectSev.editJob(this.rejectJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        this.showLoader = false;
        // console.log("تم رفض الكاتب");
        // console.log(response)
        this.route.navigate(['/myProjects']);

      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;
      }
    )

  }
  rejectEditPartner() {
    this.showLoader = true;
    // console.log(this.rejectEditingProjectForm.value);
    this.actionErrorMessage = false;
    this.projectSev.editJob(this.rejectEditingProjectForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        // console.log("تم رفض الكاتب");
        this.showLoader = false;
        // console.log(response)
        this.route.navigate(['/myProjects']);

      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;
      }
    )

  }
  showReject() {
    this.showRejectForm = true;
  }
  addRateForPartner() {
    this.addRatingForPartnerForm.get("jobId").setValue(this.projectId)
    this.addRatingForPartnerForm.get("profileId").setValue(this.clientId.value)
    this.showLoader = true;
    // console.log(this.addRatingForPartnerForm.value)
    this.userServ.addRating(this.addRatingForPartnerForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response) => {
        this.showLoader = false;
        this.showPartnerRatingDialog = false;
        this.showFinishRatingDialog = true;
        this.addRatingForPartnerForm.reset()



      },
      err => {
        this.showLoader = false;

        console.log(err);
        this.showRateFail = true;

      }
    )

  }
  addRateForClient() {



    this.showLoader = true;
    // console.log(this.addRatingForClientForm.value)
    this.userServ.addRating(this.addRatingForClientForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response) => {
        this.showLoader = false;
        // console.log("rate added successfully");
        this.showRatingDialog = false;
        this.showFinishRatingDialog = true;
        this.addRatingForClientForm.reset()



      },
      err => {
        this.showLoader = false;
        console.log(err);
        this.showRateFail = true;
      }
    )

  }

  addComment() {
    this.showLoader = true;
    // console.log("comment object ==== ");
    // console.log(this.clientAddCommentForm.value);

    this.actionErrorMessage = false;
    this.userServ.addComment(this.clientAddCommentForm.value, localStorage.getItem("sessionUserType"), this.uuidValue + "fheossss", localStorage.getItem("auth")).subscribe(
      (response) => {
        // console.log("comment added successfully");
        this.showLoader = false;
        // console.log(response);
        this.ngOnInit()

      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;


      }
    )


  }
  getComments() {
    this.userServ.getComment(this.projectId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("comments for job ==== ");
        // console.log(response);

        // console.log(response);
        // console.log(response.data.body.data[0].message);
        if (response.data.body.data == null || response.data.body.data == "") {
          // console.log("comments is empty");
          // this.showMessages = false;

        }
        else {
          this.showMessages = true;
          this.commentForJob = response.data.body.data[0].message;
        }




      },
      err => {
        console.log("no comments exist for this project");
        console.log(err);
        // this.showMessages = false;


      }
    )

  }


  deliverProjectForClient() {
    this.showdeliverBox = true;
  }
  deliverJob() {
    // this.deliverJobForm.get("document").setValue(this.content);
    // console.log(this.deliverJobForm.value);
    this.showLoader = true;
    this.actionErrorMessage = false;
    this.projectSev.editJob(this.deliverJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        // console.log("تم نسليم المشروع");
        // console.log(response)
        this.showLoader = false;
        this.deliverJobSuccess = true;
        this.showDelivery = false;
        setTimeout(() => {
          this.deliverJobSuccess = false;
          this.route.navigate(['/myProjects']);

        }, 1500);


      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;


      }
    )

  }

 
  completeProject() {
    this.showLoader = true;
    // jobId:new FormControl(this.projectId
    this.addRatingForClientForm.get("jobId").setValue(this.projectId)
    this.addRatingForClientForm.get("profileId").setValue(this.partnerId)
    // console.log(this.finishProjectFrom.value);
    // console.log(this.projectId);
    
    this.actionErrorMessage = false;
    // this.showRatingDialog = true;
    this.projectSev.editJob(this.finishProjectFrom.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        this.showRatingDialog = true;
        this.showLoader = false;

      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;


      }
    )



  }

  closeRatingDialog() {
    this.showRatingDialog = false;
    // this.ngOnInit()
  }
  closePartnerRatingDialog() {
    this.showPartnerRatingDialog = false;
  }
  rejectProject() {
    this.showRequetsEditsForm = true;
  }

  showReviewBox() {
    this.showFinishBoxSuccess = true;
  }

  Export2Doc(element, filename = '') {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body style='direction:rtl'>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById(element).innerText + postHtml;

    var blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });

    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)

    filename = filename ? filename + '.docx' : 'document.doc';

    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      downloadLink.href = url;

      downloadLink.download = filename;

      downloadLink.click();
    }

    document.body.removeChild(downloadLink);


  }

  closeDialog() {
    this.showProjectPartnerMessage = false;
  }
  closeRateFailDlg() {
    this.showRateFail = false;
  }
  closeRateSuccessDlg() {
    this.showRateSuccess = false;
  }




  getProjectData(projectId) {
    this.userServ.getOneProject(projectId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("email")).subscribe(
      (response: any) => {
        this.showLoader = false;
        // console.log(response);


        this.selectedProject = response.data[0];
if( this.selectedProject == null ||  this.selectedProject == undefined){
  this.noDetailsexist = true
}
else{
  this.noDetailsexist = false;
}
      //   this.selectedProject =  {
      //     "_id": "63a2d05bdc74e90de2541b68",
      //     "helpfulLinks": [],
      //     "projectTags": [
      //         "التجارة الإلكترونية",
      //         "المتجر الإلكتروني",
      //         "تصميم الموقع"
      //     ],
      //     "status": "prePayment",
      //     "numberOfRejection": 0,
      //     "isExpiredNotified": false,
      //     "isBalanceUsed": true,
      //     "isPrePaymentNotified": false,
      //     "isNeedPayment": true,
      //     "redirectToPaymentGetway": true,
      //     "isInCart": true,
      //     "ableToCancel": false,
      //     "hasPromoCode": true,
      //     "hasProposal": true,
      //     "jobTypeId": "1",
      //     "clientId": "628f30db101229028d71ec33",
      //     "projectTitle": "نصائح مهمة لاختيار النسق الأنسب لموقع التجارة الإلكترونية",
      //     "projectField": "التجارة الإلكترونية",
      //     "projectIdea": "1. ما هي المزايا التي يجب مراعاتها عند اختيار \"سمات نسق موقع\" التجارة الإلكترونية؟ (Ecommerce Theme)\n2. نصائح مهمة لاختيار النسق المناسب لموقع التجارة الإلكترونية (4).\nيمكن الاستعانة بأفكار هذا المرجع https://www.bigcommerce.com/blog/best-ecommerce-themes/#whatthemescaniuseforbigcommerceforwordpress",
      //     "resource": "https://www.bigcommerce.com/blog/best-ecommerce-themes/#whatisanecommercetheme",
      //     "quantity": 1200,
      //     "timePerDay": 3,
      //     "amount": 150,
      //     "totalCost": 90,
      //     "clientEmail": "hadeel_abed@hotmail.com",
      //     "promoCode": "hb40",
      //     "jobType": "article",
      //     "firstName": "Hadeel",
      //     "lastName": "Bakri",
      //     "taxPercentage": 15,
      //     "createdAt": "2022-12-21T09:22:35.600Z",
      //     "updatedAt": "2022-12-25T16:30:00.732Z",
      //     "jobNum": 747,
      //     "__v": 0,
      //     "cancelDate": null,
      //     "completedDate": "2022-12-24T15:56:56.241Z",
      //     "partnerId": "637f25165bad300de417d4cf",
      //     "document": "<h1 class=\"ql-align-center\"><span style=\"background-color: transparent; color: rgb(47, 84, 150);\">نصائح مهمة لاختيار النسق الأنسب لموقع التجارة الإلكترونية</span></h1><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">في عالم اليوم الرقمي، أصبح المستهلكون مشتتين أكثر من أي وقت مضى.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">كم مرة قمت فيها بزيارة موقع ويب، ولكنك تركت سلة التسوق الخاصة بك بعد ذلك لأنه كان عليك الذهاب لتشغيل المهمات أو تبديل علامات التبويب لأنك نسيت إرسال بريد إلكتروني؟</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">بدلاً من محاربة واقع نمط حياة المستهلك المزدحم، تحتاج العلامات التجارية إلى جذب انتباه العملاء من البداية. يمكنك النجاح في كل ذلك من خلال التصميم الصحيح للموقع.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">38% من الزوار سيتوقفون عن التعامل مع موقع ويب إذا كان المحتوى أو التخطيط غير جذاب.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">عندما تبحث عن إنشاء أو تجديد تصميم موقع الويب الخاص بك، ستحتاج إلى التفكير في التكلفة والتخصيص والمرونة ووظائف UX وإدارة التصميم الشاملة.</span></p><p class=\"ql-direction-rtl\"><br></p><p class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">ما هو موضوع التجارة الإلكترونية؟</strong></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">موضوع التجارة الإلكترونية هو تصميم متجر للتجارة الإلكترونية مبني مسبقًا، تقوم العلامات التجارية بتثبيته على موقع التجارة الإلكترونية الخاص بهم لتقديم أفضل تجربة مستخدم ممكنة للعملاء.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">يمكن أن يكون استخدام سمة التجارة الإلكترونية خيارًا ميسور التكلفة للشركات عبر الإنترنت لأنها يمكن أن تلغي تكاليف تصميم وتطوير الموقع.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">إذا أردت إنشاء موقع جميل وسهل لتجربة المستخدم بدون تعلم كود شامل أو الاستعانة بوكالة، يعد هذا خيارًا رائعًا لك.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">لا يتم إنشاء القوالب الخاصة لكل موقع بنفس الطريقة. فإليك أهم المزايا التي يجب عليك البحث عنها عند اختيار أفضل تصميم لموقعك:</span></p><ul><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">وظائف صفحة المنتج (على سبيل المثال، البيع المتقاطع وقدرات البيع).</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">عربة التسوق المحدثة تلقائيًا.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">تصميم جميل وحديث ونظيف.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">تحسين استخدامه على الهاتف المحمول.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">خيارات التخصيص (على سبيل المثال، منشئ الصفحات، والوظائف الإضافية، وجاهزة للترجمة).</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">دعم العملاء.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">القدرة على تحمل التكاليف (مثل الموضوعات المجانية مقابل الموضوعات المدفوعة).</span></li></ul><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">اعتمادًا على منصة التجارة الإلكترونية أو نظام إدارة المحتوى (CMS) الذي تخطط لاستخدامه، ستجد خيارات مختلفة.</span></p><p class=\"ql-direction-rtl\">&nbsp;</p><p class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">ما هو إطار الموضوع؟</strong></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">إذا كانت لديك الميزانية والموارد اللازمة لتطوير تصميم موقع الويب الخاص بك، فقد تكون أطر عمل السمات مناسبة لك.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">تقدم أطر عمل السمات مجموعة من المعايير لمطوري تصميم السمات لاستخدامها عند إنشاء سمات مخصصة.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">ببساطة، الأطر هي مجموعة من الميزات والوظائف التي تم إنشاؤها للمساعدة في عملية التطوير. بمجرد تطوير إطار عمل السمة، يمكن للمستخدمين إنشاء سمة فرعية لمزيد من التخصيص.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">أكبر فرق بين السمات والأطر هو:</span></p><ul><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">السمات - يمكنك تثبيتها على الفور للاستفادة من الوظائف.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">الأطر - تتطلب مزيد من التطوير والتخصيص.</span></li></ul><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">ربما تتساءل، \"كيف أعمل مع إطار عمل؟\"</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">تأتي الأطر في حزمة داخل مجلد واحد حيث يضع المطورون السمة الرئيسية الجديدة وتحميلها في إطار العمل. بمجرد تطوير إطار عمل للقوالب، تقع على عاتق المستخدم مسؤولية إنشاء سمة فرعية تتضمن جميع تخصيصاتهم.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">يسمح إعداده بهذه الطريقة بتحديث كل من إطار العمل والموضوع الأصلي.</span></p><p class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">المزايا والأشياء التي يجب مراعاتها عند استخدام السمات والنسق</strong></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">يمكن أن تساعد السمات والأطر في إدارة عملك عبر الإنترنت بسهولة أكبر، ولكن يمكن أن تأتي أيضًا مع بعض القيود.</span></p><p class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">ما هي مزايا المحاور والأطر؟</strong></p><ol><li class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">إنشاء موقع ويب سهل وبسيط.</strong></li></ol><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">الأمر بسيط، السمات والأطر تسهل بناء مواقع الويب. يمكنك الوصول إلى أنظمة الألوان والسمات متعددة الأغراض والتصميم سريع الاستجابة ومنشئ صفحات السحب والإفلات وخطوط \"غوغل\" وتكامل الوسائط الاجتماعية والمزيد. بالإضافة إلى ذلك، يمكّنك ذلك من الوقوف على صفحات الهبوط في أي وقت من الأوقات بمساعدة الصفحات المصممة مسبقًا (مثل تخطيطات الصفحة الرئيسية).</span></p><ol><li class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">فعالة من حيث التكلفة.</strong></li></ol><p><br></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">يمكن أن تكون السمات والأطر خيارًا ميسور التكلفة للعديد من العلامات التجارية. العديد من موضوعات التجارة الإلكترونية مجاني، بينما يأتي البعض الآخر بسعر زهيد. مع جميع الأدوات سهلة الاستخدام المتاحة لأعمال التجارة الإلكترونية الخاصة بك، يمكن للقوالب توفير الوقت والمال الذي يتم إنفاقه على التوظيف والعمل مع مطور لأداء العمل. بالإضافة إلى ذلك، عندما تريد تحديث مظهرك، فلن تضطر إلى إنفاق المزيد من الوقت والمال لإجراء التغييرات.</span></p><ol><li class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">العديد من الخيارات.</strong></li></ol><p><br></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">هل تبحث عن تصميم يوفر وظائف تجربة المستخدم التي يرغب بها عملاؤك، ولكنه يطابق أيضًا نغمة علامتك التجارية ورسالتك؟ لحسن الحظ، هناك العديد من خيارات السمات المتاحة.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">إذا كنت تخطط لوضع تصميم موقع الويب الخاص بك ومحتوياته في نظام أساسي للتجارة الإلكترونية، فإن موضوعات \"بيغ كوميرك\"، هي طريقة رائعة للبدء. وإذا كنت تستخدم CMS، تعد سمات \"وورد بريس\" للتجارة الإلكترونية خيارًا رائعًا آخر.</span></p><ol><li class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">التحديثات التلقائية.</strong></li></ol><p><br></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">يضمن بناء تصميم موقع الويب الخاص بك باستخدام سمات أو أطر عمل تحديثات تلقائية، بحيث يمكنك البقاء على اطلاع على أفضل الممارسات للتقنية ومعايير التصميم الحديثة والتحويل وتحسين محركات البحث دون حتى التفكير في الأمر أو قضاء الوقت فيه.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">سيكون هذا دائمًا مكسبًا للتطوير المخصص لأن لا أحد يهتم بتصميم قديم.</span></p><p class=\"ql-direction-rtl\"><br></p><p class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">الأشياء التي يجب مراعاتها مع السمات والقوالب</strong></p><p class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">1. عدم تقليد المواقع المنافسة.</strong></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">باختيار سمة عامة، فإنك تخاطر بأن تبدو مشابهًا لمنافسيك. كما ذكرت سابقًا، يتم إنشاء كل موضوع وإطار بشكل مختلف. عند اختيار سمة أو إطار عمل، انتبه جيدًا لقدرات التخصيص.</span></p><p class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">2. حدود التخصيص.</strong></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">يأتي تنفيذ حل التصميم المبني مسبقًا مع حدوده، اعتمادًا على الموضوع أو إطار العمل، فقد تكون مقيدًا بوظائف UX المحددة. تأكد من فهم ما يمكن لموضوعك أو إطار العمل الخاص بك القيام به قبل إنشاء متجرك عبر الإنترنت.</span></p><p class=\"ql-direction-rtl\">&nbsp;</p><p class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">متى يجب متابعة التطوير المخصص؟</strong></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">المظاهر والأطر ليست للجميع. اعتمادًا على احتياجات عملك، قد تحتاج إلى متابعة التطوير المخصص.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">إذا كنت تبحث عن تصميم فريد لم يسبق له مثيل، فأنت تريد توظيف مطور أو وكالة تصميم لإنشاء حل مشفر حسب الطلب من البداية. في حين أنه أكثر تكلفة ويستغرق وقتًا طويلاً، فلن يكون هناك شيء مثله على الإنترنت حقًا.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">إذا كان عملك به العديد من التعقيدات، فقد يكون من المفيد متابعة التطوير المخصص. بهذه الطريقة يمكنك الحصول على الوظائف المخصصة والميزات التسويقية التي يحتاجها عملاؤك. مع الوظائف المخصصة، فإن السماء هي الحد الأقصى لما يمكنك القيام به.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">هناك سمة أو إطار عمل سيوفر لك المال والوقت وسيظل يوفر لك الميزات والوظائف التي تحتاجها لدعم متجر التجارة الإلكترونية الخاص بك.</span></p><p class=\"ql-direction-rtl\"><br></p><p class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">اختيار الموضوع أو الإطار المناسب لمتجرك عبر الإنترنت</strong></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">عند تحديد السمة أو إطار العمل المناسب لمتجرك عبر الإنترنت، لا يوجد موضوعان متساويان، لذا قم بإجراء بحث على نطاق واسع.&nbsp;</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">سترغب في أخذ بعض العناصر في عين الاعتبار، إليك أهمها:</span></p><p class=\"ql-direction-rtl\">&nbsp;</p><ul><li class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">حدّد ميزات UX الأساسية الخاصة بك:</strong></li></ul><p><br></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">يتوقع المستهلكون اليوم ميزات UX متقدمة عند التسوق عبر الإنترنت، خذ خطوة للوراء واطرح بعض الأسئلة، كيف تبدو ميزات UX الأساسية لعملك؟</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">فيما يلي بعض الميزات التي يجب أن تكون أساسية في تصميمك:</span></p><ul><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">وظائف تستجيب للهاتف المحمول.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">الخروج البسيط.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">ميزات البيع المتقاطع وزيادة البيع (مثل المنتجات الأكثر مبيعًا والعناصر الموصى بها).</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">تصميم كامل العرض، تم إنشاؤه باستخدام كود نظيف.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">تحميل سريع على أي جهاز.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">التوافق مع المكونات الإضافية للتجارة الإلكترونية.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">ميزات تباين تفاصيل المنتج.</span></li></ul><p class=\"ql-direction-rtl\">&nbsp;</p><ul><li class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">فكر في استراتيجية المحتوى الخاصة بك:</strong></li></ul><p><br></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">بمجرد تحديد ميزات UX الخاصة بك، ستحتاج إلى التفكير في أسلوبك في التعامل مع المحتوى.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">ربما تفكر، لماذا هذا مهم عندما يتعلق الأمر بتصميم موقع الويب الخاص بي؟</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">إن معرفة نوع المحتوى الذي ستعرضه على موقعك سيساعد عملك على تحديد الموضوعات أو الأطر التي تدعمه بشكل أفضل.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">فيما يلي بعض مواد المحتوى التي يجب وضعها في الاعتبار:</span></p><ul><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">محتوى من إنشاء المستخدم (UGC).</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">مشاركات المدونة.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">وسائل التواصل الاجتماعي.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">صور المنتج ومقاطع الفيديو.</span></li><li class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">الصور المميزة.</span></li></ul><p class=\"ql-direction-rtl\">&nbsp;</p><ul><li class=\"ql-direction-rtl\"><strong style=\"background-color: transparent; color: rgb(0, 0, 0);\">البحث عن مواقع المنافسين:</strong></li></ul><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">تريد أن تبرز بين المنافسة؟ قم ببحثك لترى ما هو موجود بالفعل.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">من خلال البحث في مواقع منافسيك، سيكون لديك فائدتان، أولاً ستحصل على بعض الأفكار حول الميزات المتوقعة في مجال عملك، ثانيًا قد تتعلم ما يجب عليك الابتعاد عنه.</span></p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">استخدم معرفة المنافسين لاختيار موضوع أو إطار عمل يمكّنك من تخصيص تجربة المستخدم النهائية لعلامتك التجارية.</span></p><p class=\"ql-direction-rtl\">&nbsp;</p><p class=\"ql-direction-rtl\"><span style=\"background-color: transparent; color: rgb(0, 0, 0);\">المصدر: </span><a href=\"https://www.bigcommerce.com/blog/best-ecommerce-themes/#whatthemescaniuseforbigcommerceforwordpress\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color: transparent; color: rgb(5, 99, 193);\">https://www.bigcommerce.com/blog/best-ecommerce-themes/#whatthemescaniuseforbigcommerceforwordpress</a></p><p class=\"ql-direction-rtl\">&nbsp;</p><p><br></p>",
      //     "reviewingDate": 1671985676105
      // }
        // console.log(this.selectedProject);
        

        if(this.selectedProject.iconName == undefined){
          this.projectDocument = response.data[0].document;
          this.projectTitle = response.data[0].projectTitle;
          this.partnerId = response.data[0].partnerId;
          this.clientId = response.data[0].clientId;


        }
        else{


          this.projectTitle = response.data[0].projectTitle.value;
          this.partnerId = response.data[0].partnerId.value;
          this.clientId = response.data[0].clientId.value;

          

          for(const c of this.selectedProject.dynamicFields){
            if(c.key == 'document'){
              this.projectDocument = c.value;
            }
          }
       

        }
  
        // const birthday = new Date(response.data.completedDate);
        // console.log("completedDate");
        //2021-08-05T20:15:29.471Z
        // console.log(birthday.toLocaleString());

       
        if (response.data[0].status == "completed") {

          if (this.loggedUserType == "client") {
            // alert("completed and client")
            // console.log("this.partnerId");
            // console.log(this.partnerId);
            this.getJobRatings(this.partnerId);
          }
          else {
            // alert("completed and partner")
            // console.log("this.clientId");
            // console.log(this.clientId);
            this.getJobRatings(this.clientId);
          }

        }

        if (this.partnerId == undefined) {
          this.showPartnerName = false;
        }
        else {
          // alert("partner id " + this.partnerId)

          this.showPartnerName = true;
          this.showPartnerData();

        }
        // console.log("this.selectedProject");
        // console.log(this.selectedProject);
        // console.log(this.partnerId);
        this.addRatingForPartnerForm.get("profileId").setValue(this.partnerId)

        if (this.partnerId == null || this.partnerId == 'undefined') {

        }
        else {
          this.showPartnerData();
        }
        if (response.data[0].status == "inprogress" || response.data[0].status == "rejected" || response.data[0].status == "reviewing" ) {
          this.showDeadLine = true;
          this.calculateHours()
          
          
        }

        this.clientId = response.data[0].clientId;
        this.tags = response.data[0].projectTags;
        this.helpfulLinks = response.data[0].helpfulLinks;

      },
      err => {
        console.log("error in get job by id");
        console.log(err);

        this.projectDataNotExist = true;



      }
    )


  }
  closeActionError() {
    this.actionErrorMessage = false;
  }



  cancelJob() {
    this.showLoader = true;
    // console.log(this.cancelJobForm.value);
    this.actionErrorMessage = false;
    this.projectSev.editJob(this.cancelJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        this.cancelJobMessageP = true;
        this.showLoader = false;
        setTimeout(() => {
          this.route.navigate(['/myProjects']);
        }, 3000);


      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;
      }
    )

  }


  withdrawJob() {
    this.showLoader = true;
    // console.log(this.withdrawJobForm.value);
    this.withdrowJobMessage = false;
    this.actionErrorMessage = false;
    this.projectSev.editJob(this.withdrawJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.withdrowJobMessage = true;


          this.route.navigate(['/myProjects']);



      },
      err => {
        this.showLoader = true;
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;
      }
    )

  }

  openWithDrawDialog() {
    this.showWhthdrawDlg = true;
  }

  closeWithDrawDialog() {
    this.showWhthdrawDlg = false;
  }
  closecancelDialog() {
    this.cancelJobMessage = false;
  }
  openCancelJobDLG() {
    this.showCanceljobConfirm = true;
  }

  closeCancelJobDialogM() {
    this.showCanceljobConfirm = false;
  }

  showUserDataDialog(userId) {
    this.showUserData = true;
    this.idToShow = userId;
    this.showPartnerDataForAdmin(this.idToShow);
  }

  previewProfileData(userId) {
    this.route.navigate(["previewProfileDataByAdmin/" + userId]);
  }

  closeUserDataDlg() {
    this.showUserData = false;

  }



  showPartnerDataForAdmin(userId) {
    // console.log("this.partnerId");
    // console.log(this.partnerId);




    this.userServ.getOneProfileData(userId, "partner", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {




        // console.log("general data for this project data ====== ");
        // console.log(response.data);
        this.userNameInAdminDialog = response.data.userName;
        this.userNumOfCompletedJobsInAdminDialog = response.data.numOfCompletedJobs;
        this.userNumOfRejectedJobsInAdminDialog = response.data.numOfRejectedJobs;
        this.userRatingAverageInAdminDialog = response.data.ratingAverage;





      },
      err => {
        console.log(err);

      }
    )







  }



  getAllPurposals() {


    this.projectSev.getJobPurposals(this.projectId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {

        // console.log(" all job purposals ");
        // console.log(response);

        this.allPurposals = response.data

      },
      err => {
        console.log("something went wrong");
        console.log(err);

      }
    )


  }

  openCancelPurposalDialog(purposal) {
    // this.cancelSuccess = false;
    this.cancelFail = false;
    this.cancelpurposalMode = false;
    // this.cancelpurposalMode = true;
    this.purposaltocanel = purposal;
    // console.log("purposaltocanel");
    // console.log(this.purposaltocanel);
    this.projectSev.deletePurposal(this.purposaltocanel, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {

        //  this.cancelSuccess = true;

        // setTimeout(() => {
        //   this.cancelSuccess = false;
        // }, 1500);
        this.ngOnInit()
        // setTimeout(() => {
        //   this.cancelpurposalMode = false;
        //   this.ngOnInit()
        // }, 2000);

      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.cancelpurposalMode = true;
        this.cancelFail = true;

      }
    )




  }
  closeCancelPurposalDialog() {
    this.cancelpurposalMode = false;

  }
  confirmCancelPurposal() {
    this.showLoader = true;
    //(purposalId, customerType: string, X_Request_ID: string, token)
    this.projectSev.deletePurposal(this.purposaltocanel, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.cancelSuccess = true;

        setTimeout(() => {
          this.cancelSuccess = false;
        }, 1500);

        setTimeout(() => {
          this.cancelpurposalMode = false;
          this.ngOnInit()
        }, 2000);

      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.cancelFail = true;

      }
    )


  }


  rejectPurposal(purposalId) {
    this.showLoader = true;
    this.projectSev.editPurposal({ status: "rejected" }, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), purposalId).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.ngOnInit()


      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.showLoader = false;
        this.cancelpurposalMode = true;
        this.cancelFail = true;

      }
    )





  }

  closeFinishRatingDialog() {
    this.showFinishRatingDialog = false;
    this.ngOnInit()
  }



  getJobRatings(profileId) {


    this.projectSev.getProjectRatings(profileId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {

        // console.log(" all job ratings ");
        // console.log(response);

        this.allJobRatings = response.data
        this.singlerating = response.data[0]
        // console.log(this.allJobRatings);
        // console.log(this.singlerating);
        
        if (this.allJobRatings.length == 0) {
          

          if(this.loggedUserType == "client"){
            this.showRatingDialog = true;
            this.addRatingForClientForm.get("jobId").setValue(this.projectId)
            this.addRatingForClientForm.get("profileId").setValue(this.partnerId)
          }
          else{
            this.showPartnerRatingDialog = true;
            this.addRatingForPartnerForm.get("jobId").setValue(this.projectId)
            this.addRatingForPartnerForm.get("profileId").setValue(this.clientId)
          }
          
          
        }

      },
      err => {
        console.log("something went wrong");
        console.log(err);

      }
    )


  }

  getTime(){
    this.userServ.getTime().subscribe(
      (response:any)=>{
        this.localTime = response.currentTiem;
        // console.log("time ----");
        // console.log(this.localTime);
        const timeNow = new Date(this.localTime)
  
        // console.log(timeNow.getTime());
        this.localTimeConverted = timeNow.getTime();
        // const now = new Date().getTime();
        
        
      },
      err=>{
        // console.log(err);
        
      }
    )
  }
  calculateHours(){

  //  console.log(timeDiffCalc(new Date('2019/10/1 04:10:00'), new Date('2019/10/2 18:20:00')));

    // const now = new Date().getTime();
    const now = this.localTimeConverted;
    // console.log("now");
    // console.log(this.localTimeConverted);
    if(this.selectedProject.iconName == undefined){
        this.countDownDateVirtual = new Date(this.selectedProject.completedDate).getTime();
    }
    else{


      for(const c of this.selectedProject.dynamicFields){
        if(c.key == 'completedDate'){
          this.countDownDateVirtual = new Date(c.value).getTime(); 
        }
      }


    }
     
     let diffInMilliSeconds = Math.abs(this.countDownDateVirtual - now) / 1000;
     const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    // console.log('calculated hours', hours);
    //  console.log("complete date ");
     
    // console.log(countDownDate);



var timeleft = this.countDownDateVirtual - now;
    
const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
// const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
// var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);


// const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
//     diffInMilliSeconds -= hours * 3600;
//     console.log('calculated hours', hours);

this.remainingDays = days;
this.remainingDays = +this.remainingDays
if(this.remainingDays <0){
  this.showDeadLine = false;
}
this.remainingHours = hours;
// console.log("complete date in days ");
     
// console.log(days);
    
  }

 
  getjobUploads(){

    this.projectSev.getJobUploads(this.projectId,localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (res:any)=>{
        // console.log("job uploads ==== ");
        // console.log(res);
        
        if(res.data != null){
          this.allUploads = res.data
        }
      },
      err=>{
        console.log("error in get uploads");
        console.log(err);
        
      }
    )

  }



  getProjectActivityLog(projectId) {
    this.userServ.getOneProjectActivityLog(projectId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.showLoader = false;
        // console.log('activity log response');
        // console.log(response);



    

      },
      err => {
        console.log("error in get activity log ");
        console.log(err);



      }
    )


  }
downloadFile(){
  Packer.toBlob(this.docFile).then((blob) => {
    // saveAs from FileSaver will download the file
    saveAs(blob, "example.docx");
});
}


// saveDocx() {
//   asBlob(file).then(data => {
//     saveAs(data, 'file.docx') // save as docx file
//   }) // asBlob() return Promise<Blob|Buffer>
// }
  //, filename = ''
saveDocx() {

  const pre = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body style='direction:rtl'>"
  if(this.selectedProject.iconName == undefined){
     this.betweenVirtual = this.selectedProject.document;

  }
  else{

    for(const c of this.selectedProject.dynamicFields){
      if(c.key == 'document'){
        this.betweenVirtual = c.value;
      }
    }

  }
  
  const end  = "</body></html>"

  const lasthtm = pre + this.betweenVirtual + end;
  // console.log(lasthtm);
  
// const lasthtm = pre + between + end;
  asBlob(lasthtm).then(data => {
    if(this.selectedProject.iconName == undefined){
      saveAs(data, this.selectedProject.projectTitle)
    }
    else{
      saveAs(data, this.selectedProject.projectTitle.value)
    }
  }) // asBlob() return Promise<Blob|Buffer>
}
  
}
