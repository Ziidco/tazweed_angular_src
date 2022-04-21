import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faArrowLeft, faWallet, faLongArrowAltDown, faFileAlt, faFolderOpen, faTrashAlt,faCube } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { faTwitter, faCcVisa } from '@fortawesome/free-brands-svg-icons';
 
@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faWallet = faWallet;
  faCube = faCube;
  faLongArrowAltDown = faLongArrowAltDown;
  faFolderOpen = faFolderOpen;
  faTrashAlt = faTrashAlt;
  faCcVisa = faCcVisa;
  faFileAlt = faFileAlt;
  faTwitter = faTwitter;
  uuidValue: any;
  myProjects;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isEditable = false;
  stepperValue;
  showApplyBoxFail = false;
  showApplyBoxSuccess = false;
  showLoaderMaster = false;
  showLoader = false;
  showSuccessForPartner = true;
  showdeliverBox = false;
  haspurposalsArray = [];
  prePaymentStatusArray = [];
  activeStatusArray = [];
  pendingStatusArray = [];
  inprogressStatusArray = [];
  reviewingStatusArray = [];
  completedStatusArray = [];
  rejectedStatusArray = [];
  userType = localStorage.getItem("sessionUserType");
  paymentUrl;
  profileRating;
  logErrors: any;
  cartMode = false;
  projectToCart;
  cartSuccess = false;
  cartFail = false;
  cartForm: FormGroup;
  showErrorProjects = false;
  filterValue = 'all';
  filteredprojects;
  showFilterblock = false;
  articleCatArr = [];
  postCatArr = [];
  productDescriptionArr = [];
  deleteprojectMode = false;
  projectToDelete;
  deleteSuccess = false;
  deleteFail = false;

  pageNumber = 1;
  totalRecords;

  payMode = false;
  projectToPay;
  paymentWay = 'paymentgateway';
  payWithTax = true;

  payFromCreditSuccess = false;
  payFromCreditFail = false;

  clientCreditBalance;
  paymentNotSufficientPost = false;
  constructor(
    private projectServ: ManageProjectService,
    private Uuid: UUIDService,
    private route: Router,
    private _formBuilder: FormBuilder,
    private userServ: UserService

  ) { }

  ngOnInit(): void {
    this.paymentWay = 'paymentgateway';
    this.showLoader = true;
    // console.log("salah");

    //     console.log(window.console);
    this.cartForm = new FormGroup({
      redirectToPaymentGetway: new FormControl(false)

    })
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['']
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['']
    });
    this.uuidValue = this.Uuid.generateUUID();
    this.getProfileRating();
    this.projectServ.getMyProjects(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("userId")).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.myProjects = response.data;
        if (this.myProjects == []) {
          this.showFilterblock = false;
        }
        else {
          this.showFilterblock = true;
        }
        this.filteredprojects = this.myProjects;
        this.totalRecords = this.filteredprojects.length;
        // alert("totalRecords == " + this.totalRecords)
        for (const project of this.myProjects) {
          if (project.jobType == "article") {
            this.articleCatArr.push(project)
          }

          else if (project.jobType == "post") {
            this.postCatArr.push(project)
          }

          else if (project.jobType == "productDescription") {
            this.productDescriptionArr.push(project)
          }

          

        }
        console.log("all projects");

        console.log(response);


        this.myProjects.sort((a, b) => {
          return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
        const projectStatue = this.myProjects.status;

        if (projectStatue == 'active') {
          this.stepperValue = 1;

        }
        else if (projectStatue == 'pending') {
          this.stepperValue = 2;

        }
        else {
          this.stepperValue = 3;

        }

        for (const project of this.myProjects) {

          if (project.hasProposal == true) {
            if (project.status == "active") {
              this.haspurposalsArray.push("1");
              this.activeStatusArray.push("1");
              this.pendingStatusArray.push("1");
            }
            else if (project.status == "pending") {
              this.haspurposalsArray.push("1");
              this.pendingStatusArray.push("1");
            }

            else if (project.status == "inprogress") {
              this.inprogressStatusArray.push("1");
            }
            else if (project.status == "reviewing") {
              this.reviewingStatusArray.push("1");
            }
            else if (project.status == "completed") {
              this.completedStatusArray.push("1");
            }
            else if (project.status == "rejected") {
              this.rejectedStatusArray.push("1");
            }



          }

          else {

            // this.prePaymentStatusArray.push("1");
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
            else if (project.status == "completed") {
              this.completedStatusArray.push("1");
            }
            else if (project.status == "rejected") {
              this.rejectedStatusArray.push("1");
            }


          }
          // if (project.status == "prePayment") {
          //   this.prePaymentStatusArray.push("1");
          // }
          // else if (project.hasProposal == true && project.status == "active" ) {
          //   this.haspurposalsArray.push("1");


          // }
          // else if (project.status == "active") {
          //   this.activeStatusArray.push("1");
          // }

          // else if (project.status == "inprogress") {
          //   this.inprogressStatusArray.push("1");
          // }
          // else if (project.status == "reviewing") {
          //   this.reviewingStatusArray.push("1");
          // }
          // else if (project.status == "completed") {
          //   this.completedStatusArray.push("1");
          // }
          // else if(project.status == "rejected"){
          //   this.rejectedStatusArray.push("1");
          // }
        }
      },
      err => {
        this.showLoader = false;
        this.showFilterblock = false;
        this.showErrorProjects = true;
        console.log(err)

      }
    )


    this.getClientCreditBalance()

  }
  editPoject(project) {
    // console.log("you will edit project with ID = " + JSON.stringify(project));
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["updateProject/" + project._id]);

  }

  openProject(project) {
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["acceptPartner/" + project._id]);
  }

  logStepValue(status: string) {
    if (status == 'active') {
      this.showApplyBoxFail = true;
      this.showApplyBoxSuccess = false;
    }
    else {
      this.showApplyBoxFail = false;
      this.showApplyBoxSuccess = true;

    }

  }
  deliverProjectForClient() {
    this.showSuccessForPartner = false;
    this.showdeliverBox = true;
  }


  repayProject() {

    const prjectPrePayment = {
      "profileId": localStorage.getItem("userId"),
      "jobId": this.projectToPay._id
    }
    console.log(prjectPrePayment);
    this.showLoaderMaster = true;
    this.projectServ.repayJop(prjectPrePayment, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("success");
        console.log(response);
        this.paymentUrl = response.data.redirectUrl;
        window.location.href = this.paymentUrl;
        this.showLoaderMaster = false;

      },
      err => {
        console.log("error");
        console.log(err);

      }
    )

  }


  getProfileRating() {
    this.userServ.getRating(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("rating object ==== ");
        // console.log(response.data);
        this.profileRating = response.data;
      },
      err => {
        console.log("no rating found");


      }
    )
  }

  openCartprojectDialog(project) {
    this.cartSuccess = false;
    this.cartFail = false;
    this.projectToCart = null;
    this.projectToCart = project
    this.cartMode = true

  }

  closeCartprojectDialog() {
    this.projectToCart = null;
    this.cartMode = false
  }

  addProjectToCart(project) {
    this.projectToCart = project
    this.cartForm.get("redirectToPaymentGetway").setValue(false);


    this.projectServ.editJob(this.cartForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), project._id).subscribe(
      (response: any) => {
        // this.cartSuccess = true;
        // setTimeout(() => {
        //   this.cartSuccess = false;
        // }, 1500);
        this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/cart']);
          // this.ngOnInit()




        });

      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.cartFail = true;
      }
    )

  }


  addProjectToCartReal(project) {
    this.projectToCart = project


    const cartObj = {
      jobId: project._id,
      clientId: localStorage.getItem("userId")
    }

    console.log("cartObj");
    console.log(cartObj);



    this.projectServ.addProjectToCartLast(cartObj, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/cart']);




        });

      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.cartFail = true;
      }
    )

  }

  filterProjects() {
    // alert("category = " + this.filterValue)
    if (this.filterValue == null || this.filterValue == '' || this.filterValue == 'all') {
      this.filteredprojects = this.myProjects;
    }
    else {
      this.filteredprojects = this.myProjects.filter(
        res => {
          return res.jobType == this.filterValue;
        }
      )
    }

  }


  filterProjectByCategory(cat) {
    if (cat == 'all') {


      this.projectServ.getMyProjects(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("userId")).subscribe(
        (response: any) => {
          this.showLoader = false;
          this.myProjects = response.data;
          if (this.myProjects == []) {
            this.showFilterblock = false;
          }
          else {
            this.showFilterblock = true;
          }
          this.filteredprojects = this.myProjects;
          this.totalRecords = this.filteredprojects.length;
          // alert("filteredprojects == " + this.totalRecords)
          // for (const project of this.myProjects) {
          //   if(project.jobType=="article"){
          //     this.articleCatArr.push(project)
          //   }

          //   else if(project.jobType=="post"){
          //     this.postCatArr.push(project)
          //   }

          // }
          console.log("all projects");

          console.log(response);


          this.myProjects.sort((a, b) => {
            return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
          });
          const projectStatue = this.myProjects.status;

          if (projectStatue == 'active') {
            this.stepperValue = 1;

          }
          else if (projectStatue == 'pending') {
            this.stepperValue = 2;

          }
          else {
            this.stepperValue = 3;

          }

          for (const project of this.myProjects) {

            if (project.hasProposal == true) {
              if (project.status == "active") {
                this.haspurposalsArray.push("1");
                this.activeStatusArray.push("1");
                this.pendingStatusArray.push("1");
              }
              else if (project.status == "pending") {
                this.haspurposalsArray.push("1");
                this.pendingStatusArray.push("1");
              }

              else if (project.status == "inprogress") {
                this.inprogressStatusArray.push("1");
              }
              else if (project.status == "reviewing") {
                this.reviewingStatusArray.push("1");
              }
              else if (project.status == "completed") {
                this.completedStatusArray.push("1");
              }
              else if (project.status == "rejected") {
                this.rejectedStatusArray.push("1");
              }



            }

            else {

              // this.prePaymentStatusArray.push("1");
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
              else if (project.status == "completed") {
                this.completedStatusArray.push("1");
              }
              else if (project.status == "rejected") {
                this.rejectedStatusArray.push("1");
              }


            }



          }
        },
        err => {
          this.showLoader = false;
          console.log(err)

        }
      )

    }

    else {






      this.projectServ.getMyProjectsByCategory(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("userId"), cat).subscribe(
        (response: any) => {
          this.showLoader = false;
          this.myProjects = response.data;
          if (this.myProjects == []) {
            this.showFilterblock = false;
          }
          else {
            this.showFilterblock = true;
          }
          this.filteredprojects = this.myProjects;
          this.totalRecords = this.filteredprojects.length;
          // alert("filteredprojects == " + this.totalRecords)
          // for (const project of this.myProjects) {
          //   if(project.jobType=="article"){
          //     this.articleCatArr.push(project)
          //   }

          //   else if(project.jobType=="post"){
          //     this.postCatArr.push(project)
          //   }

          // }
          console.log("all projects");

          console.log(response);


          this.myProjects.sort((a, b) => {
            return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
          });
          const projectStatue = this.myProjects.status;

          if (projectStatue == 'active') {
            this.stepperValue = 1;

          }
          else if (projectStatue == 'pending') {
            this.stepperValue = 2;

          }
          else {
            this.stepperValue = 3;

          }

          for (const project of this.myProjects) {

            if (project.hasProposal == true) {
              if (project.status == "active") {
                this.haspurposalsArray.push("1");
                this.activeStatusArray.push("1");
                this.pendingStatusArray.push("1");
              }
              else if (project.status == "pending") {
                this.haspurposalsArray.push("1");
                this.pendingStatusArray.push("1");
              }

              else if (project.status == "inprogress") {
                this.inprogressStatusArray.push("1");
              }
              else if (project.status == "reviewing") {
                this.reviewingStatusArray.push("1");
              }
              else if (project.status == "completed") {
                this.completedStatusArray.push("1");
              }
              else if (project.status == "rejected") {
                this.rejectedStatusArray.push("1");
              }



            }

            else {

              // this.prePaymentStatusArray.push("1");
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
              else if (project.status == "completed") {
                this.completedStatusArray.push("1");
              }
              else if (project.status == "rejected") {
                this.rejectedStatusArray.push("1");
              }


            }



          }
        },
        err => {
          this.showLoader = false;
          console.log(err)

        }
      )
    }


  }



  showDeleteprojectDialog(project) {
    this.deleteFail = false;
    this.deleteSuccess = false;
    this.projectToDelete = project;
    this.deleteprojectMode = true;

    console.log("you will delete project with id ");
    console.log(JSON.stringify(this.projectToDelete));

    console.log(this.projectToDelete._id);
  }
  closeDeleteprojectDialog() {
    this.deleteprojectMode = false;
    this.projectToDelete = null;
    this.deleteFail = false;
    this.deleteSuccess = false;
  }


  deleteProject() {


    this.showLoader = true;

    this.projectServ.deketeProject(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectToDelete.jobType, localStorage.getItem("email"), this.projectToDelete._id).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.deleteSuccess = true;
        setTimeout(() => {
          // this.deleteprojectMode = false;



          this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
            this.route.navigate(['/myProjects']);




          });


        }, 200);






      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.deleteFail = true;


      }
    )

  }



  changePaymentWay() {
    if (this.paymentWay == 'paymentgateway') {
      this.payWithTax = true;
    }
    else {
      this.payWithTax = false;
    }


  }

  openPayDialog(project) {
    this.projectToPay = project;
    this.payMode = true;

  }

  ClosePayDialog() {
    this.projectToPay = null;
    this.payMode = false;
    this.paymentWay = 'paymentgateway';
    // this.changePaymentWay()

  }



  payProjectFromCredit() {


    this.paymentNotSufficientPost = false;
    if (this.projectToPay.totalCost > this.clientCreditBalance) {
      this.showLoader = false;
      this.paymentNotSufficientPost = true;
    }
    else {


      this.payFromCreditSuccess = false;
      this.payFromCreditFail = false;
      this.showLoader = true;



const requestBody = {
  "jobsIds": [
    this.projectToPay._id
  ],
  "clientId": localStorage.getItem("userId")
}

      this.projectServ.repayProjectFromCreditBalance(requestBody, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectToPay.jobType).subscribe(
        (response: any) => {
          this.showLoader = false;

          this.payFromCreditSuccess = true;

          setTimeout(() => {
            this.payFromCreditSuccess = false;
            this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
              this.route.navigate(['/myProjects']);




            });

          }, 1500);




        },
        err => {
          this.showLoader = false;
          console.log("something went wrong");
          console.log(err);
          this.payFromCreditFail = true;


        }
      )
    }
  }


  payFromCreditFailMet() {
    this.payFromCreditFail = false;
  }



  closeNoBalnceValidPost() {
    this.paymentNotSufficientPost = false;
  }



  getClientCreditBalance() {

    this.userServ.getClientCreditBalance(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.clientCreditBalance = response.data.balance;
        console.log(this.clientCreditBalance);



      },
      err => {
        console.log(err);

      }
    )
  }

}
