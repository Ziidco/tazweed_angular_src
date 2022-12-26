import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../../../services/upload-file.service';
import { UserService } from '../../../services/user.service';
import { UUIDService } from '../../../services/uuid.service';
import { faTimes,faEdit,faTrashAlt, faEye, faEyeSlash,faMinus, faCheckCircle,faAddressBook,faPlus, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  tempArr:any;
regex;
faTrashAlt = faTrashAlt;
faEdit = faEdit;
selectItem;
  faEye = faEye;
  faPlus = faPlus;
  faMinus = faMinus;
  faExclamationCircle = faExclamationCircle;
  faEyeSlash = faEyeSlash;
  faCheckCircle = faCheckCircle;
  faTimes = faTimes;
  faAddressBook = faAddressBook;
  faExclamationTriangle = faExclamationTriangle;
  showLoader = true;
  addServiceForm: FormGroup;
  addServiceForm22:FormGroup;
  showFormSubmit: boolean;
  showSuccessMessage: boolean;
  showFailMessage: boolean;
  errorDetails: string;
  addMode = false;
count = 2;
priceCount = 2;
allCommonFields;
addDynamicSuccess = false;
addDynamicFail = false;
showSelect = false;
allServices;
deleteMode = false;
serviceToDelete;
deleteSuccess = false;
deleteFail = false;
fieldCounter = 0;
duplicateError = false;
  constructor(private userServ: UserService,private route:Router, private Uuid: UUIDService, private uploadServ: UploadFileService,private fb:FormBuilder) { }
  uuidValue: any;
  userType: string = "admin";
  iconNa = "fa-search";
  ngOnInit(): void {
    this.regex = /^[a-z][a-z\d]*$/i; 
    this.showFormSubmit = true;
    this.showSuccessMessage = false;
    this.showFailMessage = false;
    this.uuidValue = this.Uuid.generateUUID();

    // customerType: string, X_Request_ID: string, token
    this.userServ.getCommonFields("admin",this.uuidValue,localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("all common fields");
        console.log(response);
        // this.allCountries = response.data;

      }
    )
    this.userServ.getAllServicesDynamic("admin",this.uuidValue,localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("all services");
        console.log(response);
        this.allServices = response.data
        this.showLoader = false

      },
      err=>{
        this.showLoader = false
        console.log(err);
        
      }
    )
    //getAllServicesDynamic

    // this.addNewPrice()
    // this.addServiceForm = new FormGroup({
    //   serviceName: new FormControl(null, Validators.required),
    //   serviceNameAr: new FormControl(null, Validators.required),
    //   iconName: new FormControl(0, Validators.required),
    //   isPublished: new FormControl(true),
    //   Description: new FormControl(null),
    // });

    this.addServiceForm=this.fb.group({
      serviceName: new FormControl(null, [Validators.required,this.noWhitespaceValidator]),
        serviceNameAr: new FormControl(null, [Validators.required,this.noWhitespaceValidator]),
        iconName: new FormControl(0, [Validators.required,this.noWhitespaceValidator]),
        isPublished: new FormControl(true),
        isContainsAttachments: new FormControl(false),
        Description: new FormControl(null),
        // prices: this.fb.array([
        //   this.fb.group({
        //     name:new FormControl(null,Validators.required),
        //     amount: '',
        //     quantity: '',
        //     deliver:this.fb.array([
        //       this.fb.group({
        //         unit: '',
        //         duration: '',
        //         amount: '',

        //       })
            

        //     ])
        //   })

        // ]) ,
    
    
        prices: this.fb.array([
          this.fb.group({
              id:1,
               name: new FormControl(null, [Validators.required,this.noWhitespaceValidator]),
            amount: new FormControl(null, [Validators.required,this.noWhitespaceValidator]),
            quantityUnit: new FormControl(null, [Validators.required,this.noWhitespaceValidator]),
            quantity:new FormControl(null, [Validators.required,this.noWhitespaceValidator]),
            deliver:this.fb.array([
              this.fb.group({
                id:1,
                unit: new FormControl("يوم",[Validators.required]),
                duration: new FormControl(null,[Validators.required]),
                amount: new FormControl(null,[Validators.required]),
              })
    
            ])
          }),
         
  
        ],Validators.required),
        steps: this.fb.array([
        this.fb.group({
          stepName: new FormControl(null,[Validators.required,this.noWhitespaceValidator]),
          stepDescription:new FormControl(null,[Validators.required,this.noWhitespaceValidator]),
          controls:this.fb.array([])
        }),
       

      ], Validators.required) ,
    })

    this.addServiceForm22=this.fb.group({
      serviceName: new FormControl(null, [Validators.required,this.noWhitespaceValidator]),
      serviceNameAr: new FormControl(null, [Validators.required,this.noWhitespaceValidator]),
      iconName: new FormControl(0, [Validators.required,this.noWhitespaceValidator]),
      isPublished: new FormControl(true),
      Description: new FormControl(null),
      
    })
  }







  
  Prices(): FormArray {
    return this.addServiceForm.get("prices") as FormArray
  }

  newPrice(index): FormGroup {
    return this.fb.group({
      name:new FormControl(null,[Validators.required]),
      id:index,
      amount: new FormControl(null,[Validators.required]),
      quantityUnit: new FormControl(null,[Validators.required]),
      quantity: new FormControl(null,[Validators.required]),
      deliver:this.fb.array([
        this.fb.group({
          id:1,
          unit: new FormControl("يوم",[Validators.required]),
          duration: new FormControl(null,[Validators.required]),
          amount: new FormControl(null,[Validators.required]),
        })

      ])
    })
  }
  addNewPrice() {
    this.Prices().push(this.newPrice(this.priceCount++));
  }

  removePrice(index:number) {
    this.Prices().removeAt(index);
  }



  Deliver(): FormArray{
    return this.addServiceForm.get("deliver") as FormArray
  }

  newDeliver(index): FormGroup {
    return this.fb.group({
      id:index,
      unit: new FormControl("يوم",[Validators.required]),
      duration: new FormControl(null,[Validators.required]),
      amount: new FormControl(null,[Validators.required]),
    })
  }
  addNewDeliver(empIndex: number) {
    this.PriceDeliver(empIndex).push(this.newDeliver(this.count++));
  }
 
  removeDeliver(empIndex: number, skillIndex: number) {
    this.PriceDeliver(empIndex).removeAt(skillIndex);
  }




  PriceDeliver(empIndex: number): FormArray {
    return this.Prices()
      .at(empIndex)
      .get('deliver') as FormArray;
  }
  Steps(): FormArray {
    return this.addServiceForm.get("steps") as FormArray
  }

  newStep(): FormGroup {
    this.fieldCounter++
    return this.fb.group({
      stepName: new FormControl(null,[Validators.required,this.noWhitespaceValidator]),
      stepDescription: new FormControl(null,[Validators.required,this.noWhitespaceValidator]),
      controls:this.fb.array([
        this.fb.group({
          name: new FormControl("field" + this.fieldCounter),
          label: new FormControl(null,[Validators.required,this.noWhitespaceValidator]),
          placeholder:new FormControl(null,[Validators.required,this.noWhitespaceValidator]),
          value:null,
          type:'text',
          selectOptions:this.fb.array([]),
          tooltipText:'',
          // required:false,
          validators:this.fb.group({
            required: [false],
          })
        })
      ])
    })
  }
  addNewStep() {
    this.Steps().push(this.newStep());
  }
  addStep() {
    this.Steps().push(this.newStep());
  }
  removeStep(index:number) {
    this.Steps().removeAt(index);
  }


  stepControls(empIndex: number): FormArray {
    return this.Steps()
      .at(empIndex)
      .get('controls') as FormArray;
  }
 
  newControl(): FormGroup {
    if( this.Steps().length==1 && this.stepControls(0).length==0){
      return this.fb.group({
        name: new FormControl("projectTitle"),
        label: new FormControl(null,[Validators.required,this.noWhitespaceValidator]),
        placeholder:new FormControl(null,[Validators.required,this.noWhitespaceValidator]),
        value:null,
        type:'text',
        tooltipText:'',
        // required:false,
        validators:this.fb.group({
          required: [true],
        })
      });

    }

    // else if(this.Steps().length==1 && this.stepControls(0).length>0){

    // }
    else{
      this.fieldCounter++;
      return this.fb.group({
        name: new FormControl('field' + this.fieldCounter),
        label: new FormControl(null,[Validators.required,this.noWhitespaceValidator]),
        placeholder:new FormControl(null,[Validators.required,this.noWhitespaceValidator]),
        value:null,
        type:'text',
        tooltipText:'',
        selectOptions:this.fb.array([]),
        // required:false,
        validators:this.fb.group({
          required: [false],
        })
      });
      
    }
    // return this.fb.group({
    //   name: new FormControl(null),
    //   label: '',
    //   placeholder:'',
    //   value:'',
    //   type:0,
    //   tooltipText:'',
    //   controlType:0,
    //   // required:false,
    //   validators:this.fb.group({
    //     required: [],
    //   })
    // });
  }
 
  addStepControl(empIndex: number) {
    this.stepControls(empIndex).push(this.newControl());
  }
 
  removeStepControl(empIndex: number, skillIndex: number) {
    this.stepControls(empIndex).removeAt(skillIndex);
  }


  stepSelectOptions(stepIndex,controlIndex):FormArray {
// console.log(stepIndex);
// console.log(controlIndex);
    return this.Steps().value[stepIndex].controls[controlIndex].selectOptions as FormArray;
    // return this.Steps()
    //   .at(stepIndex)
    //   .get('selectOptions') as FormArray;

      //selectOptions
  }
  addNewSelectOption(empIndex,skillIndex){

    this.Steps().value[empIndex].controls[skillIndex].selectOptions.push(this.selectItem);
    console.log(this.Steps().value[empIndex].controls[skillIndex].selectOptions);
    this.selectItem = ''
    console.log(this.addServiceForm.value);
    this.showSelect = true;
    
    
  }
 

  removeSelect(stepIndex,controlIndex,index){
    console.log(stepIndex);
    console.log(controlIndex);
    console.log(index);
    console.log(this.stepSelectOptions(stepIndex,controlIndex));
    
    // this.stepSelectOptions(stepIndex,controlIndex).removeAt(index);
  //  (<FormArray>this.stepSelectOptions(stepIndex,controlIndex)).removeAt(index)
this.tempArr = <FormArray>this.stepSelectOptions(stepIndex,controlIndex);
this.tempArr.splice(index,1)
// tempArr.splice(0,1)
    //  this.stepControls(empIndex).removeAt(skillIndex);

  }

  logValue(event, formControlName) {
    // console.log(event);
    
    const value = (event.target.value).toLowerCase();

    if (value.includes("<scri")) {
      alert("Enter Valid Input");
      this.addServiceForm.get(formControlName).setValue("");
    }
    else {

    }
  } 




  logValueNested(event) {
    // console.log(event);
    
    const value = (event.target.value).toLowerCase();

    if (value.includes("<scri")) {
      alert("Enter Valid Input");
      event.target.value = ""
    }
    else {

    }
  } 

  showAddAdminForm() {
    this.addMode = true;
  }
  hideAddAdminForm(){
    this.addMode = false;
  }

  
  addService(){
    this.addDynamicFail = false;
    this.duplicateError = false;
    console.log(this.addServiceForm.value);
    if(this.addServiceForm.get("iconName").value ==0){
      alert("اختر أيقونة الخدمة")
    }
    else{
      console.log(this.addServiceForm.value);



      console.log(this.addServiceForm.value);
      this.showLoader = true;
      this.userServ.addNewService(this.addServiceForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
        (response: any) => {
          console.log(response);
          this.showLoader = false;
          this.addDynamicSuccess = true;
          this.addServiceForm.reset()
          setTimeout(() => {


            this.route.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
              this.route.navigate(["/dashboard/services"]);
      
            });
            
          }, 1500);
          
      
        },
        err => {
          this.showLoader = false;
          if(err.error.code =="68"){
            this.duplicateError = true
          }
          else{
            this.addDynamicFail = true;
            console.log(err);
          }


        }
      )
    }
 
    
  }


  
  preventNonNumericalInput(e) {
    // console.log(e.target.value);
    
    e = e || window.event;
    var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
    var charStr = String.fromCharCode(charCode);
console.log(charStr);

    if (!charStr.match(/^[\.0-9]*$/))
      e.preventDefault();


  }
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control?.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}
  defineFieldType(index,skillIndex){
    console.log(index);
    console.log(skillIndex);
    console.log( this.Steps().value[index].controls[skillIndex].type);

    if(this.Steps().value[index].controls[skillIndex].type == 'select'){
      this.showSelect = true
    }
    else{
      this.showSelect = false
    }
   
    
    // console.log(((<FormGroup>this.Steps().controls[index-1]).controls).value);
// console.log(this.Steps()[index].controls);


    // this.stepControls(index).get("type");
    // this.stepControls(index)
    

  }
  openDeleteDialog(service){
    console.log(service);
    
    this.serviceToDelete = service;
    this.deleteMode = true;
    this.deleteFail = false;
    this.deleteSuccess = false;

  }
  closeDeleteDialog(){
    this.serviceToDelete = null;
    this.deleteMode = false;
    this.deleteFail = false;
    this.deleteSuccess = false;

  }

deleteService(){
//serviceId: string, customerType: string, X_Request_ID: string, token
  this.userServ.deleteService(this.serviceToDelete._id,"admin",this.uuidValue,localStorage.getItem("auth")).subscribe(
    (response: any) => {
      console.log("deleted");

      this.showLoader = false
      this.ngOnInit()
      this.deleteMode = false;
      this.serviceToDelete = null;

    },
    err=>{
      this.showLoader = false
      console.log(err);
      
    }
  )
}


updateService(service){
  this.route.navigate(['/dashboard/manageService/' + service.serviceName]);
}

}
