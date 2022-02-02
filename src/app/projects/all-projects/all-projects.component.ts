import { Component, OnInit } from '@angular/core';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faSignOutAlt,faSearch, faFileAlt, faHourglassHalf, faMoneyBillWave, faArrowLeft, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { project } from 'src/app/Model/project';
import { ManageImageService } from 'src/app/services/manage-image.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  uuidValue: any;
  faSignOutAlt = faSignOutAlt;
  userImageBase;
  showLoader = false;
  // allProjects:project[];
  allProjects;
  filterProjectForm:FormGroup;
  faFileAlt = faFileAlt;
  faHourglassHalf = faHourglassHalf;
  faMoneyBillWave = faMoneyBillWave;
  faArrowLeft = faArrowLeft;
  faFolderOpen = faFolderOpen;
  faTwitter = faTwitter;
  faSearch = faSearch;
  filteredStatus = '';
  checkValue;
  showProjectsContainer = false;
  showNoProjectsContainer = false;
  userStatus;
  showProjects=true;
  showErrorConnection = false;
  showFilterblock = false;
  filterValue = 'all';
  filterTime = "";
  filteredprojects;
  articleCatArr = [];
  postCatArr = [];
  constructor(private projectServ: ManageProjectService, private Uuid: UUIDService, private route: Router, private imageServ: ManageImageService,private userServ:UserService) { }

  ngOnInit(): void {
    this.showLoader = true;
    // localStorage.setItem("sessionUserStatus", this.sessionUserStatus);
    this.userServ.activeAccount.subscribe(
      (response)=>{
        // console.log("active account from service value is ==== " + response); 
        
        this.showProjects = response;
      },
      err=>{
        this.showErrorConnection = true;
      }
    )
    this.userStatus = localStorage.getItem("sessionUserStatus");
    if(this.userStatus =="active"){
      this.showProjects = true;
    }
    else{
      this.showProjects = false;

    }
    this.filterProjectForm = new FormGroup({
      filterSize:new FormControl(null)
    })
    this.uuidValue = this.Uuid.generateUUID();
    // this.userStatus = localStorage.getItem("sessionUserStatus");
    this.imageServ.profileImagePathShared.subscribe(
      (response) => {
        // console.log("user profile image exist");
        // console.log(response);
        this.userImageBase = response;

      },
      err => {
        console.log("error in get profile image from service");
        this.userImageBase = "default";

      }
    )
    
    // if(this.userStatus =="active"){
      this.getAllProjects();
    
    // }
    // else{
    //   console.log("error error error");
    //   // this.ngOnInit()
      
    // }



  }

  getAllProjects(){
    this.projectServ.getAllProjects(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.allProjects = response.data.body.data;

        this.filteredprojects = this.allProjects;
        for (const project of this.allProjects) {
          if(project.jobType=="article"){
            this.articleCatArr.push(project)
          }

          else if(project.jobType=="post"){
            this.postCatArr.push(project)
          }

        }
        this.allProjects.sort((a, b) => {
          return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
        if (this.allProjects == "") {
          this.showProjectsContainer = false;
          this.showFilterblock = false;
          this.showNoProjectsContainer = true;

        }
        else{
          this.showProjectsContainer = true;
          this.showFilterblock = true;
          this.showNoProjectsContainer = false;
        }


      },
      err => {
        console.log("something went wrong");
        console.log(err)
        this.showLoader = false;
        this.showProjectsContainer = false;
          this.showNoProjectsContainer = true;
          this.showFilterblock = false;

      }
    )
  }
  signOut() {
    this.route.navigate(["/login"]);
    localStorage.clear();
  }
  onCheckboxChange(event, valueReal) {
    console.log(event);
    if (event.target.checked) {
      console.log(valueReal.value);
      const checkValue = valueReal.value;


      if (checkValue == "") {
        this.ngOnInit()
      }

      if (checkValue == 1) {
        this.allProjects = this.allProjects.filter(
          res => {
            return res.amount == 1;
          }
        )
      }


      // if (checkValue == 1) {
      //   this.allProjects = this.allProjects.filter(
      //     res => {
            
      //       return res.size == arr[0] || res.size == arr[1] || res.size == arr[2]
      //     }
      //   ) n
      // }
      if (checkValue == 2) {
        this.allProjects = this.allProjects.filter(
          res => {
            return res.amount == 2;
          }
        )
      }
      if (checkValue == 3) {
        this.allProjects = this.allProjects.filter(
          res => {
            return res.amount == 3;
          }
        )
      }
      if (checkValue == 1 && checkValue == 3) {
        this.allProjects = this.allProjects.filter(
          res => {
            return res.size == 1 && res.size == 3;
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
    else {
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

      console.log(this.filteredStatus);
      
      this.allProjects = this.allProjects.filter(
        res => {
          return (res.projectTitle).toString().match(this.filteredStatus.toString())
          // return res.size == 1;
        }
      )
    }


  }
  openProject(project) {
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["projectSetails/" + project._id]);
  }

  onChangeSize(projectSize){
    // this.ngOnInit()
    // this.allProjects = this.allProjects
    console.log("filter size value =====");
    
    // console.log(this.filterProjectForm.get("filterSize").value);



     this.checkValue = this.filterProjectForm.get("filterSize").value;
    console.log(this.checkValue);

      if (this.checkValue == "") {
        this.ngOnInit()
      }
      else{
        this.allProjects = this.allProjects.filter(
          res => {
            return res.size == this.checkValue;
          }
        )
      }

      // if (checkValue == 1) {
      //   this.allProjects = this.allProjects.filter(
      //     res => {
      //       return res.size == 1;
      //     }
      //   )
      // }
      // if (checkValue == 2) {
      //   this.allProjects = this.allProjects.filter(
      //     res => {
      //       return res.size == 2;
      //     }
      //   )
      // }
      // if (checkValue == 3) {
      //   this.allProjects = this.allProjects.filter(
      //     res => {
      //       return res.size == 3;
      //     }
      //   )
      // }
    
  }


  filterProjects(){
    if(this.filterValue==null || this.filterValue =='' || this.filterValue =='all'){
      this.filteredprojects = this.allProjects;
    }
    else{
      this.filteredprojects = this.allProjects.filter(
        res => {
          return res.jobType == this.filterValue;
        }
      )
    }

  

    
  }



  filterProjectsTime(){


    if(this.filterTime==null || this.filterTime =='' || this.filterTime =='all'){
      this.filteredprojects = this.allProjects;
    }
    else{
      this.filteredprojects = this.allProjects.filter(
        res => {
          return res.timePerDay == this.filterTime;
        }
      )
    }

  }
}
