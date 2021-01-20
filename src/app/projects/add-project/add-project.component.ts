import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { faChevronLeft, faChevronRight, faCheckCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { MatChipInputEvent } from '@angular/material/chips';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
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
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faCheckCircle = faCheckCircle;
  faSignOutAlt = faSignOutAlt;
  stepValue = 1;
  progressValue;
  tags;
  additionVlaue;
  showSuccessMessage = false;
  projectConfig;
  projectCost;
  finalCost;
  packageSizeNameArabic: string;
  constructor(private projectServ: ManageProjectService, private Uuid: UUIDService, private route: Router) { }

  ngOnInit(): void {
    // this.calculateCost();
    // this.addAddition(0);

    this.uuidValue = this.Uuid.generateUUID(); 
    console.log("this.uuidvalue");
    console.log(this.uuidValue);
    this.projectServ.configJop(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (configResponse: any) => {
        console.log("config object ====== ");
        // console.log(JSON.stringify(configResponse));
        this.projectConfig = configResponse.data[0].jobConfig;
        console.log(this.projectConfig);
        // if(this.projectConfig.id==1){
        //   this.packageSizeNameArabic = "مقال قصير";
        // }
        // else if(this.projectConfig.id==2){
        //   this.packageSizeNameArabic = "مقال متوسط";
        // }
        // else if(this.projectConfig.id==3){
        //   this.packageSizeNameArabic = "مقال كبير";
        // }
        // else{
        //   this.packageSizeNameArabic = "مقال مخصص"; 
        // }

      },
      err => {
        console.log("error in getting project configuration");
        console.log(err);


      }
    )
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
    this.addProjectForm = new FormGroup({
      clientId: new FormControl(localStorage.getItem("clientId")),
      partnerId: new FormControl(null),
      projectTitle: new FormControl(null, Validators.required),
      projectType: new FormControl("Article"),
      projectField: new FormControl(null, Validators.required),
      projectIdea: new FormControl(null),
      projectTags: new FormArray([]),
      resource: new FormControl(null),
      helpfulLinks: new FormArray([]),
      category: new FormControl("string"),
      language: new FormControl("string"),
      size: new FormControl(null, Validators.required),
      timePerDay: new FormControl(null, Validators.required),
      status: new FormControl("active"),
      amount: new FormControl(null),
      addtionalAmount: new FormControl("0"),
      totalCost: new FormControl(null),
      briefProject: new FormControl(null),
      additionFake: new FormControl(null)








    })
  }

  add(event: MatChipInputEvent): void {
    const tag = new FormControl(event.value);
    const input = event.input;
    const value = event.value;


    if ((value || '').trim()) {

      this.tagsList.push({ name: value.trim() });
      (<FormArray>this.addProjectForm.get("projectTags")).push(tag);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(tag): void {
    const index = this.tagsList.indexOf(tag);

    if (index >= 0) {
      this.tagsList.splice(index, 1);
      const control = <FormArray>this.addProjectForm.controls['projectTags'];
      control.removeAt(index);
      //  ( (<FormArray> this.addProjectForm.get("projectTags")).controls["tag"](index))
    }
  }


  addLinks(event: MatChipInputEvent): void {
    const externalLink = new FormControl(event.value);
    const input = event.input;
    const value = event.value;


    if ((value || '').trim()) {

      this.externalLinks.push({ name: value.trim() });
      (<FormArray>this.addProjectForm.get("helpfulLinks")).push(externalLink);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  removeLink(link): void {
    const index = this.externalLinks.indexOf(link);

    if (index >= 0) {
      this.externalLinks.splice(index, 1);
      const control = <FormArray>this.addProjectForm.controls['helpfulLinks'];
      control.removeAt(index);
      //  ( (<FormArray> this.addProjectForm.get("projectTags")).controls["tag"](index))
    }
  }




  addProject() {
    console.log(this.addProjectForm.value);
    this.projectServ.addJop(this.addProjectForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("success");
        console.log(response);
        this.paymentUrl = response.data.redirectUrl;
        this.showAddForm = false;
        this.showSuccessMessage = true;
        setTimeout(() => {
          // this.route.navigateByUrl(this.paymentUrl);
          this.showSuccessMessage = false;
          // window.open(this.paymentUrl, "_blank");
          window.open(this.paymentUrl);


        }, 1000);


      },
      err => {
        console.log("error");
        console.log(err);
        this.showSuccessMessage = false;
        this.showAddForm = true;


      }
    )


  }


  signOut() {
    this.route.navigate(["/login"]);
    localStorage.clear();
  }

  calculateCost() {
    // const projectRealCost = 0;
    // const projectCostRadio = this.addProjectForm.get("size").value;
    // if(projectCostRadio==0){

    // }
    console.log(this.addProjectForm.get("size").value);
    console.log(this.addProjectForm.get("timePerDay").value);

    let size = this.addProjectForm.get("size").value;
    let packagInitCost;
    if (size == "1") {
      packagInitCost = '79';
    }
    else if (size == "2") {
      packagInitCost = '149';

    }
    else if (size == "3") {
      packagInitCost = '199';

    }
    else {
      packagInitCost = '0';

    }
    this.addProjectForm.get("amount").setValue(packagInitCost);
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
    this.addProjectForm.get("additionFake").setValue("0");
    this.addProjectForm.get("totalCost").setValue(this.finalCost);
    this.addProjectForm.get("amount").setValue(this.finalCost);
    



    // return this.addProjectForm.get("size").value;
  }
  addAddition(val) {
    console.log(val);
    this.addProjectForm.get("addtionalAmount").patchValue(val);

    this.finalCost = +val + this.projectCost;
    this.addProjectForm.get("totalCost").setValue(this.finalCost); 
  }

} 
