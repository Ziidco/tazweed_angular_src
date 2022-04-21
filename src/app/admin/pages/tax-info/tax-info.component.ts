import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-tax-info',
  templateUrl: './tax-info.component.html',
  styleUrls: ['./tax-info.component.css']
})
export class TaxInfoComponent implements OnInit {

  showPayFail = false;
  uuidValue: any;
  math = Math;
  showLoader = false;
  showEditSuccess: boolean = false;
  showEditFail: boolean = false;
  mainprojectConfig;
  projectConfig;
  adminRole;
  takeActionsPrivilage = false;
  addTaxForm:FormGroup;
  editTaxForm:FormGroup;
  allTax;
  editMode = false;
  constructor(
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService,
    private projectServ: ManageProjectService
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
    this.getAllTax();


    this.addTaxForm = new FormGroup({
      companyName:new FormControl(null,Validators.required),
      address:new FormControl(null,Validators.required),
      taxNumber:new FormControl(0,Validators.required),
      taxValue:new FormControl(0,Validators.required),

    })

    this.editTaxForm = new FormGroup({
      companyName:new FormControl(null,Validators.required),
      address:new FormControl(null,Validators.required),
      taxNumber:new FormControl(0,Validators.required),
      taxValue:new FormControl(0,Validators.required),

    })
  }

  logValue(event, formControlName) {
    const value = event.target.value;

    if (value.includes("<scri")) {
      alert("Enter Valid Input");
      this.addTaxForm.get(formControlName).setValue("");
    }
    else {

    }
  }

  preventNonNumericalInput(e) {
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);

    if (!charStr.match(/^[0-9]+$/))
      e.preventDefault();
  }
  addTax(){
    console.log(this.addTaxForm.value);


    this.showLoader = true;
    this.userServ.addTax(this.addTaxForm.value, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (res) => {
        this.showLoader = false;
        console.log("tax added");
        
        this.getAllTax()
      },
      err => {
        this.showLoader = false;
        // alert("error")
        console.log(err);

      }
    )
    
  }

  editTax(){

    console.log(this.editTaxForm.value);


    this.showLoader = true;
    this.userServ.editTax(this.editTaxForm.value, "admin", this.uuidValue, localStorage.getItem("auth"),this.allTax._id).subscribe(
      (res) => {
        this.showLoader = false;
        console.log("tax edited");
        
        this.getAllTax()
      },
      err => {
        this.showLoader = false;
        // alert("error")
        console.log(err);

      }
    )
    
  }


  
  getAllTax() {
    this.userServ.getAllTax("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.showLoader = false;
       
        this.allTax = response.data;
        // console.log("all tax");
        // console.log(response);
        if(this.allTax==null || this.allTax=='' || this.allTax==undefined){
          this.editMode = false
        }
        else{
          this.editMode = true

          this.editTaxForm.get("companyName").setValue(this.allTax.companyName);
          this.editTaxForm.get("address").setValue(this.allTax.address);
          this.editTaxForm.get("taxNumber").setValue(this.allTax.taxNumber);
          this.editTaxForm.get("taxValue").setValue(this.allTax.taxValue);

        }

      },
      err=>{
        this.showLoader = false;
        console.log("error in get tax");
        
        console.log(err);
        
      }
    )
  }

}


