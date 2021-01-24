import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UUIDService } from 'src/app/services/uuid.service';
import {faArrowLeft,faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faLongArrowAltDown =faLongArrowAltDown;
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
  showSuccessForPartner = true;
  showdeliverBox = false;
  userType = localStorage.getItem("sessionUserType");
  paymentUrl;
  constructor(private projectServ: ManageProjectService, private Uuid: UUIDService, private route: Router, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
    this.projectServ.getMyProjects(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("userId")).subscribe(
      (response: any) => {
        // console.log("all projects obj");
        // console.log(JSON.stringify(response.data));
        this.myProjects = response.data;
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


      },
      err => {
        console.log("something went wrong");
        console.log(err)

      }
    )

  }
  editPoject(project) {
    console.log("you will edit project with ID = " + JSON.stringify(project));
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["updateProject/" + project._id]);

  }

  openProject(project){
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["acceptPartner/"+project._id]);
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
  deliverProjectForClient(){
    this.showSuccessForPartner = false;
    this.showdeliverBox = true;
  }




  repayProject(project) {
    console.log(project);
    this.projectServ.addJop(project, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("success");
        console.log(response);
        this.paymentUrl = response.data.redirectUrl;
        window.open(this.paymentUrl);


      },
      err => {
        console.log("error");
        console.log(err);



      }
    )


  }

  // repayProject(project){
  //   console.log(project);
    
  // }

}
