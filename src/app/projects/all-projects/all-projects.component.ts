import { Component, OnInit } from '@angular/core';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faSignOutAlt, faFileAlt, faHourglassHalf, faMoneyBillWave,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { project } from 'src/app/Model/project';
import { ManageImageService } from 'src/app/services/manage-image.service';



@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  uuidValue: any;
  faSignOutAlt = faSignOutAlt;
  userImageBase;
  // allProjects:project[];
  allProjects;
  faFileAlt = faFileAlt;
  faHourglassHalf = faHourglassHalf;
  faMoneyBillWave = faMoneyBillWave;
  faArrowLeft = faArrowLeft;
  filteredStatus = '';
  constructor(private projectServ: ManageProjectService, private Uuid: UUIDService, private route: Router, private imageServ: ManageImageService) { }

  ngOnInit(): void {
    console.log("type of all project object ================ ");
    console.log(typeof (this.allProjects));


    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);

    this.imageServ.profileImagePathShared.subscribe(
      (response) => {
        console.log("user profile image exist");
        console.log(response);
        this.userImageBase = response;

      },
      err => {
        console.log("error in get profile image from service");
        this.userImageBase = "default";

      }
    )
    this.projectServ.getAllProjects(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("all projects obj");
        console.log(JSON.stringify(response.data.body.data));
        this.allProjects = response.data.body.data;


      },
      err => {
        console.log("something went wrong");
        console.log(err)

      }
    )
  }
  signOut() {
    this.route.navigate(["/login"]);
    localStorage.clear();
  }
  onCheckboxChange(event,valueReal){
    console.log(event);
    if (event.target.checked){
      console.log(valueReal.value);
      const checkValue = valueReal.value;


      if (checkValue == "") {
        this.ngOnInit()
      }

       if (checkValue == 1)  {
        this.allProjects = this.allProjects.filter(
          res => {
            return res.size ==1;
          }
        )
      }
      if (checkValue == 2)  {
        this.allProjects = this.allProjects.filter(
          res => {
            return res.size ==2;
          }
        )
      }
       if (checkValue == 3)  {
        this.allProjects = this.allProjects.filter(
          res => {
            return res.size ==3;
          }
        )
      }
      if (checkValue == 1 && checkValue == 3)  {
        this.allProjects = this.allProjects.filter(
          res => {
            return res.size ==1 && res.size ==3;
          }
        )
      }

      // else {
      //   this.allProjects = this.allProjects.filter(
      //     res => {
      //       // return (res.size).toString().match(this.filteredStatus.toString())
      //       return res.size ==1;
      //     }
      //   )
      // }
      
    }
    else{
      this.ngOnInit()
    }

    
  }
  searchWithFilter() {
    // if (this.allProjects.size == 1) { 
    //   this.allProjects.size = "مشروع قصير";
    // }
    // else if (this.allProjects.size == 2) {
    //   this.allProjects.size = "مشروع متوسط";
    // }
    // else if (this.allProjects.size == 3) {
    //   this.allProjects.size = "مشروع طويل";
    // }
    // else if (this.allProjects.size == 4) {
    //   this.allProjects.size = "مشروع غير محدد"; 
    // }
    if (this.filteredStatus == "") {
      this.ngOnInit()
    }
    else {
      this.allProjects = this.allProjects.filter(
        res => {
          // return (res.size).toString().match(this.filteredStatus.toString())
          return res.size ==1;
        }
      )
    }


  }
  openProject(project){
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["projectSetails/"+project._id]);
  }

}