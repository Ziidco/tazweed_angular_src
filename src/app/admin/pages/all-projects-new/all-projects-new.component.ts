import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserAlt, faArchive, faUsersCog, faTimes, faMoneyBillWave, faToggleOn, faFilePdf, faToggleOff, faCheckCircle, faTimesCircle, faFolderOpen, faCheck, faHistory, faPercentage, faTrashAlt, faBell, faEnvelope, faSignOutAlt, faThList, faUserTie, faChartBar, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { ManageImageService } from 'src/app/services/manage-image.service';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-all-projects-new',
  templateUrl: './all-projects-new.component.html',
  styleUrls: ['./all-projects-new.component.css']
})
export class AllProjectsNewComponent implements OnInit {
  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementIdOrContent: 'pill',

  }

  showEditSuccess: boolean = false;
  showEditFail: boolean = false;
  showLoaderInput = false;
  ValiditySuccess = false;
  ValidityFail = false;
  faFilePdf = faFilePdf;
  showLoader = false;
  allJobTypes;
  allPromoCodes;
  showAddCupon = false;
  addCuponSuccess = false;
  addCuponFail = false;
  uuidValue: any;
  math = Math;
  userImageBase;
  faArchive = faArchive;
  faUserAlt = faUserAlt;
  faUsersCog = faUsersCog;
  faToggleOff = faToggleOff;
  faToggleOn = faToggleOn;
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;
  faChartBar = faChartBar;
  faTrashAlt = faTrashAlt;
  faPercentage = faPercentage;
  faTimes = faTimes;
  faCheckCircle = faCheckCircle;
  faHandHoldingUsd = faHandHoldingUsd;
  faUserTie = faUserTie;
  faFolderOpen = faFolderOpen;
  faMoneyBillWave = faMoneyBillWave;
  faThList = faThList;
  faHistory = faHistory;
  faEnvelope = faEnvelope;
  faEnvelope2 = faEnvelope;
  faBell = faBell;
  faSignOutAlt = faSignOutAlt;

  showPartnerPart: boolean = false;
  showClientPart: boolean = false;
  userName: string;
  adminStatistics: any;
  sessionUserType;
  numberOfPartners;
  numberOfClients;
  numberOfRecentPartners;
  numberOfActiveJobs;
  numberOfDoneJobs;
  numberOfMessages;
  profits = 0;
  visitors;
  allPrtners;
  allClients;
  showActiveConfirmMessage = false;
  showDeactiveConfirmMessage = false;
  showMessageDialog = false;
  showsendSuccess = false;
  showsendFail = false;
  itemToEdit;
  messageReceiver;
  sendMessageSpecificUserForm: FormGroup;
  sendMessageForCategoryForm: FormGroup;
  messageObject;
  unpaidBalance;
  showPayDialog = false;
  itemToPay;
  showPaySuccess = false;
  showPayFail = false;
  showsendAllSuccess = false;
  showsendAllFail = false;
  messageReceiverName;
  messageReceiverNames = [];
  allJobsAdmin;
  expiredJobs;
  prePaymentStatusArray = [];
  activeStatusArray = [];
  pendingStatusArray = [];
  inprogressStatusArray = [];
  reviewingStatusArray = [];
  completedStatusArray = [];
  rejectedStatusArray = [];
  expiredStatusArray = [];
  projectConfig;
  mainprojectConfig;
  addCuponForm: FormGroup;
  showDeleteDialog = false;
  deleteSuccess = false;
  deleteFail = false;
  promoToDelete;
  allArcheivedProjects;
  // editConfigForm:FormGroup;
  archieveMode = false;
  projectToArchive;
  editedAmount;
  showEmailField = false;
  selectedPromoCodeId;
  selectedPromoCode;
  showOnePromoCodeDialog = false;
  deleteprojectMode = false;
  projectToDelete;
  payFail = false;
  showBillExport = false;
  mainTaxInfo;
  projectToExport;
  projectToexportBeforePrint;
  showGoogleFolderDialog = false;
  googleDrivelink;
  startDate;
  endDate;
  showErrorLink = false;
  showValidError1 = false;
  showValidError2 = false;
  showValidError3 = false;
  showValidError4 = false;
  noBillsExist = false;
  constructor(
    private imageServ: ManageImageService,
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService,
    private projectServ: ManageProjectService,
    private exportAsService: ExportAsService
  ) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.uuidValue = this.Uuid.generateUUID();
    this.getAllJobs();
    this.getExpiredJobs();


  }


  openProject(project) {
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["/dashboard/acceptPartnerByAdmin/" + project._id]);
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

  getExpiredJobs() {
    this.userServ.getExpiredJobs("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("expired jobs object ---------------------- ");

        // console.log(response.data);
        this.expiredJobs = response.data;
        for (const project of this.expiredJobs) {
          this.expiredStatusArray.push(project);

        }

      },
      err => {
        console.log(err);

      }
    )
  }
  previewProfileData(user) {
    this.userServ.selectedUser.next(user)
    this.route.navigate(["previewProfileData/" + user._id]);
  }
  // get all jobs

  getAllJobs() {

    this.projectServ.getAllProjectsForAdmin("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {

        // console.log("all admin jobs object ---------------------- ");

        // console.log(response.data);
        this.allJobsAdmin = response.data;
        this.showLoader = false;
        // this.allClients = response.data;

        for (const project of response.data) {
          if (project.status == "prePayment") {
            this.prePaymentStatusArray.push("1");
          }
          else if (project.status == "active") {
            this.activeStatusArray.push("1");
          }
          else if (project.status == "pending") {
            this.pendingStatusArray.push("1");
          }
          else if (project.status == "inprogress") {
            this.inprogressStatusArray.push("1");
          }
          else if (project.status == "reviewing") {
            this.reviewingStatusArray.push("1");
          }
          else if (project.status == "rejected") {
            this.rejectedStatusArray.push("1");
          }
          else if (project.status == "completed") {
            this.completedStatusArray.push("1");
          }

        }

      },
      err => {
        console.log(err);
        this.showLoader = false;

      }
    )
  }






  getSingleBill(job) {
    this.showLoader = true;

    this.projectToexportBeforePrint = job;

    this.userServ.getSingleBill(job._id, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {

        console.log("single bill data is ===== ");
        this.mainTaxInfo = response.data.taxInvoice;
        this.projectToExport = response.data.payments[0];
        // alert(this.projectToExport.taxAmount)
        console.log(response);
        this.showLoader = false;
        this.showBillExport = true;


      },
      err => {
        console.log(err);
        this.showLoader = false;

      }
    )


    // 

    // setTimeout(() => {

    //   this.export(job.firstName + " " + job.lastName)  //project.firstName}} {{project.lastName

    // }, 1000);

  }


  closeexportdialog() {

    this.showBillExport = false;
    this.projectToexportBeforePrint = null;
  }
  generateBillsByAdmin() {

    this.showValidError1 = false;
    this.showValidError2 = false;
    this.showValidError3 = false;
    this.showValidError4 = false;
    this.noBillsExist = false;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    // console.log(date);

    this.googleDrivelink = null;
    this.showErrorLink = false;
    console.log("start date is === " + this.startDate);
    console.log("end date is === " + this.endDate);
    if (this.startDate == undefined || this.endDate == undefined) {

      this.showValidError1 = true;
      // alert("قم باختيار فترة تحميل الفاتورة")
    }
    else if (((Date.parse(this.endDate) < Date.parse(this.startDate)))) {
      this.showValidError2 = true;

    }

    // else if (((Date.parse(date) < Date.parse(this.startDate)))) {
    //   this.showValidError3 = true;

    // }
    // else if (Date.parse(this.endDate) > ((Date.parse(date)))) {
    //   console.log(Date.parse(date));
    //   console.log(Date.parse(this.endDate));
    //   this.showValidError4 = true;
    // }


    else {
      this.showLoader = true;

      const duration = {
        startDate: this.startDate,
        endDate: this.endDate
      }


      console.log(" date is === " + JSON.stringify(duration));
      this.userServ.generateBillsByDuration(duration, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
        (response: any) => {
          this.showLoader = false;

          console.log(response);
          if (response.data.webViewLink || response.data.webViewLink != undefined) {
            this.googleDrivelink = response.data.webViewLink;
            this.showGoogleFolderDialog = true;

          }

          else {
            this.noBillsExist = true;

          }



        },
        err => {
          this.showLoader = false;
          this.showErrorLink = true;
          console.log(err);

        }
      )

    }




  }
  showArchiveDialog(project) {
    this.deleteSuccess = false;
    this.deleteFail = false;
    this.projectToArchive = project;
    this.archieveMode = true;
  }

  closeArchiveDialog() {
    this.archieveMode = false;
  }
  closenoBillsExistDialog() {
    this.noBillsExist = false;
  }
  closeSuccessDlg() {
    this.showEditSuccess = false;
    this.ngOnInit()
  }

  closeFailDlg() {
    this.showEditFail = false;


  }
  closeAddCuponDialog() {
    this.showAddCupon = false;
  }
  showAddCuponForm() {
    this.showAddCupon = true;
  }








  showDeleteprojectDialog(project) {
    this.deleteSuccess = false;
    this.deleteFail = false;
    this.projectToDelete = project;
    this.deleteprojectMode = true;

    console.log("you will delete project with id ");
    console.log(JSON.stringify(this.projectToDelete));

    console.log(this.projectToDelete._id);
  }
  closeDeleteprojectDialog() {
    this.deleteprojectMode = false;
  }



  archiveProject() {
    // alert(JSON.stringify(this.projectToArchive))

    this.showLoader = true;
    this.deleteSuccess = false;
    this.deleteFail = false;
    this.projectServ.editJob({ status: "archived" }, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectToArchive._id).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.deleteSuccess = true;
        setTimeout(() => {
          this.archieveMode = false;
        }, 1500);
        this.getAllJobs()


      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.deleteFail = true;


      }
    )
  }





  closepayFailDialog() {
    this.payFail = false;
  }
  convertProjectToPayed(project) {
    this.payFail = false;
    this.showLoader = true;
    this.projectServ.editJob({ status: "active" }, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), project._id).subscribe(
      (response: any) => {
        this.showLoader = false;
        // setTimeout(() => {
        //   this.archieveMode = false;
        // }, 1500);
        this.getAllJobs()


      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.payFail = true;


      }
    )
  }


  closeGoogleFolderDialog() {
    this.showGoogleFolderDialog = false;
  }

  export() {
    this.exportAsService.save(this.exportAsConfig, this.projectToexportBeforePrint.projectTitle).subscribe(() => {
      // save started
    });
    this.showBillExport = false;
    this.projectToExport = null
  }



  closeGoogleFolderDialogError() {
    this.showErrorLink = false;
  }
}
