import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UUIDService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-manage-my-project',
  templateUrl: './manage-my-project.component.html',
  styleUrls: ['./manage-my-project.component.css']
})
export class ManageMyProjectComponent implements OnInit {
  currentRate = 8;
  uuidValue: any;
  projectId;
  editedProjectObject;
  editProjectForm: FormGroup;
  showEditSuccessMessage:boolean = false;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  additionVlaue;
  showSuccessMessage = false;
  projectConfig;
  projectCost;
  finalCost;
  packageSizeNameArabic:string;
  timeInit;
  amountInit;
  constructor(private router: ActivatedRoute, private projectSev: ManageProjectService,private Uuid: UUIDService,private route:Router) { }

  ngOnInit(): void {
    // this.calculateCost();
    this.uuidValue = this.Uuid.generateUUID(); 
    console.log("this.uuidvalue");
    console.log(this.uuidValue);
    this.projectSev.configJop(localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth")).subscribe(
      (configResponse:any)=>{
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
      err =>{
        console.log("error in getting project configuration");
        console.log(err);
        
        
      }
    )
    this.editProjectForm = new FormGroup({
      clientId: new FormControl(localStorage.getItem("clientId")),
      partnerId: new FormControl(null),
      projectTitle: new FormControl(null),
      // projectType: new FormControl("Article"),
      projectField: new FormControl(null),
      projectIdea: new FormControl(null),
      timePerDay: new FormControl(+this.timeInit),
      // projectTags: new FormArray([]),
      // resource: new FormControl("string"),
      // helpfulLinks: new FormArray([]),
      category: new FormControl("string"),
      language: new FormControl("string"),
      size: new FormControl(null),
      
      status: new FormControl("active"),
      amount: new FormControl(null),
      totalCost:new FormControl(null)
      // addtionalAmount: new FormControl(null),
      // totalCost: new FormControl(0),
      // briefProject: new FormControl(null),
      // additionFake: new FormControl(null)


    })
    this.projectSev.selectedPoject.subscribe(
      (response) => {
        this.editedProjectObject = response;


        this.editProjectForm.get("projectTitle").setValue(this.editedProjectObject.projectTitle);
        this.editProjectForm.get("projectField").setValue(this.editedProjectObject.projectField);
        this.editProjectForm.get("projectIdea").setValue(this.editedProjectObject.projectIdea);
        this.editProjectForm.get("size").setValue(this.editedProjectObject.size);
        
        this.editProjectForm.get("timePerDay").setValue(this.editedProjectObject.timePerDay);
        this.editProjectForm.get("totalCost").setValue(this.editedProjectObject.totalCost);
        this.timeInit = this.editedProjectObject.timePerDay;
        // this.editProjectForm.get("amount").setValue(this.editedProjectObject.amount);
        // this.amountInit = this.editedProjectObject.amount;
        
      },
      err => {
        console.log("no project selected");

      }
    )
    this.projectId = this.router.snapshot.paramMap.get("id");




  }

  editPrpject() {
    let packagInitCost;
    if(this.editProjectForm.get("size").value=='1'){
      this.editProjectForm.get("amount").setValue("79");
      packagInitCost ='79';
    }
    else if(this.editProjectForm.get("size").value=='2'){
      this.editProjectForm.get("amount").setValue("149");
      packagInitCost ='149';

    }
    else if((this.editProjectForm.get("size").value=='3')){
      this.editProjectForm.get("amount").setValue("199");
      packagInitCost ='199';
      
    }
    else{
      this.editProjectForm.get("amount").setValue("0");

    }

    let time = this.editProjectForm.get("timePerDay").value;
    let totalCost;
    
    switch(time){
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
    this.editProjectForm.get("totalCost").setValue(this.finalCost);
    console.log(this.editProjectForm.value);
    this.projectSev.editJob(this.editProjectForm.value, localStorage.getItem("sessionUserType"),this.uuidValue,localStorage.getItem("auth"),this.projectId).subscribe(
      (editResponse)=>{
        console.log("project updated successfully");
        console.log(editResponse);
        this.showEditSuccessMessage = true;
        setTimeout(() => {
          this.route.navigate(['/myProjects']);
        }, 1500);
        
      },
      err=>{
        console.log("error in update project");
        
      }
    )

  }
  closeDialog(){
    this.showEditSuccessMessage = false;
  }
  calculateCost(){
    // const projectRealCost = 0;
    // const projectCostRadio = this.addProjectForm.get("size").value;
    // if(projectCostRadio==0){
    
    // }
    // console.log(this.editProjectForm.get("size").value); 
    // console.log(this.editProjectForm.get("timePerDay").value);

    let size = this.editProjectForm.get("size").value;
    let packagInitCost;
    if(size=="1"){
      packagInitCost ='79';
    }
    else if(size=="2"){
      packagInitCost ='149';

    }
    else if(size=="3"){
      packagInitCost ='199';
      
    }
    else{
      packagInitCost ='0';

    }
    this.editProjectForm.get("amount").setValue(packagInitCost);
    let time = this.editProjectForm.get("timePerDay").value;
    let totalCost;
    
    switch(time){
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
    this.editProjectForm.get("additionFake").setValue("0");
    


    
    // return this.addProjectForm.get("size").value;
  }
}
