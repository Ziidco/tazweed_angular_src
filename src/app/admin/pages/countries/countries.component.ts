import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
import {faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  showLoader = false;
  allCountries;
  addCountryForm: FormGroup;
  editCountryForm:FormGroup;
  uuidValue;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  editCountryMode = false;
  countryToEdit;
  constructor(private userServ: UserService, private Uuid: UUIDService) { }

  ngOnInit(): void {
    this.getCountries()
    this.uuidValue = this.Uuid.generateUUID();
    this.addCountryForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
    this.editCountryForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }

  addCountry() {
    console.log(this.addCountryForm.value);
    this.showLoader = true;
    this.userServ.addCountry(this.addCountryForm.value, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (res) => {
        this.showLoader = false;
        alert("country added")
        this.getCountries()
      },
      err => {
        this.showLoader = false;
        // alert("error")
        console.log(err);

      }
    )

  }

  getCountries() {
    this.userServ.getCountriesPublic().subscribe(
      (response: any) => {
        console.log("all countries");
        console.log(response);
        this.allCountries = response.data;

      }
    )
  }

  deleteCountry(country){
    this.showLoader = true;
    this.userServ.deleteCountry(country._id, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.showLoader = false;
        alert("country deleted")
        this.getCountries()

      },
      err=>{
        this.showLoader = false;
        console.log(err);
        

      }
    )

  }


  openUpdateDialog(country){
    this.editCountryMode = true;
    this.countryToEdit = country
    this.editCountryForm.get("name").setValue(this.countryToEdit.name)

  }
  closeUpdateDialog(){
    this.editCountryMode = false;
    this.countryToEdit = null

  }

  updateCountry(){
    this.showLoader = true;
    console.log(this.countryToEdit._id);
    
    console.log(this.editCountryForm.value);

    this.userServ.editCountry(this.countryToEdit._id,this.editCountryForm.value, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (res) => {
        this.showLoader = false;
        alert("country updated")
        this.editCountryMode = false;
        this.getCountries()
      },
      err => {
        this.showLoader = false;
        // alert("error")
        console.log(err);

      }
    )
    
  }
}
