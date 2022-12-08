import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../../../services/upload-file.service';
import { UserService } from '../../../services/user.service';
import { UUIDService } from '../../../services/uuid.service';
import { faTimes, faEye, faEyeSlash, faMinus, faCheckCircle, faAddressBook, faPlus, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-service',
  templateUrl: './manage-service.component.html',
  styleUrls: ['./manage-service.component.css']
})
export class ManageServiceComponent implements OnInit {

  tempArr: any;
  regex;
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
  editServiceForm: FormGroup;
  addServiceForm22: FormGroup;
  showFormSubmit: boolean;
  showSuccessMessage: boolean;
  showFailMessage: boolean;
  errorDetails: string;
  addMode = false;
  count = 100;
  priceCount = 100;
  allCommonFields;
  addDynamicSuccess = false;
  addDynamicFail = false;
  showSelect = false;
  fieldCounter = 200;
  testObjectForEdit;
  constructor(private userServ: UserService, private route: Router, private Uuid: UUIDService, private uploadServ: UploadFileService, private fb: FormBuilder, private actroute: ActivatedRoute) { }
  uuidValue: any;
  serviceNameShoot;
  userType: string = "admin";
  iconNa = "fa-search";
  controlObj;
  ngOnInit(): void {
    this.showLoader = true;
    this.serviceNameShoot = this.actroute.snapshot.params["id"];
    console.log(this.serviceNameShoot);

    this.regex = /^[a-z][a-z\d]*$/i;
    this.showFormSubmit = true;
    this.showSuccessMessage = false;
    this.showFailMessage = false;
    this.uuidValue = this.Uuid.generateUUID();

    // this.getServiceData(this.serviceNameShoot)
    this.userServ.getServiceDataByName(this.serviceNameShoot, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // this.showLoader = false;
        this.testObjectForEdit = response.data[0]
        console.log(" service steps");

        console.log(this.testObjectForEdit);
        setTimeout(() => {
          this.newFunction();
        }, 1500);






      },
      err => {
        console.log("error in get service data");
        console.log(err);




      }
    )
    // this.testObjectForEdit = {
    //   serviceName: "TestDynamic",
    //   serviceNameAr: "خدمة تجريبية ",
    //   iconName: "fa-stethoscope",
    //   isPublished: true,
    //   Description: "وصف تجريبى",
    //   prices: [
    //     {
    //       name: "باقة صغيرة",
    //       id: 1,
    //       amount: 100,
    //       quantity: 1000,
    //       deliver: [
    //         {
    //           id: 1,
    //           unit: "يوم",
    //           duration: "1",
    //           amount: "50"
    //         },
    //         {
    //           id: 2,
    //           unit: "يوم",
    //           duration: "2",
    //           amount: "25"
    //         },
    //         {
    //           id: 3,
    //           unit: "يوم",
    //           duration: "3",
    //           amount: "0"
    //         }
    //       ]
    //     },
    //     {
    //       name: "باقة متوسطة",
    //       id: 2,
    //       amount: 150,
    //       quantity: 1500,
    //       deliver: [
    //         {
    //           id: 1,
    //           unit: "يوم",
    //           duration: "1",
    //           amount: "50"
    //         },
    //         {
    //           id: 2,
    //           unit: "يوم",
    //           duration: "2",
    //           amount: "25"
    //         },
    //         {
    //           id: 3,
    //           unit: "يوم",
    //           duration: "3",
    //           amount: "0"
    //         }
    //       ]
    //     }, {
    //       name: "باقة كبيرة",
    //       id: 3,
    //       amount: 200,
    //       quantity: 2000,
    //       deliver: [
    //         {
    //           id: 1,
    //           unit: "يوم",
    //           duration: "1",
    //           amount: "50"
    //         },
    //         {
    //           id: 2,
    //           unit: "يوم",
    //           duration: "2",
    //           amount: "25"
    //         },
    //         {
    //           id: 3,
    //           unit: "يوم",
    //           duration: "3",
    //           amount: "0"
    //         }
    //       ]
    //     }
    //   ],
    //   steps: [
    //     {
    //       stepName: "المعلومات الأساسية ديناميك",
    //       stepDescription: "تساعدنا هذه المعلومات في اختيار الكاتب المناسب لمشروعك ديناميك",
    //       controls: [
    //         {
    //           name: "project title",
    //           label: "العنوان المقترح ",
    //           placeholder: "(اكتب اقتراحك هنا وسيعمل الكاتب على تحسينه)",
    //           value: null,
    //           type: "text",
    //           tooltipText: "العنوان المقترح ",
    //           controlType: "جديد",
    //           validators: {
    //             required: true,

    //           }
    //         },
    //         {
    //           name: "Field",
    //           label: "في أي مجال تحب نكتب لك؟",
    //           placeholder: "(اختر أقرب المجالات لمشروعك) ",
    //           value: null,
    //           type: "select",
    //           selectOptions: [1, 2, 3],
    //           tooltipText: "في أي مجال تحب نكتب لك؟",
    //           controlType: "جديد",
    //           validators: {}
    //         }
    //       ]
    //     },
    //     {
    //       stepName: "المعلومات الثانوية ديناميك",
    //       stepDescription: "وصف تجريبى",
    //       controls: [
    //         {
    //           name: "Ideas",
    //           label: " لديك أفكار تحب التركيز عليها؟ (اختياري)",
    //           placeholder: "(يمكنك استغلال هذه الفرصة للترويج لخدماتك التي تحل مشاكل العملاء)",
    //           value: null,
    //           type: "number",
    //           controlType: "جديد",
    //           tooltipText: " لديك أفكار تحب التركيز عليها؟ (اختياري)",
    //           validators: {
    //             required: true,

    //           }
    //         },
    //         {
    //           name: "Resources",
    //           label: "لديك مصادر تريد أن يستفيد منها الكاتب؟(اختياري)",
    //           placeholder: "(مثلا، الملف التعريفي للشركة، تقرير حول مجال عملك)",
    //           value: null,
    //           type: "text",
    //           tooltipText: "لديك مصادر تريد أن يستفيد منها الكاتب؟(اختياري)",
    //           controlType: "جديد",
    //           validators: {
    //             required: true,

    //           }
    //         }
    //       ]
    //     },
    //     {
    //       stepName: "معلومات عن المصور",
    //       stepDescription: "معلومات عن المصور نبذة ",
    //       controls: [
    //         {
    //           name: "photogarphName",
    //           label: "أسم المصور",
    //           placeholder: "أسم المصور",
    //           value: null,
    //           type: "text",
    //           tooltipText: "أسم المصور",
    //           controlType: "جديد",
    //           validators: {
    //             required: true,

    //           }
    //         },
    //         {
    //           name: "FieldPhot",
    //           label: "في أي مجال تحب نكتب لك؟",
    //           placeholder: "(اختر أقرب المجالات لمشروعك) ",
    //           value: null,
    //           type: "textarea",
    //           tooltipText: "في أي مجال تحب نكتب لك؟",
    //           controlType: "جديد",
    //           validators: {
    //             required: true,

    //           }
    //         },
    //         {
    //           name: "FieldSwimming",
    //           label: "نعليم سباحة",
    //           placeholder: "(اختر أقرب المجالات لمشروعك) ",
    //           value: null,
    //           type: "textarea",
    //           tooltipText: "في أي مجال تحب نكتب لك؟",
    //           controlType: "جديد",
    //           validators: {
    //             required: true,

    //           }
    //         }
    //       ]
    //     }
    //   ]
    // }

    // this.userServ.getCommonFields("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
    //   (response: any) => {
    //     console.log("all common fields");
    //     console.log(response);

    //   }
    // )



    this.editServiceForm = this.fb.group({
      serviceName: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
      serviceNameAr: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
      iconName: new FormControl(0, [Validators.required, this.noWhitespaceValidator]),
      isPublished: new FormControl(true),
      isContainsAttachments: new FormControl(false),
      Description: new FormControl(null),


      prices: this.fb.array([



      ], Validators.required),
      steps: this.fb.array([



      ], Validators.required),
    })

    // this.editServiceForm = this.testObjectForEdit;

    this.addServiceForm22 = this.fb.group({
      serviceName: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
      serviceNameAr: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
      iconName: new FormControl(0, [Validators.required, this.noWhitespaceValidator]),
      isPublished: new FormControl(true),
      Description: new FormControl(null),

    })
    // console.log("Prices");
    // console.log(this.Prices());





    // this.editServiceForm.get('prices').setValue(this.testObjectForEdit.prices)
    // this.editServiceForm.setValue(this.testObjectForEdit)
    // this.editServiceForm.get("serviceName").setValue(this.testObjectForEdit.serviceName)
    // this.editServiceForm.get("serviceNameAr").setValue(this.testObjectForEdit.serviceNameAr)
    // this.editServiceForm.get("iconName").setValue(this.testObjectForEdit.iconName)
    // this.editServiceForm.get("isPublished").setValue(this.testObjectForEdit.isPublished)
    // this.editServiceForm.get("Description").setValue(this.testObjectForEdit.Description)

    // this.editServiceForm.get("prices").setValue(this.testObjectForEdit.prices)

    // this.Prices()
    // this.editServiceForm.get("steps").setValue(this.testObjectForEdit.steps)
  }

  newFunction() {
    this.patchForm();
    this.setExpenseCategories2();

  }
  patchForm() {


    this.editServiceForm.patchValue({
      serviceName: this.testObjectForEdit.serviceName,
      serviceNameAr: this.testObjectForEdit.serviceNameAr,
      iconName: this.testObjectForEdit.iconName,
      isPublished: this.testObjectForEdit.isPublished,
      isContainsAttachments: this.testObjectForEdit.isContainsAttachments,
      Description: this.testObjectForEdit.Description,
    })
    this.setExpenseCategories()
  }

  // setExpenseCategories(){
  //   (<FormArray>this.editServiceForm.controls.prices).clear()
  //   let pricescontrol = <FormArray>this.editServiceForm.controls.prices;
  //   // pricescontrol = []
  //     console.log('pricescontrol', pricescontrol);
  //     console.log(this.testObjectForEdit.prices);

  //     for (let master = 0; master < this.testObjectForEdit.prices.length; master++) {

  //       pricescontrol.push(this.fb.group(this.testObjectForEdit.prices[master]));
  //       // let testArr = <FormArray>this.editServiceForm.controls.prices[master].deliver;
  //       let testArr = this.PriceDeliver(master);
  //     for (let ind = 0; ind < this.testObjectForEdit.prices[master].deliver.length; ind++) {
  //       // let testArr = this.PriceDeliver(ind);
  //       // console.log('testArr', testArr);
  //       // testArr.push(this.fb.group(this.testObjectForEdit.prices[master].deliver[ind]));

  //     }
  //     console.log('testArr', testArr);
  //     }
  //   //   this.testObjectForEdit.prices.forEach(x => {
  //   //   pricescontrol.push(this.fb.group(x));

  //   //   for (let ind = 0; ind < pricescontrol.controls.length; ind++) {
  //   //     let testArr = this.PriceDeliver(ind);
  //   //     console.log('testArr', testArr);

  //   //   }
  //   // })
  // }

  //pricescontrol.push(this.fb.group(this.testObjectForEdit.prices[master]));
  setExpenseCategories() {
    let pricescontrol = <FormArray>this.editServiceForm.controls.prices;
    // console.log('pricescontrol', pricescontrol);

    this.testObjectForEdit.prices.forEach((x, indexat) => {
      // console.log(x);
      const obj: any = {
        amount: x.amount,
        id: x.id,
        name: x.name,
        quantity: x.quantity,
        quantityUnit: x.quantityUnit,
        deliver: this.fb.array([])
      }
      // let testArr = this.PriceDeliver(indexat);
      pricescontrol.push(this.fb.group(obj));
      // let testArr = <FormArray>this.editServiceForm.controls.prices[indexat].deliver;
      console.log(pricescontrol);

      // pricescontrol[indexat].controls.deliver.push(this.fb.group(x.deliver));
      // console.log('testArr', testArr);

      x.deliver.forEach((y, indexLast) => {
        this.PriceDeliver(indexat).push(this.fb.group(y))
        // (<FormArray>this.editServiceForm.controls.prices[indexat].deliver).push(this.fb.group(y))

        // console.log(y);
        // pricescontrol.controls[indexat].controls.deliver.push(this.fb.group(x.deliver));

        // console.log( pricescontrol.controls);

      })
      // for (let ind = 0; ind < pricescontrol.controls.length; ind++) {


      //   // testArr.push(this.fb.group(this.testObjectForEdit.prices[indexat].deliver[ind]));

      // }
    })
  }







  setExpenseCategories2() {


    let stepsControl = <FormArray>this.editServiceForm.controls.steps;
    // console.log('pricescontrol', pricescontrol);

    this.testObjectForEdit.steps.forEach((x, indexat) => {
      // console.log(x);
      const obj: any = {
        stepName: x.stepName,
        stepDescription: x.stepDescription,
        controls: this.fb.array([])
      }
      // let testArr = this.PriceDeliver(indexat);
      stepsControl.push(this.fb.group(obj));
      // let testArr = <FormArray>this.editServiceForm.controls.prices[indexat].deliver;
      // console.log(stepsControl);

      // pricescontrol[indexat].controls.deliver.push(this.fb.group(x.deliver));
      // console.log('testArr', testArr);

      x.controls.forEach((y, indexLast) => {
        console.log(y);
        if (y.selectOptions != undefined) {
          console.log(y.selectOptions);

          this.controlObj = {
            name: new FormControl(y.name, [Validators.required, this.noWhitespaceValidator]),
            label: new FormControl(y.label, [Validators.required, this.noWhitespaceValidator]),
            placeholder: new FormControl(y.placeholder, [Validators.required, this.noWhitespaceValidator]),
            value: y.value,
            type: y.type,
            controlType: y.controlType,
            tooltipText: y.tooltipText,
            selectOptions: this.fb.array(y.selectOptions),
            validators: this.fb.group({
              required: [y?.validators?.required],
            })

          }

        }
        else {


          this.controlObj = {
            name: new FormControl(y.name, [Validators.required, this.noWhitespaceValidator]),
            label: new FormControl(y.label, [Validators.required, this.noWhitespaceValidator]),
            placeholder: new FormControl(y.placeholder, [Validators.required, this.noWhitespaceValidator]),
            value: y.value,
            type: y.type,
            controlType: y.controlType,
            tooltipText: y.tooltipText,
            validators: this.fb.group({
              required: [y?.validators?.required],
            })

          }

        }

        // if(y.selectOptions != undefined){
        //   console.log("type select");
        //   for(const opt of y.selectOptions){
        //     console.log(opt);

        //     // this.stepSelectOptions(indexat, indexLast).push(this.fb.group(opt))

        //     (<FormArray>controlObj.selectOptions).push(opt);
        //   }

        // }
        this.stepControls(indexat).push(this.fb.group(this.controlObj))


        //x.controls.forEach((y,indexLast) => {
        // (<FormArray>this.editServiceForm.controls.prices[indexat].deliver).push(this.fb.group(y))

        // console.log(y);
        // pricescontrol.controls[indexat].controls.deliver.push(this.fb.group(x.deliver));

        // console.log( pricescontrol.controls);

      })
      // for (let ind = 0; ind < pricescontrol.controls.length; ind++) {


      //   // testArr.push(this.fb.group(this.testObjectForEdit.prices[indexat].deliver[ind]));

      // }
    })
    this.showLoader = false;
  }
  Prices(): FormArray {
    return this.editServiceForm.get("prices") as FormArray
  }

  newPrice(index): FormGroup {
    return this.fb.group({
      name: new FormControl(null, [Validators.required]),
      id: index,
      amount: new FormControl(null, [Validators.required]),
      quantity: new FormControl(null, [Validators.required]),
      quantityUnit: new FormControl(null, [Validators.required]),
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

  removePrice(index: number) {
    this.Prices().removeAt(index);
  }



  Deliver(): FormArray {
    return this.editServiceForm.get("deliver") as FormArray
  }

  newDeliver(index): FormGroup {
    return this.fb.group({
      id: index,
      unit: new FormControl(null, [Validators.required]),
      duration: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
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
    return this.editServiceForm.get("steps") as FormArray
  }

  newStep(): FormGroup {
    this.fieldCounter++;
    return this.fb.group({
      stepName: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
      stepDescription: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
      controls: this.fb.array([
        this.fb.group({
          name: new FormControl("field" + this.fieldCounter),
          label: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
          placeholder: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
          value: null,
          type: 'text',
          controlType: 0,
          selectOptions:this.fb.array([]),
          tooltipText: '',
          validators: this.fb.group({
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
  removeStep(index: number) {
    this.Steps().removeAt(index);
  }


  stepControls(empIndex: number): FormArray {
    return this.Steps()
      .at(empIndex)
      .get('controls') as FormArray;
  }

  newControl(): FormGroup {
    if (this.Steps().length == 1 && this.stepControls(0).length == 0) {
      return this.fb.group({
        name: new FormControl("projectTitle"),
        label: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
        placeholder: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
        value: null,
        type: 'text',
        tooltipText: '',
        controlType: 0,
        validators: this.fb.group({
          required: [true],
        })
      });

    }
    else {
      this.fieldCounter++;
      return this.fb.group({
        name: new FormControl('field' + this.fieldCounter),
        label: new FormControl(null, [Validators.required, this.noWhitespaceValidator]),
        placeholder:new FormControl(null,[Validators.required,this.noWhitespaceValidator]),
        value: null,
        type: 'text',
        tooltipText: '',
        controlType: 0,
        selectOptions: this.fb.array([]),
        validators: this.fb.group({
          required: [false],
        })
      });

    }

  }

  addStepControl(empIndex: number) {
    this.stepControls(empIndex).push(this.newControl());
  }

  removeStepControl(empIndex: number, skillIndex: number) {
    this.stepControls(empIndex).removeAt(skillIndex);
  }


  stepSelectOptions(stepIndex, controlIndex): FormArray {
    return this.Steps().value[stepIndex].controls[controlIndex].selectOptions as FormArray;
  }
  addNewSelectOption(empIndex, skillIndex) {

    this.Steps().value[empIndex].controls[skillIndex].selectOptions.push(this.selectItem);
    console.log(this.Steps().value[empIndex].controls[skillIndex].selectOptions);
    this.selectItem = ''
    console.log(this.editServiceForm.value);
    this.showSelect = true;


  }


  removeSelect(stepIndex, controlIndex, index) {
    console.log(stepIndex);
    console.log(controlIndex);
    console.log(index);
    console.log(this.stepSelectOptions(stepIndex, controlIndex));

    this.tempArr = <FormArray>this.stepSelectOptions(stepIndex, controlIndex);
    this.tempArr.splice(index, 1)

  }

  logValue(event, formControlName) {

    const value = (event.target.value).toLowerCase();

    if (value.includes("<scri")) {
      alert("Enter Valid Input");
      this.editServiceForm.get(formControlName).setValue("");
    }
    else {

    }
  }




  logValueNested(event) {

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



  editService() {





    console.log(this.editServiceForm.value);
    this.showLoader = true;
    this.userServ.updateService(this.testObjectForEdit._id, this.editServiceForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log(response);
        this.showLoader = false;
        this.addDynamicSuccess = true;
        this.editServiceForm.reset()
        setTimeout(() => {


          this.route.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
            this.route.navigate(["/dashboard/services"]);

          });

        }, 1500);


      },
      err => {
        this.showLoader = false;
        this.addDynamicFail = true;
        console.log(err);

      }
    )



  }



  preventNonNumericalInput(e) {

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
  defineFieldType(index, skillIndex) {
    console.log(index);
    console.log(skillIndex);
    console.log(this.Steps().value[index].controls[skillIndex].type);

    if (this.Steps().value[index].controls[skillIndex].type == 'select') {
      this.showSelect = true
    }
    else {
      this.showSelect = false
    }




  }


  getServiceData(serviceName) {
    this.userServ.getServiceDataByName(serviceName, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.testObjectForEdit = response.data[0]
        console.log(" service steps");

        console.log(this.testObjectForEdit);





      },
      err => {
        console.log("error in get service data");
        console.log(err);




      }
    )


  }
}
