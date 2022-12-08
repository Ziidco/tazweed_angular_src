import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faCheck, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  @ViewChildren('cmp') components;

  faCheck = faCheck;
  showPayFail = false;
  uuidValue: any;
  math = Math;
  showLoader = false;
  showEditSuccess: boolean = false;
  showEditFail: boolean = false;
  faMoneyBillWave = faMoneyBillWave;
  mainprojectConfig;
  projectConfig;
  postConfig;
  productDescriptionConfig;
  adminRole;
  takeActionsPrivilage = false;
  showError = false;
  allPricesObject;
  jobTypes;
  selectedService;
  selectedPriceObject;
  selectedServiceAr;
  showPriceTable = false;
  priceFormDynamic: FormGroup;
  selectedSetviceKey;
  editModeDynamic = false;
  priceToEdit;
  editSuccess;
  editFail;
  constructor(
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService,
    private projectServ: ManageProjectService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.adminRole = localStorage.getItem("adminRole");
    if (this.adminRole == 'manager') {
      this.takeActionsPrivilage = true;
    }
    else if (this.adminRole == 'supervisor') {
      this.takeActionsPrivilage = false;
    }
    else {
      this.takeActionsPrivilage = true;
    }
    this.showLoader = true;
    this.uuidValue = this.Uuid.generateUUID();
    this.getJobConfig();
    this.getJobTypes()
    this.priceFormDynamic = new FormGroup({
      deliver:this.fb.array([
        
      ]),
      amount: new FormControl(null,[Validators.required]),
      id: new FormControl(),
      name: new FormControl(null,[Validators.required]),
      quantity: new FormControl(null,[Validators.required]),
      quantityUnit: new FormControl(null,[Validators.required]),
    })
  }


  getJobConfig() {
    this.projectServ.configJop(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (configResponse: any) => {
        this.mainprojectConfig = configResponse.data[0]._id;
        this.allPricesObject = configResponse.data[0];
        this.projectConfig = configResponse.data[0].article;
        this.postConfig = configResponse.data[0].post;
        this.productDescriptionConfig = configResponse.data[0].productDescription;
        this.showLoader = false;
        console.log("main config");

        console.log(this.allPricesObject);

      },
      err => {
        this.showLoader = false;
        console.log("error in getting project configuration");
        console.log(err);
        if (err.error.mesaage == "Token is expired, Please try to sign in first") {
          alert("تم انتهاء جلسه الدخول من فضلك قم باعادة تسجيل الدخول")
          // localStorage.clear()
          // this.route.navigate["/login"]
        }
        else {
          this.showError = true;
        }

      }
    )

  }

  getJobTypes() {

    this.projectServ.getjobTypes(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.jobTypes = response.data
        console.log(this.jobTypes);





      },
      err => {
        console.log("error in job types");
        console.log(err);

      }
    )
  }



  editJobConfig(size, amount, day1, day2, day3, config) {
    this.showLoader = true;
    // console.log(size.value);
    // console.log(amount.value);
    // console.log(day1.value);
    // console.log(day2.value);
    // console.log(day3.value);


    if (size.value < 0 || amount.value < 0 || day1.value < 0 || day2.value < 0 || day3.value < 0) {
      alert("price inputs must be positive numbers")
    }

    else {

      let editObjArticle = {
        "articleConfig": {
          id: config.id,
          name: config.name,
          amount: amount.value,
          quantity: size.value,
          day1: day1.value,
          day2: day2.value,
          day3: day3.value
        }
      }
      console.log(this.mainprojectConfig);

      console.log(editObjArticle);
      this.projectServ.editConfig(editObjArticle, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.mainprojectConfig).subscribe(
        (response) => {
          this.showLoader = false;
          console.log("prices edited successfully");
          console.log(response);
          this.showEditSuccess = true;

          setTimeout(() => {
            this.showEditSuccess = false;

          }, 1500);



        },
        err => {
          this.showLoader = false;
          this.showEditSuccess = false;
          this.showEditFail = true;
          console.log("error in update prices");
          console.log(err);


        }
      )
    }



  }



  editPostConfig(numberOfPost, amount, day1, day2, day3, config) {
    this.showLoader = true;


    if (numberOfPost.value < 0 || amount.value < 0 || day1.value < 0 || day2.value < 0 || day3.value < 0) {
      alert("price inputs must be positive numbers")
    }

    else {

      let editObj = {
        "postConfig": {
          id: config.id,
          numberOfPost: numberOfPost.value,
          amount: amount.value,
          day1: day1.value,
          day2: day2.value,
          day3: day3.value
        }
      }

      console.log(editObj);
      this.projectServ.editConfig(editObj, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.mainprojectConfig).subscribe(
        (response) => {
          this.showLoader = false;
          console.log("prices edited successfully");
          console.log(response);
          this.showEditSuccess = true;

          setTimeout(() => {
            this.showEditSuccess = false;

          }, 1500);



        },
        err => {
          this.showLoader = false;
          this.showEditSuccess = false;
          this.showEditFail = true;
          console.log("error in update prices");
          console.log(err);


        }
      )
    }



  }



  editProductDescConfig(numberOfPost, amount, day1, day2, day3, config) {


    this.showLoader = true;


    if (numberOfPost.value < 0 || amount.value < 0 || day1.value < 0 || day2.value < 0 || day3.value < 0) {
      alert("price inputs must be positive numbers")
    }

    else {

      let editObj = {
        "productDesConfig": {
          id: config.id,
          quantity: numberOfPost.value,
          amount: amount.value,
          day1: day1.value,
          day2: day2.value,
          day3: day3.value
        }
      }

      console.log(editObj);
      this.projectServ.editConfig(editObj, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.mainprojectConfig).subscribe(
        (response) => {
          this.showLoader = false;
          console.log("prices edited successfully");
          console.log(response);
          this.showEditSuccess = true;

          setTimeout(() => {
            this.showEditSuccess = false;

          }, 1500);



        },
        err => {
          this.showLoader = false;
          this.showEditSuccess = false;
          this.showEditFail = true;
          console.log("error in update prices");
          console.log(err);


        }
      )
    }


  }


  closeSuccessDlg() {
    this.showEditSuccess = false;
    this.ngOnInit()
  }

  closeFailDlg() {
    this.showEditFail = false;


  }


 


  filterPrices() {
    this.showLoader = true;
    this.showPriceTable = false;
    // console.log("this.selectedService keyyyyyyyyy");
    // console.log(this.selectedService);
    
    
    // this.selectedServiceAr = name;
    this.selectedPriceObject = this.allPricesObject[this.selectedService];
    if (this.selectedPriceObject != null) {
      this.showLoader = false;
      this.showPriceTable = true;
      console.log("selectedPriceObject");
      console.log(this.selectedPriceObject);

      for (const price of this.jobTypes) {
        if (price.nameEn == this.selectedService) {
          this.selectedServiceAr = price.name;
        }
      }

   


    }

  }

  // const relativeGroup = new FormGroup({
  //   RelativeName: new FormControl(null),
  //   RelativePhoneNumber: new FormControl(null)
  // });
  // (<FormArray>this.addStudentForm.get("Relatives")).push(relativeGroup);


  openEditDialog(price){

    this.editModeDynamic = true;
    this.editSuccess = false;
    this.editFail = false;
    this.priceToEdit = price;

    this.priceFormDynamic.get("amount").setValue(this.priceToEdit.amount)
    this.priceFormDynamic.get("id").setValue(this.priceToEdit.id)
    this.priceFormDynamic.get("name").setValue(this.priceToEdit.name)
    this.priceFormDynamic.get("quantity").setValue(this.priceToEdit.quantity);
    this.priceFormDynamic.get("quantityUnit").setValue(this.priceToEdit.quantityUnit);
    for (const price of this.priceToEdit.deliver) {
      console.log(price);
      this.Deliver().push(
        this.newDeliver(price)
        // this.fb.control(price)
      )
      // <FormArray>this.priceFormDynamic.get("deliver").push(new FormGroup({
      //   new FormControl(price)
      // })

    }

    console.log("sssalah");
    console.log(this.Deliver().controls);
    
    

  }


  closeEditDialog(){

    this.editModeDynamic = false;
    this.editSuccess = false;
    this.editFail = false;
    this.priceToEdit = null

  }



 

  Deliver(): FormArray{
    return this.priceFormDynamic.get("deliver") as FormArray
  }


  newDeliver(ob): FormGroup {
    return this.fb.group({
      id:ob.id,
      unit:ob.unit,
      duration:ob.duration,
      amount:ob.amount,
    })
  }



  editJobConfigDynamic() {
    console.log("selectedPriceObject");

    // (<FormArray>this.priceFormDynamic.get("deliver")).setValue(this.selectedPriceObject);

    // console.log(this.priceFormDynamic.value);


    const finishedObjectForedit = {};
    finishedObjectForedit[this.selectedService] = this.priceFormDynamic.value;
    console.log(finishedObjectForedit);


    this.projectServ.editConfig(finishedObjectForedit, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.mainprojectConfig).subscribe(
      (response) => {
        this.showLoader = false;
        console.log("prices edited successfully");
        console.log(response);
        this.editSuccess = true;

        setTimeout(() => {
          this.editSuccess = false;
          this.editModeDynamic = false;

        }, 1500);

  
        console.log("here");
        this.getJobConfig();
        this.getJobTypes()
        
        // this.filterPrices()
        this.filterPrices()
        console.log(this.selectedPriceObject);
        console.log(this.showPriceTable);
        
        



      },
      err => {
        this.showLoader = false;
        this.editSuccess = false;
        this.editFail = true;
        console.log("error in update prices");
        console.log(err);


      }
    )
    
    }




  
}
