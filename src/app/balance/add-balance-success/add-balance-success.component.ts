import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{faCheckCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-balance-success',
  templateUrl: './add-balance-success.component.html',
  styleUrls: ['./add-balance-success.component.css']
})
export class AddBalanceSuccessComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  openMyProjects(){
    this.route.navigate(["/myProjects"])
  }

}
