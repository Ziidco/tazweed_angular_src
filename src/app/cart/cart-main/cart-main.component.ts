import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faTimes, faTrashAlt, faFileAlt, faWallet, faCube, faHourglassHalf, faMoneyBillWave, faArrowLeft, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faCcVisa } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-cart-main',
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.css']
})
export class CartMainComponent implements OnInit {
  uuidValue: any;
  allCartProjects;
  faFileAlt = faFileAlt;
  faTrashAlt = faTrashAlt;
  faCube = faCube;
  faWallet = faWallet;
  faCcVisa = faCcVisa;
  faHourglassHalf = faHourglassHalf;
  faTimes = faTimes;
  faMoneyBillWave = faMoneyBillWave;
  faArrowLeft = faArrowLeft;
  faTwitter = faTwitter;
  faFolderOpen = faFolderOpen;
  showProjectsContainer = false;
  showNoProjectsContainer = false;
  userStatus;
  showProjects = true;
  showLoaderMaster = false;
  paymentUrl;
  projectsCount = 0;
  deleteprojectMode = false;
  projectToDelete;
  showLoader = false;
  deleteSuccess = false;
  deleteFail = false;
  allCartProjectsIds = [];
  allAdditionalArray = [];
  allAmountArray = [];
  allTaxArray = [];
  allPromoCodeArray = [];
  allAdditionalCost = 0;
  allCostArray = [];
  allCost = 0;
  allFinalTotal = 0;

  cartedprojects;
  payMode = false;
  payModeAll = false;
  projectToPay;
  paymentWay = 'paymentgateway';
  paymentWayAll = 'paymentgateway';
  payWithTax = true;
  payWithTaxAll = true;

  payFromCreditSuccess = false;
  payFromCreditFail = false;

  clientCreditBalance;
  paymentNotSufficientPost = false;
  taxValue;
  taxValueInRial;
  costAfterTax;


  allAmount;
  allAditionAmount;
  allTotalWithoutTax;
  allPromoValue;
  allTaxValue;
  nosuffAll = false;
  jobTypeVirtualSingleProject;
  constructor(
    private projectServ: ManageProjectService,
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService
  ) { }

  ngOnInit(): void {
    this.paymentWay = 'paymentgateway';
    this.showLoader = true;
    this.uuidValue = this.Uuid.generateUUID();



    // this.getAllCartProjects();

    this.getCartedprojects()

    this.getClientCreditBalance()
    this.userServ.getAllTax(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.taxValue = response.data.taxValue;














      },
      err => {
        console.log("error in get invoice");
        console.log(err);


      }
    )
  }

  //localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("userId")

  getAllCartProjects() {
    this.projectServ.getAllCartProjectsNew("client", this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("userId")).subscribe(
      (response: any) => {
        this.showLoader = false;
        console.log("all cart projects");
        console.log(response);


        // if(response.data.body.data ==null){

        // }
        // else{
        this.allCartProjects = response.data;
        if (this.allCartProjects.length == 0) {
          this.showProjectsContainer = false;
          this.showNoProjectsContainer = true;
        }
        else {
          this.showProjectsContainer = true;
          this.showNoProjectsContainer = false;
          this.projectsCount = this.allCartProjects.length;
          this.allCartProjects.sort((a, b) => {
            return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
          });

          setTimeout(() => {
            this.calculateTotal()
          }, 1000);



        }


      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err)
        this.showProjectsContainer = false;
        this.showNoProjectsContainer = true;

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


  changePaymentWayAll() {


    if (this.paymentWayAll == 'paymentgateway') {
      this.payWithTaxAll = true;
    }
    else {
      this.payWithTaxAll = false;
    }

  }
  openProject(project) {
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["acceptPartner/" + project._id]);
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


  repayAllProject() {
    console.log("this.allCartProjectsIds");
    console.log(this.allCartProjectsIds);
    const prjectPrePayment = {
      "profileId": localStorage.getItem("userId"),
      "jobId": this.allCartProjectsIds
    }
    console.log(prjectPrePayment);
    this.showLoaderMaster = true;
    this.projectServ.repayJop(prjectPrePayment, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("success");
        console.log(response);
        this.paymentUrl = response.data.redirectUrl;
        console.log();
        
        window.location.href = this.paymentUrl;
        
        this.showLoaderMaster = false;

      },
      err => {
        console.log("error");
        console.log(err);

      }
    )

  }


  showDeleteprojectDialog(project) {
    this.deleteSuccess = false;
    this.deleteFail = false;
    this.projectToDelete = project;
    this.deleteprojectMode = true;

    // console.log("you will delete project with id ");
    // console.log(JSON.stringify(this.projectToDelete));

    // console.log(this.projectToDelete._id);
  }
  closeDeleteprojectDialog() {
    this.deleteprojectMode = false;
  }

  deleteProject() {


    this.showLoader = true;

    this.projectServ.deleteProjectFromCart(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), "article", localStorage.getItem("email"), this.projectToDelete._id).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.deleteSuccess = true;
        setTimeout(() => {
          this.deleteprojectMode = false;
        }, 1500);
        this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/cart']);
          this.getAllCartProjects()
          // this.ngOnInit()




        });



      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.deleteFail = true;


      }
    )

  }


  calculateTotal() {

    this.allCostArray.length = 0;
    this.allCartProjectsIds.length = 0;


    this.allAdditionalCost = 0;
    this.allCost = 0;
    this.allFinalTotal = 0;
    this.allAmount = 0;
    this.allAditionAmount = 0;
    this.allPromoValue = 0;
    for (const project of this.cartedprojects) {

      if (project.iconName == undefined) {

        this.allCostArray.push(project.totalCost)
        this.allCartProjectsIds.push(project._id)
        this.allAmountArray.push(project.amount)
        this.allTaxArray.push(project.taxAmount)
        if (project.addtionalAmount || project.addtionalAmount != null || project.addtionalAmount != undefined) {
          this.allAdditionalArray.push(project.addtionalAmount);
        }

        if (project.promoCodeAmount || project.promoCodeAmount != null || project.promoCodeAmount != undefined) {
          this.allPromoCodeArray.push(project.promoCodeAmount);
        }

      }

      else{
        console.log("calc here");
        
        this.allCostArray.push(project.totalCost.value)
        this.allCartProjectsIds.push(project._id)
        this.allAmountArray.push(project?.priceOption?.amount + +project?.priceOption?.deliver?.amount)


        //projectToPay?.priceOption?.amount + +projectToPay?.priceOption?.deliver?.amount
        this.allTaxArray.push(project.taxAmount.value)
        if (project?.addtionalAmount?.value != null || project?.addtionalAmount?.value != undefined) {
          this.allAdditionalArray.push(project.addtionalAmount.value);
        }

        if (project?.promoCodeAmount?.value != null || project?.promoCodeAmount?.value != undefined) {
          this.allPromoCodeArray.push(project.promoCodeAmount.value);
        }

      }



    }


    this.allCost = this.allCostArray.reduce(
      (current, sum) => {
        return current + sum;
      }
    )

// console.log(this.allCost);

    this.allAmount = this.allAmountArray.reduce(
      (current, sum) => {
        return current + sum;
      }
    )
    if (this.allAdditionalArray.length != 0) {
      this.allAditionAmount = this.allAdditionalArray.reduce(
        (current, sum) => {
          return current + sum;
        }
      )

    }

    console.log(this.allAditionAmount);
    

    if (this.allPromoCodeArray.length != 0) {
      this.allPromoValue = this.allPromoCodeArray.reduce(
        (current, sum) => {
          return current + sum;
        }
      )

    }

    this.allTotalWithoutTax = this.allAmount + this.allAditionAmount
console.log(this.allTotalWithoutTax);

    this.allTaxValue = this.allTaxArray.reduce(
      (current, sum) => {
        return current + sum;
      }
    )
    this.allFinalTotal = this.allCost - this.allAdditionalCost;



    this.taxValueInRial = (+this.allCost / 100) * this.taxValue;
    this.taxValueInRial = +this.taxValueInRial
    this.costAfterTax = ((this.allCost / 100) * this.taxValue) + this.allCost;

  }




  editPoject(project) {
    // console.log("you will edit project with ID = " + JSON.stringify(project));
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["updateProject/" + project._id]);

  }
  getCartedprojects() {
    this.projectServ.getAllCartedProjects("client", this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("userId")).subscribe(
      (response: any) => {
        console.log(response);
        
        this.showLoader = false;
        this.cartedprojects = response.data;

        if (this.cartedprojects.length == 0) {
          this.showProjectsContainer = false;
          this.showNoProjectsContainer = true;
        }
        else {
          this.showProjectsContainer = true;
          this.showNoProjectsContainer = false;
          this.projectsCount = this.cartedprojects.length;
          this.cartedprojects.sort((a, b) => {
            return <any>new Date(b.createdAt) - <any>new Date(a.createdAt) || <any>new Date(b.createdAt.value) - <any>new Date(a.createdAt.value) || <any>new Date(b.createdAt) - <any>new Date(a.createdAt.value) || <any>new Date(b.createdAt.value) - <any>new Date(a.createdAt);

          });
          setTimeout(() => {
            this.calculateTotal()
          }, 1000);



        }







      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err)
        this.showProjectsContainer = false;
        this.showNoProjectsContainer = true;

      }
    )
  }


  openPayDialog(project) {
    console.log(project)
    this.projectToPay = project;
    this.payMode = true;
    this.nosuffAll = false;

  }

  ClosePayDialog() {
    this.projectToPay = null;
    this.payMode = false;
    this.paymentWay = 'paymentgateway';
    this.payWithTax = true;

  }



  openPayAllDialog() {
    this.payModeAll = true;
    this.nosuffAll = false;
  }


  closePayAllDialog() {
    this.payModeAll = false;
    this.paymentWayAll = 'paymentgateway';
    this.payWithTaxAll = true;
  }
  payProjectFromCredit() {
    this.payFromCreditSuccess = false;
    this.payFromCreditFail = false;
    this.showLoader = true;
    // this.paymentNotSufficientPost = false;
    this.nosuffAll = false;
    // this.nosuffAll = false;



    if (this.projectToPay.totalCost > this.clientCreditBalance || this.projectToPay.totalCost.value > this.clientCreditBalance) {
      this.showLoader = false;
      // this.paymentNotSufficientPost = true;
      this.nosuffAll = true;
    }
    else {

      const requestBody = {
        "jobsIds": [
          this.projectToPay._id
        ],
        "clientId": localStorage.getItem("userId")
      }

      if(this.projectToPay.iconName == undefined){
       this.jobTypeVirtualSingleProject = this.projectToPay.jobType

      }

      else{
        this.jobTypeVirtualSingleProject = this.projectToPay.jobType.value
      }
      this.projectServ.repayProjectFromCreditBalance(requestBody, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.jobTypeVirtualSingleProject).subscribe(
        (response: any) => {
          this.showLoader = false;

          this.payFromCreditSuccess = true;

          setTimeout(() => {
            this.payFromCreditSuccess = false;
            this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
              this.route.navigate(['/successAddedProject']);




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



  payAllProjectFromCredit() {
    this.payFromCreditSuccess = false;
    this.payFromCreditFail = false;
    this.showLoader = true;
    // this.paymentNotSufficientPost = false;
    this.nosuffAll = false;



    if (this.allCost > this.clientCreditBalance) {
      this.showLoader = false;
      this.nosuffAll = true;
      // this.paymentNotSufficientPost = true;
    }
    else {

      const requestBody = {
        "jobsIds": this.allCartProjectsIds,
        "clientId": localStorage.getItem("userId")
      }

      console.log(requestBody);

      this.projectServ.repayProjectFromCreditBalanceWithNoJobtype(requestBody, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
        (response: any) => {
          this.showLoader = false;

          this.payFromCreditSuccess = true;

          setTimeout(() => {
            this.payFromCreditSuccess = false;
            this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
              this.route.navigate(['/successAddedProject']);




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



  getClientCreditBalance() {

    this.userServ.getClientCreditBalance(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.clientCreditBalance = response.data.balance;


      },
      err => {
        console.log(err);

      }
    )
  }

  closeNoBalnceValidPost() {
    this.paymentNotSufficientPost = false;
  }

}
