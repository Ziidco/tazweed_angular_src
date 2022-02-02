import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-my-project',
  templateUrl: './manage-my-project.component.html',
  styleUrls: ['./manage-my-project.component.css']
})
export class ManageMyProjectComponent implements OnInit {
  showAddJobLssThanLimit = false;
  finalCostFterPromo;
  promoCodeValue;
  promoCodeType;
  promoCodeDiscount;
  promoCodeold;
  faTimes = faTimes;
  currentRate = 8;
  uuidValue: any;
  projectId;
  editedProjectObject;
  editProjectForm: FormGroup;
  editpostForm: FormGroup;
  day1;
  day2;
  day3;
  showEditSuccessMessage: boolean = false;
  showLoader = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  additionVlaue;
  showSuccessMessage = false;
  projectConfig;
  projectCost;
  finalCost;
  packageSizeNameArabic: string;
  timeInit;
  amountInit;
  finalTotalCost;
  showPaymentMessage = false;
  showPromocodeMessage = false;
  paymentUrlGenerated;
  promocodeGenerated;
  editModeWithPromoCode = false;
  finalTotalCostAfterpromoCode = 0;
  projectIdShoot;
  allUploads;
  selectedUploadedFiles: any = [];
  removedFiles: any = [];
  articleAdditionMode = false;
  postConfig;
  additionBefore = true;
  additionalMode = false;
  additionBeforePost = true
  taxValue;
  costAfterTax;
  taxValueInRial;
  showEditFail = false;
  calculationUsingTax = true;
  constructor(private router: ActivatedRoute, private projectSev: ManageProjectService, private Uuid: UUIDService, private route: Router, private userServ: UserService) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.day1 = 1;
    this.day2 = 2;
    this.day3 = 3;
    this.uuidValue = this.Uuid.generateUUID();
    this.projectIdShoot = this.router.snapshot.params["id"];
    // console.log("project id is ");

    // console.log(this.projectIdShoot);

    this.projectSev.configJop(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (configResponse: any) => {
        // console.log("config object ====== ");
        this.projectConfig = configResponse.data[0].articleConfig;
        this.postConfig = configResponse.data[0].postConfig;
        // console.log(this.postConfig);


      },
      err => {
        console.log("error in getting project configuration");
        console.log(err);
      }
    )
    // this.getProjectData(this.projectIdShoot);


    this.editProjectForm = new FormGroup({
      projectTitle: new FormControl(null),
      // projectType: new FormControl("Article"),
      projectField: new FormControl(null),
      projectIdea: new FormControl(null),
      timePerDay: new FormControl(null),
      category: new FormControl("string"),
      language: new FormControl("string"),
      quantity: new FormControl(null),

      amount: new FormControl(null),
      totalCost: new FormControl(null),
      addtionalAmount: new FormControl(null),
      hasPromoCode: new FormControl(false),
      promoCode: new FormControl(null)


    })

    this.editpostForm = new FormGroup({
      projectTitle: new FormControl(null),
      // projectType: new FormControl("Article"),
      projectField: new FormControl(null),
      projectIdea: new FormControl(null),
      timePerDay: new FormControl(null),
      category: new FormControl("string"),
      language: new FormControl("string"),
      quantity: new FormControl(null),

      amount: new FormControl(null),
      totalCost: new FormControl(null),
      addtionalAmount: new FormControl(null),
      hasPromoCode: new FormControl(false),
      promoCode: new FormControl(null),
      objectives: new FormControl(null),
      publishingAccount: new FormControl(null),
      typeOfLanguage: new FormControl(null),
      typeOfPosts: new FormControl(null),
      thingsToAvoid: new FormControl(null),


    })



    this.userServ.getOneProject(this.projectIdShoot, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("email")).subscribe(
      (response: any) => {
        // console.log("get job by id response");
        // console.log(response);
        this.showLoader = false;
        this.editedProjectObject = response.data;

        // console.log(this.editedProjectObject);

        if (response.data.isBalanceUsed == false || response.data.isInCart == true) {
          this.calculationUsingTax = true;
        }
        else {
          this.calculationUsingTax = false;

        }

        // alert(this.calculationUsingTax)

        this.getjobUploads()
        if (this.editedProjectObject.addtionalAmount == null || this.editedProjectObject.addtionalAmount == undefined || this.editedProjectObject.addtionalAmount == '') {
          // alert("no additional amount")
          this.additionalMode = false;
        }
        else {
          // alert(" additional amount exist")
          this.additionalMode = true;
        }
        setTimeout(() => {


          if (this.editedProjectObject.jobType == 'article') {
            // alert("article")

            this.editProjectForm.get("projectTitle").setValue(response.data.projectTitle);
            this.editProjectForm.get("projectField").setValue(response.data.projectField);
            this.editProjectForm.get("projectIdea").setValue(response.data.projectIdea);
            this.editProjectForm.get("quantity").setValue(response.data.quantity);
            this.editProjectForm.get("amount").setValue(response.data.amount);
            this.editProjectForm.get("timePerDay").setValue(response.data.timePerDay);
            const totalCostAfterDiscount = response.data.totalCost;
            this.finalTotalCostAfterpromoCode = +totalCostAfterDiscount;
            if (response.data.hasPromoCode == true) {
              this.editModeWithPromoCode = true;
              this.editProjectForm.get("hasPromoCode").setValue(true);
              this.editProjectForm.get("promoCode").setValue(response.data.promoCode);
              this.promoCodeold = response.data.promoCode;
              // this.getPromoCodeData();

            }
            else {
              this.editModeWithPromoCode = false;
            }
            this.editProjectForm.get("totalCost").setValue(this.editedProjectObject.totalCost);
            this.editProjectForm.get("addtionalAmount").setValue(this.editedProjectObject.addtionalAmount);
            if (this.editedProjectObject.addtionalAmount == null || this.editedProjectObject.addtionalAmount == '') {
              this.editProjectForm.get("addtionalAmount").setValue(0);
            }
            console.log(this.projectConfig);


            let size = this.editProjectForm.get("quantity").value;
            let packagInitCost;
            if (size == "1") {
              packagInitCost = this.projectConfig[0].amount;
            }
            else if (size == "2") {
              packagInitCost = this.projectConfig[1].amount;

            }
            else if (size == "3") {
              packagInitCost = +this.projectConfig[2].amount;

            }
            else {
              packagInitCost = '0';

            }
            // this.editProjectForm.get("amount").setValue(packagInitCost);
            let time = this.editProjectForm.get("timePerDay").value;
            let totalCost;

            switch (time) {
              case 1:
                totalCost = +packagInitCost + 25;
                break;

              case 2:
                totalCost = +packagInitCost + 10;
                break;

              case 3:
                totalCost = +packagInitCost + 0;
                break;

              default:
                totalCost = +packagInitCost;
                break;
            }
            this.projectCost = totalCost;
            this.finalCost = +this.projectCost;
            this.taxValueInRial = (this.finalCost / 100) * this.taxValue;
            this.costAfterTax = ((this.finalCost / 100) * this.taxValue) + this.finalCost;
            if (this.calculationUsingTax == true) {
              this.editProjectForm.get("totalCost").setValue(this.costAfterTax);
              // this.editProjectForm.get("amount").setValue(this.costAfterTax);

            }

            else {

              this.editProjectForm.get("totalCost").setValue(this.finalCost);
              // this.editProjectForm.get("amount").setValue(this.finalCost);
            }



            this.addAddition();
            // if (this.editModeWithPromoCode == true) {

            //   this.getPromoCodeData();
            // }


          }
          else if (this.editedProjectObject.jobType == 'post') {



            this.editpostForm.get("projectTitle").setValue(response.data.projectTitle);
            this.editpostForm.get("projectField").setValue(response.data.projectField);
            this.editpostForm.get("projectIdea").setValue(response.data.projectIdea);
            this.editpostForm.get("quantity").setValue(response.data.quantity);

            this.editpostForm.get("publishingAccount").setValue(response.data.publishingAccount);
            this.editpostForm.get("typeOfLanguage").setValue(response.data.typeOfLanguage);
            this.editpostForm.get("typeOfPosts").setValue(response.data.typeOfPosts);
            this.editpostForm.get("thingsToAvoid").setValue(response.data.thingsToAvoid);
            this.editpostForm.get("objectives").setValue(response.data.objectives);



            this.editpostForm.get("timePerDay").setValue(response.data.timePerDay);
            const totalCostAfterDiscount = response.data.totalCost;
            this.finalTotalCostAfterpromoCode = +totalCostAfterDiscount;
            if (response.data.hasPromoCode == true) {
              this.editModeWithPromoCode = true;
              this.editpostForm.get("hasPromoCode").setValue(true);
              this.editpostForm.get("promoCode").setValue(response.data.promoCode);
              this.promoCodeold = response.data.promoCode;
              // this.getPromoCodeData();

              // this.editProjectForm.get("totalCost").setValue(this.editedProjectObject.totalCost);

            }
            else {
              this.editModeWithPromoCode = false;
            }
            this.editpostForm.get("totalCost").setValue(this.editedProjectObject.totalCost);
            this.editpostForm.get("addtionalAmount").setValue(this.editedProjectObject.addtionalAmount);
            if (this.editedProjectObject.addtionalAmount == null || this.editedProjectObject.addtionalAmount == '') {
              this.editpostForm.get("addtionalAmount").setValue(0);
            }
            console.log(this.postConfig);

            let size = this.editpostForm.get("quantity").value;
            let packagInitCost;
            if (size == "10") {
              // packagInitCost = '31';
              packagInitCost = this.postConfig[0].amount;
              console.log(packagInitCost);

            }
            else if (size == "20") {
              // packagInitCost = '59';
              packagInitCost = this.postConfig[1].amount;

            }
            else if (size == "30") {
              // packagInitCost = '79';
              packagInitCost = this.postConfig[2].amount;

            }
            else {
              packagInitCost = '0';

            }

            let time = this.editpostForm.get("timePerDay").value;
            console.log(time);

            let totalCost;

            switch (time) {
              case 1:
                totalCost = +packagInitCost + 25;
                break;

              case 2:
                totalCost = +packagInitCost + 10;
                break;

              case 3:
                totalCost = +packagInitCost + 0;
                break;

              default:
                totalCost = +packagInitCost;
                break;
            }
            this.projectCost = totalCost;
            this.finalCost = +this.projectCost;
            this.editpostForm.get("amount").setValue(totalCost);
            // this.addProjectForm.get("additionFake").setValue("0");
            this.taxValueInRial = (this.finalCost / 100) * this.taxValue;
            this.costAfterTax = ((this.finalCost / 100) * this.taxValue) + this.finalCost;



            if (this.calculationUsingTax == true) {
              this.editpostForm.get("totalCost").setValue(this.costAfterTax);
              // this.editpostForm.get("amount").setValue(this.costAfterTax);

            }

            else {

              this.editpostForm.get("totalCost").setValue(this.finalCost);
              // this.editpostForm.get("amount").setValue(this.finalCost);
            }
            this.addAdditionPost();
            // if (this.editModeWithPromoCode == true) {

            //   this.getPromoCodeData();
            // }
            // alert("post")

          }

        }, 1000);





      },
      err => {
        console.log("error in get job by id");
        console.log(err);

      }
    )



    this.userServ.getAllTax(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.taxValue = response.data.taxValue;

      },
      err => {
        console.log("error in get invoice");
        console.log(err);


      }
    )

    this.projectId = this.router.snapshot.paramMap.get("id");





  }

  editProject() {
    this.showEditFail = false;
    JSON.stringify(this.selectedUploadedFiles)

    console.log(this.selectedUploadedFiles);


    const formObjh = new FormData();
    for (let fileFin of this.selectedUploadedFiles) {
      formObjh.append('files', fileFin);
    }
    formObjh.append('jobId', this.projectId);

    if (this.removedFiles.length > 0) {
      for (let fileRemoved of this.removedFiles) {

        formObjh.append('removedFiles', fileRemoved);

      }


    }




    this.projectSev.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log(response);

      },
      err => {
        alert("error in uplaod")
        console.log(err);

      }
    )

    this.showAddJobLssThanLimit = false;
    this.showLoader = true;
    console.log(this.editProjectForm.value);

    const filtered2 = {};
    if (this.editProjectForm.valid) {
      for (let key in this.editProjectForm.value) {
        if (this.editProjectForm.value[key]) {
          filtered2[key] = this.editProjectForm.value[key];
        }
      }

      if (this.editProjectForm.get("addtionalAmount").value == 0) {
        filtered2["addtionalAmount"] = 0;
      }

    }
    console.log(filtered2);

    this.projectSev.editJob(filtered2, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (editResponse: any) => {



        console.log("project updated successfully");
        console.log(editResponse);
        this.showLoader = false;
        this.showEditSuccessMessage = true;
        // if (editResponse.data.redirectUrl) {
        //   this.showPaymentMessage = true;
        //   this.paymentUrlGenerated = editResponse.data.redirectUrl;
        //   setTimeout(() => {
        //     this.showPaymentMessage = false;
        //     window.location.href = this.paymentUrlGenerated;



        //   }, 1500);
        // }

        // else if (editResponse.data.promoCode) {
        //   this.showPromocodeMessage = true;
        //   this.promocodeGenerated = editResponse.data.promoCode;
        //   setTimeout(() => {
        //     this.route.navigate(['/myProjects']);
        //   }, 2000);
        // }
        // else {
          this.showEditSuccessMessage = true;
          setTimeout(() => {
            this.route.navigate(['/myProjects']);
          }, 1500);
        // }
      },
      err => {
        console.log("error in update project");
        console.log(err);
        this.showLoader = false;
        if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
          this.showAddJobLssThanLimit = true;
        }
        this.showEditFail = true;


      }
    )



  }
  closeDialog() {
    this.showEditSuccessMessage = false;
  }


  calculateCost() {
    let size = this.editProjectForm.get("quantity").value;
    let packagInitCost;
    if (size == "1") {
      packagInitCost = this.projectConfig[0].amount;
    }
    else if (size == "2") {
      packagInitCost = this.projectConfig[1].amount;

    }
    else if (size == "3") {
      packagInitCost = +this.projectConfig[2].amount;

    }
    else {
      packagInitCost = '0';

    }

    let time = this.editProjectForm.get("timePerDay").value;
    let totalCost;

    switch (time) {
      case 1:
        totalCost = +packagInitCost + 25;
        break;

      case 2:
        totalCost = +packagInitCost + 10;
        break;

      case 3:
        totalCost = +packagInitCost + 0;
        break;

      default:
        totalCost = +packagInitCost;
        break;
    }
    this.editProjectForm.get("amount").setValue(totalCost);
    this.projectCost = totalCost;
    this.finalCost = +this.projectCost;
    this.taxValueInRial = (this.finalCost / 100) * this.taxValue;
    this.costAfterTax = ((this.finalCost / 100) * this.taxValue) + this.finalCost;


    if (this.calculationUsingTax == true) {
      console.log("calculation in this block");

      this.editProjectForm.get("totalCost").setValue(this.costAfterTax);
      // this.editProjectForm.get("amount").setValue(this.costAfterTax);

    }

    else {

      this.editProjectForm.get("totalCost").setValue(this.finalCost);
      // this.editProjectForm.get("amount").setValue(this.finalCost);
    }


    this.addAddition();
    if (this.editModeWithPromoCode == true) {

      this.getPromoCodeData();
    }


  }
  addAddition() {
    if (this.editProjectForm.get("addtionalAmount").value < 0) {
      alert("addition value must be positive");
    }
    else {

      this.finalTotalCost = +this.editProjectForm.get("addtionalAmount").value + +this.projectCost;
      this.taxValueInRial = (this.finalTotalCost / 100) * this.taxValue;
      this.costAfterTax = ((this.finalTotalCost / 100) * this.taxValue) + this.finalTotalCost;



      if (this.calculationUsingTax == true) {
        this.editProjectForm.get("totalCost").setValue(this.costAfterTax);

      }

      else {

        this.editProjectForm.get("totalCost").setValue(this.finalTotalCost);
      }


      if (this.editModeWithPromoCode == true) {
        this.getPromoCodeData();
      }
      this.articleAdditionMode = true;

    }



  }
  addAdditionLast() {
    if (this.editProjectForm.get("addtionalAmount").value < 0) {
      alert("addition value must be positive");
    }
    else {

      this.finalTotalCost = +this.editProjectForm.get("addtionalAmount").value + +this.projectCost;
      this.taxValueInRial = (this.finalTotalCost / 100) * this.taxValue;
      this.costAfterTax = ((this.finalTotalCost / 100) * this.taxValue) + this.finalTotalCost;



      if (this.calculationUsingTax == true) {
        this.editProjectForm.get("totalCost").setValue(this.costAfterTax);

      }

      else {

        this.editProjectForm.get("totalCost").setValue(this.finalTotalCost);
      }
      if (this.editModeWithPromoCode == true) {
        this.getPromoCodeData();
      }
      this.articleAdditionMode = true;
      this.additionBefore = false;

    }



  }

  clearAddition() {
    this.editProjectForm.get("addtionalAmount").setValue(0)
    this.taxValueInRial = (this.finalTotalCost / 100) * this.taxValue;
    this.costAfterTax = ((this.finalTotalCost / 100) * this.taxValue) + this.finalTotalCost;
    this.articleAdditionMode = false;
    this.calculateCost()
  }



  clearAdditionlast() {
    this.editProjectForm.get("addtionalAmount").setValue(0)
    this.taxValueInRial = (this.finalTotalCost / 100) * this.taxValue;
    this.costAfterTax = ((this.finalTotalCost / 100) * this.taxValue) + this.finalTotalCost;
    this.articleAdditionMode = false;
    this.calculateCost()
    this.additionBefore = true;
  }

  calculateCost2() {

    let size = this.editpostForm.get("quantity").value;
    let packagInitCost;
    if (size == "10") {
      // packagInitCost = '31';
      packagInitCost = this.postConfig[0].amount;
      console.log(packagInitCost);

    }
    else if (size == "20") {
      // packagInitCost = '59';
      packagInitCost = this.postConfig[1].amount;

    }
    else if (size == "30") {
      // packagInitCost = '79';
      packagInitCost = this.postConfig[2].amount;

    }
    else {
      packagInitCost = '0';

    }

    let time = this.editpostForm.get("timePerDay").value;
    console.log(time);

    let totalCost;

    switch (time) {
      case 1:
        totalCost = +packagInitCost + 25;
        break;

      case 2:
        totalCost = +packagInitCost + 10;
        break;

      case 3:
        totalCost = +packagInitCost + 0;
        break;

      default:
        totalCost = +packagInitCost;
        break;
    }
    this.projectCost = totalCost;
    this.finalCost = +this.projectCost;
    this.editpostForm.get("amount").setValue(totalCost);
    // this.addProjectForm.get("additionFake").setValue("0");
    this.taxValueInRial = (this.finalCost / 100) * this.taxValue;
    this.costAfterTax = ((this.finalCost / 100) * this.taxValue) + this.finalCost;


    // if (this.calculationUsingTax == true) {
    //   console.log("calc is in this block");

    //   this.editpostForm.get("totalCost").setValue(this.costAfterTax);

    // }

    // else {

    //   this.editpostForm.get("totalCost").setValue(this.finalCost);
    // }



    this.addAdditionPost();
    if (this.editModeWithPromoCode == true) {

      this.getPromoCodeData();
    }


  }


  addAdditionPost() {
    if (this.editpostForm.get("addtionalAmount").value < 0) {
      alert("addition value must be positive");
    }
    else {
      this.finalTotalCost = +this.editpostForm.get("addtionalAmount").value + +this.projectCost;
      this.taxValueInRial = (this.finalTotalCost / 100) * this.taxValue;
      this.costAfterTax = ((this.finalTotalCost / 100) * this.taxValue) + this.finalTotalCost;
      // alert(this.calculationUsingTax)

      if (this.calculationUsingTax == true) {
        this.editpostForm.get("totalCost").setValue(this.costAfterTax);

      }

      else {

        this.editpostForm.get("totalCost").setValue(this.finalTotalCost);
      }

      if (this.editModeWithPromoCode == true) {
        this.getPromoCodeData();
      }
      // this.additionBefore = false;

    }



  }



  addAdditionPostLast() {
    if (this.editpostForm.get("addtionalAmount").value < 0) {
      alert("addition value must be positive");
    }
    else {
      this.finalTotalCost = +this.editpostForm.get("addtionalAmount").value + +this.projectCost;
      this.taxValueInRial = (this.finalTotalCost / 100) * this.taxValue;
      this.costAfterTax = ((this.finalTotalCost / 100) * this.taxValue) + this.finalTotalCost;


      if (this.calculationUsingTax == true) {
        this.editpostForm.get("totalCost").setValue(this.costAfterTax);

      }

      else {

        this.editpostForm.get("totalCost").setValue(this.finalTotalCost);
      }

      if (this.editModeWithPromoCode == true) {
        this.getPromoCodeData();
      }
      this.additionBefore = false;

    }



  }

  clearAdditionPost() {


    this.editpostForm.get("addtionalAmount").setValue(0)
    this.calculateCost2()
    this.additionBefore = true;
  }
  closePaymentDialog() {
    this.showPaymentMessage = false;
  }

  closePromocodeDialog() {
    this.showPromocodeMessage = false;
  }


  getPromoCodeData() {
    this.userServ.getOnePromocode(this.promoCodeold, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {

        this.promoCodeValue = response.data[0].value;

        if (response.data[0].isPercentage == true) {
          this.promoCodeType = 'percentage';

        }
        else {
          this.promoCodeType = 'value';
        }


        const promVal = +this.promoCodeValue;
        const costBefore = +this.finalTotalCost;
        if (this.promoCodeType == 'percentage') {
          this.promoCodeDiscount = (costBefore / 100) * promVal;

          const promoDisco = +this.promoCodeDiscount;

          console.log("costBefore" + costBefore);
          console.log("promoDisco" + promoDisco);

          this.finalCostFterPromo = costBefore - promoDisco;




          this.taxValueInRial = (this.finalCostFterPromo / 100) * this.taxValue;
          this.costAfterTax = ((this.finalCostFterPromo / 100) * this.taxValue) + this.finalCostFterPromo;
          if (this.calculationUsingTax == true) {
            this.editProjectForm.get("totalCost").setValue(this.costAfterTax);
            this.editpostForm.get("totalCost").setValue(this.costAfterTax);

          }

          else {

            this.editProjectForm.get("totalCost").setValue(this.finalCostFterPromo);
            this.editpostForm.get("totalCost").setValue(this.finalCostFterPromo);
            // this.editProjectForm.get("amount").setValue(this.finalCost);
          }




        }
        else {


          const promVal = +this.promoCodeValue;

          const costBefore = +this.finalTotalCost;
          this.promoCodeDiscount = +this.promoCodeValue;
          const promoDisco = +this.promoCodeDiscount;

          this.finalCostFterPromo = costBefore - promoDisco;
          // console.log(this.finalCostFterPromo);

          this.taxValueInRial = (this.finalCostFterPromo / 100) * this.taxValue;
          console.log(this.taxValueInRial);
          this.costAfterTax = ((this.finalCostFterPromo / 100) * this.taxValue) + this.finalCostFterPromo;
          console.log(this.costAfterTax);
          if (this.calculationUsingTax == true) {
            this.editProjectForm.get("totalCost").setValue(this.costAfterTax);
            this.editpostForm.get("totalCost").setValue(this.costAfterTax);
            

          }

          else {

            this.editProjectForm.get("totalCost").setValue(this.finalCostFterPromo);
            this.editpostForm.get("totalCost").setValue(this.finalCostFterPromo);
            
            // this.editProjectForm.get("amount").setValue(this.finalCost);
          }
        }


      }
    )
  }
  closeaddLimitDialog() {
    this.showAddJobLssThanLimit = false;

  }



  getProjectData(projectId) {
    this.userServ.getOneProject(projectId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("email")).subscribe(
      (response: any) => {
        console.log("get job by id response");
        console.log(response);



      },
      err => {
        console.log("error in get job by id");
        console.log(err);

      }
    )


  }

  getjobUploads() {

    this.projectSev.getJobUploads(this.projectIdShoot, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (res: any) => {
        // console.log("job uploads ==== ");
        // console.log(res);

        if (res.data != null) {
          this.allUploads = res.data
          this.selectedUploadedFiles = res.data


        }
      },
      err => {
        console.log("error in get uploads");
        console.log(err);

      }
    )

  }




  onFileSelect(event) {




    if (event.target.files.length > 0) {
      const files = event.target.files;
      for (const file of files) {

        const size = (file.size / 1048576).toFixed(2);



        const fileType = (file.name.substring(file.name.lastIndexOf(".") + 1))

        if (+size <= 25) {

          if (this.selectedUploadedFiles.length > 9) {
            alert("أقصى عدد للمرفقات 10 ملفات")
            event.target.value = null;
          }

          else {

            if (fileType == 'pdf' || fileType == 'docx' || fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png' || fileType == 'doc' || fileType == 'xlsx' || fileType == 'JPG') {
              this.selectedUploadedFiles.push(file);


            }


            else {
              alert("please select supported types")
              event.target.value = null;
            }

          }




        }

        else {
          alert("أقصى حجم للملف 25 ميجا بايت")
          event.target.value = null;
        }


      }





    }
  }


  onRemoveFile2(index, file) {
    this.selectedUploadedFiles.splice(index, 1)
    if (file._id != null || file._id != undefined) {
      this.removedFiles.push(file._id)

      console.log(this.removedFiles);

    }
    else {

    }

  }




  editPost() {
    this.showEditFail = false;
    JSON.stringify(this.selectedUploadedFiles)



    const formObjh = new FormData();
    for (let fileFin of this.selectedUploadedFiles) {
      formObjh.append('files', fileFin);
    }
    formObjh.append('jobId', this.projectId);

    if (this.removedFiles.length > 0) {
      for (let fileRemoved of this.removedFiles) {

        formObjh.append('removedFiles', fileRemoved);

      }


    }




    this.projectSev.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // alert("uploaded successfully")
        // console.log(response);

      },
      err => {
        alert("error in uplaod")
        console.log(err);

      }
    )

    this.showAddJobLssThanLimit = false;
    this.showLoader = true;



    // const addittionValue = this.editpostForm.get("addtionalAmount").value;

    // let packagInitCost;
    // if (this.editpostForm.get("quantity").value == '10') {
    //   packagInitCost = this.postConfig[0].amount;
    //   this.editpostForm.get("amount").setValue(+packagInitCost);
    // }
    // else if (this.editpostForm.get("quantity").value == '20') {
    //   packagInitCost = this.postConfig[1].amount;
    //   this.editpostForm.get("amount").setValue(+packagInitCost);

    // }
    // else if ((this.editpostForm.get("quantity").value == '30')) {
    //   packagInitCost = this.postConfig[2].amount;
    //   this.editpostForm.get("amount").setValue(+packagInitCost);

    // }
    // else {
    //   this.editpostForm.get("amount").setValue("0");

    // }

    // let time = this.editpostForm.get("timePerDay").value;
    // let totalCost;

    // switch (time) {
    //   case 1:
    //     totalCost = +packagInitCost + 25;
    //     break;

    //   case 2:
    //     totalCost = +packagInitCost + 10;
    //     break;

    //   case 3:
    //     totalCost = +packagInitCost + 0;
    //     break;

    //   default:
    //     totalCost = +packagInitCost;
    //     break;
    // }
    // this.projectCost = totalCost;

    // this.editpostForm.get("amount").setValue(this.projectCost);
    // console.log(this.editpostForm.value);
    // if (addittionValue < 0) {
    //   alert("addional value must Be Positive Value")
    // }
    // else {

    // const additonValll = this.editpostForm.get("addtionalAmount").value;
    // this.finalTotalCost = +additonValll + +this.projectCost;
    // this.editpostForm.get("totalCost").setValue(this.finalTotalCost);
    // console.log(this.editpostForm.value);

    const filtered2 = {};
    if (this.editpostForm.valid) {
      for (let key in this.editpostForm.value) {
        if (this.editpostForm.value[key]) {
          filtered2[key] = this.editpostForm.value[key];
        }
      }

      if (this.editpostForm.get("addtionalAmount").value == 0) {
        filtered2["addtionalAmount"] = 0;
      }

    }
    console.log(filtered2);
    // console.log(this.editpostForm.get("addtionalAmount").value);

    this.projectSev.editJob(filtered2, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (editResponse: any) => {



        console.log("project updated successfully");
        console.log(editResponse);
        this.showLoader = false;
        // if (editResponse.data.redirectUrl) {
        //   this.showPaymentMessage = true;
        //   this.paymentUrlGenerated = editResponse.data.redirectUrl;
        //   setTimeout(() => {
        //     this.showPaymentMessage = false;
        //     window.location.href = this.paymentUrlGenerated;



        //   }, 1500);
        // }

        // else if (editResponse.data.promoCode) {
        //   this.showPromocodeMessage = true;
        //   this.promocodeGenerated = editResponse.data.promoCode;
        //   setTimeout(() => {
        //     this.route.navigate(['/myProjects']);
        //   }, 2000);
        // }
        // else {
        //   this.showEditSuccessMessage = true;
        //   setTimeout(() => {
        //     this.route.navigate(['/myProjects']);
        //   }, 2000);
        // }
        this.showEditSuccessMessage = true;
        setTimeout(() => {
          this.route.navigate(['/myProjects']);
        }, 1500);
      },
      err => {
        console.log("error in update project");
        console.log(err);
        this.showLoader = false;
        if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
          this.showAddJobLssThanLimit = true;
        }

        this.showEditFail = true;
      }
    )


  }

  preventNonNumericalInput(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
  }

  closeErrorDialog() {
    this.showEditFail = false;
  }


}
