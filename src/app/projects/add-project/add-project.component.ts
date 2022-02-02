import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { faChevronLeft, faChevronRight, faWallet, faCheckCircle, faSignOutAlt, faTimes, faFileAlt, faCube, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import { MatChipInputEvent } from '@angular/material/chips';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service'; 
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  showAddToCartMessage = false;
  showAddJobLssThanLimit = false;
  showLoaderInput = false;
  ValiditySuccess = false;
  ValidityFail = false;
  url: SafeResourceUrl;
  faTimesCircle = faTimesCircle;
  faCcVisa = faCcVisa;
  faWallet = faWallet;
  showAddForm: boolean = true;
  paymentUrl: string;
  uuidValue: any;
  visible = true;

  selectable = true;
  removable = true;
  addOnBlur = true;
  tagsList: any = [];
  externalLinks: any = [];
  addProjectForm: FormGroup;
  addPostForm: FormGroup;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faCheckCircle = faCheckCircle;
  faSignOutAlt = faSignOutAlt;
  faFileAlt = faFileAlt;
  faTwitter = faTwitter;
  faTimes = faTimes;
  faCube = faCube;
  stepValue = 0;
  progressValue;
  tags;
  additionVlaue;
  showSuccessMessage = false;
  showAdditionnalValueMessage = false;
  projectConfig;
  postConfig;
  projectCost;
  finalCost;
  packageSizeNameArabic: string;
  textPattern;
  showIframe: boolean = false;
  showLoaderIframe: boolean = false;
  showAddSuccessIframeContainer: boolean = false;
  activeArticles: boolean = true;
  activeProducts: boolean = false;
  activeTweets: boolean = false;
  jobType;
  promocodeadded = false;
  finalCostFterPromo;
  promoCodeValue;
  promoCodeType;
  promoCodeDiscount;
  showRemovePromoBtn = false;
  userLoggedEmail;
  showLoader = false;
  fakeAddition = 0;
  additionMode = false;
  paymentErrorMessage = false;
  jobTypes;
  showArticleWay = false;
  showPostsWay = false;
  showTweetsWay = false;
  newVar;

  uploadedFiles: any = [];
  uploadForm: FormGroup;
  uploaded: any;
  disupload = false;
  selectedUploadedFiles: any = [];
  uploadForm2: FormGroup;
  jobToAttach;
  selectedService = null;
  showLanguageDetails = false;
  mainTaxInfo;
  taxValue;
  costAfterTax;
  taxValueInRial = 0;
  paymentWay = 'paymentgateway';
  payWithTax = true;
  clientCreditBalance;
  showQueryArtPromoBtn = true;
  showQueryPostPromoBtn = true;
  paymentNotSufficient = false;
  paymentNotSufficientPost = false;

  showAddBalanceInArticle = false;
  showAddBalanceInPost = false;
  addCreditBalanceArtForm: FormGroup;
  addCreditBalancePostForm: FormGroup;
  creditBalanceUrl;
  showCreditErrorLimit = false;
  showCreditError = false;
  showAddBalanceSuccess = false;
  showAddBalanceFail = false;

  taxValueForBalance;
  costAfterTaxForBalance;
  taxValueInRialForBalance = 0;
  showAddBalanceBox = true;
  showAddtoCartBox = false;
  showAddBalanceError = false;
  showSuccessMessageForWallet = false;

  promoCodeModeTypeArticle = false;
  promoCodeModeTypePost = false;
  constructor(private userServ: UserService, private formBuilder: FormBuilder, private projectServ: ManageProjectService, private Uuid: UUIDService, private route: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.paymentWay = 'paymentgateway';
    this.showLoader = true;
    this.uploadForm2 = this.formBuilder.group({
      profile: ['']
    });
    this.uploadForm = new FormGroup({
      files: new FormArray([
        new FormControl(null)
      ])
    })



    this.addCreditBalanceArtForm = new FormGroup({
      profileId: new FormControl(localStorage.getItem("userId")),
      amount: new FormControl(null, [Validators.required, Validators.maxLength(4)])

    });


    this.addCreditBalancePostForm = new FormGroup({
      profileId: new FormControl(localStorage.getItem("userId")),
      amount: new FormControl(null, [Validators.required, Validators.maxLength(4)])

    });


    this.userLoggedEmail = localStorage.getItem("email");
    this.textPattern = "^(?:[\u0009-\u000D\u001C-\u007E\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$";
    this.uuidValue = this.Uuid.generateUUID();
    this.projectServ.configJop(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (configResponse: any) => {
        this.projectConfig = configResponse.data[0].articleConfig;
        this.postConfig = configResponse.data[0].postConfig;

      },
      err => {
        console.log("error in getting project configuration");
        console.log(err);

      }
    )

    this.projectServ.getjobTypes(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.jobTypes = response.data




      },
      err => {
        console.log("error in job types");
        console.log(err);

      }
    )
    if (this.stepValue == 0) {
      this.progressValue = 5
    }
    if (this.stepValue == 1) {
      this.progressValue = 25
    }
    else if (this.stepValue == 2) {
      this.progressValue = 50
    }
    else if (this.stepValue == 3) {
      this.progressValue = 75
    }
    else if (this.stepValue == 4) {
      this.progressValue = 100
    }


    this.userServ.getAllTax(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.taxValue = response.data.taxValue;
        this.taxValueForBalance = response.data.taxValue;










      },
      err => {
        console.log("error in get invoice");
        console.log(err);


      }
    )
    this.getClientCreditBalance()
    this.addProjectForm = new FormGroup({
      clientId: new FormControl(localStorage.getItem("clientId")),
      projectTitle: new FormControl(null, Validators.required),
      projectField: new FormControl(null, Validators.required),
      projectIdea: new FormControl(null),
      projectTags: new FormArray([]),
      resource: new FormControl(null),
      helpfulLinks: new FormArray([]),
      category: new FormControl("string"),
      language: new FormControl("string"),
      quantity: new FormControl(null, Validators.required),
      timePerDay: new FormControl(null, Validators.required),
      amount: new FormControl(null),
      addtionalAmount: new FormControl(0),
      totalCost: new FormControl(null),
      briefProject: new FormControl(null),
      clientEmail: new FormControl(localStorage.getItem("email")),
      hasPromoCode: new FormControl(false),
      promoCode: new FormControl(null),
      redirectToPaymentGetway: new FormControl(true),
      jobType: new FormControl(null)

    });



    this.addPostForm = new FormGroup({
      projectTitle: new FormControl(null, Validators.required),
      objectives: new FormControl(null, Validators.required),
      projectIdea: new FormControl(null),
      publishingAccount: new FormControl(null),
      typeOfLanguage: new FormControl(null),
      typeOfPosts: new FormControl(null),
      quantity: new FormControl(null, Validators.required),
      thingsToAvoid: new FormControl(null),
      jobType: new FormControl(null),
      clientId: new FormControl(localStorage.getItem("clientId")),
      timePerDay: new FormControl(null, Validators.required),
      amount: new FormControl(null),
      addtionalAmount: new FormControl('0'),
      totalCost: new FormControl(null),
      clientEmail: new FormControl(localStorage.getItem("email")),
      hasPromoCode: new FormControl(false),
      promoCode: new FormControl(null),
      redirectToPaymentGetway: new FormControl(true),
    })

    this.addPostForm.get("typeOfLanguage").setValue("رسمية")
    this.addPostForm.get("typeOfPosts").setValue("سلسلة حول الموضوع")
  }

  add(event: MatChipInputEvent): void {
    const tag = new FormControl(event.value);
    const input = event.input;
    const value = event.value;

    if (value.includes("<scri")) {
      alert("Enter Valid Input")
    }
    else {
      if ((value || '').trim()) {

        this.tagsList.push({ name: value.trim() });
        (<FormArray>this.addProjectForm.get("projectTags")).push(tag);
      }

      if (input) {
        input.value = '';
      }
    }

  }
  remove(tag): void {
    const index = this.tagsList.indexOf(tag);

    if (index >= 0) {
      this.tagsList.splice(index, 1);
      const control = <FormArray>this.addProjectForm.controls['projectTags'];
      control.removeAt(index);
    }
  }

  logValue(event, formControlName) {
    const value = event.target.value;

    if (value.includes("<scri")) {
      alert("Enter Valid Input");
      this.addProjectForm.get(formControlName).setValue("");
    }
    else {

    }
  }


  addLinks(event: MatChipInputEvent): void {
    const externalLink = new FormControl(event.value);
    const input = event.input;
    const value = event.value;

    if (value.includes("<scri")) {
      alert("Enter Valid Input")
    }
    else {
      if ((value || '').trim()) {

        this.externalLinks.push({ name: value.trim() });
        (<FormArray>this.addProjectForm.get("helpfulLinks")).push(externalLink);
      }

      if (input) {
        input.value = '';
      }
    }

  }
  removeLink(link): void {
    const index = this.externalLinks.indexOf(link);

    if (index >= 0) {
      this.externalLinks.splice(index, 1);
      const control = <FormArray>this.addProjectForm.controls['helpfulLinks'];
      control.removeAt(index);
    }
  }




  addProject() {
    this.addProjectForm.get("clientId").setValue(localStorage.getItem("clientId"))
    this.addProjectForm.get("clientEmail").setValue(localStorage.getItem("email"))



    console.log(this.addProjectForm.value);

    this.showLoader = true;
    this.paymentErrorMessage = false;
    this.showAddJobLssThanLimit = false;
    let timePerDayInt;
    timePerDayInt = +this.addProjectForm.get("timePerDay").value;
    this.addProjectForm.get("timePerDay").setValue(timePerDayInt);
    console.log(this.addProjectForm.value);

    if (this.addProjectForm.get("hasPromoCode").value == false) {
      if (this.addProjectForm.get("promoCode").value == null || this.addProjectForm.get("promoCode").value == '') {
        if (this.ValidityFail) {
          this.addProjectForm.get("promoCode").setValue(null);
        }
        const filtered = {};
        if (this.addProjectForm.valid) {
          for (let key in this.addProjectForm.value) {
            if (this.addProjectForm.value[key]) {
              filtered[key] = this.addProjectForm.value[key];
            }
          }
          console.log(filtered);
        }


        this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addProjectForm.get("jobType").value).subscribe(
          (response: any) => {
            this.showLoader = false;
            console.log("success");
            console.log(response);
            this.paymentUrl = response.data.redirectUrl;
            this.showAddForm = false;
            this.showSuccessMessage = true;

            this.jobToAttach = response.data.jobId;



            if (this.selectedUploadedFiles.length == 0) {

              setTimeout(() => {
                window.location.href = this.paymentUrl;



              }, 1000);

            }

            else {


              console.log(this.selectedUploadedFiles);

              const formObjh = new FormData();
              for (let fileFin of this.selectedUploadedFiles) {
                formObjh.append('files', fileFin);
              }
              formObjh.append('jobId', this.jobToAttach);





              this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
                (response: any) => {
                  console.log(response);

                  setTimeout(() => {
                    window.location.href = this.paymentUrl;



                  }, 1000);
                },
                err => {
                  alert("error in uplaod")
                  console.log(err);

                }
              )



            }



          },
          err => {
            this.showLoader = false;
            console.log("error");
            console.log(err);
            this.showSuccessMessage = false;
            this.showAddForm = true;

            if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
              this.showAddJobLssThanLimit = true;
            }
            else {
              this.paymentErrorMessage = true;
            }


          }
        )



      }
      else {
        this.showLoader = false;
        alert("من فضلك قم بتفعيل البروموكود")
      }

    }
    else {
      if (this.ValidityFail) {
        this.addProjectForm.get("promoCode").setValue(null);
      }
      const filtered = {};
      if (this.addProjectForm.valid) {
        for (let key in this.addProjectForm.value) {
          if (this.addProjectForm.value[key]) {
            filtered[key] = this.addProjectForm.value[key];
          }
        }
        console.log(filtered);
      }



      this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addProjectForm.get("jobType").value).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("success");
          console.log(response);
          this.paymentUrl = response.data.redirectUrl;
          this.showAddForm = false;
          this.showSuccessMessage = true;
          this.jobToAttach = response.data.jobId;
          console.log(this.selectedUploadedFiles.length);

          if (this.selectedUploadedFiles?.length == 0) {
            setTimeout(() => {
              window.location.href = this.paymentUrl;



            }, 1000);
          }

          else {



            console.log(this.selectedUploadedFiles);

            const formObjh = new FormData();
            for (let fileFin of this.selectedUploadedFiles) {
              formObjh.append('files', fileFin);
            }
            formObjh.append('jobId', this.jobToAttach);





            this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
              (response: any) => {
                console.log(response);

                setTimeout(() => {
                  window.location.href = this.paymentUrl;



                }, 1000);
              },
              err => {
                alert("error in uplaod")
                console.log(err);

              }
            )

          }




        },
        err => {
          this.showLoader = false;
          console.log("error");
          console.log(err);
          this.showSuccessMessage = false;
          this.showAddForm = true;
          if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
            this.showAddJobLssThanLimit = true;
          }
          else {
            this.paymentErrorMessage = true;
          }


        }
      )


    }



  }







  addProjectFromCreditBalance() {

    this.paymentNotSufficient = false;
    if (this.addProjectForm.get("totalCost").value > this.clientCreditBalance) {
      this.paymentNotSufficient = true;
    }
    else {


      this.addProjectForm.get("clientId").setValue(localStorage.getItem("clientId"))
      this.addProjectForm.get("clientEmail").setValue(localStorage.getItem("email"))


      console.log(this.addProjectForm.value);

      this.showLoader = true;
      this.paymentErrorMessage = false;
      this.showAddJobLssThanLimit = false;
      let timePerDayInt;
      timePerDayInt = +this.addProjectForm.get("timePerDay").value;
      this.addProjectForm.get("timePerDay").setValue(timePerDayInt);
      console.log(this.addProjectForm.value);

      if (this.addProjectForm.get("hasPromoCode").value == false) {
        if (this.addProjectForm.get("promoCode").value == null || this.addProjectForm.get("promoCode").value == '') {
          if (this.ValidityFail) {
            this.addProjectForm.get("promoCode").setValue(null);
          }
          const filtered = {};
          if (this.addProjectForm.valid) {
            for (let key in this.addProjectForm.value) {
              if (this.addProjectForm.value[key]) {
                filtered[key] = this.addProjectForm.value[key];
              }
            }
            console.log(filtered);
          }


          this.projectServ.addJopFromCreditBalance(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addProjectForm.get("jobType").value).subscribe(
            (response: any) => {
              this.showLoader = false;
              console.log("success");
              console.log(response);
              this.showAddForm = false;
              this.showSuccessMessageForWallet = true;

              this.jobToAttach = response.data.jobId;


              if (this.selectedUploadedFiles.length == 0) {

                setTimeout(() => {
                  this.route.navigate(["/myProjects"])



                }, 1000);

              }

              else {


                console.log(this.selectedUploadedFiles);

                const formObjh = new FormData();
                for (let fileFin of this.selectedUploadedFiles) {
                  formObjh.append('files', fileFin);
                }
                formObjh.append('jobId', this.jobToAttach);





                this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
                  (response: any) => {
                    console.log(response);

                    setTimeout(() => {
                      this.route.navigate(["/myProjects"])



                    }, 1000);
                  },
                  err => {
                    alert("error in uplaod")
                    console.log(err);

                  }
                )



              }



            },
            err => {
              this.showLoader = false;
              console.log("error");
              console.log(err);
              this.showSuccessMessageForWallet = false;
              this.showAddForm = true;

              if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
                this.showAddJobLssThanLimit = true;
              }
              else {
                this.paymentErrorMessage = true;
              }


            }
          )



        }
        else {
          this.showLoader = false;
          alert("من فضلك قم بتفعيل البروموكود")
        }

      }
      else {
        if (this.ValidityFail) {
          this.addProjectForm.get("promoCode").setValue(null);
        }
        const filtered = {};
        if (this.addProjectForm.valid) {
          for (let key in this.addProjectForm.value) {
            if (this.addProjectForm.value[key]) {
              filtered[key] = this.addProjectForm.value[key];
            }
          }
          console.log(filtered);
        }



        this.projectServ.addJopFromCreditBalance(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addProjectForm.get("jobType").value).subscribe(
          (response: any) => {
            this.showLoader = false;
            console.log("success");
            console.log(response);
            this.showAddForm = false;
            this.showSuccessMessageForWallet = true;
            this.jobToAttach = response.data.jobId;
            console.log(this.selectedUploadedFiles.length);

            if (this.selectedUploadedFiles?.length == 0) {
              setTimeout(() => {
                this.route.navigate(["/myProjects"])



              }, 1000);
            }

            else {



              console.log(this.selectedUploadedFiles);

              const formObjh = new FormData();
              for (let fileFin of this.selectedUploadedFiles) {
                formObjh.append('files', fileFin);
              }
              formObjh.append('jobId', this.jobToAttach);





              this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
                (response: any) => {
                  console.log(response);

                  setTimeout(() => {
                    this.route.navigate(["/myProjects"])



                  }, 1000);
                },
                err => {
                  alert("error in uplaod")
                  console.log(err);

                }
              )

            }


          },
          err => {
            this.showLoader = false;
            console.log("error");
            console.log(err);
            this.showSuccessMessage = false;
            this.showAddForm = true;
            if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
              this.showAddJobLssThanLimit = true;
            }
            else {
              this.paymentErrorMessage = true;
            }


          }
        )


      }

    }

  }


  addProjectFromCreditBalanceTypePost() {
    console.log(this.addPostForm.get("totalCost").value);
    
    this.paymentNotSufficientPost = false;
    if (this.addPostForm.get("totalCost").value > this.clientCreditBalance) {
      this.paymentNotSufficientPost = true;
    }

    else {


      this.addPostForm.get("clientId").setValue(localStorage.getItem("clientId"))
      this.addPostForm.get("clientEmail").setValue(localStorage.getItem("email"))

      this.showLoader = true;
      this.paymentErrorMessage = false;
      this.showAddJobLssThanLimit = false;
      let timePerDayInt;
      timePerDayInt = +this.addPostForm.get("timePerDay").value;
      this.addPostForm.get("timePerDay").setValue(timePerDayInt);
      console.log(this.addPostForm.value);

      if (this.addPostForm.get("hasPromoCode").value == false) {
        if (this.addPostForm.get("promoCode").value == null || this.addPostForm.get("promoCode").value == '') {
          if (this.ValidityFail) {
            this.addPostForm.get("promoCode").setValue(null);
          }
          const filtered = {};
          if (this.addPostForm.valid) {
            for (let key in this.addPostForm.value) {
              if (this.addPostForm.value[key]) {
                filtered[key] = this.addPostForm.value[key];
              }
            }
            console.log(filtered);

            console.log(this.addPostForm.get("jobType").value);

          }


          this.projectServ.addJopFromCreditBalance(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addPostForm.get("jobType").value).subscribe(
            (response: any) => {
              this.showLoader = false;
              console.log("success");
              console.log(response);
              this.showPostsWay = false;
              this.showAddForm = false;
              this.showSuccessMessageForWallet = true;

              this.jobToAttach = response.data.jobId;

              if (this.selectedUploadedFiles.length == 0) {

                setTimeout(() => {
                  this.route.navigate(["/myProjects"])



                }, 1000);

              }

              else {


                console.log(this.selectedUploadedFiles);

                const formObjh = new FormData();
                for (let fileFin of this.selectedUploadedFiles) {
                  formObjh.append('files', fileFin);
                }
                formObjh.append('jobId', this.jobToAttach);





                this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
                  (response: any) => {
                    console.log(response);

                    setTimeout(() => {
                      this.route.navigate(["/myProjects"])



                    }, 1000);
                  },
                  err => {
                    alert("error in uplaod")
                    console.log(err);

                  }
                )



              }


            },
            err => {
              this.showLoader = false;
              console.log("error");
              console.log(err);
              this.showSuccessMessage = false;
              this.showAddForm = true;

              if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
                this.showAddJobLssThanLimit = true;
              }
              else {
                this.paymentErrorMessage = true;
              }


            }
          )



        }
        else {
          this.showLoader = false;
          alert("من فضلك قم بتفعيل البروموكود")
        }

      }
      else {
        if (this.ValidityFail) {
          this.addPostForm.get("promoCode").setValue(null);
        }
        const filtered = {};
        if (this.addPostForm.valid) {
          for (let key in this.addPostForm.value) {
            if (this.addPostForm.value[key]) {
              filtered[key] = this.addPostForm.value[key];
            }
          }
          console.log(filtered);
        }



        this.projectServ.addJopFromCreditBalance(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addPostForm.get("jobType").value).subscribe(
          (response: any) => {
            this.showLoader = false;
            console.log("success");
            console.log(response);
            this.showPostsWay = false;
            this.showAddForm = false;
            this.showSuccessMessageForWallet = true;
            this.jobToAttach = response.data.jobId;

            if (this.selectedUploadedFiles.length == 0) {
              setTimeout(() => {
                this.route.navigate(["/myProjects"])



              }, 1000);
            }

            else {



              console.log(this.selectedUploadedFiles);

              const formObjh = new FormData();
              for (let fileFin of this.selectedUploadedFiles) {
                formObjh.append('files', fileFin);
              }
              formObjh.append('jobId', this.jobToAttach);





              this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
                (response: any) => {
                  console.log(response);

                  setTimeout(() => {
                    this.route.navigate(["/myProjects"])



                  }, 1000);
                },
                err => {
                  alert("error in uplaod")
                  console.log(err);

                }
              )

            }


          },
          err => {
            this.showLoader = false;
            console.log("error");
            console.log(err);
            this.showSuccessMessage = false;
            this.showAddForm = true;
            if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
              this.showAddJobLssThanLimit = true;
            }
            else {
              this.paymentErrorMessage = true;
            }


          }
        )


      }
    }






  }


  closeIframe() {
    this.route.navigate(["/myProjects"])
    this.showAddSuccessIframeContainer = false;
  }

  signOut() {
    this.route.navigate(["/login"]);
    localStorage.clear();
  }

  calculateCost() {
    let size = this.addProjectForm.get("quantity").value;
    let packagInitCost;
    if (size == "1") {
      packagInitCost = this.projectConfig[0].amount;
    }
    else if (size == "2") {
      packagInitCost = this.projectConfig[1].amount;

    }
    else if (size == "3") {
      packagInitCost = this.projectConfig[2].amount;

    }
    else {
      packagInitCost = '0';

    }

    let time = this.addProjectForm.get("timePerDay").value;
    let totalCost;

    switch (time) {
      case '1':
        totalCost = +packagInitCost + 25;
        break;

      case '2':
        totalCost = +packagInitCost + 10;
        break;

      case '1':
        totalCost = +packagInitCost + 0;
        break;

      default:
        totalCost = +packagInitCost;
        break;
    }
    this.projectCost = totalCost;
    this.finalCost = +this.projectCost;

    this.addProjectForm.get("amount").setValue(this.projectCost);
    this.addProjectForm.get("totalCost").setValue(this.finalCost);
    if (this.payWithTax == true) {
      this.taxValueInRial = (this.finalCost / 100) * this.taxValue;
      this.taxValueInRial = +this.taxValueInRial
      this.costAfterTax = ((this.finalCost / 100) * this.taxValue) + this.finalCost;

      this.addProjectForm.get("totalCost").setValue(this.costAfterTax);
    }

    else {



    }


    if (this.additionMode == true) {
      this.addAddition()
    }

    if (this.promoCodeModeTypeArticle == true) {
      this.addPromoCodeToJop()
    }

  }
  addAddition() {

    console.log(this.fakeAddition);

    if (this.fakeAddition == null) {
      alert("additional value cannot be empty");
    }
    else if (this.fakeAddition < 0) {
      alert("addition value must be positive");
    }
    else {
      this.additionMode = true;
      this.addProjectForm.get("addtionalAmount").setValue(this.fakeAddition);

      this.finalCost = +this.addProjectForm.get("addtionalAmount").value + this.projectCost;

      if (this.payWithTax == true) {
        this.taxValueInRial = (this.finalCost / 100) * this.taxValue;
        this.taxValueInRial = +this.taxValueInRial
        this.costAfterTax = ((this.finalCost / 100) * this.taxValue) + this.finalCost;

        this.addProjectForm.get("totalCost").setValue(this.costAfterTax);
      }

      else {

        this.addProjectForm.get("totalCost").setValue(this.finalCost);
      }

      this.showAdditionnalValueMessage = true;
      setTimeout(() => {
        this.showAdditionnalValueMessage = false;
      }, 1500);
    }

  }


  clearAddition() {
    this.fakeAddition = 0;
    this.addProjectForm.get("addtionalAmount").setValue(0);
    this.finalCost = +this.addProjectForm.get("addtionalAmount").value + this.projectCost;

    if (this.payWithTax == true) {
      this.taxValueInRial = (this.finalCost / 100) * this.taxValue;
      this.taxValueInRial = +this.taxValueInRial
      this.costAfterTax = ((this.finalCost / 100) * this.taxValue) + this.finalCost;
      this.addProjectForm.get("totalCost").setValue(this.costAfterTax);
    }

    else {
      this.addProjectForm.get("totalCost").setValue(this.finalCost);

    }

    this.additionMode = false;

  }







  closeDialog() {
    this.showAdditionnalValueMessage = false;
  }
  selectType(type) {
    this.jobType = type;
    console.log(this.jobType);
  }
  selectArticles() {


    this.activeArticles = true;
    this.activeProducts = false;
    this.activeTweets = false;
    this.jobType = this.addProjectForm.get("jobType").value;
    console.log(this.jobType);
  }
  selectProducts() {

    this.activeArticles = false;
    this.activeProducts = true;
    this.activeTweets = false;
    this.jobType = "productDescription";
    console.log(this.jobType);
  }

  selectTweets() {
    this.activeArticles = false;
    this.activeProducts = false;
    this.activeTweets = true;
    this.jobType = "tweets";
    console.log(this.jobType);
  }


  addPromoCodeToJop() {
    this.promoCodeModeTypeArticle = true;
    this.showRemovePromoBtn = true;
    const promoCodetrimmed = (this.addProjectForm.get("promoCode").value).trim();
    this.addProjectForm.get("promoCode").setValue(promoCodetrimmed.toLowerCase());
    this.addProjectForm.get("hasPromoCode").setValue(true);
    this.promocodeadded = true;
    const promVal = +this.promoCodeValue;
    const costBefore = +this.finalCost;
    if (this.promoCodeType == 'percentage') {
      this.promoCodeDiscount = (costBefore / 100) * promVal;
      const promoDisco = +this.promoCodeDiscount;

      console.log("costBefore" + costBefore);
      console.log("promoDisco" + promoDisco);

      this.finalCostFterPromo = costBefore - promoDisco;
      if(this.payWithTax == true){
      this.taxValueInRial = (this.finalCostFterPromo / 100) * this.taxValue;
      this.taxValueInRial = +this.taxValueInRial
      this.costAfterTax = ((this.finalCostFterPromo / 100) * this.taxValue) + this.finalCostFterPromo;
      }
      else{

        this.costAfterTax = this.finalCostFterPromo;

      }
    }
    else {
      const promVal = +this.promoCodeValue;
      const costBefore = +this.finalCost;
      this.promoCodeDiscount = +this.promoCodeValue;
      const promoDisco = +this.promoCodeDiscount;

      this.finalCostFterPromo = costBefore - promoDisco;
      if(this.payWithTax == true){
      this.taxValueInRial = (this.finalCostFterPromo / 100) * this.taxValue;
      this.taxValueInRial = +this.taxValueInRial
      this.costAfterTax = ((this.finalCostFterPromo / 100) * this.taxValue) + this.finalCostFterPromo;
      }
      else{
        this.costAfterTax = this.finalCostFterPromo;
      }
    }
    this.addProjectForm.get("totalCost").setValue(this.costAfterTax);

  }


  addPromoCodeToPost() {
    this.promoCodeModeTypePost = true;
    this.showRemovePromoBtn = true;
    const promoCodetrimmed = (this.addPostForm.get("promoCode").value).trim();
    this.addPostForm.get("promoCode").setValue(promoCodetrimmed.toLowerCase());
    this.addPostForm.get("hasPromoCode").setValue(true);
    this.promocodeadded = true;
    const promVal = +this.promoCodeValue;
    const costBefore = +this.finalCost;
    if (this.promoCodeType == 'percentage') {
      this.promoCodeDiscount = (costBefore / 100) * promVal;
      const promoDisco = +this.promoCodeDiscount;

      console.log("costBefore" + costBefore);
      console.log("promoDisco" + promoDisco);

      this.finalCostFterPromo = costBefore - promoDisco;
      if(this.payWithTax == true){
        this.taxValueInRial = (this.finalCostFterPromo / 100) * this.taxValue;
        this.taxValueInRial = +this.taxValueInRial
        this.costAfterTax = ((this.finalCostFterPromo / 100) * this.taxValue) + this.finalCostFterPromo;

      }
      else{
        this.costAfterTax = this.finalCostFterPromo
      }


    }
    else {
      const promVal = +this.promoCodeValue;
      const costBefore = +this.finalCost;
      this.promoCodeDiscount = +this.promoCodeValue;
      const promoDisco = +this.promoCodeDiscount;


      this.finalCostFterPromo = costBefore - promoDisco;
      if(this.payWithTax == true){
      this.taxValueInRial = (this.finalCostFterPromo / 100) * this.taxValue;
      this.taxValueInRial = +this.taxValueInRial
      this.costAfterTax = ((this.finalCostFterPromo / 100) * this.taxValue) + this.finalCostFterPromo;
   
      }
      else{
        this.costAfterTax = this.finalCostFterPromo

      }
    }

    this.addPostForm.get("totalCost").setValue(this.costAfterTax);

  }

  removePromoCodefromJop() {
    this.promoCodeModeTypeArticle = false;
    this.addProjectForm.get("hasPromoCode").setValue(false);
    this.addProjectForm.get("promoCode").setValue("");
    this.promocodeadded = false;
    this.ValidityFail = false;
    this.ValiditySuccess = false;
    this.showRemovePromoBtn = false;
    this.taxValueInRial = (this.finalCost / 100) * this.taxValue;
    this.taxValueInRial = +this.taxValueInRial
    this.costAfterTax = ((this.finalCost / 100) * this.taxValue) + this.finalCost;
    this.showQueryArtPromoBtn = true;


  }

  removePromoCodefromPost() {
    this.promoCodeModeTypePost = false;
    this.addPostForm.get("hasPromoCode").setValue(false);
    this.addPostForm.get("promoCode").setValue("");
    this.promocodeadded = false;
    this.ValidityFail = false;
    this.ValiditySuccess = false;
    this.showRemovePromoBtn = false;
    this.taxValueInRial = (this.finalCost / 100) * this.taxValue;
    this.taxValueInRial = +this.taxValueInRial
    this.costAfterTax = ((this.finalCost / 100) * this.taxValue) + this.finalCost;
    this.showQueryPostPromoBtn = true;

  }



  checkCuponNameValidity() {
    this.userLoggedEmail = localStorage.getItem("email");
    console.log(this.userLoggedEmail);
    this.showRemovePromoBtn = false;
    this.ValiditySuccess = false;
    this.ValidityFail = false;
    this.showLoaderInput = true;
    const promoCodetrimmed = (this.addProjectForm.get("promoCode").value).trim();
    if (promoCodetrimmed == null || promoCodetrimmed == '') {
      this.showLoaderInput = false;
      this.ValidityFail = false;
      this.ValiditySuccess = false;
    }
    else {

      this.userServ.checkPromoCodeValidityInProject((promoCodetrimmed).toLowerCase(), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.jobType, this.userLoggedEmail).subscribe(
        (response: any) => {
          this.showLoaderInput = false;
          this.promoCodeValue = response.data.value;
          if (response.data.isPercentage == true) {
            this.promoCodeType = 'percentage';
          }
          else {
            this.promoCodeType = 'value';
          }


          this.ValiditySuccess = true;
          this.ValidityFail = false;

          this.addPromoCodeToJop()
          this.showQueryArtPromoBtn = false;

        },
        err => {
          this.showLoaderInput = false;
          this.ValidityFail = true;
          this.ValiditySuccess = false;
          console.log(err);

        }
      )


    }





  }


  checkCuponNameValidityPost() {
    this.userLoggedEmail = localStorage.getItem("email");
    console.log(this.userLoggedEmail);

    this.showRemovePromoBtn = false;
    this.ValiditySuccess = false;
    this.ValidityFail = false;
    this.showLoaderInput = true;
    const promoCodetrimmed = (this.addPostForm.get("promoCode").value).trim();

    if (promoCodetrimmed == null || promoCodetrimmed == '') {
      this.showLoaderInput = false;
      this.ValidityFail = false;
      this.ValiditySuccess = false;
    }
    else {

      this.userServ.checkPromoCodeValidityInProject((promoCodetrimmed).toLowerCase(), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.jobType, this.userLoggedEmail).subscribe(
        (response: any) => {
          this.showLoaderInput = false;
          this.promoCodeValue = response.data.value;
          if (response.data.isPercentage == true) {
            this.promoCodeType = 'percentage';
          }
          else {
            this.promoCodeType = 'value';
          }


          this.ValiditySuccess = true;
          this.ValidityFail = false;
          this.addPromoCodeToPost()
          this.showQueryPostPromoBtn = false;

        },
        err => {
          this.showLoaderInput = false;
          this.ValidityFail = true;
          this.ValiditySuccess = false;
          console.log(err);

        }
      )


    }





  }

  hideallStatus() {
    if (this.addProjectForm.get("promoCode").value == null || this.addProjectForm.get("promoCode").value == '') {
      this.showLoaderInput = false;
      this.ValiditySuccess = false;
      this.ValidityFail = false;

    }
  }

  hideallStatusPost() {
    if (this.addPostForm.get("promoCode").value == null || this.addPostForm.get("promoCode").value == '') {
      this.showLoaderInput = false;
      this.ValiditySuccess = false;
      this.ValidityFail = false;

    }
  }
  closeaddLimitDialog() {
    this.showAddJobLssThanLimit = false;

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
  addProjectToCart() {
    this.addProjectForm.get("clientId").setValue(localStorage.getItem("clientId"))
    this.addProjectForm.get("clientEmail").setValue(localStorage.getItem("email"))
    this.addProjectForm.get("redirectToPaymentGetway").setValue(false);
    this.payWithTax = true;

    this.showLoader = true;
    this.showAddJobLssThanLimit = false;
    let timePerDayInt;
    timePerDayInt = +this.addProjectForm.get("timePerDay").value;
    this.addProjectForm.get("timePerDay").setValue(timePerDayInt);

    if (this.addProjectForm.get("hasPromoCode").value == false) {
      if (this.addProjectForm.get("promoCode").value == null || this.addProjectForm.get("promoCode").value == '') {
        if (this.ValidityFail) {
          this.addProjectForm.get("promoCode").setValue(null);
        }
        const filtered = {};
        if (this.addProjectForm.valid) {
          for (let key in this.addProjectForm.value) {
            if (this.addProjectForm.value[key]) {
              console.log(key);

              filtered[key] = this.addProjectForm.value[key];
            }
          }

          filtered["redirectToPaymentGetway"] = false;
          console.log(filtered);

        }



        this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addProjectForm.get("jobType").value).subscribe(
          (response: any) => {
            this.showLoader = false;
            console.log("success");
            console.log(response);
            this.jobToAttach = response.data._id;
            console.log("------------------------");
            console.log(this.jobToAttach);


            if (this.selectedUploadedFiles.length == 0) {

              setTimeout(() => {
                this.showAddForm = false;
                this.showAddToCartMessage = true;


              }, 100);

            }

            else {


              console.log(this.selectedUploadedFiles);

              const formObjh = new FormData();
              for (let fileFin of this.selectedUploadedFiles) {
                formObjh.append('files', fileFin);
              }
              formObjh.append('jobId', this.jobToAttach);





              this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
                (response: any) => {
                  console.log(response);

                  setTimeout(() => {
                    this.showAddForm = false;
                    this.showAddToCartMessage = true;



                  }, 100);
                },
                err => {
                  alert("error in uplaod")
                  console.log(err);

                }
              )



            }



          },
          err2 => {
            this.showLoader = false;
            console.log("error");
            console.log(err2);
            this.showAddToCartMessage = false;
            this.showAddForm = true;

            if (err2.error.code == '42' || err2.error.message == "You can't pay less than 5 SAR") {
              this.showAddJobLssThanLimit = true;
            }


          }
        )



      }
      else {
        alert("من فضلك قم بتفعيل البروموكود")
      }

    }
    else {


      if (this.ValidityFail) {
        this.addProjectForm.get("promoCode").setValue(null);
      }
      const filtered = {};
      if (this.addProjectForm.valid) {
        for (let key in this.addProjectForm.value) {
          if (this.addProjectForm.value[key]) {
            filtered[key] = this.addProjectForm.value[key];
          }
        }


        filtered["redirectToPaymentGetway"] = false;
        console.log(filtered);
      }



      this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addProjectForm.get("jobType").value).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("success");
          console.log(response);

          this.jobToAttach = response.data._id;
          console.log("------------------------");
          console.log(this.jobToAttach);


          if (this.selectedUploadedFiles.length == 0) {

            setTimeout(() => {
              this.showAddForm = false;
              this.showAddToCartMessage = true;


            }, 100);

          }

          else {


            console.log(this.selectedUploadedFiles);

            const formObjh = new FormData();
            for (let fileFin of this.selectedUploadedFiles) {
              formObjh.append('files', fileFin);
            }
            formObjh.append('jobId', this.jobToAttach);





            this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
              (response: any) => {
                console.log(response);

                setTimeout(() => {
                  this.showAddForm = false;
                  this.showAddToCartMessage = true;



                }, 100);
              },
              err => {
                alert("error in uplaod")
                console.log(err);

              }
            )



          }




        },
        err => {
          this.showLoader = false;
          console.log("error");
          console.log(err);
          this.showAddToCartMessage = false;
          this.showAddForm = true;
          if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
            this.showAddJobLssThanLimit = true;
          }


        }
      )


    }


  }
  newProjectAdd() {
    this.ngOnInit()
    this.showAddToCartMessage = false;
    this.stepValue = 0;
    this.progressValue = 0;
    this.selectedUploadedFiles.length = 0;
    this.showAddForm = true;
    this.promocodeadded = false;
    this.addPostForm.reset()
    this.addProjectForm.reset()
    this.finalCost = 0;
    this.finalCostFterPromo = 0;
    this.addProjectForm.get("addtionalAmount").setValue(0);
    this.addPostForm.get("addtionalAmount").setValue(0);
    this.fakeAddition = 0;
    this.additionMode = false;

    this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/addProject']);

    });
  }
  preventNonNumericalInput(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[\.0-9]*$/))
      e.preventDefault();
  }

  closePaymentDialog() {
    this.paymentErrorMessage = false;
  }


  showProjectWay() {
    this.addPostForm.reset()
    this.addProjectForm.reset()
    if (this.selectedService == 'article') {
      this.addProjectForm.get("jobType").setValue('article');
      this.jobType = 'article';

      this.showArticleWay = true;
      this.stepValue = 1;
      this.progressValue = 25;
      this.showPostsWay = false;
      this.showTweetsWay = false;

    }
    else if (this.selectedService == "productDescription") {
      this.addProjectForm.get("jobType").setValue('productDescription');
      this.jobType = 'productDescription';
      this.stepValue = 1;
      this.progressValue = 25;
      this.showPostsWay = false;

      this.showArticleWay = false;
      this.showTweetsWay = true;

    }
    else if (this.selectedService == "post") {
      this.addPostForm.get("jobType").setValue('post');
      this.jobType = 'post';
      this.stepValue = 1;
      this.progressValue = 25;
      this.showTweetsWay = false;
      this.showArticleWay = false;
      this.showPostsWay = true;

    }


  }


  uplaodFileToProject(files, jobId, data) {

    this.projectServ.uploadFileToProject(data, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {

      },
      err => {
        alert("error in uplaod")
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
              this.uploadedFiles.push(file)

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



  onFileSelectPost(event) {




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
              this.uploadedFiles.push(file)

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


  onSubmit() {
    console.log(this.selectedUploadedFiles);

    const formObjh = new FormData();
    for (let fileFin of this.selectedUploadedFiles) {
      formObjh.append('files', fileFin);
    }
    formObjh.append('jobId', "613bb06170c39642d8411a4b");





    this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log(response);


      },
      err => {
        alert("error in uplaod")
        console.log(err);

      }
    )

  }

  onRemoveFile(index) {
    (<FormArray>this.uploadForm.get("files")).removeAt(index)
  }



  onFileSelect2(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      console.log(file);

      this.uploadForm2.get('profile').setValue(file);
    }
  }

  onRemoveFile2(index) {
    this.selectedUploadedFiles.splice(index, 1)
  }

  onRemoveFilePost(index) {
    this.selectedUploadedFiles.splice(index, 1)
  }
  onSubmit2() {
    const formData = new FormData();

    this.uploadedFiles.push(this.uploadForm2.get('profile').value)
    console.log(this.uploadForm2.get('profile').value);
    formData.append('files', this.uploadForm2.get('profile').value);
    formData.append('jobId', "613bb06170c39642d8411a4b");
    this.projectServ.uploadFileToProject(formData, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log(response);


      },
      err => {
        alert("error in uplaod")
        console.log(err);

      }
    )


  }






  addProjectTypePost() {
    this.addPostForm.get("clientId").setValue(localStorage.getItem("clientId"))
    this.addPostForm.get("clientEmail").setValue(localStorage.getItem("email"))

    this.showLoader = true;
    this.paymentErrorMessage = false;
    this.showAddJobLssThanLimit = false;
    let timePerDayInt;
    timePerDayInt = +this.addPostForm.get("timePerDay").value;
    this.addPostForm.get("timePerDay").setValue(timePerDayInt);
    console.log(this.addPostForm.value);

    if (this.addPostForm.get("hasPromoCode").value == false) {
      if (this.addPostForm.get("promoCode").value == null || this.addPostForm.get("promoCode").value == '') {
        if (this.ValidityFail) {
          this.addPostForm.get("promoCode").setValue(null);
        }
        const filtered = {};
        if (this.addPostForm.valid) {
          for (let key in this.addPostForm.value) {
            if (this.addPostForm.value[key]) {
              filtered[key] = this.addPostForm.value[key];
            }
          }
          console.log(filtered);

          console.log(this.addPostForm.get("jobType").value);

        }


        this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addPostForm.get("jobType").value).subscribe(
          (response: any) => {
            this.showLoader = false;
            console.log("success");
            console.log(response);
            this.paymentUrl = response.data.redirectUrl;
            this.showPostsWay = false;
            this.showAddForm = false;
            this.showSuccessMessage = true;

            this.jobToAttach = response.data.jobId;

            if (this.selectedUploadedFiles.length == 0) {

              setTimeout(() => {
                window.location.href = this.paymentUrl;



              }, 1000);

            }

            else {


              console.log(this.selectedUploadedFiles);

              const formObjh = new FormData();
              for (let fileFin of this.selectedUploadedFiles) {
                formObjh.append('files', fileFin);
              }
              formObjh.append('jobId', this.jobToAttach);





              this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
                (response: any) => {
                  console.log(response);

                  setTimeout(() => {
                    window.location.href = this.paymentUrl;



                  }, 1000);
                },
                err => {
                  alert("error in uplaod")
                  console.log(err);

                }
              )



            }


          },
          err => {
            this.showLoader = false;
            console.log("error");
            console.log(err);
            this.showSuccessMessage = false;
            this.showAddForm = true;

            if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
              this.showAddJobLssThanLimit = true;
            }
            else {
              this.paymentErrorMessage = true;
            }


          }
        )



      }
      else {
        this.showLoader = false;
        alert("من فضلك قم بتفعيل البروموكود")
      }

    }
    else {
      if (this.ValidityFail) {
        this.addPostForm.get("promoCode").setValue(null);
      }
      const filtered = {};
      if (this.addPostForm.valid) {
        for (let key in this.addPostForm.value) {
          if (this.addPostForm.value[key]) {
            filtered[key] = this.addPostForm.value[key];
          }
        }
        console.log(filtered);
      }



      this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addPostForm.get("jobType").value).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("success");
          console.log(response);
          this.paymentUrl = response.data.redirectUrl;
          this.showPostsWay = false;
          this.showAddForm = false;
          this.showSuccessMessage = true;
          this.jobToAttach = response.data.jobId;

          if (this.selectedUploadedFiles.length == 0) {
            setTimeout(() => {
              window.location.href = this.paymentUrl;



            }, 1000);
          }

          else {



            console.log(this.selectedUploadedFiles);

            const formObjh = new FormData();
            for (let fileFin of this.selectedUploadedFiles) {
              formObjh.append('files', fileFin);
            }
            formObjh.append('jobId', this.jobToAttach);





            this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
              (response: any) => {
                console.log(response);

                setTimeout(() => {
                  window.location.href = this.paymentUrl;



                }, 1000);
              },
              err => {
                alert("error in uplaod")
                console.log(err);

              }
            )

          }


        },
        err => {
          this.showLoader = false;
          console.log("error");
          console.log(err);
          this.showSuccessMessage = false;
          this.showAddForm = true;
          if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
            this.showAddJobLssThanLimit = true;
          }
          else {
            this.paymentErrorMessage = true;
          }


        }
      )


    }



  }




  calculateCost2() {
    let size = this.addPostForm.get("quantity").value;
    let packagInitCost;
    if (size == "10") {
      packagInitCost = this.postConfig[0].amount;
    }
    else if (size == "20") {
      packagInitCost = this.postConfig[1].amount;

    }
    else if (size == "30") {
      packagInitCost = this.postConfig[2].amount;

    }
    else {
      packagInitCost = '0';

    }

    let time = this.addPostForm.get("timePerDay").value;
    let totalCost;

    switch (time) {
      case '1':
        totalCost = +packagInitCost + 25;
        break;

      case '2':
        totalCost = +packagInitCost + 10;
        break;

      case '1':
        totalCost = +packagInitCost + 0;
        break;

      default:
        totalCost = +packagInitCost;
        break;
    }
    this.projectCost = totalCost;
    this.finalCost = +this.projectCost;
    this.addPostForm.get("amount").setValue(totalCost);



    if (this.payWithTax == true) {
      this.taxValueInRial = (this.finalCost / 100) * this.taxValue;
      this.taxValueInRial = +this.taxValueInRial
      this.costAfterTax = ((this.finalCost / 100) * this.taxValue) + this.finalCost;
      this.addPostForm.get("totalCost").setValue(this.costAfterTax);
    }

    else {
      this.addPostForm.get("totalCost").setValue(this.finalCost);


    }




    if (this.additionMode == true) {
      this.addAddition2()
    }

    if (this.promoCodeModeTypePost == true) {
      this.addPromoCodeToPost()
    }



  }
  addAddition2() {

    console.log(this.fakeAddition);
    if (this.fakeAddition == null) {
      alert("additional value cannot be empty");
    }

    else if (this.fakeAddition < 0) {
      alert("addition value must be positive");
    }
    else {
      this.additionMode = true;
      this.addPostForm.get("addtionalAmount").setValue(this.fakeAddition);

      this.finalCost = +this.addPostForm.get("addtionalAmount").value + this.projectCost;

      if (this.payWithTax == true) {
        this.taxValueInRial = (this.finalCost / 100) * this.taxValue;
        this.taxValueInRial = +this.taxValueInRial
        this.costAfterTax = ((this.finalCost / 100) * this.taxValue) + this.finalCost;
        this.addPostForm.get("totalCost").setValue(this.costAfterTax);
      }

      else {
        this.addPostForm.get("totalCost").setValue(this.finalCost);

      }

      this.showAdditionnalValueMessage = true;
      setTimeout(() => {
        this.showAdditionnalValueMessage = false;
      }, 1500);
    }

  }


  clearAddition2() {
    this.fakeAddition = 0;
    this.addPostForm.get("addtionalAmount").setValue(0);
    this.finalCost = +this.addPostForm.get("addtionalAmount").value + this.projectCost;

    if (this.payWithTax == true) {
      this.taxValueInRial = (this.finalCost / 100) * this.taxValue;
      this.taxValueInRial = +this.taxValueInRial
      this.costAfterTax = ((this.finalCost / 100) * this.taxValue) + this.finalCost;
      this.addPostForm.get("totalCost").setValue(this.costAfterTax);

    }

    else {
      this.addPostForm.get("totalCost").setValue(this.finalCost);

    }

    this.additionMode = false;

  }




  addProjectToCartTypePost() {
    this.addPostForm.get("clientId").setValue(localStorage.getItem("clientId"))
    this.addPostForm.get("clientEmail").setValue(localStorage.getItem("email"))
    this.addPostForm.get("redirectToPaymentGetway").setValue(false);

    this.showLoader = true;
    this.showAddJobLssThanLimit = false;
    let timePerDayInt;
    timePerDayInt = +this.addPostForm.get("timePerDay").value;

    this.payWithTax = true;

    this.addPostForm.get("timePerDay").setValue(timePerDayInt);
    if (this.addPostForm.get("hasPromoCode").value == false) {
      if (this.addPostForm.get("promoCode").value == null || this.addPostForm.get("promoCode").value == '') {
        if (this.ValidityFail) {
          this.addPostForm.get("promoCode").setValue(null);
        }
        const filtered = {};
        if (this.addPostForm.valid) {
          for (let key in this.addPostForm.value) {
            if (this.addPostForm.value[key]) {
              console.log(key);

              filtered[key] = this.addPostForm.value[key];
            }
          }

          filtered["redirectToPaymentGetway"] = false;
          console.log(filtered);

        }



        this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addPostForm.get("jobType").value).subscribe(
          (response: any) => {
            this.showLoader = false;
            console.log("success");
            console.log(response);

            this.jobToAttach = response.data._id;
            console.log("------------------------");
            console.log(this.jobToAttach);


            if (this.selectedUploadedFiles.length == 0) {

              setTimeout(() => {
                this.showAddForm = false;
                this.showAddToCartMessage = true;


              }, 100);

            }

            else {


              console.log(this.selectedUploadedFiles);

              const formObjh = new FormData();
              for (let fileFin of this.selectedUploadedFiles) {
                formObjh.append('files', fileFin);
              }
              formObjh.append('jobId', this.jobToAttach);





              this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
                (response: any) => {
                  console.log(response);

                  setTimeout(() => {
                    this.showAddForm = false;
                    this.showAddToCartMessage = true;



                  }, 100);
                },
                err => {
                  alert("error in uplaod")
                  console.log(err);

                }
              )



            }



          },
          err => {
            this.showLoader = false;
            console.log("error");
            console.log(err);
            this.showAddToCartMessage = false;
            this.showAddForm = true;

            if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
              this.showAddJobLssThanLimit = true;
            }


          }
        )



      }
      else {
        alert("من فضلك قم بتفعيل البروموكود")
      }

    }
    else {


      if (this.ValidityFail) {
        this.addPostForm.get("promoCode").setValue(null);
      }
      const filtered = {};
      if (this.addPostForm.valid) {
        for (let key in this.addPostForm.value) {
          if (this.addPostForm.value[key]) {
            filtered[key] = this.addPostForm.value[key];
          }
        }


        filtered["redirectToPaymentGetway"] = false;
        console.log(filtered);
      }



      this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addPostForm.get("jobType").value).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("success");
          console.log(response);

          this.jobToAttach = response.data._id;
          console.log("------------------------");
          console.log(this.jobToAttach);


          if (this.selectedUploadedFiles.length == 0) {

            setTimeout(() => {
              this.showAddForm = false;
              this.showAddToCartMessage = true;


            }, 100);

          }

          else {


            console.log(this.selectedUploadedFiles);

            const formObjh = new FormData();
            for (let fileFin of this.selectedUploadedFiles) {
              formObjh.append('files', fileFin);
            }
            formObjh.append('jobId', this.jobToAttach);





            this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
              (response: any) => {
                console.log(response);

                setTimeout(() => {
                  this.showAddForm = false;
                  this.showAddToCartMessage = true;



                }, 100);
              },
              err => {
                alert("error in uplaod")
                console.log(err);

              }
            )



          }



        },
        err => {
          this.showLoader = false;
          console.log("error");
          console.log(err);
          this.showAddToCartMessage = false;
          this.showAddForm = true;
          if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
            this.showAddJobLssThanLimit = true;
          }


        }
      )


    }


  }

  showLangDetails() {
    if (this.addPostForm.get("typeOfLanguage").value == 'لهجة محلية') {
      this.showLanguageDetails = true;
    }
    else {
      this.showLanguageDetails = false;
    }
  }

  changePaymentWay() {
    if (this.paymentWay == 'paymentgateway') {
      this.payWithTax = true;
    }
    else {
      this.payWithTax = false;
    }

    this.calculateCost()
    this.addAddition()
    if (this.promoCodeModeTypeArticle == true) {
      this.addPromoCodeToJop()
    }

  }



  changePaymentWayPost() {

   
    if (this.paymentWay == 'paymentgateway') {
      this.payWithTax = true;
    }
    else {
      this.payWithTax = false;
    }

    this.calculateCost2()
    this.addAddition2()
    if (this.promoCodeModeTypePost == true) {
      this.addPromoCodeToPost()
    }
  

  }

  closeNoBalnceValid() {
    this.paymentNotSufficient = false;
  }
  closeNoBalnceValidPost() {
    this.paymentNotSufficientPost = false;
  }



  openAddBalanceInArticle() {
    this.showAddBalanceInArticle = true;
    this.showAddBalanceBox = true;

  }
  closeAddBalanceInArticle() {
    this.showAddBalanceInArticle = false;
    this.taxValueInRialForBalance = 0;
    this.costAfterTaxForBalance = 0;
    this.showAddtoCartBox = false;
    this.addCreditBalanceArtForm.get("amount").setValue(0)
  }

  openAddBalanceInPost() {
    this.showAddBalanceInPost = true;
    this.showAddBalanceBox = true;
  }
  closeAddBalanceInPost() {
    this.taxValueInRialForBalance = 0;
    this.costAfterTaxForBalance = 0;
    this.showAddBalanceInPost = false;
    this.showAddtoCartBox = false;
    this.addCreditBalancePostForm.get("amount").setValue(0)
  }


  calaculateCreditBalanceAfterTaxArt() {



    let balanceCost = this.addCreditBalanceArtForm.get("amount").value
    console.log(balanceCost);
    this.taxValueInRialForBalance = (balanceCost / 100) * this.taxValueForBalance;
    this.costAfterTaxForBalance = ((balanceCost / 100) * this.taxValueForBalance) + balanceCost;
  }


  calaculateCreditBalanceAfterTaxPost() {



    let balanceCost = this.addCreditBalancePostForm.get("amount").value
    console.log(balanceCost);
    this.taxValueInRialForBalance = (balanceCost / 100) * this.taxValueForBalance;
    this.costAfterTaxForBalance = ((balanceCost / 100) * this.taxValueForBalance) + balanceCost;
  }


  addCreditBalanceArt() {
    this.showCreditErrorLimit = false;
    this.showCreditError = false;
    this.showAddBalanceError = false;
    this.showLoader = true;
    this.showAddBalanceSuccess = false;
    this.showAddBalanceFail = false;

    if (this.addCreditBalanceArtForm.get("amount").value > 9999) {
      this.showLoader = false;
      this.showCreditError = true;

      this.addCreditBalanceArtForm.get("amount").setValue(0)
      this.taxValueInRialForBalance = 0;
      this.costAfterTaxForBalance = 0;
    }
    else if (this.addCreditBalanceArtForm.get("amount").value < 6) {
      this.addCreditBalanceArtForm.get("amount").setValue(0)
      this.showCreditErrorLimit = true;
      this.taxValueInRialForBalance = 0;
      this.costAfterTaxForBalance = 0;
      this.showLoader = false;
    }

    else if (this.addCreditBalanceArtForm.get("amount").value < 0) {
      alert("من فضلك أضف رصيد ")
      this.addCreditBalanceArtForm.get("amount").setValue(0)
      this.taxValueInRialForBalance = 0;
      this.costAfterTaxForBalance = 0;
      this.showLoader = false;
    }



    else {





      this.userServ.addCreditBalance(this.addCreditBalanceArtForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("successfully");
          console.log(response);
          if (response.data.redirectUrl != undefined || response.data.redirectUrl != '' || response.data.redirectUrl != null) {
            this.creditBalanceUrl = response.data.redirectUrl;
            this.showAddBalanceBox = false;
            this.showAddtoCartBox = true;


          }

          else {
            this.showAddBalanceSuccess = false;
            this.showAddBalanceFail = true;
            this.showAddBalanceError = true;

          }







        },
        err => {
          this.showLoader = false;
          console.log("something went wrong");
          console.log(err);
          this.showAddBalanceError = true;


        }
      )



    }

  }



  addCreditBalancePost() {
    this.showCreditErrorLimit = false;
    this.showCreditError = false;
    this.showAddBalanceError = false;
    this.showLoader = true;
    this.showAddBalanceSuccess = false;
    this.showAddBalanceFail = false;

    if (this.addCreditBalancePostForm.get("amount").value > 9999) {
      this.showLoader = false;
      this.showCreditError = true;

      this.addCreditBalancePostForm.get("amount").setValue(0)
      this.taxValueInRialForBalance = 0;
      this.costAfterTaxForBalance = 0;
    }
    else if (this.addCreditBalancePostForm.get("amount").value < 6) {
      this.addCreditBalancePostForm.get("amount").setValue(0)
      this.showCreditErrorLimit = true;
      this.taxValueInRialForBalance = 0;
      this.costAfterTaxForBalance = 0;
      this.showLoader = false;
    }

    else if (this.addCreditBalancePostForm.get("amount").value < 0) {
      alert("من فضلك أضف رصيد ")
      this.addCreditBalancePostForm.get("amount").setValue(0)
      this.taxValueInRialForBalance = 0;
      this.costAfterTaxForBalance = 0;
      this.showLoader = false;
    }



    else {





      this.userServ.addCreditBalance(this.addCreditBalancePostForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("successfully");
          console.log(response);
          if (response.data.redirectUrl != undefined || response.data.redirectUrl != '' || response.data.redirectUrl != null) {
            this.creditBalanceUrl = response.data.redirectUrl;
            this.showAddBalanceBox = false;
            this.showAddtoCartBox = true;


          }

          else {
            this.showAddBalanceSuccess = false;
            this.showAddBalanceFail = true;
            this.showAddBalanceError = true;

          }







        },
        err => {
          this.showLoader = false;
          console.log("something went wrong");
          console.log(err);
          this.showAddBalanceError = true;


        }
      )



    }

  }



  addProjectToCartBeforLeave() {
    this.addProjectForm.get("clientId").setValue(localStorage.getItem("clientId"))
    this.addProjectForm.get("clientEmail").setValue(localStorage.getItem("email"))
    this.addProjectForm.get("redirectToPaymentGetway").setValue(false);
    this.payWithTax = true;

    if (this.promoCodeModeTypeArticle == true) {
      this.addPromoCodeToJop()
    }

    this.showAddJobLssThanLimit = false;
    let timePerDayInt;
    timePerDayInt = +this.addProjectForm.get("timePerDay").value;
    this.addProjectForm.get("timePerDay").setValue(timePerDayInt);

    if (this.addProjectForm.get("hasPromoCode").value == false) {
      if (this.addProjectForm.get("promoCode").value == null || this.addProjectForm.get("promoCode").value == '') {
        if (this.ValidityFail) {
          this.addProjectForm.get("promoCode").setValue(null);
        }
        const filtered = {};
        if (this.addProjectForm.valid) {
          for (let key in this.addProjectForm.value) {
            if (this.addProjectForm.value[key]) {
              console.log(key);

              filtered[key] = this.addProjectForm.value[key];
            }
          }

          filtered["redirectToPaymentGetway"] = false;
          console.log(filtered);

        }


        this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addProjectForm.get("jobType").value).subscribe(
          (response: any) => {
            this.showLoader = false;
            console.log("job added to cart");
            console.log(response);
            this.jobToAttach = response.data._id;
            console.log("------------------------");
            console.log(this.jobToAttach);


            if (this.selectedUploadedFiles.length == 0) {

              setTimeout(() => {


              }, 100);

            }

            else {


              console.log(this.selectedUploadedFiles);

              const formObjh = new FormData();
              for (let fileFin of this.selectedUploadedFiles) {
                formObjh.append('files', fileFin);
              }
              formObjh.append('jobId', this.jobToAttach);





              this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
                (response: any) => {
                  console.log(response);


                },
                err => {
                  alert("error in uplaod")
                  console.log(err);

                }
              )



            }



          },
          err2 => {
            this.showLoader = false;
            console.log("error");
            console.log(err2);


            if (err2.error.code == '42' || err2.error.message == "You can't pay less than 5 SAR") {
              this.showAddJobLssThanLimit = true;
            }


          }
        )



      }
      else {
        alert("من فضلك قم بتفعيل البروموكود")
      }

    }
    else {


      if (this.ValidityFail) {
        this.addProjectForm.get("promoCode").setValue(null);
      }
      const filtered = {};
      if (this.addProjectForm.valid) {
        for (let key in this.addProjectForm.value) {
          if (this.addProjectForm.value[key]) {
            filtered[key] = this.addProjectForm.value[key];
          }
        }


        filtered["redirectToPaymentGetway"] = false;
        console.log(filtered);
      }



      this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addProjectForm.get("jobType").value).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("success added to cart");
          console.log(response);

          this.jobToAttach = response.data._id;
          console.log("------------------------");
          console.log(this.jobToAttach);


          if (this.selectedUploadedFiles.length == 0) {



          }

          else {


            console.log(this.selectedUploadedFiles);

            const formObjh = new FormData();
            for (let fileFin of this.selectedUploadedFiles) {
              formObjh.append('files', fileFin);
            }
            formObjh.append('jobId', this.jobToAttach);





            this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
              (response: any) => {
                console.log(response);

                setTimeout(() => {




                }, 100);
              },
              err => {
                alert("error in uplaod")
                console.log(err);

              }
            )



          }




        },
        err => {
          this.showLoader = false;
          console.log("error");
          console.log(err);

          this.showAddForm = true;
          if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
            this.showAddJobLssThanLimit = true;
          }


        }
      )


    }
    this.showAddtoCartBox = false;
    this.showAddBalanceSuccess = true;
    console.log(this.creditBalanceUrl);
    
    window.location.href = this.creditBalanceUrl;

  }



  addPostToCartBeforLeave() {
    this.addPostForm.get("clientId").setValue(localStorage.getItem("clientId"))
    this.addPostForm.get("clientEmail").setValue(localStorage.getItem("email"))
    this.addPostForm.get("redirectToPaymentGetway").setValue(false);
    this.payWithTax = true;
    if (this.promoCodeModeTypePost == true) {
      this.addPromoCodeToPost()
    }



    this.showAddJobLssThanLimit = false;
    let timePerDayInt;
    timePerDayInt = +this.addPostForm.get("timePerDay").value;
    this.addPostForm.get("timePerDay").setValue(timePerDayInt);

    if (this.addPostForm.get("hasPromoCode").value == false) {
      if (this.addPostForm.get("promoCode").value == null || this.addPostForm.get("promoCode").value == '') {
        if (this.ValidityFail) {
          this.addPostForm.get("promoCode").setValue(null);
        }
        const filtered = {};
        if (this.addPostForm.valid) {
          for (let key in this.addPostForm.value) {
            if (this.addPostForm.value[key]) {
              console.log(key);

              filtered[key] = this.addPostForm.value[key];
            }
          }

          filtered["redirectToPaymentGetway"] = false;
          console.log(filtered);

        }



        this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addPostForm.get("jobType").value).subscribe(
          (response: any) => {
            this.showLoader = false;
            console.log("success added to cart");
            console.log(response);
            this.jobToAttach = response.data._id;
            console.log("------------------------");
            console.log(this.jobToAttach);


            if (this.selectedUploadedFiles.length == 0) {



            }

            else {


              console.log(this.selectedUploadedFiles);

              const formObjh = new FormData();
              for (let fileFin of this.selectedUploadedFiles) {
                formObjh.append('files', fileFin);
              }
              formObjh.append('jobId', this.jobToAttach);





              this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
                (response: any) => {
                  console.log(response);


                },
                err => {
                  alert("error in uplaod")
                  console.log(err);

                }
              )



            }



          },
          err2 => {
            this.showLoader = false;
            console.log("error");
            console.log(err2);


            if (err2.error.code == '42' || err2.error.message == "You can't pay less than 5 SAR") {
              this.showAddJobLssThanLimit = true;
            }


          }
        )



      }
      else {
        alert("من فضلك قم بتفعيل البروموكود")
      }

    }
    else {


      if (this.ValidityFail) {
        this.addPostForm.get("promoCode").setValue(null);
      }
      const filtered = {};
      if (this.addPostForm.valid) {
        for (let key in this.addPostForm.value) {
          if (this.addPostForm.value[key]) {
            filtered[key] = this.addPostForm.value[key];
          }
        }


        filtered["redirectToPaymentGetway"] = false;
        console.log(filtered);
      }



      this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.addPostForm.get("jobType").value).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("success added to cart");
          console.log(response);

          this.jobToAttach = response.data._id;
          console.log("------------------------");
          console.log(this.jobToAttach);


          if (this.selectedUploadedFiles.length == 0) {



          }

          else {


            console.log(this.selectedUploadedFiles);

            const formObjh = new FormData();
            for (let fileFin of this.selectedUploadedFiles) {
              formObjh.append('files', fileFin);
            }
            formObjh.append('jobId', this.jobToAttach);





            this.projectServ.uploadFileToProject(formObjh, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
              (response: any) => {
                console.log(response);

              },
              err => {
                alert("error in uplaod")
                console.log(err);

              }
            )



          }




        },
        err => {
          this.showLoader = false;
          console.log("error");
          console.log(err);

          this.showAddForm = true;
          if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
            this.showAddJobLssThanLimit = true;
          }


        }
      )


    }
    this.showAddtoCartBox = false;
    this.showAddBalanceSuccess = true;
    window.location.href = this.creditBalanceUrl;

  }



  ignoreProjectCartBeforLeaveArt() {
    this.showAddBalanceBox = false;
    this.showAddtoCartBox = false;
    this.showAddBalanceInArticle = false;
    this.taxValueInRialForBalance = 0;
    this.costAfterTaxForBalance = 0;
    this.addCreditBalanceArtForm.get("amount").setValue(0)

  }
  ignoreProjectCartBeforLeavePost() {
    this.showAddBalanceBox = false;
    this.showAddtoCartBox = false;
    this.showAddBalanceInPost = false;
    this.taxValueInRialForBalance = 0;
    this.costAfterTaxForBalance = 0;

    this.addCreditBalancePostForm.get("amount").setValue(0)

  }



}
