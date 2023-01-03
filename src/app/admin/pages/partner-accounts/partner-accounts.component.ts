import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-partner-accounts',
  templateUrl: './partner-accounts.component.html',
  styleUrls: ['./partner-accounts.component.css']
})
export class PartnerAccountsComponent implements OnInit {
  uuidValue;
  accountShoot;
  accName;
  allBalanceTempletes;
  showLoader = true;
  constructor(private Uuid: UUIDService, private route: Router, private userServ: UserService, private actroute: ActivatedRoute) { }


  ngOnInit(): void {
    this.uuidValue = this.Uuid.generateUUID();
    this.accountShoot = this.actroute.snapshot.params["id"];
    this.accName = localStorage.getItem("accFirstName") + " " + localStorage.getItem("accLastName") 

    console.log(this.accountShoot);

    this.userServ.getAllBalancetempletes(this.accountShoot, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("all  Balance templetes");
        console.log(response);
        this.allBalanceTempletes = response.data;
        this.showLoader = false;

      },
      err => {
        console.log(err);
        this.showLoader = false;

      }
    )
    

  }

}
